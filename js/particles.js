/* ========= PARTICLE SYSTEM ========= */

class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particle-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0, radius: 100 };
    
    this.init();
    this.animate();
    
    // Handle window resize
    window.addEventListener('resize', () => this.init());
    
    // Mouse interaction
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseout', () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
  }

  init() {
    // Set canvas size
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Create particles
    this.particles = [];
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    const colors = [
      'rgba(0, 163, 255, 0.5)',    // Blue
      'rgba(0, 255, 200, 0.4)',    // Cyan
      'rgba(100, 255, 218, 0.3)',  // Light Cyan
      'rgba(64, 156, 255, 0.4)',   // Light Blue
      'rgba(128, 255, 255, 0.3)'   // Very Light Blue
    ];
    
    const size = Math.random() * 3 + 1;
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.canvas.height;
    
    return {
      x: x,
      y: y,
      size: size,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      originalSize: size,
      wave: Math.random() * Math.PI * 2
    };
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.fillStyle = 'rgba(14, 15, 17, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.updateParticles();
    this.drawParticles();
    this.drawConnections();
  }

  updateParticles() {
    this.particles.forEach(particle => {
      // Update wave effect
      particle.wave += 0.02;
      particle.size = particle.originalSize + Math.sin(particle.wave) * 0.5;
      
      // Move particle
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Mouse interaction
      if (this.mouse.x && this.mouse.y) {
        const dx = particle.x - this.mouse.x;
        const dy = particle.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          
          particle.x += Math.cos(angle) * force * 2;
          particle.y += Math.sin(angle) * force * 2;
        }
      }
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.speedX = -particle.speedX;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.speedY = -particle.speedY;
      }
      
      // Keep particles within bounds
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    });
  }

  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
      
      // Add glow effect
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, particle.size,
        particle.x, particle.y, particle.size * 2
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, 'rgba(0, 163, 255, 0)');
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });
  }

  drawConnections() {
    const maxDistance = 150;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = 1 - (distance / maxDistance);
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(0, 163, 255, ${opacity * 0.2})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
});