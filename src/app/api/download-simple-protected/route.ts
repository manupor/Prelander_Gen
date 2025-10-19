import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import JSZip from 'jszip'
// @ts-ignore - javascript-obfuscator doesn't have perfect types
import JavaScriptObfuscator from 'javascript-obfuscator'

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    // Get site data from database
    const supabase = await createClient()
    const { data: site, error } = await supabase
      .from('sites')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    // Generate protected package
    const protectedPackage = await generateSimpleProtectedPage(site)

    // Create ZIP with JSZip
    const zip = new JSZip()
    
    // Add all files to ZIP
    Object.entries(protectedPackage).forEach(([filename, content]) => {
      zip.file(filename, content)
    })
    
    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({ 
      type: 'uint8array',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    })

    // Return ZIP
    return new NextResponse(Buffer.from(zipBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${site.brand_name.replace(/[^a-zA-Z0-9]/g, '_')}_protected.zip"`,
      },
    })

  } catch (error) {
    console.error('Simple protected package generation error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate package',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

async function generateSimpleProtectedPage(site: any) {
  // Prepare the landing page content
  const contentData = {
    brandName: site.brand_name,
    headline: site.headline,
    cta: site.cta,
    ctaUrl: site.cta_url,
    colors: {
      primary: site.primary_color,
      secondary: site.secondary_color,
      accent: site.accent_color
    },
    logo: site.logo_url,
    html: site.generated_html || generateDefaultHTML(site)
  }

  // Generate the secure JavaScript (without extreme restrictions)
  const secureJS = generateProtectedJS(contentData)

  // Obfuscate the JavaScript (moderate level for balance between security and compatibility)
  const obfuscatedJS = JavaScriptObfuscator.obfuscate(secureJS, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.5,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false,
    identifierNamesGenerator: 'hexadecimal',
    renameGlobals: false,
    selfDefending: false, // Disabled for better compatibility
    stringArray: true,
    rotateStringArray: true,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.3,
    debugProtection: false, // Disabled to allow local opening
    disableConsoleOutput: false // Disabled for better debugging
  }).getObfuscatedCode()

  // Generate self-contained HTML
  const htmlFile = generateSelfContainedHTML(obfuscatedJS, site.brand_name)

  // Generate simple CSS
  const css = generateSimpleCSS()

  return {
    'index.html': htmlFile,
    'style.css': css,
    'README.md': generateSimpleReadme(site.brand_name)
  }
}

function generateProtectedJS(content: any): string {
  // Encode content as base64 for simple obfuscation
  const encodedContent = Buffer.from(JSON.stringify(content)).toString('base64')

  return `
// Protected Content - Modified code may break functionality
(function() {
  'use strict';
  
  // Encoded content
  var data = '${encodedContent}';
  
  // Decode and inject content
  function init() {
    try {
      var decoded = atob(data);
      var content = JSON.parse(decoded);
      
      // Inject HTML content
      var container = document.getElementById('app-root');
      if (container) {
        container.innerHTML = content.html;
      }
      
      // Apply dynamic colors
      if (content.colors) {
        var root = document.documentElement;
        root.style.setProperty('--primary-color', content.colors.primary || '#4a90e2');
        root.style.setProperty('--secondary-color', content.colors.secondary || '#7b68ee');
        root.style.setProperty('--accent-color', content.colors.accent || '#ffd700');
      }
      
      // Hide loading screen
      var loader = document.getElementById('loading-screen');
      if (loader) {
        loader.style.display = 'none';
      }
      
      // Initialize tracking
      track(content);
      
    } catch (e) {
      console.error('Content initialization failed:', e);
      var container = document.getElementById('app-root');
      if (container) {
        container.innerHTML = '<div style="text-align:center;padding:50px;font-family:Arial;color:#666;">Unable to load content. Please refresh the page.</div>';
      }
    }
  }
  
  function track(content) {
    // Basic tracking setup
    var meta = document.createElement('meta');
    meta.name = 'generated-by';
    meta.content = 'Olavivo-PrelanderAI';
    document.head.appendChild(meta);
    
    // Add hidden identifier
    var tracker = document.createElement('div');
    tracker.style.display = 'none';
    tracker.setAttribute('data-source', btoa(content.brandName));
    document.body.appendChild(tracker);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Prevent easy content extraction
  document.addEventListener('contextmenu', function(e) {
    // Allow context menu but track it
    console.log('Content interaction detected');
  });
  
})();
  `.trim()
}

function generateSelfContainedHTML(obfuscatedJS: string, brandName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brandName}</title>
    <link rel="stylesheet" href="style.css">
    <style>
        /* Loading screen styles (inline for immediate display) */
        #loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        #app-root {
            min-height: 100vh;
        }
    </style>
</head>
<body>
    <!-- Loading screen -->
    <div id="loading-screen">
        <div style="text-align: center;">
            <div class="spinner"></div>
            <p style="margin-top: 20px;">Cargando...</p>
        </div>
    </div>
    
    <!-- Main content container -->
    <div id="app-root"></div>
    
    <!-- Protected script -->
    <script>
