export class Projectile {
    constructor(x, y, cavnasHeight) {
        this.x = x;
        this.y = y;
        this.velocity = 5;
        this.width = 5;
        this.height = 10;
        this.markedForDeletion = false;
        this.cavnasHeight = cavnasHeight;
    }

    update() {
        this.y += this.velocity;
        if (this.x + this.width < 0 || this.y + this.height > this.canvasHeight) this.markedForDeletion = true;
    }

    draw(context) {
        context.fillRect(this.x, this.y + 50, this.width, this.height);
        context.fillRect(this.x + 65, this.y + 50, this.width, this.height);
    }
}