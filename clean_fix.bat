@echo off
rmdir /s /q .next
del /f /q tsconfig.tsbuildinfo
ren app\catalog catalog_temp
ren app\catalog_temp catalog
echo Cleaned
