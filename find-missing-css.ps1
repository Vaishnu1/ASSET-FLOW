$TargetDir = "C:\Users\Lakshitha\Downloads\SAMSUI\SAMSUI\src\app"
$MissingCssFiles = @()

Get-ChildItem -Path $TargetDir -Filter "*.ts" -Recurse -File | ForEach-Object {
    $lines = Get-Content $_.FullName
    foreach ($line in $lines) {
        if ($line -match "styleUrls\s*:\s*\[([^\]]+)\]") {
            $urls = $matches[1] -split ","
            foreach ($url in $urls) {
                # Extract the string inside quotes
                if ($url -match "['""]([^'""]+)['""]" ) {
                    $cssName = $matches[1]
                    $dir = Split-Path $_.FullName
                    $cssPath = Join-Path $dir $cssName
                    try {
                        $cssPath = [System.IO.Path]::GetFullPath($cssPath)
                        if (-Not (Test-Path $cssPath)) {
                            $MissingCssFiles += [PSCustomObject]@{
                                TSFile = $_.FullName
                                CssPath = $cssPath
                            }
                        }
                    } catch {}
                }
            }
        }
    }
}

$MissingCssFiles | ConvertTo-Json -Depth 10 | Out-File -Encoding ASCII "C:\Users\Lakshitha\Downloads\SAMSUI\missing-css.json"
Write-Host "Done scanning."
