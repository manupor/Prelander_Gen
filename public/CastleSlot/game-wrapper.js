/**
 * Castle Slot Game Wrapper - Makes the game deterministic and editable
 * This script works with Construct 2 runtime (c2runtime.js)
 */

console.log('🏰 Castle Slot Game Wrapper Loading...');

// Global variables for game control
window.gameState = {
    spinCount: 0,
    isGameReady: false,
    balance: 1000,
    customLogo: null,
    ctaUrl: 'https://casino-landing.com',
    isDeterministic: true
};

// Parse URL parameters for customization
function parseGameConfig() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get configuration from URL or parent window
    const config = {
        balance: parseInt(urlParams.get('balance')) || 1000,
        logo: urlParams.get('logo') || null,
        cta: urlParams.get('cta') || 'https://casino-landing.com'
    };
    
    // Try to get config from parent window if in iframe
    try {
        if (window.parent && window.parent !== window) {
            const parentConfig = window.parent.gameConfig;
            if (parentConfig) {
                config.balance = parentConfig.balance || config.balance;
                config.logo = parentConfig.logo || config.logo;
                config.cta = parentConfig.cta || config.cta;
            }
        }
    } catch (e) {
        console.log('Cannot access parent config (cross-origin)');
    }
    
    console.log('🎮 Game Config Parsed:', config);
    return config;
}

// Initialize game configuration
const gameConfig = parseGameConfig();
window.gameState.balance = gameConfig.balance;
window.gameState.customLogo = gameConfig.logo;
window.gameState.ctaUrl = gameConfig.cta;

// Store original Math.random but don't override it immediately
const originalRandom = Math.random;
let randomSeed = 12345;

function seededRandom() {
    if (!window.gameState.isDeterministic) {
        return originalRandom();
    }
    
    // Simple seeded random number generator
    randomSeed = (randomSeed * 9301 + 49297) % 233280;
    return randomSeed / 233280;
}

// Function to intercept Construct 2 runtime
function interceptConstruct2Runtime() {
    console.log('🔧 Starting Castle Slot C2 wrapper initialization...');
    
    // Wait for the window to be fully loaded first
    if (document.readyState === 'complete') {
        setTimeout(() => {
            console.log('📄 Document ready, setting up C2 wrapper...');
            setupC2RuntimeInterception();
        }, 5000); // Wait 5 seconds for game to fully load
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => {
                console.log('🌐 Window loaded, setting up C2 wrapper...');
                setupC2RuntimeInterception();
            }, 5000); // Wait 5 seconds after window load
        });
    }
}

function setupC2RuntimeInterception() {
    console.log('⚙️ Setting up Castle Slot C2 runtime interception...');
    
    try {
        // Set up logo display if provided
        setupLogoDisplay();
        
        // Set up click detection for Construct 2 canvas
        setupC2ClickDetection();
        
        // Override Math.random after game loads
        setTimeout(() => {
            if (window.gameState.isDeterministic) {
                Math.random = seededRandom;
                console.log('🎲 Math.random overridden for deterministic behavior');
            }
        }, 2000);
        
        window.gameState.isGameReady = true;
        console.log('✅ Castle Slot C2 wrapper setup complete!');
        
    } catch (error) {
        console.error('❌ Error setting up C2 runtime interception:', error);
        // Fallback: use basic click detection
        setupC2ClickDetection();
    }
}

function setupC2ClickDetection() {
    console.log('🖱️ Setting up C2 click detection...');
    
    try {
        // Wait for canvas to be available
        setTimeout(() => {
            // Look for Construct 2 canvas elements
            const canvases = document.querySelectorAll('canvas');
            console.log(`🎨 Found ${canvases.length} canvas elements`);
            
            canvases.forEach((canvas, index) => {
                console.log(`🎯 Adding click listener to canvas ${index}`);
                canvas.addEventListener('click', handleSpinClick, true);
                canvas.addEventListener('touchstart', handleSpinClick, true);
            });
            
            // Also monitor for any clickable elements
            document.addEventListener('click', (event) => {
                const target = event.target;
                if (target.tagName === 'CANVAS' || target.closest('canvas')) {
                    handleSpinClick(event);
                }
            }, true);
            
            console.log('✅ C2 click detection setup complete');
            
        }, 1000); // Wait 1 second for canvas to be created
        
    } catch (error) {
        console.error('❌ Error setting up C2 click detection:', error);
    }
}

function handleSpinClick(event) {
    console.log('Spin detected! Count:', window.gameState.spinCount + 1);
    
    window.gameState.spinCount++;
    
    // On second spin, trigger win popup
    if (window.gameState.spinCount === 2) {
        setTimeout(() => {
            triggerWinPopup();
        }, 2000); // Wait 2 seconds for spin animation to complete
    }
}

