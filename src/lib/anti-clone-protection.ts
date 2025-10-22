/**
 * Anti-Clone Protection System
 * Advanced protection against screenshots, screen recording, and cloning attempts
 * Similar to Disney+ and Netflix protection mechanisms
 */

export interface ProtectionConfig {
  enableScreenshotBlocking: boolean
  enableDevToolsBlocking: boolean
  enableRightClickBlocking: boolean
  enableTextSelectionBlocking: boolean
  enablePrintBlocking: boolean
  enableKeyboardShortcutBlocking: boolean
  enableInspectBlocking: boolean
  enableConsoleBlocking: boolean
  domainLock?: string
  userFingerprint?: string
  obfuscateCode: boolean
}

export const defaultProtectionConfig: ProtectionConfig = {
  enableScreenshotBlocking: false, // Menos intrusivo
  enableDevToolsBlocking: true, // ✅ BLOQUEA INSPECT ELEMENT
  enableRightClickBlocking: true, // ✅ BLOQUEA RIGHT-CLICK
  enableTextSelectionBlocking: false, // Permitir selección de texto
  enablePrintBlocking: false, // Permitir imprimir
  enableKeyboardShortcutBlocking: false, // Permitir shortcuts normales
  enableInspectBlocking: true, // ✅ BLOQUEA INSPECT
  enableConsoleBlocking: false, // No bloquear console (puede interferir)
  obfuscateCode: true // ✅ Ofuscar código
}

/**
 * Generate anti-clone protection JavaScript code
 */
