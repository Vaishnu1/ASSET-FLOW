$jsonPath = "C:\Users\Lakshitha\Downloads\SAMSUI\missing-css.json"
$missingList = Get-Content -Raw $jsonPath | ConvertFrom-Json

$allCss = Get-ChildItem -Path "C:\Users\Lakshitha\Downloads\SAMSUI\SAMSUI\src\app\Components" -Include "*.css" -Recurse -File

$reused = @()
$created = @()

foreach ($missing in $missingList) {
    if (-Not (Test-Path $missing.CssPath)) {
        $basename = [System.IO.Path]::GetFileNameWithoutExtension($missing.CssPath)
        $basename = $basename.Replace(".component", "")
        
        $copied = $false
        
        $suffix = ""
        if ($basename -match "-(view|list|create|history|msg|pop-up|chart|info|details|print)$") {
            $suffix = $matches[1]
        }
        
        if ($suffix -ne "") {
            $candidate = $allCss | Where-Object { $_.Name -match "-$suffix\.component\.css$" -and $_.Length -gt 50 } | Select-Object -First 1
            if ($candidate) {
                Copy-Item -Path $candidate.FullName -Destination $missing.CssPath -Force
                $reused += "- $(Split-Path $missing.CssPath -Leaf) (Copied from $($candidate.Name))"
                $copied = $true
            }
        }
        
        if (-Not $copied) {
            New-Item -Path $missing.CssPath -ItemType File -Value "" -Force | Out-Null
            $created += "- $(Split-Path $missing.CssPath -Leaf)"
        }
    }
}

$report = "## Reused CSS Files`n`n"
if ($reused.Count -gt 0) {
    foreach ($r in $reused) { $report += "$r`n" }
} else {
    $report += "None`n"
}
$report += "`n## Created Empty CSS Files`n`n"
if ($created.Count -gt 0) {
    foreach ($c in $created) { $report += "$c`n" }
} else {
    $report += "None`n"
}

[IO.File]::WriteAllText("C:\Users\Lakshitha\Downloads\SAMSUI\css-report.md", $report)
Write-Host "Done resolving CSS files."
