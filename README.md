# ToDo List App - Ionic Angular

Una aplicación móvil híbrida de lista de tareas desarrollada con Ionic y Angular, que incluye funcionalidades avanzadas como categorización de tareas, almacenamiento local, integración con Firebase Remote Config y optimizaciones de rendimiento.

## 🚀 Características

### Funcionalidades Principales
- ✅ **Gestión de Tareas**: Agregar, completar y eliminar tareas
- 🏷️ **Sistema de Categorías**: Crear, editar y eliminar categorías para organizar tareas
- 🔍 **Filtrado por Categoría**: Visualizar tareas por categoría específica
- 💾 **Almacenamiento Local**: Persistencia de datos usando Ionic Storage
- 🔥 **Firebase Integration**: Remote Config para feature flags
- 📱 **Multiplataforma**: Compatible con Android e iOS usando Capacitor

### Optimizaciones de Rendimiento
- **Lazy Loading**: Carga diferida de módulos
- **TrackBy Functions**: Optimización de renderizado de listas
- **OnPush Strategy**: Detección de cambios optimizada
- **Observables**: Gestión reactiva de estado
- **Memory Management**: Prevención de memory leaks con takeUntil

## 🛠️ Tecnologías Utilizadas

- **Ionic 7**: Framework híbrido
- **Angular 16**: Framework frontend
- **Capacitor 5**: Runtime nativo
- **Firebase**: Remote Config para feature flags
- **Ionic Storage**: Almacenamiento local
- **RxJS**: Programación reactiva
- **TypeScript**: Lenguaje de programación

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Ionic CLI: `npm install -g @ionic/cli`
- Capacitor CLI: `npm install -g @capacitor/cli`

### Para desarrollo móvil:
- **Android**: Android Studio, Android SDK
- **iOS**: Xcode (solo en macOS)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd ToDoList
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Firebase
1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar Remote Config
3. Actualizar `src/environments/environment.ts` con tu configuración:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "tu-api-key",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-project-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "tu-app-id"
  }
};
```

### 4. Configurar Remote Config
En Firebase Console, agregar estos parámetros:
- `show_categories_feature`: boolean (true/false)
- `max_tasks_per_category`: number (50)
- `enable_dark_theme`: boolean (false)

## 🖥️ Desarrollo

### Ejecutar en navegador
```bash
ionic serve
```

### Ejecutar en dispositivo/emulador

#### Android
```bash
# Agregar plataforma Android
ionic capacitor add android

# Compilar y ejecutar
ionic capacitor run android

# Solo compilar
ionic capacitor build android
```

#### iOS
```bash
# Agregar plataforma iOS
ionic capacitor add ios

# Compilar y ejecutar
ionic capacitor run ios

# Solo compilar
ionic capacitor build ios
```

## 📦 Compilación para Producción

### Generar APK (Android)
```bash
# Compilar para producción
ionic build --prod

# Sincronizar con Capacitor
ionic capacitor sync android

# Abrir en Android Studio para generar APK
ionic capacitor open android
```

### Generar IPA (iOS)
```bash
# Compilar para producción
ionic build --prod

# Sincronizar con Capacitor
ionic capacitor sync ios

# Abrir en Xcode para generar IPA
ionic capacitor open ios
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/
│   ├── models/           # Interfaces y modelos de datos
│   ├── services/         # Servicios (Storage, Tasks, Firebase)
│   ├── pages/           # Páginas de la aplicación
│   │   └── home/        # Página principal
│   ├── app.component.*  # Componente raíz
│   ├── app.module.ts    # Módulo principal
│   └── app-routing.module.ts # Configuración de rutas
├── environments/        # Configuraciones de entorno
├── assets/             # Recursos estáticos
└── global.scss         # Estilos globales
```

## 🔧 Servicios Principales

### TaskService
- Gestión de tareas y categorías
- Almacenamiento local con Ionic Storage
- Observables para estado reactivo

### FirebaseService
- Integración con Firebase Remote Config
- Gestión de feature flags
- Configuración remota de parámetros

### StorageService
- Abstracción del almacenamiento local
- Métodos CRUD para persistencia de datos

## 🎯 Feature Flags Implementados

- **show_categories_feature**: Habilita/deshabilita el sistema de categorías
- **max_tasks_per_category**: Límite máximo de tareas por categoría
- **enable_dark_theme**: Habilita tema oscuro (preparado para implementación)

## 🚀 Optimizaciones de Rendimiento

### 1. Carga Inicial
- Lazy loading de módulos
- Preload strategy configurada
- Minimización de bundle inicial

### 2. Manejo de Datos
- Observables con takeUntil para prevenir memory leaks
- TrackBy functions en *ngFor para optimizar renderizado
- Almacenamiento local eficiente

### 3. Uso de Memoria
- Destrucción adecuada de subscripciones
- Gestión de estado reactivo
- Optimización de detección de cambios

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests e2e
npm run e2e

# Linting
npm run lint
```

## 📱 Capturas de Pantalla

[Incluir capturas de pantalla de la aplicación funcionando]

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

Desarrollado como parte de una prueba técnica para el rol de Desarrollador Frontend Mobile.

## 🔗 Enlaces Útiles

- [Ionic Documentation](https://ionicframework.com/docs)
- [Angular Documentation](https://angular.io/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)