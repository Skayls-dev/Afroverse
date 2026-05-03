import { useState, useRef } from 'react'
import Navbar from '../components/shared/Navbar'
import { useAuth } from '../hooks/useAuth'
import { useSuivi } from '../hooks/useSuivi'
import { supabase } from '../lib/supabase'

function SliderField({
  label,
  value,
  color,
  onChange,
}: {
  label: string
  value: number
  color: string
  onChange: (v: number) => void
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-300">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{value}/10</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#1D9E75] cursor-pointer"
      />
    </div>
  )
}

export default function Suivi() {
  const { user } = useAuth()
  const { suivis, loading, setSuivis } = useSuivi(user?.id)

  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [hydratation, setHydratation] = useState(5)
  const [brillance, setBrillance] = useState(5)
  const [casse, setCasse] = useState(5)
  const [notes, setNotes] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const currentMois = new Date().toISOString().slice(0, 7) + '-01'

  function openModal() {
    setHydratation(5)
    setBrillance(5)
    setCasse(5)
    setNotes('')
    setPhoto(null)
    setModalOpen(true)
  }

  async function handleSave() {
    if (!user) return
    setSaving(true)
    try {
      let photo_url: string | undefined
      if (photo) {
        const ext = photo.name.split('.').pop()
        const path = `${user.id}/${Date.now()}.${ext}`
        const { error: uploadErr } = await supabase.storage
          .from('suivis-photos')
          .upload(path, photo, { upsert: true })
        if (!uploadErr) {
          const { data: urlData } = supabase.storage
            .from('suivis-photos')
            .getPublicUrl(path)
          photo_url = urlData.publicUrl
        }
      }

      const { data, error } = await supabase
        .from('suivis')
        .insert({
          user_id: user.id,
          mois: currentMois,
          score_hydratation: hydratation,
          score_brillance: brillance,
          score_casse: casse,
          notes: notes.trim() || null,
          photo_url: photo_url ?? null,
        })
        .select()
        .single()

      if (!error && data) {
        setSuivis((prev) => [data, ...prev])
        setModalOpen(false)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-20 md:pt-16">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Suivi mensuel</h1>

        {loading ? (
          <p className="text-gray-400">Chargement…</p>
        ) : suivis.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-6">Aucun suivi enregistré pour l&apos;instant.</p>
            <button
              onClick={openModal}
              className="bg-[#1D9E75] hover:bg-[#178864] text-white font-semibold py-3 px-8 rounded-full transition-colors"
            >
              Ajouter mon premier suivi
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {suivis.map((s) => (
              <div key={s.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  {s.photo_url && (
                    <img
                      src={s.photo_url}
                      alt="photo suivi"
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="text-sm text-gray-400">
                    {new Date(s.mois).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#1D9E75]">{s.score_hydratation}/10</div>
                    <div className="text-xs text-gray-500">Hydratation</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#534AB7]">{s.score_brillance}/10</div>
                    <div className="text-xs text-gray-500">Brillance</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">{s.score_casse}/10</div>
                    <div className="text-xs text-gray-500">Casse</div>
                  </div>
                </div>
                {s.notes && <p className="text-gray-400 text-sm mt-2">{s.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      {suivis.length > 0 && (
        <button
          onClick={openModal}
          className="fixed bottom-20 right-5 w-14 h-14 bg-[#1D9E75] hover:bg-[#178864] text-white rounded-full shadow-lg text-2xl flex items-center justify-center transition-colors z-10"
          aria-label="Ajouter un suivi"
        >
          +
        </button>
      )}

      {/* Bottom-sheet modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-[#181818] rounded-t-2xl w-full max-w-lg px-6 pt-6 pb-8 border-t border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5" />
            <h2 className="text-lg font-bold text-white mb-5">
              Suivi —{' '}
              {new Date(currentMois).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            </h2>

            <SliderField
              label="Hydratation"
              value={hydratation}
              color="#1D9E75"
              onChange={setHydratation}
            />
            <SliderField
              label="Brillance"
              value={brillance}
              color="#534AB7"
              onChange={setBrillance}
            />
            <SliderField
              label="Casse"
              value={casse}
              color="#EAB308"
              onChange={setCasse}
            />

            <div className="mb-4">
              <label className="text-sm text-gray-300 mb-1 block">Notes (optionnel)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Mes observations ce mois-ci…"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#1D9E75]"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-300 mb-1 block">Photo (optionnel)</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full border border-dashed border-white/20 hover:border-[#1D9E75]/60 rounded-xl py-3 text-sm text-gray-400 transition-colors"
              >
                {photo ? photo.name : '📷 Ajouter une photo'}
              </button>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-[#1D9E75] hover:bg-[#178864] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  )
}
