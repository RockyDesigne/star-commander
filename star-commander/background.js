export class Background {
    constructor() {
        this.image = document.getElementById("background");
        this.width = 500;
        this.height = 1024;
        this.y = 0;
        this.x = 0;
        this.speed = 5;
    }

    update() {
        this.y <= -this.height ? this.y = 0 : this.y = this.y - this.speed;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y + this.height, this.width, this.height);
    }
}