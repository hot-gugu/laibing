$projectRoot = $PSScriptRoot
try { $response = Invoke-RestMethod -Uri 'http://127.0.0.1:8765/__prototype_annotations' -TimeoutSec 2 } catch { $response = $null }
if ($response.service -ne 'laibing-prototype-annotations') {
    $pythonPath = (Get-Command python -ErrorAction Stop).Source
    Start-Process -FilePath $pythonPath -ArgumentList '"prototype-local-server.py"' -WorkingDirectory $projectRoot -WindowStyle Hidden
    Start-Sleep -Seconds 1
}
Start-Process 'http://127.0.0.1:8765/index.html'
