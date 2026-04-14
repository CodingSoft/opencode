# 📄 Documentación de Personalización de Marca Blanca

---

## 1. Introducción

### Propósito

Esta documentación tiene como objetivo guiar a desarrolladores y administradores en la personalización de la aplicación **OpenCode** para adaptarla a diferentes marcas. El sistema de marca blanca permite cambiar el branding, URLs, configuración visual y técnica sin modificar el código fuente.

### Audiencia

- **Desarrolladores**: Personas encargadas de implementar y mantener la personalización.
- **Administradores**: Personas encargadas de configurar la aplicación para una marca específica.

### Requisitos Previos

- Conocimientos básicos de JSON y YAML.
- Familiaridad con variables de entorno.
- Acceso al repositorio y entorno de desarrollo.

---

## 2. Guía de Configuración Básica

### Personalización del Nombre y Descripción

1. Edita el archivo `brand.config.json` en la raíz del proyecto.
2. Modifica los campos `brand.name` y `brand.description`:
   ```json
   {
     "brand": {
       "name": "OpenCoding",
       "description": "Plataforma de desarrollo impulsada por IA para CodingSoft"
     }
   }
   ```

### Cambio de Logos y Favicon

1. Reemplaza los archivos de logo en la carpeta `/assets`:
   - `logo-light.svg`
   - `logo-dark.svg`
   - `favicon.ico`
2. Actualiza las rutas en `brand.config.json`:
   ```json
   "visual": {
     "logo": {
       "light": "/assets/open-coding-logo-light.svg",
       "dark": "/assets/open-coding-logo-dark.svg"
     },
     "favicon": "/assets/open-coding-favicon.ico"
   }
   ```

### Configuración de Colores y Temas

1. Define los colores primario y secundario en `brand.config.json`:
   ```json
   "visual": {
     "primaryColor": "#4F46E5",
     "secondaryColor": "#10B981",
     "theme": "dark"
   }
   ```

### Actualización de URLs

1. Modifica las URLs en `brand.config.json`:
   ```json
   "urls": {
     "website": "https://opencoding.ai",
     "api": "https://api.opencoding.ai",
     "docs": "https://docs.opencoding.ai",
     "repo": "https://github.com/codingsoft/opencoding"
   }
   ```

---

## 3. Guía Avanzada

### Uso de Variables de Entorno

Las variables de entorno sobrescriben la configuración del archivo. Usa el prefijo `BRAND_`:

```env
# .env
BRAND_NAME=OpenCoding
BRAND_PRIMARY_COLOR=#FF0000
BRAND_API_KEY=tu_api_key_aqui
```

### Extensión de la Configuración con Plugins

1. Crea un archivo de configuración para el plugin en `/plugins`:
   ```json
   {
     "name": "custom-plugin",
     "config": {
       "apiUrl": "https://custom-plugin.api"
     }
   }
   ```
2. Registra el plugin en `brand.config.json`:
   ```json
   "plugins": {
     "custom-plugin": {
       "enabled": true,
       "config": {
         "apiUrl": "https://custom-plugin.api"
       }
     }
   }
   ```

### Personalización de Componentes Específicos

Para personalizar componentes específicos, usa el sistema de temas:

```tsx
// src/components/Header.tsx
import { brandConfig } from "@opencode/config"

export const Header = () => {
  const logo = brandConfig.getConfig().brand.visual.logo.light
  const brandName = brandConfig.getBrandName()

  return (
    <header style={{ backgroundColor: brandConfig.getPrimaryColor() }}>
      <img src={logo} alt={`${brandName} Logo`} />
      <h1>{brandName}</h1>
    </header>
  )
}
```

### Integración con Sistemas Externos

Para integrar con sistemas externos, configura las URLs y tokens en `brand.config.json`:

```json
"technical": {
  "apiKey": "tu_api_key",
  "externalServices": {
    "auth": {
      "url": "https://auth.externo.com",
      "clientId": "tu_client_id"
    }
  }
}
```

---

## 4. Referencia Técnica

### Estructura del Archivo `brand.config.json`

