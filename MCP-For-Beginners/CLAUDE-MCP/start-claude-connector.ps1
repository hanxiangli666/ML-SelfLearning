param(
    [int]$Port = 3001,
    [string]$HostAddress = "127.0.0.1",
    [int]$WaitSeconds = 40
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$mcpExe = Join-Path $projectRoot ".venv\Scripts\markitdown-mcp.exe"

if (-not (Test-Path $mcpExe)) {
    Write-Error "Cannot find $mcpExe. Make sure the virtual environment is created and markitdown-mcp is installed."
}

if (-not (Get-Command ssh -ErrorAction SilentlyContinue)) {
    Write-Error "Cannot find ssh command. Install OpenSSH client and try again."
}

$runtimeDir = Join-Path $projectRoot ".runtime"
if (-not (Test-Path $runtimeDir)) {
    New-Item -ItemType Directory -Path $runtimeDir | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$mcpLog = Join-Path $runtimeDir "mcp-$timestamp.log"
$mcpErrLog = Join-Path $runtimeDir "mcp-$timestamp.err.log"
$tunnelLog = Join-Path $runtimeDir "tunnel-$timestamp.log"
$tunnelErrLog = Join-Path $runtimeDir "tunnel-$timestamp.err.log"
$stateFile = Join-Path $runtimeDir "connector-state.json"

Write-Host "Starting markitdown-mcp on http://${HostAddress}:$Port ..."
$mcpProc = Start-Process -FilePath $mcpExe `
    -ArgumentList @("--http", "--host", $HostAddress, "--port", "$Port") `
    -WorkingDirectory $projectRoot `
    -RedirectStandardOutput $mcpLog `
    -RedirectStandardError $mcpErrLog `
    -PassThru

Start-Sleep -Seconds 2
if ($mcpProc.HasExited) {
    Write-Host "markitdown-mcp exited early. Check log: $mcpLog"
    Get-Content $mcpLog -Tail 80
    exit 1
}

Write-Host "Starting localhost.run tunnel ..."
$tunnelProc = Start-Process -FilePath "ssh" `
    -ArgumentList @("-o", "StrictHostKeyChecking=no", "-R", "80:localhost:$Port", "nokey@localhost.run") `
    -WorkingDirectory $projectRoot `
    -RedirectStandardOutput $tunnelLog `
    -RedirectStandardError $tunnelErrLog `
    -PassThru

$publicUrl = $null
$deadline = (Get-Date).AddSeconds($WaitSeconds)
while ((Get-Date) -lt $deadline -and -not $publicUrl) {
    Start-Sleep -Milliseconds 700

    if (Test-Path $tunnelLog) {
        $content = Get-Content $tunnelLog -Raw -ErrorAction SilentlyContinue
        if ($content -match "https://[a-zA-Z0-9.-]+") {
            $publicUrl = $Matches[0]
            break
        }
    }

    if ($tunnelProc.HasExited) {
        Write-Host "Tunnel process exited early. Check log: $tunnelLog"
        Get-Content $tunnelLog -Tail 120
        Stop-Process -Id $mcpProc.Id -ErrorAction SilentlyContinue
        exit 1
    }
}

$state = [ordered]@{
    startedAt = (Get-Date).ToString("o")
    host = $HostAddress
    port = $Port
    mcpPid = $mcpProc.Id
    tunnelPid = $tunnelProc.Id
    mcpLog = $mcpLog
    mcpErrLog = $mcpErrLog
    tunnelLog = $tunnelLog
    tunnelErrLog = $tunnelErrLog
    publicUrl = $publicUrl
}
$state | ConvertTo-Json | Set-Content -Path $stateFile -Encoding UTF8

Write-Host ""
Write-Host "MCP process PID: $($mcpProc.Id)"
Write-Host "Tunnel process PID: $($tunnelProc.Id)"
Write-Host "MCP log: $mcpLog"
Write-Host "MCP err log: $mcpErrLog"
Write-Host "Tunnel log: $tunnelLog"
Write-Host "Tunnel err log: $tunnelErrLog"
Write-Host ""

if ($publicUrl) {
    Write-Host "Use this URL in Claude Custom Connector:"
    Write-Host "$publicUrl/mcp/"
} else {
    Write-Host "Tunnel URL not detected in time."
    Write-Host "Open tunnel log and copy the https URL manually:"
    Write-Host $tunnelLog
}

Write-Host ""
Write-Host "Stop both processes with:"
Write-Host "Stop-Process -Id $($mcpProc.Id),$($tunnelProc.Id)"
