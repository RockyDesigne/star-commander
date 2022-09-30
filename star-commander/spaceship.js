import { Projectile } from "./projectile.js";


export class SpaceShip {
    constructor(x, y, game) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 68;
        this.speed = 2;
        this.maxSpeed = 4;
        this.acceleration = 0.2;
        this.angle = 0;
        this.projectiles = [];
        this.maxProjectiles = 50;
        this.timeToReload = 10;
        this.reloadTimer = 0;
        this.projectileSpeed = 1.07;
        this.sprite = document.getElementById("ship");
    }
        
    update(input) {
        //shoot
        if (input.includes("Enter") && this.reloadTimer <= 0) {
            this.projectiles.push(new Projectile(this.x * this.projectileSpeed, this.y));
            this.reloadTimer = this.timeToReload;
        }
        this.reloadTimer--;
        this.projectiles.forEach((projectile) => {
            projectile.update();
        });
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
        //forward and reverse
        if (input.includes("ArrowDown")) {
            this.y += this.speed;
        } if (input.includes("ArrowUp")) {
            this.y -= this.speed;
        } if (input.includes("ArrowRight")) {
            this.x += this.speed;
        } if (input.includes("ArrowLeft")) {
            this.x -= this.speed;
        } 
    }

    draw(context) {
        context.save();
        context.fillStyle = "green";
        context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        this.projectiles.forEach(projectile => {
            projectile.draw(context);
        });
        context.restore();
    }

}