```json
{
  "$schema": "https://raw.githubusercontent.com/codingsoft/opencoding/main/schemas/brand-config.schema.json",
  "version": "1.0.0",
  "brand": {
    "name": {
      "type": "string",
      "description": "Nombre de la marca",
      "required": true,
      "default": "OpenCode"
    },
    "description": {
      "type": "string",
      "description": "Descripción de la marca",
      "required": false,
      "default": "AI-powered development tool"
    },
    "company": {
      "type": "object",
      "description": "Información de la compañía",
      "properties": {
        "name": {
          "type": "string",
          "description": "Nombre de la compañía",
          "required": true
        },
        "website": {
          "type": "string",
          "format": "uri",
          "description": "URL del sitio web de la compañía",
          "required": true
        },
        "supportEmail": {
          "type": "string",
          "format": "email",
          "description": "Correo de soporte",
          "required": true
        }
      }
    },
    "urls": {
      "type": "object",
      "description": "URLs personalizadas para la marca",
      "properties": {
        "website": {
          "type": "string",
          "format": "uri",
          "description": "URL del sitio web de la marca",
          "required": true
        },
        "api": {
          "type": "string",
          "format": "uri",
          "description": "URL de la API",
          "required": true
        },
        "docs": {
          "type": "string",
          "format": "uri",
          "description": "URL de la documentación",
          "required": false
        },
        "repo": {
          "type": "string",
          "format": "uri",
          "description": "URL del repositorio",
          "required": false
        }
      }
    },
    "visual": {
      "type": "object",
      "description": "Configuración visual de la marca",
      "properties": {
        "primaryColor": {
          "type": "string",
          "format": "hex-color",
          "description": "Color primario de la marca",
          "required": true,
          "default": "#4F46E5"
        },
        "secondaryColor": {
          "type": "string",
          "format": "hex-color",
          "description": "Color secundario de la marca",
          "required": false,
          "default": "#10B981"
        },
        "logo": {
          "type": "object",
          "description": "Rutas de los logos",
          "properties": {
            "light": {
              "type": "string",
              "description": "Ruta del logo para modo claro",
              "required": true
            },
            "dark": {
              "type": "string",
              "description": "Ruta del logo para modo oscuro",
              "required": true
            }
          }
        },
        "favicon": {
          "type": "string",
          "description": "Ruta del favicon",
          "required": true
        },
        "theme": {
          "type": "string",
          "enum": ["light", "dark", "system"],
          "description": "Tema predeterminado",
          "required": false,
          "default": "dark"
        }
      }
    },
    "technical": {
      "type": "object",
      "description": "Configuración técnica",
      "properties": {
        "apiKey": {
          "type": ["string", "null"],
          "description": "Clave de API para servicios externos",
          "required": false,
          "sensitive": true
        },
        "consoleToken": {
          "type": ["string", "null"],
          "description": "Token para la consola de administración",
          "required": false,
          "sensitive": true
        },
        "disableDefaultPlugins": {
          "type": "boolean",
          "description": "Deshabilitar plugins por defecto",
          "required": false,
          "default": false
        }
      }
    }
  }
}
```

### Esquema de Validación

El esquema de validación está definido en `schemas/brand-config.schema.json`. Este esquema asegura que la configuración cumpla con los requisitos estructurales y de formato.

### Variables de Entorno Soportadas

| Variable              | Descripción                             | Ejemplo                     |
| --------------------- | --------------------------------------- | --------------------------- |
| `BRAND_NAME`          | Nombre de la marca                      | `OpenCoding`                |
| `BRAND_PRIMARY_COLOR` | Color primario en formato HEX           | `#4F46E5`                   |
| `BRAND_API_KEY`       | Clave de API para servicios externos    | `tu_api_key_aqui`           |
| `BRAND_API_URL`       | URL de la API                           | `https://api.opencoding.ai` |
| `BRAND_THEME`         | Tema predeterminado (light/dark/system) | `dark`                      |

### Módulo de Configuración (`BrandConfigManager`)

El módulo `BrandConfigManager` es un Singleton que carga y valida la configuración. Proporciona métodos para acceder a la configuración en toda la aplicación:

```typescript
import { brandConfig } from "@opencode/config"

// Obtener nombre de la marca
const brandName = brandConfig.getBrandName()

// Obtener color primario
const primaryColor = brandConfig.getPrimaryColor()
```

---

## 5. Ejemplos Prácticos

### Configuración para una Nueva Marca

1. Crea un archivo `brand.config.json` con la configuración de la nueva marca:

   ```json
   {
     "brand": {
       "name": "DevAI",
       "description": "Plataforma de IA para desarrolladores",
       "company": {
         "name": "DevAI Inc.",
         "website": "https://devai.com",
         "supportEmail": "support@devai.com"
       },
       "urls": {
         "website": "https://devai.com",
         "api": "https://api.devai.com"
       },
       "visual": {
         "primaryColor": "#FF5733",
         "logo": {
           "light": "/assets/devai-logo-light.svg",
           "dark": "/assets/devai-logo-dark.svg"
         },
         "favicon": "/assets/devai-favicon.ico"
       }
     }
   }
   ```

2. Reinicia la aplicación para aplicar los cambios.

### Personalización de Temas

Para cambiar el tema predeterminado, modifica el campo `theme` en `brand.config.json`:

```json
"visual": {
  "theme": "light"
}
```

### Integración con un Sistema de Autenticación Externo

1. Configura el servicio de autenticación en `brand.config.json`:

   ```json
   "technical": {
     "externalServices": {
       "auth": {
         "url": "https://auth.devai.com",
         "clientId": "devai_client_id"
       }
     }
   }
   ```

2. Usa la configuración en el código:
   ```typescript
   const authConfig = brandConfig.getConfig().brand.technical.externalServices.auth
   ```

---

## 6. Solución de Problemas

### Errores Comunes y sus Soluciones

| Error                                    | Causa                                                    | Solución                                                |
| ---------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------- |
| `Error: Configuración inválida`          | El archivo `brand.config.json` no cumple con el esquema. | Valida el archivo con el esquema y corrige los errores. |
| `Error: Variable de entorno no definida` | Falta una variable de entorno obligatoria.               | Define la variable en el archivo `.env`.                |
| `Error: Ruta de logo no encontrada`      | La ruta del logo en la configuración es incorrecta.      | Verifica que el archivo exista en la ruta especificada. |
| `Error: Color inválido`                  | El formato del color no es válido.                       | Usa un color en formato HEX válido (ej: `#4F46E5`).     |

### Validación de la Configuración

Para validar manualmente la configuración, ejecuta:

```bash
bun run validate:brand-config
```

### Depuración de Problemas de Carga

1. Verifica que el archivo `brand.config.json` exista y sea válido.
2. Asegúrate de que las variables de entorno estén definidas en `.env`.
3. Revisa los logs de la aplicación para errores específicos.

---

## 7. Apéndices

### Glosario de Términos

| Término                  | Definición                                                                     |
| ------------------------ | ------------------------------------------------------------------------------ |
| **Marca Blanca**         | Personalización de una aplicación para que parezca propia de otra marca.       |
| **Variables de Entorno** | Variables definidas fuera de la aplicación, usadas para configuración.         |
| **Singleton**            | Patrón de diseño que restringe la instanciación de una clase a un solo objeto. |
| **Esquema JSON**         | Definición estructurada para validar datos JSON.                               |

### Recursos Adicionales

- [Documentación de JSON Schema](https://json-schema.org/)
- [Guía de Variables de Entorno en Node.js](https://nodejs.org/api/process.html#process_process_env)
- [Patrón Singleton en TypeScript](https://refactoring.guru/design-patterns/singleton/typescript/example)

### Historial de Cambios

| Versión | Fecha      | Cambios                                              |
| ------- | ---------- | ---------------------------------------------------- |
| 1.0.0   | 2026-04-14 | Versión inicial de la documentación de marca blanca. |

---

## 📌 Notas Finales

- **Actualizaciones**: Mantén esta documentación actualizada con los cambios en el sistema de configuración.
- **Soporte**: Para problemas no cubiertos, contacta al equipo de desarrollo.
- **Contribuciones**: Las contribuciones a esta documentación son bienvenidas.

---

© 2026 CodingSoft. Todos los derechos reservados.
