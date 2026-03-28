$path = "c:\Users\Lakshitha\Downloads\SAMSUI\sams-backend\src\main\java\com\sams\entity"
$Count = 0

Get-ChildItem -Path $path -Filter "*.java" -Recurse | ForEach-Object {
    $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        $text = $utf8NoBom.GetString($bytes, 3, $bytes.Length - 3)
        [System.IO.File]::WriteAllText($_.FullName, $text, $utf8NoBom)
        $Count++
    }
}
Write-Host "Removed invisible BOM character from $Count files."