function checkForSpinEvents() {
    // This function can be used to detect spin events through runtime monitoring
    // Implementation depends on specific Construct 3 game structure
}

function triggerWinPopup() {
    console.log('Triggering win popup after second spin!');
    
    // Send message to parent window
    try {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({ 
                type: "showWinPopup",
                spinCount: window.gameState.spinCount,
                balance: window.gameState.balance
            }, "*");
        }
    } catch (error) {
        console.error('Error sending message to parent:', error);
    }
    
    // Also trigger local popup if no parent
    if (window.parent === window) {
        showLocalWinPopup();
    }
}

function showLocalWinPopup() {
    // Create local popup if not in iframe
    const popup = document.createElement('div');
    popup.id = 'local-win-popup';
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    popup.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 10px; text-align: center; max-width: 400px;">
            <h2>🎉 Congratulations!</h2>
            <p>You've unlocked your casino bonus!</p>
            <a href="${window.gameState.ctaUrl}" target="_blank" 
               style="display: inline-block; margin-top: 20px; background: #FFD700; color: #000; 
                      padding: 15px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                Claim Bonus
            </a>
            <br><br>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: #ccc; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(popup);
}

function setupBalanceDisplay(runtime) {
    // Try to find and update balance display
    try {
        const balanceElements = document.querySelectorAll('[id*="balance"], [class*="balance"], [id*="coin"], [class*="coin"]');
        
        balanceElements.forEach(element => {
            if (element.textContent && /\d+/.test(element.textContent)) {
                element.textContent = window.gameState.balance.toLocaleString();
            }
        });
        
        // Set up periodic balance updates
        setInterval(() => {
            balanceElements.forEach(element => {
                if (element.textContent && /\d+/.test(element.textContent)) {
                    element.textContent = window.gameState.balance.toLocaleString();
                }
            });
        }, 1000);
        
    } catch (error) {
        console.error('Error setting up balance display:', error);
    }
}

function setupLogoDisplay() {
    if (!window.gameState.customLogo) return;
    
    try {
        // Create logo overlay
        const logoOverlay = document.createElement('img');
        logoOverlay.src = window.gameState.customLogo;
        logoOverlay.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            width: 80px;
            height: 80px;
            object-fit: contain;
            z-index: 1000;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(logoOverlay);
        
    } catch (error) {
        console.error('Error setting up logo display:', error);
    }
}

function setupDOMInterception() {
    // DOM-based interception - more reliable and less intrusive
    console.log('Setting up DOM-based interception...');
    
    // Wait for the game to fully render before adding event listeners
    setTimeout(() => {
        // Monitor for clicks on canvas elements (which is what Construct 3 uses)
        document.addEventListener('click', (event) => {
            const target = event.target;
            
            // Check if click is on canvas or game area
            if (target.tagName === 'CANVAS' || target.closest('canvas')) {
                console.log('Game canvas click detected');
                handleSpinClick(event);
            }
        }, true);
        
        // Also monitor for touch events on mobile
        document.addEventListener('touchstart', (event) => {
            const target = event.target;
            
            if (target.tagName === 'CANVAS' || target.closest('canvas')) {
                console.log('Game canvas touch detected');
                handleSpinClick(event);
            }
        }, true);
        
        console.log('Canvas event listeners added');
        
        // Only override Math.random after the game has had time to initialize
        setTimeout(() => {
            if (window.gameState.isDeterministic) {
                Math.random = seededRandom;
                console.log('Math.random overridden after game initialization');
            }
        }, 3000);
        
    }, 3000); // Wait 3 seconds for game to render
    
    window.gameState.isGameReady = true;
}

// Initialize when DOM is ready
console.log('🚀 Initializing Castle Slot C2 wrapper...');
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', interceptConstruct2Runtime);
} else {
    interceptConstruct2Runtime();
}

// Also try after window load
window.addEventListener('load', () => {
    if (!window.gameState.isGameReady) {
        console.log('🔄 Retrying C2 wrapper initialization...');
        interceptConstruct2Runtime();
    }
});

console.log('🏰 Castle Slot Game Wrapper Loaded Successfully!');

// Export functions for external access
window.CastleSlotWrapper = {
    getSpinCount: () => window.gameState.spinCount,
    resetSpinCount: () => { window.gameState.spinCount = 0; },
    setBalance: (balance) => { window.gameState.balance = balance; },
    getBalance: () => window.gameState.balance,
    triggerWin: triggerWinPopup,
    setDeterministic: (enabled) => { window.gameState.isDeterministic = enabled; }
};

console.log('Castle Slot Wrapper loaded successfully!');
