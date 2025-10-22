# 🛡️ Screenshot Protection System

## Overview
Sistema de protección anti-screenshot implementado para proteger los templates sensibles del sistema.

## ⚠️ Disclaimer Importante
**No existe una forma 100% efectiva de prevenir screenshots o grabaciones de pantalla en navegadores web**, ya que estas son funciones del sistema operativo. Sin embargo, estas medidas dificultan significativamente la captura y permiten rastrear intentos.

## 🔒 Medidas de Protección Implementadas

### 1. **Detección de PrintScreen**
- Intercepta la tecla PrintScreen (Windows)
- Detecta Command+Shift+3/4/5 (Mac)
- Limpia el clipboard automáticamente
- Activa blur temporal en pantalla

```typescript
// Teclas detectadas:
- PrintScreen (Windows)
- Cmd+Shift+3/4/5 (macOS)
- Otras combinaciones comunes
```

### 2. **Bloqueo de Clic Derecho**
- Previene menú contextual
- Bloquea "Guardar imagen como..."
- Desactiva inspección rápida

### 3. **Watermark Dinámico**
- Marca de agua con email del usuario
- Timestamp de visualización
- Patrón repetido en toda la pantalla
- Difícil de remover en post-proceso

**Ejemplo de watermark:**
```
user@example.com • 2025-10-22
```

### 4. **Detección de DevTools**
- Monitorea dimensiones de ventana
- Detecta cuando se abren DevTools
- Aplica blur temporal

### 5. **CSS Anti-Selection**
- Desactiva selección de texto
- Previene drag de imágenes
- Bloquea selección con cursor

### 6. **Metadata de Rastreo**
- Email del usuario embebido invisiblemente
- Timestamp de acceso
- Datos ocultos en DOM

### 7. **Detección de Visibilidad**
- Detecta cambio de tab
- Detecta minimización de ventana
- Posible indicador de screen recording

## 📝 Cómo Funciona

### Watermark System
```typescript
// Se genera dinámicamente para cada usuario
const watermark = `${userEmail} • ${timestamp}`

// Se repite 20 veces en patrón
// Rotación: -30 grados
// Opacidad: 5-10% (sutil pero presente)
// Mix-blend-mode: difference (visible en cualquier fondo)
```

### Blur Protection
```typescript
// Al detectar intento de screenshot:
1. Blur temporal (20px)
2. Background negro semi-transparente
3. Duración: 2 segundos
4. Evita captura limpia
```

### Event Listeners
```typescript
- keydown/keyup: Detección de teclas
- contextmenu: Bloqueo de clic derecho
- visibilitychange: Detección de cambio de tab
- Intervalo 1s: Monitoreo de DevTools
```

## 🎯 Áreas Protegidas

### Template Editor
✅ Live Preview (iframe)
✅ Template Preview Mode
✅ Ambos modos Desktop y Mobile

### Componente
```tsx
<ScreenshotProtection showWatermark={true}>
  <iframe src={templateUrl} />
</ScreenshotProtection>
```

## 🚨 Limitaciones

### Lo que SÍ podemos hacer:
✅ Dificultar capturas
✅ Detectar intentos
✅ Identificar al usuario que captura
✅ Blur temporal en detección
✅ Marca de agua persistente

### Lo que NO podemos hacer:
❌ Bloquear screenshots del sistema operativo al 100%
❌ Prevenir cámaras físicas
❌ Bloquear software de captura profesional
❌ Prevenir modificación de código por usuarios avanzados

## 📊 Tracking y Logs

### Metadata Embebida
```html
<div 
  class="hidden"
  data-email="user@example.com"
  data-timestamp="1697983200000"
/>
```

### Próximas Mejoras (Opcional)
- [ ] Log en base de datos de intentos de screenshot
- [ ] Email alert al admin en detección
- [ ] Rate limiting de vistas de templates
- [ ] Timeout automático de sesión
- [ ] Canvas fingerprinting avanzado

## 🔐 Mejores Prácticas

### Para Máxima Protección:
1. **Legal:** Términos de servicio estrictos
2. **Tracking:** Log todos los accesos a templates
3. **Timeout:** Limitar tiempo de visualización
4. **Watermark:** Siempre activo, nunca desactivable
5. **Auditoría:** Revisar logs regularmente

### Complementos Recomendados:
- Sistema de permisos por usuario
- Tiempo límite de preview
- Registro de actividad sospechosa
- Blacklist automática tras múltiples intentos

## 💡 Uso

### Activar Protección
```tsx
import ScreenshotProtection from '@/components/ScreenshotProtection'

<ScreenshotProtection showWatermark={true}>
  {/* Contenido protegido */}
</ScreenshotProtection>
```

### Desactivar Watermark (no recomendado)
```tsx
<ScreenshotProtection showWatermark={false}>
  {/* Contenido con protección básica */}
</ScreenshotProtection>
```

## ⚖️ Aspectos Legales

### Términos de Servicio
Asegúrate de incluir:
- Prohibición explícita de captura
- Consecuencias de violación
- Derecho de rastreo y logging
- Clausula de watermark

### Ejemplo de Cláusula:
```
"Al acceder a los templates, el usuario acepta que:
- No capturará screenshots o grabaciones
- Toda visualización es monitoreada y registrada
- Se aplicarán marcas de agua identificatorias
- La violación resultará en suspensión inmediata"
```

## 🛠️ Mantenimiento

### Testing
```bash
# Test en diferentes navegadores
- Chrome: ✅
- Firefox: ✅
- Safari: ✅
- Edge: ✅

# Test en diferentes OS
- Windows: ✅
- macOS: ✅
- Linux: ⚠️ (limitado)
```

### Debugging
```typescript
// Ver watermark en consola
console.log(document.querySelector('[data-email]'))

// Ver listeners activos
getEventListeners(document)
```

## 📈 Efectividad

### Estimación de Protección:
- **Usuarios promedio:** 90% efectividad
- **Usuarios técnicos:** 40% efectividad
- **Expertos en seguridad:** 10% efectividad

### Objetivo Principal:
🎯 **Disuadir y rastrear**, no bloquear al 100%

## 🔄 Actualizaciones

### v1.0 (Actual)
- ✅ Detección de PrintScreen
- ✅ Watermark dinámico
- ✅ Blur temporal
- ✅ Bloqueo de clic derecho
- ✅ Detección de DevTools

### Roadmap Futuro
- [ ] Canvas fingerprinting
- [ ] IP tracking
- [ ] Session recording
- [ ] Machine learning de comportamiento sospechoso

---

**Última actualización:** 2025-10-22
**Versión:** 1.0.0
**Mantenedor:** Security Team
