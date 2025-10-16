// NetFusion Neon Effects - Synth 90's Interactive Animations
// Author: Cascade AI
// Description: Interactive particle effects and neon animations for NetFusion theme

(function() {
  'use strict';

  // Enhanced Neon Particle System with Connections
  class NeonParticle {
    constructor(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.reset();
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.opacity = Math.random() * 0.8 + 0.3;
      this.color = Math.random() > 0.5 ? '#02C173' : '#72DC60';
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;

      this.pulsePhase += this.pulseSpeed;
    }

    draw() {
      const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
      const currentSize = this.size * (0.5 + pulse * 0.5);
      
      // Outer glow
      const gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentSize * 3);
      gradient.addColorStop(0, this.color + 'AA');
      gradient.addColorStop(0.5, this.color + '44');
      gradient.addColorStop(1, this.color + '00');
      
      this.ctx.fillStyle = gradient;
      this.ctx.globalAlpha = this.opacity * pulse;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, currentSize * 3, 0, Math.PI * 2);
      this.ctx.fill();

      // Core particle
      this.ctx.fillStyle = this.color;
      this.ctx.globalAlpha = this.opacity;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }
  }

  // Initialize Neon Background
  function initNeonBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'neon-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.3';

    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new NeonParticle(canvas, ctx));
    }

    function connectParticles() {
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, particles[i].color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
            gradient.addColorStop(1, particles[j].color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      connectParticles();
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }


  // Scroll Reveal Animations
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // Neon Glow on Hover
  function initNeonHover() {
    const neonElements = document.querySelectorAll('[class*="neon"], [class*="shadow-neon"]');
    
    neonElements.forEach(el => {
      el.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
        this.style.filter = 'brightness(1.2) drop-shadow(0 0 10px rgba(2, 193, 115, 0.8))';
      });

      el.addEventListener('mouseleave', function() {
        this.style.filter = '';
      });
    });
  }

  // Parallax Effect
  function initParallax() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const parallaxElements = document.querySelectorAll('[data-parallax]');
          
          parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeOut {
      to {
        opacity: 0;
        transform: scale(2);
      }
    }

    .revealed {
      animation: fadeInUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .reveal-on-scroll {
      opacity: 0;
    }
  `;
  document.head.appendChild(style);

  // Initialize all effects when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initNeonBackground();
      initScrollReveal();
      initNeonHover();
      initParallax();
    });
  } else {
    initNeonBackground();
    initScrollReveal();
    initNeonHover();
    initParallax();
  }
})();
