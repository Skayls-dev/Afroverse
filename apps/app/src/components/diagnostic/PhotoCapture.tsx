import { useEffect, useRef, useState } from 'react'

interface PhotoCaptureProps {
  onPhotoSelected: (base64: string, file: File) => void
  onReset?: () => void
  className?: string
}

async function fileToBase64WithoutPrefix(file: File): Promise<string> {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const raw = String(reader.result || '')
      const commaIndex = raw.indexOf(',')
      resolve(commaIndex >= 0 ? raw.slice(commaIndex + 1) : raw)
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

async function compressImage(file: File): Promise<File> {
  if (file.size <= 2 * 1024 * 1024) {
    return file
  }

  const imageBitmap = await createImageBitmap(file)
  const maxSize = 1200
  const ratio = imageBitmap.width / imageBitmap.height

  let targetWidth = imageBitmap.width
  let targetHeight = imageBitmap.height

  if (targetWidth > maxSize || targetHeight > maxSize) {
    if (ratio >= 1) {
      targetWidth = maxSize
      targetHeight = Math.round(maxSize / ratio)
    } else {
      targetHeight = maxSize
      targetWidth = Math.round(maxSize * ratio)
    }
  }

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return file
  }

  ctx.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight)

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', 0.85)
  )

  if (!blob) {
    return file
  }

  return new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
    type: 'image/jpeg',
    lastModified: Date.now(),
  })
}

export default function PhotoCapture({ onPhotoSelected, onReset, className = '' }: PhotoCaptureProps) {
  const cameraRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment')

  function stopCameraStream() {
    if (!cameraStream) return
    for (const track of cameraStream.getTracks()) {
      track.stop()
    }
    setCameraStream(null)
  }

  async function startCamera() {
    setCameraError(null)

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera non supportee sur ce navigateur.')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
        },
        audio: false,
      })
      setCameraStream(stream)
    } catch {
      setCameraError('Impossible d\'ouvrir la camera. Verifie les permissions.')
    }
  }

  async function flipCamera() {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment'
    setFacingMode(nextFacing)
    // Stop current stream before reopening
    if (cameraStream) {
      for (const track of cameraStream.getTracks()) track.stop()
      setCameraStream(null)
    }
    setCameraError(null)
    if (!navigator.mediaDevices?.getUserMedia) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: nextFacing } },
        audio: false,
      })
      setCameraStream(stream)
    } catch {
      setCameraError('Impossible de basculer la camera.')
    }
  }

  async function captureFromCamera() {
    const video = videoRef.current
    if (!video) return

    const width = video.videoWidth || 1280
    const height = video.videoHeight || 720

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(video, 0, 0, width, height)

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', 0.9)
    })

    if (!blob) return

    const file = new File([blob], `diagnostic-${Date.now()}.jpg`, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    })

    stopCameraStream()
    await handleSelected(file)
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      if (cameraStream) {
        for (const track of cameraStream.getTracks()) {
          track.stop()
        }
      }
    }
  }, [previewUrl, cameraStream])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (cameraStream) {
      video.srcObject = cameraStream
      void video.play()
    } else {
      video.srcObject = null
    }
  }, [cameraStream])

  async function handleSelected(file: File | null) {
    if (!file) return

    const processed = await compressImage(file)
    const base64 = await fileToBase64WithoutPrefix(processed)

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    const nextPreview = URL.createObjectURL(processed)
    setPreviewUrl(nextPreview)
    onPhotoSelected(base64, processed)
  }

  function handleReset() {
    stopCameraStream()
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    if (cameraRef.current) cameraRef.current.value = ''
    if (galleryRef.current) galleryRef.current.value = ''
    onReset?.()
  }

  return (
    <div className={className}>
      {!previewUrl ? (
        <div className="space-y-3">
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              void handleSelected(e.target.files?.[0] ?? null)
            }}
          />
          <input
            ref={galleryRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              void handleSelected(e.target.files?.[0] ?? null)
            }}
          />

          {!cameraStream ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  void startCamera()
                }}
                className="rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)]"
              >
                📷 Activer la camera
              </button>

              <button
                type="button"
                onClick={() => galleryRef.current?.click()}
                className="rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)]"
              >
                🖼 Depuis la galerie
              </button>
            </div>
          ) : null}

          {cameraStream ? (
            <div className="space-y-3">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-56 w-full rounded-xl border border-[var(--color-border)] object-cover"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => { void captureFromCamera() }}
                  className="rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"
                >
                  Capturer
                </button>
                <button
                  type="button"
                  onClick={() => { void flipCamera() }}
                  className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text)]"
                  title={facingMode === 'environment' ? 'Passer en camera frontale' : 'Passer en camera arriere'}
                >
                  🔄 {facingMode === 'environment' ? 'Selfie' : 'Arrière'}
                </button>
                <button
                  type="button"
                  onClick={stopCameraStream}
                  className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text)]"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : null}

          <div className="text-xs app-muted">
            Si la camera ne s'ouvre pas, utilise "Depuis la galerie" (ou "Prendre une photo" selon ton navigateur mobile).
          </div>
          <div className="hidden">
            <button
              type="button"
              onClick={() => cameraRef.current?.click()}
            >
              Fallback input camera
            </button>
          </div>
          {cameraError ? <p className="text-xs text-red-600">{cameraError}</p> : null}
        </div>
      ) : (
        <div className="space-y-3">
          <img
            src={previewUrl}
            alt="Apercu photo diagnostic"
            className="h-56 w-full rounded-xl border border-[var(--color-border)] object-cover"
          />
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)]"
          >
            ✎ Changer
          </button>
        </div>
      )}
    </div>
  )
}
