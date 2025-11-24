# Configuración Firebase Remote Config

## 1. Crear Proyecto Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crear nuevo proyecto: "todolist-demo"
3. Habilitar Remote Config

## 2. Configurar Remote Config
En Firebase Console > Remote Config, agregar estos parámetros:

### Parámetros Configurados:
```json
{
  "show_categories_feature": {
    "defaultValue": true,
    "description": "Habilita/deshabilita el sistema de categorías"
  },
  "max_tasks_per_category": {
    "defaultValue": 50,
    "description": "Límite máximo de tareas por categoría"
  },
  "enable_dark_theme": {
    "defaultValue": false,
    "description": "Habilita tema oscuro"
  }
}
```

## 3. Actualizar Configuración
Reemplazar en `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "TU_API_KEY",
    authDomain: "todolist-demo.firebaseapp.com",
    projectId: "todolist-demo",
    storageBucket: "todolist-demo.appspot.com",
    messagingSenderId: "123456789",
    appId: "TU_APP_ID"
  }
};
```

## 4. Demostración Feature Flag

### Estado Actual:
- **show_categories_feature = true**: Se muestran categorías, filtros y gestión
- **show_categories_feature = false**: Solo lista básica de tareas

### Cambiar en Firebase Console:
1. Remote Config > show_categories_feature
2. Cambiar valor a `false`
3. Publicar cambios
4. Recargar app para ver efecto

### Resultado:
- ✅ **true**: Muestra sección de categorías, filtros, botón crear categoría
- ❌ **false**: Oculta completamente el sistema de categorías