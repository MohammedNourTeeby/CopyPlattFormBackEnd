@echo off
:: 1. إيقاف Strapi بأمان
echo [1/3] Stopping Strapi...
taskkill /IM node.exe /F >nul 2>&1
timeout /t 5 /nobreak >nul

:: 2. إنشاء نسخة احتياطية
echo [2/3] Creating backup...
set BACKUP_DIR=backup_%date:~0,2%-%date:~3,2%-%date:~6,4%
mkdir "data\%BACKUP_DIR%"
copy "data\app.db" "data\%BACKUP_DIR%\app_%time:~0,2%-%time:~3,2%.db"

:: 3. إعادة تشغيل Strapi
echo [3/3] Restarting Strapi...
start cmd /c "npm run develop"
echo Backup completed: %BACKUP_DIR%