$baseUrl = "https://ai-elite-backend-v1.onrender.com"
$endpoints = @("/health", "/api/status")  # éviter "/" pour ne pas avoir de timeout inutile
$maxAttempts = 3

foreach ($endpoint in $endpoints) {
    $url = $baseUrl.TrimEnd("/") + $endpoint
    Write-Host "Test de l''endpoint : $url"

    # Extraction hostname
    if ($url -match "^https?://([^/]+)") {
        $hostName = $Matches[1]
    } else {
        Write-Host "Impossible d''extraire le nom d''hôte depuis l''URL."
        continue
    }

    # Test TCP
    $tcpTest = Test-NetConnection -ComputerName $hostName -Port 443 -WarningAction SilentlyContinue
    if (-not $tcpTest.TcpTestSucceeded) {
        Write-Host "  ERREUR : Échec de la connexion TCP sur le port 443."
        continue
    }
    Write-Host "  Connexion TCP réussie."

    # Tentatives multiples pour HTTP
    $success = $false
    for ($i = 1; $i -le $maxAttempts; $i++) {
        Write-Host "  Tentative $i sur $maxAttempts : Envoi de la requête HTTP avec Invoke-WebRequest (timeout 15s)..."
        try {
            $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
            Write-Host "  Status Code : $($response.StatusCode)"
            if ($response.Content.Length -gt 0) {
                Write-Host "  Contenu reçu :"
                Write-Host $response.Content
            } else {
                Write-Host "  Aucun contenu reçu (corps vide)."
            }
            $success = $true
            break
        } catch {
            Write-Host "  ERREUR lors de Invoke-WebRequest : $($_.Exception.Message)"
            Write-Host "  Tentative avec Invoke-RestMethod..."

            try {
                $restResponse = Invoke-RestMethod -Uri $url -TimeoutSec 15 -ErrorAction Stop
                Write-Host "  Succès Invoke-RestMethod, réponse :"
                Write-Host ($restResponse | ConvertTo-Json -Depth 10)
                $success = $true
                break
            } catch {
                Write-Host "  ERREUR lors de Invoke-RestMethod : $($_.Exception.Message)"
            }
        }
    }
    if (-not $success) {
        Write-Host "  Toutes les tentatives ont échoué pour cet endpoint."
    }
    Write-Host "---------------------------------------`n"
}

Write-Host "Test terminé. Appuie sur une touche pour fermer..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
