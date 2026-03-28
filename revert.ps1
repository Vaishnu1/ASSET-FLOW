$Dirs = @("C:\Users\Lakshitha\Downloads\SAMSUI\SAMSUI\src", "C:\Users\Lakshitha\Downloads\SAMSUI\sams-backend")
$Extensions = @("*.ts", "*.html", "*.scss", "*.css", "*.xml", "*.json", "*.md", "*.java", "*.yaml", "*.yml", "*.properties")

Write-Host "Starting replace..."
Get-ChildItem -Path $Dirs -Include $Extensions -Recurse -File | ForEach-Object {
    if ($_.FullName -notmatch "\\node_modules\\" -and $_.FullName -notmatch "\\dist\\" -and $_.FullName -notmatch "\\target\\" -and $_.FullName -notmatch "\\\.git\\") {
        try {
            $content = Get-Content $_.FullName -Raw -Encoding UTF8
            $newContent = $content -creplace "AssetFlow", "AssetOptima" -creplace "assetFlow", "assetOptima" -creplace "asset-flow", "asset-optima" -creplace "Asset Flow", "Asset Optima"
            if ($content -cne $newContent) {
                [IO.File]::WriteAllText($_.FullName, $newContent, [System.Text.Encoding]::UTF8)
                Write-Host "Updated $($_.FullName)"
            }
        } catch {
            Write-Host "Failed to read/write $($_.FullName): $($_.Exception.Message)"
        }
    }
}

$ExtraFiles = @("C:\Users\Lakshitha\Downloads\SAMSUI\SAMSUI\package.json", "C:\Users\Lakshitha\Downloads\SAMSUI\SAMSUI\angular.json", "C:\Users\Lakshitha\Downloads\SAMSUI\sams-backend\pom.xml")
foreach ($file in $ExtraFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        $newContent = $content -creplace "AssetFlow", "AssetOptima" -creplace "assetFlow", "assetOptima" -creplace "asset-flow", "asset-optima" -creplace "Asset Flow", "Asset Optima"
        if ($content -cne $newContent) {
            [IO.File]::WriteAllText($file, $newContent, [System.Text.Encoding]::UTF8)
            Write-Host "Updated $file"
        }
    }
}
Write-Host "Replace done."
