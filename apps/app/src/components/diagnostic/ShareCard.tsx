import { useState } from 'react'
import type { DiagnosticResult } from '../../lib/scoring'

interface ShareCardProps {
  result: DiagnosticResult
  isOpen: boolean
  onClose: () => void
}

export default function ShareCard({ result, isOpen, onClose }: ShareCardProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const shareUrl = 'https://afroverse.app/diagnostic'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${result.shareText}\n${shareUrl}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`${result.shareText}\n${shareUrl}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const handleWebShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Mon profil AfroVerse',
        text: result.shareText,
        url: shareUrl,
      }).catch(() => null)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Sheet */}
      <div
        className="relative w-full max-w-lg bg-[#1a1a1a] rounded-t-2xl border-t border-white/10 p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto -mt-1" />

        <h3 className="text-white font-bold text-lg text-center">Partage ton profil</h3>

        {/* Visual card */}
        <div className="bg-gradient-to-br from-[#1D9E75]/20 to-[#0f0f0f] border border-[#1D9E75]/30 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[#1D9E75] font-bold text-lg">AfroVerse</span>
            <span className="text-xs text-gray-400 bg-white/5 rounded-full px-3 py-1">Mon profil</span>
          </div>
          <p className="text-white font-semibold">{result.profilLabel}</p>
          <div className="space-y-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Priorité</p>
            <p className="text-sm text-[#C4622D] font-medium">{result.prioriteAbsolue}</p>
          </div>
          <div className="flex gap-4 pt-1">
            <div className="text-center">
              <p className="text-[#1D9E75] font-bold text-xl">{result.scoreHydratation}%</p>
              <p className="text-xs text-gray-500">Hydratation</p>
            </div>
            <div className="text-center">
              <p className="text-[#C4622D] font-bold text-xl">{result.scoreProtection}%</p>
              <p className="text-xs text-gray-500">Protection</p>
            </div>
            <div className="text-center">
              <p className="text-purple-400 font-bold text-xl">{result.scoreCroissance}%</p>
              <p className="text-xs text-gray-500">Croissance</p>
            </div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="space-y-3">
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b559] text-white font-semibold py-3 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12.004 2C6.474 2 2 6.476 2 12.01c0 1.771.468 3.425 1.28 4.864L2.05 21.95l5.2-1.215A9.956 9.956 0 0012.004 22C17.534 22 22 17.524 22 11.99 22 6.455 17.534 2 12.004 2zm0 18.198a8.19 8.19 0 01-4.176-1.147l-.299-.178-3.085.722.762-3.003-.196-.31A8.2 8.2 0 013.8 11.99c0-4.52 3.683-8.194 8.204-8.194 4.52 0 8.194 3.674 8.194 8.194 0 4.52-3.674 8.208-8.194 8.208z"/>
            </svg>
            Partager sur WhatsApp
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleWebShare}
              className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Partager…
            </button>
          )}

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium py-3 rounded-xl transition-colors"
          >
            {copied ? (
              <>
                <svg className="w-5 h-5 text-[#1D9E75]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#1D9E75]">Lien copié !</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copier le lien
              </>
            )}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full text-gray-500 hover:text-gray-300 text-sm transition-colors py-1"
        >
          Fermer
        </button>
      </div>
    </div>
  )
}
