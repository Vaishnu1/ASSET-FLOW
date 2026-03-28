$TargetDir = "C:\Users\Lakshitha\Downloads\SAMSUI\sams-backend\src\main\java\com\sams\entity"
$Entities = Get-ChildItem -Path $TargetDir -Filter "*.java" -Recurse -File

$Count = 0
foreach ($file in $Entities) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Regex to remove schema="master" or schema = "master" from @Table annotations
    # Examples:
    # @Table(name = "x", schema = "master") -> @Table(name = "x")
    # @Table(name="x",schema="master") -> @Table(name="x")
    
    $newContent = $content -creplace ',\s*schema\s*=\s*"master"', ''
    $newContent = $newContent -creplace 'schema\s*=\s*"master"\s*,', ''
    
    if ($content -cne $newContent) {
        [IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        $Count++
    }
}

Write-Host "Replaced schema definition in $Count files."
