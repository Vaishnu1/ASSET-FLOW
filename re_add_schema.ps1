$TargetDir = "C:\Users\Lakshitha\Downloads\SAMSUI\sams-backend\src\main\java\com\sams\entity"
$Entities = Get-ChildItem -Path $TargetDir -Filter "*.java" -Recurse -File

$Count = 0

foreach ($file in $Entities) {
    try {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Check if this file has a @Table but does NOT have a schema defined
        if ($content -match "@Table" -and $content -notmatch "schema\s*=") {
            $basename = $file.BaseName
            $schema = "base" # default fallback
            
            # Categorize
            if ($basename -match "^(Asset|Model|AccCon|DeviceCode|PhysicalAudit|PreInw)") {
                $schema = "asset"
            }
            elseif ($basename -match "^(Item|Locator|Store|ModuleItems)") {
                $schema = "inventory"
            }
            elseif ($basename -match "^(Contract|Supplier|Purchase|BusinessPartner|Po|Pr|Rcv)") {
                $schema = "purchase"
            }
            
            $newContent = $content -creplace '(@Table\s*\([^)]*name\s*=\s*"[^"]+")', "`$1, schema = `"$schema`""
            
            if ($content -cne $newContent) {
                [IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
                Write-Host "Mapped $basename -> $schema"
                $Count++
            }
        }
    } catch {
        Write-Host "Failed to process $($file.Name): $($_.Exception.Message)"
    }
}

Write-Host "Total entities successfully mapped: $Count"
