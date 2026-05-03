$supabaseUrl = "https://xkifmzjrhxakufbzjyew.supabase.co"
$serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraWZtempyaHhha3VmYnpqeWV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzgwNTQwNSwiZXhwIjoyMDkzMzgxNDA1fQ.6NoW9QmyfTli1f3mKXFvdqBVuP47IzN0D6p3olOh3Tg"

$headers = @{
  "apikey" = $serviceKey
  "Authorization" = "Bearer $serviceKey"
  "Content-Type" = "application/json"
}

$users = @(
  @{ prenom = "Awa"; email = "test.awa@afroverse.dev"; password = "Afroverse123!"; type_cheveux = "4A"; porosite = "normale"; elasticite = "normale"; densite = "moyenne"; objectifs = @("Hydrater mes cheveux", "Definir mes boucles"); problemes = @("Secheresse") },
  @{ prenom = "Nadia"; email = "test.nadia@afroverse.dev"; password = "Afroverse123!"; type_cheveux = "4C"; porosite = "haute"; elasticite = "faible"; densite = "epaisse"; objectifs = @("Reduire la casse", "Favoriser la croissance"); problemes = @("Casse") },
  @{ prenom = "Mina"; email = "test.mina@afroverse.dev"; password = "Afroverse123!"; type_cheveux = "3C"; porosite = "faible"; elasticite = "haute"; densite = "fine"; objectifs = @("Nourrir en profondeur"); problemes = @("Frisottis") }
)

$results = @()

foreach ($u in $users) {
  $createBody = @{
    email = $u.email
    password = $u.password
    email_confirm = $true
    user_metadata = @{ prenom = $u.prenom }
  } | ConvertTo-Json -Depth 5

  try {
    $created = Invoke-RestMethod -Method Post -Uri "$supabaseUrl/auth/v1/admin/users" -Headers $headers -Body $createBody
    $userId = $created.id

    $profilHeaders = @{
      "apikey" = $serviceKey
      "Authorization" = "Bearer $serviceKey"
      "Content-Type" = "application/json"
      "Prefer" = "resolution=merge-duplicates,return=representation"
    }

    $profilBody = @{
      id = $userId
      prenom = $u.prenom
      email = $u.email
      type_cheveux = $u.type_cheveux
      porosite = $u.porosite
      elasticite = $u.elasticite
      densite = $u.densite
      objectifs = $u.objectifs
      problemes = $u.problemes
    } | ConvertTo-Json -Depth 5

    $null = Invoke-RestMethod -Method Post -Uri "$supabaseUrl/rest/v1/profils" -Headers $profilHeaders -Body $profilBody

    $results += "CREATED  $($u.email)  password=$($u.password)"
  }
  catch {
    $results += "SKIPPED  $($u.email)  reason=$($_.Exception.Message)"
  }
}

$results | ForEach-Object { Write-Host $_ }
