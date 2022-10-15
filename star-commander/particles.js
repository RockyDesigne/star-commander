

export class Particle {
    constructor(effect, x, y, color) {
        this.effect = effect;
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.originX = Math.floor(x);
        this.originY = Math.floor(y);
        this.color = color;
        this.size = this.effect.gap; // particle's size
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.7; // how fast the img reasembles
        this.friction = 0.95;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.force = 0;
        this.angle = 0;
    }
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
    update () {
        this.dx = this.effect.mouse.x - this.x;
        this.dy = this.effect.mouse.y - this.y;
        this.distance = Math.hypot(this.dx, this.dy);
        this.force = -this.effect.mouse.radius / this.distance;

        if (this.distance < this.effect.mouse.radius) {
            this.angle = Math.atan2(this.dy, this.dx);
            this.vx += this.force * Math.cos(this.angle);
            this.vy += this.force * Math.sin(this.angle);
        }

        this.x += (this.vx *= this.friction) + (this.originX - this.x) * 0.1;
        this.y += (this.vy *= this.friction) + (this.originY - this.y) * 0.1;
    }
    warp () {
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.ease = 0.5;
    }
}

export class Effect {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.particlesArray = [];
        this.image = document.getElementById('image');
        this.centerX = this.width * 0.5;
        this.centerY = this.height * 0.5;
        this.x = this.centerX - this.image.width * 0.5; // center img
        this.y = this.centerY - this.image.height * 0.5;
        this.gap = 3;
        this.mouse = {
            radius: 30,
            x: undefined,
            y: undefined
        }
        window.addEventListener('mousemove', event => {
            this.mouse.x = event.x;
            this.mouse.y = event.y;
        });
    }
    init (context) {
        /*for (let i = 0; i < 100; ++i) {
            this.particlesArray.push(new Particle(this));
        }*/
        context.drawImage(this.image, this.x, this.y);
        const pixels = context.getImageData(0, 0, this.width, this.height).data;
        for (let i = 0; i < this.height; i+=this.gap) {
            for (let j = 0; j < this.width; j+=this.gap) {
                const index = (i * this.width + j) * 4; // each pixel is represented by 4 values
                const red = pixels[index];
                const green = pixels[index + 1];
                const blue = pixels[index + 2];
                const alpha = pixels[index + 3];
                const color = 'rgb(' + red + ',' + green + ',' + blue + ')';

                if (alpha > 0) {
                    this.particlesArray.push(new Particle(this, j, i, color));
                }
            }
        }
    }
    draw (context) {
        this.particlesArray.forEach(particle => particle.draw(context));
    }
    update () {
        this.particlesArray.forEach(particle => particle.update());
    }
    warp () {
        this.particlesArray.forEach(particle => particle.warp());
    }
}