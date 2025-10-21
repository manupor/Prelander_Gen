/**
 * Castle Slot Game Wrapper - MINIMAL VERSION
 * This version only adds basic functionality without interfering with game loading
 */

console.log('🏰 Castle Slot Minimal Wrapper Loading...');

// Global state for tracking
window.gameState = {
    spinCount: 0,
    isReady: false
};

// Parse URL parameters
function getGameConfig() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        balance: parseInt(urlParams.get('balance')) || 150000,
        logo: urlParams.get('logo') || null,
        cta: urlParams.get('cta') || 'https://casino-landing.com'
    };
}

const config = getGameConfig();
console.log('🎮 Game Config:', config);

// Simple click counter - only after game loads
function setupClickTracking() {
    let clickCount = 0;
    
    // Add click listener to document
    document.addEventListener('click', function(event) {
        clickCount++;
        console.log('🖱️ Click detected:', clickCount);
        
        // On second click, trigger win popup
        if (clickCount === 2) {
            setTimeout(() => {
                console.log('🏆 Triggering win popup!');
                
                // Send message to parent
                if (window.parent && window.parent !== window) {
                    window.parent.postMessage({
                        type: "showWinPopup",
                        spinCount: clickCount,
                        balance: config.balance
                    }, "*");
                }
            }, 1000);
        }
    });
    
    console.log('✅ Click tracking setup complete');
}

// Initialize after page loads
window.addEventListener('load', function() {
    console.log('📄 Page loaded, setting up minimal wrapper...');
    
    // Wait a bit for game to initialize
    setTimeout(() => {
        setupClickTracking();
        window.gameState.isReady = true;
        console.log('✅ Minimal wrapper ready!');
    }, 3000);
});

console.log('🚀 Minimal wrapper script loaded');
