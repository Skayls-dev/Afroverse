import type { DiagnosticIAResult as DiagnosticIAResultType } from '../../hooks/useAnthropicDiagnostic'

interface DiagnosticIAResultProps {
  result: DiagnosticIAResultType
  photoUrl?: string
  onShare?: () => void
  onViewRecommendations?: () => void
}

function renderValue(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  if (Array.isArray(value)) {
    return value.map((item) => renderValue(item)).filter(Boolean).join(', ')
  }

  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, val]) => `${key}: ${renderValue(val)}`)
      .filter((line) => !line.endsWith(': '))
      .join(' | ')
  }

  return ''
}

function normalizeProblemes(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => renderValue(item)).filter(Boolean)
  }
  const one = renderValue(value)
  return one ? [one] : []
}

export default function DiagnosticIAResult({
  result,
  photoUrl,
  onShare,
  onViewRecommendations,
}: DiagnosticIAResultProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-2)] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-[var(--color-text)]">Ton diagnostic capillaire IA</p>
            <span className="mt-2 inline-flex rounded-full bg-[var(--color-primary)]/15 px-3 py-1 text-sm font-medium text-[var(--color-primary)]">
              {renderValue(result.profil) || 'Profil indisponible'}
            </span>
          </div>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Photo diagnostic"
              className="h-14 w-14 rounded-lg border border-[var(--color-border)] object-cover"
            />
          ) : null}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] border-l-4 border-l-[var(--color-primary)] bg-[var(--color-surface)] p-4">
        <p className="mb-1 text-sm font-semibold text-[var(--color-text)]">👁 Observations photo</p>
        <p className="text-sm app-muted">{renderValue(result.observations_photo)}</p>
      </div>

      <div className="rounded-xl border border-[#C0392B]/30 border-l-4 border-l-[#C0392B] bg-[#C0392B]/5 p-4">
        <p className="mb-1 text-sm font-semibold text-[var(--color-text)]">🔴 Priorité absolue</p>
        <p className="text-sm text-[#8E2C22]">{renderValue(result.priorite)}</p>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <p className="mb-2 text-sm font-semibold text-[var(--color-text)]">Problèmes identifiés</p>
        <ul className="list-disc space-y-1 pl-5 text-sm app-muted">
          {normalizeProblemes(result.problemes).slice(0, 3).map((probleme) => (
            <li key={probleme}>{probleme}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-[var(--color-secondary)]/30 border-l-4 border-l-[var(--color-secondary)] bg-[var(--color-secondary)]/5 p-4">
        <p className="mb-1 text-sm font-semibold text-[var(--color-text)]">🚿 Lavage</p>
        <p className="text-sm app-muted">{renderValue(result.routine_lavage)}</p>
      </div>

      <div className="rounded-xl border border-[var(--color-secondary)]/30 border-l-4 border-l-[var(--color-secondary)] bg-[var(--color-secondary)]/5 p-4">
        <p className="mb-1 text-sm font-semibold text-[var(--color-text)]">💧 Hydratation</p>
        <p className="text-sm app-muted">{renderValue(result.routine_hydratation)}</p>
      </div>

      <div className="rounded-xl border border-[var(--color-secondary)]/30 border-l-4 border-l-[var(--color-secondary)] bg-[var(--color-secondary)]/5 p-4">
        <p className="mb-1 text-sm font-semibold text-[var(--color-text)]">🛡 Protection</p>
        <p className="text-sm app-muted">{renderValue(result.routine_protection)}</p>
      </div>

      <div className="rounded-xl border border-[#C9962C]/40 border-l-4 border-l-[#C9962C] bg-[#C9962C]/5 p-4">
        <p className="mb-1 text-sm font-semibold text-[#9C741D]">✦ Conseil clé</p>
        <p className="text-sm font-semibold text-[#8A671A]">{renderValue(result.conseil_cle)}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onViewRecommendations}
          className="app-btn-primary rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
        >
          Voir mes recommandations →
        </button>
        <button
          type="button"
          onClick={onShare}
          className="rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)]"
        >
          Partager mon profil 🌿
        </button>
      </div>
    </div>
  )
}
