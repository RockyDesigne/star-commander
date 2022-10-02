export class Enemy {
    constructor(x, y) {
        this.color = "white";
        this.radius = 40;
        this.angleBegin = 0;
        this.angleEnd = 2;
        this.x = x;
        this.y = y;
        this.markedForDeletion = false;
        this.speed = 3;
        this.sprite = document.getElementById("asteroids");
        this.width = 90;
        this.height = 89;
        this.hitpoints = 5;
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }

    update(dt) {
        if (this.frameTimer > this.frameInterval) {
            this.y -= this.speed;
            if (this.y + this.radius < 0) this.markedForDeletion = true;
        } else {
            this.frameTimer += dt;
        }
    }

    draw(context) {
        context.save();
        /*context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();
        context.arc(this.x + this.width * 0.5, this.y + this.height * 0.5
            , this.radius, this.angleBegin, this.angleEnd * Math.PI);
        context.stroke();*/
        context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        context.restore();
    }
}