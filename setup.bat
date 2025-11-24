@echo off
echo ========================================
echo    ToDo List App - Setup Script
echo ========================================
echo.

echo [1/5] Instalando dependencias de Node.js...
call npm install
if %errorlevel% neq 0 (
    echo Error: Fallo en la instalacion de dependencias
    pause
    exit /b 1
)

echo.
echo [2/5] Verificando instalacion de Ionic CLI...
call ionic --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Instalando Ionic CLI globalmente...
    call npm install -g @ionic/cli
)

echo.
echo [3/5] Verificando instalacion de Capacitor CLI...
call cap --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Instalando Capacitor CLI globalmente...
    call npm install -g @capacitor/cli
)

echo.
echo [4/5] Compilando aplicacion...
call ionic build
if %errorlevel% neq 0 (
    echo Error: Fallo en la compilacion
    pause
    exit /b 1
)

echo.
echo [5/5] Configuracion completada!
echo.
echo ========================================
echo    Comandos disponibles:
echo ========================================
echo ionic serve          - Ejecutar en navegador
echo ionic cap add android - Agregar plataforma Android
echo ionic cap add ios     - Agregar plataforma iOS
echo ionic cap run android - Ejecutar en Android
echo ionic cap run ios     - Ejecutar en iOS
echo ========================================
echo.
pause