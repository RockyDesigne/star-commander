export class CollisionAnimation {
    constructor(x, y, speed) {
        this.sprite = document.getElementById("boom");
        this.width = 100;
        this.height = 90;
        this.x = x;
        this.y = y;
        this.frameX = 0;
        this.maxFrame = 4;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = speed;
    }

    draw(context) {
        context.drawImage(this.sprite, this.frameX * this.width, 0,
            this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update() {
        this.y -= this.speed;
        if (this.frameTimer > this.frameInterval) {
            this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += 1;
        }
        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
}