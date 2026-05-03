import type { DiagnosticResult } from '../../lib/scoring'

interface DiagnosticResultProps {
  result: DiagnosticResult
  onShare: () => void
  onViewRecommendations: () => void
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{label}</span>
        <span className="text-white font-semibold">{value}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-2 rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export default function DiagnosticResultComponent({ result, onShare, onViewRecommendations }: DiagnosticResultProps) {
  return (
    <div className="space-y-6 pb-6">
      {/* Header badge */}
      <div className="text-center space-y-2">
        <div className="inline-block bg-[#1D9E75]/20 border border-[#1D9E75]/40 rounded-full px-4 py-1 text-[#1D9E75] text-sm font-medium">
          Diagnostic complété ✓
        </div>
        <h2 className="text-2xl font-bold text-white">{result.profilLabel}</h2>
      </div>

      {/* Priorité absolue */}
      <div className="bg-[#C4622D]/10 border border-[#C4622D]/30 rounded-xl p-4">
        <p className="text-xs text-[#C4622D] font-semibold uppercase tracking-wide mb-1">
          Priorité absolue
        </p>
        <p className="text-white font-medium">{result.prioriteAbsolue}</p>
      </div>

      {/* Scores */}
      <div className="bg-white/5 rounded-xl p-4 space-y-4">
        <h3 className="text-white font-semibold">Tes scores capillaires</h3>
        <ScoreBar label="Besoin d'hydratation" value={result.scoreHydratation} color="#1D9E75" />
        <ScoreBar label="Besoin de protection" value={result.scoreProtection} color="#C4622D" />
        <ScoreBar label="Besoin de croissance" value={result.scoreCroissance} color="#7C3AED" />
      </div>

      {/* Top 3 problèmes */}
      <div className="space-y-3">
        <h3 className="text-white font-semibold">Top 3 problèmes identifiés</h3>
        {result.top3Problemes.map((p, i) => (
          <div key={p.id} className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-white/10 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
              {i + 1}
            </span>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-200">{p.label}</span>
                <span className="text-[#1D9E75] font-semibold">{p.score}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-1.5 bg-[#1D9E75] rounded-full"
                  style={{ width: `${p.score}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Routine de base */}
      <div className="space-y-3">
        <h3 className="text-white font-semibold">Ta routine de base</h3>
        <div className="space-y-2">
          {result.routineDeBase.map((item, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-4 flex gap-3 items-start">
              <span className="text-2xl flex-shrink-0">{item.emoji}</span>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <span className="text-xs text-[#1D9E75] bg-[#1D9E75]/10 rounded-full px-2 py-0.5 flex-shrink-0">
                    {item.frequence}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-3 pt-2">
        <button
          onClick={onViewRecommendations}
          className="w-full bg-[#1D9E75] hover:bg-[#178864] text-white font-semibold py-3 px-8 rounded-full transition-colors"
        >
          Voir mes recommandations produits →
        </button>
        <button
          onClick={onShare}
          className="w-full border border-white/20 hover:border-white/40 text-white font-medium py-3 px-8 rounded-full transition-colors"
        >
          Partager mon profil 🌿
        </button>
      </div>
    </div>
  )
}