${obfuscatedJS}
    </script>
</body>
</html>`
}

function generateSimpleCSS(): string {
  return `
/* Landing Page Styles */
:root {
    --primary-color: #4a90e2;
    --secondary-color: #7b68ee;
    --accent-color: #ffd700;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f8f9fa;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.hero {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
    padding: 100px 0;
    text-align: center;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    font-weight: 700;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    opacity: 0.9;
}

.cta-button {
    display: inline-block;
    background: var(--accent-color);
    color: #333;
    padding: 15px 40px;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.features {
    padding: 80px 0;
    background: white;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    margin-top: 50px;
}

.feature {
    text-align: center;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.feature:hover {
    transform: translateY(-5px);
}

.feature h3 {
    color: var(--primary-color);
    margin-bottom: 15px;
}

/* Logo styles */
.logo-container {
    margin-bottom: 30px;
}

.logo-container img {
    max-height: 60px;
    max-width: 200px;
    object-fit: contain;
}

/* Responsive */
@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
    
    .hero {
        padding: 60px 0;
    }
    
    .features {
        padding: 60px 0;
    }
}

/* Prevent text selection on specific elements (subtle protection) */
::selection {
    background: rgba(74, 144, 226, 0.3);
}

::-moz-selection {
    background: rgba(74, 144, 226, 0.3);
}
`.trim()
}

function generateDefaultHTML(site: any): string {
  return `
<div class="hero">
    <div class="container">
        ${site.logo_url ? `
        <div class="logo-container">
            <img src="${site.logo_url}" alt="${site.brand_name} logo">
        </div>
        ` : ''}
        <h1>${site.headline || site.brand_name}</h1>
        <p>Transform your business with our innovative solutions</p>
        ${site.cta && site.cta_url ? `<a href="${site.cta_url}" class="cta-button">${site.cta}</a>` : ''}
    </div>
</div>

<div class="features">
    <div class="container">
        <h2 style="text-align: center; margin-bottom: 20px;">Why Choose ${site.brand_name}?</h2>
        <div class="features-grid">
            <div class="feature">
                <h3>🚀 Fast Results</h3>
                <p>Get up and running quickly with our streamlined process.</p>
            </div>
            <div class="feature">
                <h3>🔒 Secure & Reliable</h3>
                <p>Your data is protected with industry-standard security.</p>
            </div>
            <div class="feature">
                <h3>📈 Proven Success</h3>
                <p>Join thousands who have achieved their goals with us.</p>
            </div>
        </div>
    </div>
</div>
  `.trim()
}

function generateSimpleReadme(brandName: string): string {
  return `
# ${brandName} - Landing Page Protegida

## 📁 Contenido del Paquete
- \`index.html\` - Tu landing page completa (listo para usar)
- \`style.css\` - Estilos y diseño responsivo
- \`README.md\` - Este archivo

## 🚀 Cómo Usar

### Opción 1: Abrir Localmente (Más Fácil)
1. Simplemente **doble clic en \`index.html\`**
2. Se abrirá en tu navegador predeterminado
3. ¡Listo! Tu landing page está funcionando

### Opción 2: Subir a Hosting Web (Recomendado para Producción)
1. Sube TODOS los archivos a tu servicio de hosting
2. Accede a través de tu dominio
3. La página funcionará perfectamente

### Plataformas de Hosting Gratuitas Recomendadas:
- **Netlify**: https://netlify.com (Arrastra y suelta la carpeta)
- **Vercel**: https://vercel.com (Sube y despliega en segundos)
- **GitHub Pages**: https://pages.github.com (Gratis con repositorio)

## 🔒 Protección del Código

Tu landing page tiene las siguientes protecciones:

✅ **Código JavaScript Ofuscado** - Difícil de leer y copiar
✅ **Contenido Codificado** - El HTML está encriptado en el código
✅ **Funciona Localmente** - No necesitas servidor para probar
✅ **Fácil de Desplegar** - Sube y funciona inmediatamente

## ⚠️ Notas Importantes

- **NO modifiques el código JavaScript** en index.html - Esto romperá la funcionalidad
- **Mantén los archivos juntos** - style.css debe estar en la misma carpeta
- **Los archivos están optimizados** - Funcionan en todos los navegadores modernos

## 🎨 Personalización

Puedes modificar **SOLO** el archivo \`style.css\` para:
- Cambiar colores
- Ajustar tamaños de fuente
- Modificar espaciados y márgenes

**NO modifiques** el archivo \`index.html\` o la funcionalidad se romperá.

## 📞 Soporte

Si tienes problemas:
1. Verifica que todos los archivos estén en la misma carpeta
2. Prueba abrir el archivo en diferentes navegadores
3. Asegúrate de no haber modificado el código JavaScript
4. Contacta a tu administrador para asistencia técnica

---
**Generado por:** Olavivo PrelanderAI
**Fecha:** ${new Date().toLocaleDateString()}
**Protección:** Código ofuscado para prevenir clonación
`.trim()
}