export function generateProtectionScript(config: ProtectionConfig = defaultProtectionConfig): string {
  const protectionCode = `
(function() {
  'use strict';
  
  // Configuration
  const CONFIG = ${JSON.stringify(config)};
  
  // Fingerprint validation
  ${config.userFingerprint ? `
  const EXPECTED_FINGERPRINT = '${config.userFingerprint}';
  function validateFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Anti-clone protection', 2, 2);
    const fingerprint = canvas.toDataURL();
    return btoa(fingerprint).substring(0, 20);
  }
  ` : ''}
  
  // Domain validation
  ${config.domainLock ? `
  const ALLOWED_DOMAIN = '${config.domainLock}';
  function validateDomain() {
    const currentDomain = window.location.hostname;
    if (currentDomain !== ALLOWED_DOMAIN && currentDomain !== 'localhost' && currentDomain !== '127.0.0.1') {
      document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-family:Arial;z-index:999999;"><h1>🔒 Domain Restricted</h1></div>';
      return false;
    }
    return true;
  }
  ` : ''}
  
  // Screenshot and screen recording detection
  if (CONFIG.enableScreenshotBlocking) {
    // Detect PrintScreen key
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 44 || e.key === 'PrintScreen') {
        e.preventDefault();
        e.stopPropagation();
        showWarning('Screenshots are not allowed');
        return false;
      }
    });
    
    // Detect screen recording APIs
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia;
      navigator.mediaDevices.getDisplayMedia = function() {
        showWarning('Screen recording is not allowed');
        return Promise.reject(new Error('Screen recording blocked'));
      };
    }
    
    // Detect visibility change (potential screenshot apps)
    let hiddenTime = 0;
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        hiddenTime = Date.now();
      } else {
        const timeHidden = Date.now() - hiddenTime;
        if (timeHidden < 100 && timeHidden > 0) {
          // Potential screenshot detected
          blurContent();
          setTimeout(unblurContent, 2000);
        }
      }
    });
  }
  
  // Developer tools detection - SIN BLOQUEAR LA VISTA DEL PRELANDER
  if (CONFIG.enableDevToolsBlocking) {
    // Bloquear atajos de teclado para abrir DevTools
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 123 || // F12
          (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
          (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
          (e.ctrlKey && e.keyCode === 85) || // Ctrl+U (View Source)
          (e.ctrlKey && e.shiftKey && e.keyCode === 67)) { // Ctrl+Shift+C (Inspect)
        e.preventDefault();
        e.stopPropagation();
        showWarning('🔒 Inspect Element is disabled');
        return false;
      }
    });
    
    // Deshabilitar clic derecho "Inspect" y "Inspect Element"
    document.addEventListener('mousedown', function(e) {
      if (e.button === 2) { // Right click
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });
  }
  
  // Right-click blocking
  if (CONFIG.enableRightClickBlocking) {
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      showWarning('Right-click is disabled');
      return false;
    });
  }
  
  // Text selection blocking
  if (CONFIG.enableTextSelectionBlocking) {
    document.addEventListener('selectstart', function(e) {
      e.preventDefault();
      return false;
    });
    
    document.addEventListener('dragstart', function(e) {
      e.preventDefault();
      return false;
    });
    
    // CSS to prevent text selection
    const style = document.createElement('style');
    style.textContent = \`
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
    \`;
    document.head.appendChild(style);
  }
  
  // Print blocking
  if (CONFIG.enablePrintBlocking) {
    window.addEventListener('beforeprint', function(e) {
      e.preventDefault();
      showWarning('Printing is not allowed');
      return false;
    });
    
    // Override print function
    window.print = function() {
      showWarning('Printing is not allowed');
    };
  }
  
  // Console blocking
  if (CONFIG.enableConsoleBlocking) {
    // Override console methods
    const noop = function() {};
    window.console = {
      log: noop, warn: noop, error: noop, info: noop, debug: noop,
      trace: noop, dir: noop, dirxml: noop, group: noop, groupEnd: noop,
      time: noop, timeEnd: noop, profile: noop, profileEnd: noop,
      assert: noop, count: noop, table: noop, clear: noop
    };
    
    // Detect console usage attempts
    let consoleDetected = false;
    Object.defineProperty(window, 'console', {
      get: function() {
        if (!consoleDetected) {
          consoleDetected = true;
          showWarning('Console access is restricted');
        }
        return { log: noop, warn: noop, error: noop };
      },
      set: function() {}
    });
  }
  
  // Keyboard shortcuts blocking
  if (CONFIG.enableKeyboardShortcutBlocking) {
    document.addEventListener('keydown', function(e) {
      // Block common shortcuts
      if ((e.ctrlKey || e.metaKey) && (
          e.keyCode === 65 || // Ctrl+A (Select All)
          e.keyCode === 67 || // Ctrl+C (Copy)
          e.keyCode === 86 || // Ctrl+V (Paste)
          e.keyCode === 88 || // Ctrl+X (Cut)
          e.keyCode === 90 || // Ctrl+Z (Undo)
          e.keyCode === 89 || // Ctrl+Y (Redo)
          e.keyCode === 83 || // Ctrl+S (Save)
          e.keyCode === 80    // Ctrl+P (Print)
      )) {
        e.preventDefault();
        e.stopPropagation();
        showWarning('Keyboard shortcuts are disabled');
        return false;
      }
    });
  }
  
  // Warning system
  function showWarning(message) {
    const warning = document.createElement('div');
    warning.style.cssText = \`
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4444;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      z-index: 999999;
      font-family: Arial, sans-serif;
      font-weight: bold;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideIn 0.3s ease-out;
    \`;
    warning.textContent = '🔒 ' + message;
    
    const style = document.createElement('style');
    style.textContent = \`
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    \`;
    document.head.appendChild(style);
    
    document.body.appendChild(warning);
    setTimeout(() => {
      if (warning.parentNode) {
        warning.parentNode.removeChild(warning);
      }
    }, 3000);
  }
  
  // Content blurring for screenshot protection
  function blurContent() {
    const style = document.createElement('style');
    style.id = 'blur-protection';
    style.textContent = \`
      body * {
        filter: blur(10px) !important;
        transition: filter 0.1s !important;
      }
    \`;
    document.head.appendChild(style);
  }
  
  function unblurContent() {
    const blurStyle = document.getElementById('blur-protection');
    if (blurStyle) {
      blurStyle.remove();
    }
  }
  
  // Self-protection: Prevent script removal
  const scripts = document.querySelectorAll('script');
  const protectionScript = scripts[scripts.length - 1];
  
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.removedNodes.forEach(function(node) {
          if (node === protectionScript) {
            // Script was removed, reload page or show error
            document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-family:Arial;z-index:999999;"><h1>🔒 Protection Tampered</h1></div>';
          }
        });
      }
    });
  });
  
  observer.observe(document.head, { childList: true });
  observer.observe(document.body, { childList: true });
  
  // Initialize protections
  ${config.domainLock ? 'if (!validateDomain()) return;' : ''}
  ${config.userFingerprint ? `
  if (validateFingerprint() !== EXPECTED_FINGERPRINT) {
    document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-family:Arial;z-index:999999;"><h1>🔒 Unauthorized Access</h1></div>';
    return;
  }
  ` : ''}
  
  // Periodic integrity check
  setInterval(function() {
    // Check if protection is still active
    if (!document.querySelector('script[data-protection="true"]')) {
      document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-family:Arial;z-index:999999;"><h1>🔒 Security Check Failed</h1></div>';
    }
  }, 5000);
  
  console.log('🔒 Anti-clone protection active');
})();
`;

  return protectionCode;
}

