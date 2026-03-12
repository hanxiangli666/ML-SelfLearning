$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$stateFile = Join-Path $projectRoot ".runtime\connector-state.json"

if (-not (Test-Path $stateFile)) {
    Write-Host "State file not found: $stateFile"
    Write-Host "If needed, stop processes manually via Task Manager or Stop-Process."
    exit 0
}

$state = Get-Content $stateFile -Raw | ConvertFrom-Json
$killed = @()

foreach ($procId in @($state.mcpPid, $state.tunnelPid)) {
    if ($procId) {
        try {
            Stop-Process -Id $procId -ErrorAction Stop
            $killed += $procId
        } catch {
            Write-Host "Process $procId is already stopped or cannot be stopped."
        }
    }
}

if ($killed.Count -gt 0) {
    Write-Host "Stopped process IDs: $($killed -join ', ')"
} else {
    Write-Host "No running processes were stopped."
}
