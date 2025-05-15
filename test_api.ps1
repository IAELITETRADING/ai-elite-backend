$url = "https://ai-elite-backend-v1.onrender.com/health"

Write-Host "Test de l''API à l''adresse : $url"

try {
    Write-Host "Envoi de la requête avec timeout 10s..."
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
    Write-Host "Réponse reçue."

    $statusCode = $response.StatusCode
    $body = $response.Content

    Write-Host "Code HTTP retourné : $statusCode"
    Write-Host "Corps de la réponse :"
    Write-Host $body

    if ($statusCode -eq 200) {
        Write-Host "Le backend répond correctement."
    }
    else {
        Write-Host "Problème détecté avec le backend."
    }
}
catch {
    Write-Host "Erreur lors de la requête :"
    Write-Host $_.Exception.Message
    Write-Host "Détails complets de l''erreur :"
    Write-Host $_ | Format-List * -Force
}
