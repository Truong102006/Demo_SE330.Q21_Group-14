$ErrorActionPreference = "Stop"
Remove-Item Env:DEBUG -ErrorAction SilentlyContinue

$maven = Get-Command mvn -ErrorAction SilentlyContinue

if ($maven) {
    & $maven.Source spring-boot:run
    exit $LASTEXITCODE
}

$mavenFromWrapperCache = Get-ChildItem `
    -Path "$env:USERPROFILE\.m2\wrapper\dists\apache-maven-*\*\bin\mvn.cmd" `
    -ErrorAction SilentlyContinue |
    Sort-Object FullName -Descending |
    Select-Object -First 1

if (-not $mavenFromWrapperCache) {
    Write-Host "Khong tim thay Maven. Hay cai Maven hoac tao Maven Wrapper bang lenh: mvn -N wrapper:wrapper"
    exit 1
}

& $mavenFromWrapperCache.FullName spring-boot:run
exit $LASTEXITCODE