/**
 * Obfuscate JavaScript code to make it harder to reverse engineer
 */
export function obfuscateCode(code: string): string {
  // Simple obfuscation techniques
  const obfuscated = code
    // Replace function names with random strings
    .replace(/function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g, (match, name) => {
      const randomName = '_0x' + Math.random().toString(16).substr(2, 8);
      return match.replace(name, randomName);
    })
    // Replace variable names
    .replace(/(?:var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g, (match, name) => {
      const randomName = '_0x' + Math.random().toString(16).substr(2, 6);
      return match.replace(name, randomName);
    })
    // Encode strings
    .replace(/'([^']+)'/g, (match, str) => {
      const encoded = btoa(str);
      return `atob('${encoded}')`;
    })
    // Add fake code and dead branches
    .replace(/\{/g, '{ if(false){console.log("fake");} ')
    // Minify whitespace
    .replace(/\s+/g, ' ')
    .replace(/;\s*}/g, ';}')
    .replace(/{\s*/g, '{')
    .replace(/}\s*/g, '}');

  return obfuscated;
}

/**
 * Generate complete protected HTML with anti-clone measures
 */
export function generateProtectedHTML(
  originalHTML: string, 
  originalCSS: string, 
  config: ProtectionConfig = defaultProtectionConfig
): { html: string; css: string } {
  const protectionScript = generateProtectionScript(config);
  const finalScript = config.obfuscateCode ? obfuscateCode(protectionScript) : protectionScript;
  
  // Inject protection into HTML
  const protectedHTML = originalHTML.replace(
    '</body>',
    `
    <script data-protection="true" type="text/javascript">
      ${finalScript}
    </script>
    </body>`
  );
  
  // Add protection CSS
  const protectionCSS = `
    /* Anti-clone protection styles */
    body {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
      -webkit-tap-highlight-color: transparent !important;
    }
    
    /* Prevent image saving */
    img {
      -webkit-user-drag: none !important;
      -khtml-user-drag: none !important;
      -moz-user-drag: none !important;
      -o-user-drag: none !important;
      user-drag: none !important;
      pointer-events: none !important;
    }
    
    /* Hide content during potential screenshots */
    @media print {
      body * {
        visibility: hidden !important;
      }
      body::before {
        content: "🔒 Printing is not allowed" !important;
        visibility: visible !important;
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        font-size: 24px !important;
        color: #000 !important;
      }
    }
  `;
  
  const finalCSS = originalCSS + '\n' + protectionCSS;
  
  return {
    html: protectedHTML,
    css: finalCSS
  };
}
