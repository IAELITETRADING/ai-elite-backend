@echo off
REM Lance le script PowerShell test_backend.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0test_backend.ps1"

REM Pause pour garder la fen?tre ouverte apr?s l'ex?cution
pause
