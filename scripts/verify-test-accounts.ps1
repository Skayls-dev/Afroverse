$url = "https://xkifmzjrhxakufbzjyew.supabase.co"
$anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraWZtempyaHhha3VmYnpqeWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MDU0MDUsImV4cCI6MjA5MzM4MTQwNX0.KJ80EmhfiSlxQlg3z-n49gFUo4U-dEVQt1us5-cHxSQ"
$headers = @{
  "apikey" = $anon
  "Content-Type" = "application/json"
}
$users = @(
  "test.awa@afroverse.dev",
  "test.nadia@afroverse.dev",
  "test.mina@afroverse.dev"
)

foreach ($email in $users) {
  $body = @{ email = $email; password = "Afroverse123!" } | ConvertTo-Json
  try {
    $res = Invoke-RestMethod -Method Post -Uri "$url/auth/v1/token?grant_type=password" -Headers $headers -Body $body
    if ($res.access_token) {
      Write-Host "OK  $email"
    } else {
      Write-Host "FAIL $email"
    }
  }
  catch {
    Write-Host "FAIL $email  $($_.Exception.Message)"
  }
}
