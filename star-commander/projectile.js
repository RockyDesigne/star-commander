export class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = 5;
        this.width = 5;
        this.height = 10;
        this.markedForDeletion = false;
    }

    update() {
        this.y += this.velocity;
        if (this.x + this.width < 0 || this.y + this.height > 800) this.markedForDeletion = true;
    }

    draw(context) {
        context.fillRect(this.x, this.y + 50, this.width, this.height);
        context.fillRect(this.x + 65, this.y + 50, this.width, this.height);
    }
}