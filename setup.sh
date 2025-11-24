#!/bin/bash

echo "========================================"
echo "    ToDo List App - Setup Script"
echo "========================================"
echo

echo "[1/5] Instalando dependencias de Node.js..."
npm install
if [ $? -ne 0 ]; then
    echo "Error: Fallo en la instalación de dependencias"
    exit 1
fi

echo
echo "[2/5] Verificando instalación de Ionic CLI..."
if ! command -v ionic &> /dev/null; then
    echo "Instalando Ionic CLI globalmente..."
    npm install -g @ionic/cli
fi

echo
echo "[3/5] Verificando instalación de Capacitor CLI..."
if ! command -v cap &> /dev/null; then
    echo "Instalando Capacitor CLI globalmente..."
    npm install -g @capacitor/cli
fi

echo
echo "[4/5] Compilando aplicación..."
ionic build
if [ $? -ne 0 ]; then
    echo "Error: Fallo en la compilación"
    exit 1
fi

echo
echo "[5/5] Configuración completada!"
echo
echo "========================================"
echo "    Comandos disponibles:"
echo "========================================"
echo "ionic serve          - Ejecutar en navegador"
echo "ionic cap add android - Agregar plataforma Android"
echo "ionic cap add ios     - Agregar plataforma iOS"
echo "ionic cap run android - Ejecutar en Android"
echo "ionic cap run ios     - Ejecutar en iOS"
echo "========================================"
echo