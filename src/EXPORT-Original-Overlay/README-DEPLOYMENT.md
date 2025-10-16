# 🎣 FisherMan Slot - Original + Overlay
## Paquete Listo para Producción

---

## 📦 Contenido del Paquete

Este paquete incluye el juego FisherMan Slot original con:
- ✅ Overlay visual para Balance, TotalBet y TotalWin
- ✅ Popup de ganador en el 2do spin
- ✅ Botón "CLAIM BONUS" con redirección configurable
- ✅ Todos los assets originales del juego

---

## ⚙️ Configuración Antes de Subir

### 1. Editar URL de Redirección

Abre `index.html` y busca la línea **52-89** donde está `PRELANDER_CONFIG`:

```javascript
var PRELANDER_CONFIG = {
    // 🔥 EDITA ESTA URL CON TU PÁGINA DE OFERTA
    redirectUrl: 'https://example.com/your-offer-page',
    
    // Número de spins antes de mostrar popup
    spinsToWin: 2,
    
    // Delay en milisegundos después del spin ganador
    delayAfterSpin: 3000,
    
    // Textos del popup
    modalTitle: '🎉 WINNER! 🎉',
    modalMessage: 'CONGRATULATIONS!',
    prizeAmount: '500',
    prizeCurrency: '$',
    buttonText: 'CLAIM BONUS',
    
    // Colores del modal
    modalBgColor: 'linear-gradient(145deg,#1a4c8c,#2563eb)',
    borderColor: '#ffd700',
    prizeColor: '#00ff00',
    buttonColor: 'linear-gradient(145deg,#27ae60,#229954)',
    
    // Valores del juego (overlay visual)
    gameValues: {
        balance: '1000',      // Balance inicial
        totalBet: '20',       // Apuesta por spin
        totalWin: '0',        // Ganancia total
        showOverlay: true     // true = mostrar valores personalizados
    }
};
```

### 2. Personalizar Valores del Overlay

Para cambiar los valores que se muestran en el juego:

```javascript
gameValues: {
    balance: '50000',     // Balance alto para credibilidad
    totalBet: '100',      // Apuesta visible
    totalWin: '2500',     // Ganancia acumulada
    showOverlay: true     // Activar overlay
}
```

Para desactivar el overlay (mostrar valores originales):

```javascript
gameValues: {
    showOverlay: false
}
```

### 3. Personalizar Textos del Popup

```javascript
modalTitle: '💰 JACKPOT! 💰',
modalMessage: '¡FELICITACIONES!',
prizeAmount: '1000',
prizeCurrency: '€',
buttonText: 'RECLAMAR PREMIO',
```

### 4. Cambiar Número de Spins

```javascript
spinsToWin: 3,  // Mostrar popup en el 3er spin
```

---

## 🚀 Deployment a Producción

### Opción 1: Subir vía FTP/SFTP

1. Conecta a tu servidor vía FTP/SFTP
2. Sube **toda la carpeta** manteniendo la estructura:

```
/tu-dominio.com/
├── index.html
├── style.css
├── data.json
├── appmanifest.json
├── offline.json
├── sw.js
├── workermain.js
├── scripts/
├── images/
├── icons/
└── media/
```

### Opción 2: Subir vía SSH/SCP

```bash
# Desde tu terminal local
scp -r EXPORT-Original-Overlay/* usuario@tu-servidor.com:/var/www/html/fisherman-slot/
```

### Opción 3: Comprimir y Subir

```bash
# Crear archivo ZIP
zip -r fisherman-slot-overlay.zip EXPORT-Original-Overlay/

# Subir el ZIP a tu servidor y descomprimir allí
```

---

## 🌐 Configuración del Servidor

### Headers CORS (Importante)

Asegúrate de que tu servidor tenga configurados los headers CORS correctos.

#### Para Apache (.htaccess)

Crea o edita el archivo `.htaccess`:

```apache
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type"
    Header set Cache-Control "no-store, no-cache, must-revalidate"
</IfModule>
```

#### Para Nginx

Edita tu configuración de Nginx:

```nginx
location / {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
    add_header Access-Control-Allow-Headers "Content-Type";
    add_header Cache-Control "no-store, no-cache, must-revalidate";
}
```

---

## ✅ Checklist de Deployment

Antes de subir a producción, verifica:

- [ ] **URL de redirección configurada** en `PRELANDER_CONFIG.redirectUrl`
- [ ] **Valores del overlay personalizados** (balance, totalBet, totalWin)
- [ ] **Textos del popup personalizados** (título, mensaje, premio)
- [ ] **Número de spins configurado** (`spinsToWin`)
- [ ] **Toda la estructura de carpetas intacta** (scripts/, images/, icons/, media/)
- [ ] **Headers CORS configurados** en el servidor
- [ ] **Probado en navegador desktop**
- [ ] **Probado en móvil**
- [ ] **URL de redirección funciona correctamente**

---

## 🧪 Testing en Producción

Después de subir, prueba:

1. **Carga del juego**: Abre `https://tu-dominio.com/` y verifica que el juego cargue
2. **Overlay visible**: Espera 4 segundos y verifica que aparezcan los valores personalizados
3. **Primer spin**: Haz click en SPIN (debe contar como spin #1)
4. **Segundo spin**: Haz click en SPIN nuevamente (debe contar como spin #2)
5. **Popup aparece**: Después de 3 segundos debe aparecer el popup "WINNER!"
6. **Redirección funciona**: Click en "CLAIM BONUS" debe redirigir a tu URL

---

## 🐛 Solución de Problemas

### El juego no carga

- ✅ Verifica que todos los archivos se subieron correctamente
- ✅ Verifica que la estructura de carpetas esté intacta
- ✅ Abre la consola del navegador (F12) y busca errores

### El overlay no aparece

- ✅ Verifica que `showOverlay: true` en la configuración
- ✅ Espera al menos 4 segundos después de cargar el juego
- ✅ Abre la consola (F12) y busca logs:
  ```
  Creando overlay de valores del juego...
  ✅ Overlay de valores creado
  ```

### El popup no aparece

- ✅ Verifica que `spinsToWin` esté configurado (ej: 2)
- ✅ Haz el número correcto de spins
- ✅ Abre la consola (F12) y busca logs:
  ```
  >>> CLICK #1
  >>> CLICK #2
  >>> SEGUNDO CLICK DETECTADO!
  >>> MOSTRANDO MODAL WINNER
  ```

### La redirección no funciona

- ✅ Verifica que `redirectUrl` tenga una URL válida
- ✅ Incluye `https://` en la URL
- ✅ Prueba la URL directamente en el navegador

### Error CORS

- ✅ Configura los headers CORS en tu servidor (ver sección anterior)
- ✅ Verifica que el servidor permita peticiones desde el dominio

---

## 📊 Estructura de Archivos

```
EXPORT-Original-Overlay/
├── index.html                 # Archivo principal (EDITA ESTE)
├── style.css                  # Estilos del juego
├── data.json                  # Datos del juego compilado
├── appmanifest.json          # Manifest de la app
├── offline.json              # Configuración offline
├── sw.js                     # Service Worker
├── workermain.js             # Worker principal
├── scripts/                  # Scripts del juego
│   ├── c3runtime.js
│   ├── main.js
│   ├── offlineclient.js
│   ├── register-sw.js
│   └── supportcheck.js
├── images/                   # Imágenes del juego (~10 MB)
│   ├── lines-sheet0.png
│   ├── posidon-sheet0.png
│   ├── shared-0-sheet0.png
│   └── ...
├── icons/                    # Iconos de la app
│   ├── icon-128.png
│   ├── icon-256.png
│   └── icon-512.png
└── media/                    # Audio del juego
    ├── bgm.webm
    ├── bgm.m4a
    └── ...
```

**Tamaño total**: ~10-12 MB

---

## 🎯 Ejemplos de Configuración

### Para Prelander de Casino

```javascript
var PRELANDER_CONFIG = {
    redirectUrl: 'https://casino-offer.com/signup?aff=123',
    spinsToWin: 2,
    delayAfterSpin: 2000,
    modalTitle: '🎰 JACKPOT! 🎰',
    modalMessage: '¡GANASTE!',
    prizeAmount: '1000',
    prizeCurrency: '$',
    buttonText: 'RECLAMAR AHORA',
    gameValues: {
        balance: '50000',
        totalBet: '100',
        totalWin: '5000',
        showOverlay: true
    }
};
```

### Para Demo sin Redirección

```javascript
var PRELANDER_CONFIG = {
    redirectUrl: '#',  // Sin redirección
    spinsToWin: 2,
    delayAfterSpin: 3000,
    modalTitle: '🎉 WINNER! 🎉',
    modalMessage: 'DEMO MODE',
    prizeAmount: '500',
    prizeCurrency: '$',
    buttonText: 'CLOSE',
    gameValues: {
        balance: '1000',
        totalBet: '20',
        totalWin: '0',
        showOverlay: true
    }
};
```

### Para Mostrar Valores Originales

```javascript
var PRELANDER_CONFIG = {
    redirectUrl: 'https://tu-oferta.com',
    spinsToWin: 2,
    delayAfterSpin: 3000,
    modalTitle: '🎉 WINNER! 🎉',
    modalMessage: 'CONGRATULATIONS!',
    prizeAmount: '500',
    prizeCurrency: '$',
    buttonText: 'CLAIM BONUS',
    gameValues: {
        showOverlay: false  // Desactivar overlay
    }
};
```

---

## 📱 Responsive

El juego es completamente responsive y funciona en:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android tablets)
- ✅ Móvil (iPhone, Android phones)

---

## 🔒 Seguridad

- El juego usa JavaScript vanilla (sin dependencias externas)
- No hace peticiones a servidores externos
- Todos los assets están incluidos localmente
- La URL de redirección es configurable y segura

---

## 📞 Soporte

Para problemas o dudas:
1. Lee este README completo
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que la configuración esté correcta en `index.html`

---

## 📄 Licencia

Este juego está basado en FisherMan Slot de Construct 3. Úsalo responsablemente para campañas de marketing y prelanding.

---

## 🎉 ¡Listo para Producción!

Este paquete está **100% listo** para subir a tu servidor. Solo necesitas:

1. ✅ Editar `PRELANDER_CONFIG` en `index.html`
2. ✅ Subir todos los archivos a tu servidor
3. ✅ Configurar headers CORS
4. ✅ Probar en navegador y móvil

**¡Buena suerte con tu campaña! 🍀**
