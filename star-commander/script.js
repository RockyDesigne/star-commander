/**@type {HTMLCanvasElement} */

import { SpaceShip } from "./spaceship.js";
import { InputHandler } from "./controls.js";
import { Enemy } from "./enemy.js";
import { checkForCollision } from "./utils.js";
import { UI } from "./UI.js";
import { Background } from "./background.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { Particle, Effect } from "./particles.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

class Game {
    constructor(canvasHeight, canvasWidth) {
        this.enemies = [];
        this.timeToEnemy = Math.random() * 100 + 50;
        this.enemyTimer = 0;
        this.score = 0;
        this.lives = 5;
        this.gameOver = false;
        this.boom = [];
        this.startingPosition = 0.4;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.btn = document.getElementById('start');

        this.effect = new Effect(canvas.width, canvas.height);
        this.background = new Background();
        this.input = new InputHandler(this);
        this.spaceship = new SpaceShip(this.canvasWidth * this.startingPosition, this.canvasHeight * this.startingPosition, this.canvasHeight);
        this.UI = new UI(this);
    }
    update(dt) {
        this.effect.update();
        this.background.update(dt);
        this.spaceship.update(this.input.keys);
        //add Enemies 
        if (this.enemyTimer <= 0) {
            this.enemies.push(new Enemy(canvas.width * Math.random() * 0.5, canvas.height * 1.5));
            this.enemyTimer = this.timeToEnemy;
        }
        this.enemyTimer--;
        this.enemies.forEach((enemy) => {
            enemy.update(dt);
            if (enemy.y + enemy.radius < 0) --this.score;
            if (checkForCollision(enemy, this.spaceship)) {
                this.boom = new CollisionAnimation(this.spaceship.x, this.spaceship.y, this.spaceship.speed);
                this.boom.update();
                this.boom.draw(ctx);
                enemy.markedForDeletion = true;
                this.lives--;
            }
            this.spaceship.projectiles.forEach(projectile => {
                if (checkForCollision(enemy, projectile)) {
                    enemy.hitpoints--;
                    projectile.markedForDeletion = true;
                    if (enemy.hitpoints === 0) {
                        new CollisionAnimation(enemy.x, enemy.y, enemy.speed);
                        enemy.markedForDeletion = true;
                        this.score++;
                    }
                }
            });
        });
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        if (this.lives === 0) {
            this.gameOver = true;
        }
    }

    draw(context) {
        this.effect.draw(context);
        this.background.draw(context);
        this.spaceship.draw(context);
        //draw enemies
        this.enemies.forEach((enemy) => {
            enemy.draw(context);
        });
        this.UI.draw(context);
    }
    restart() {
        this.gameOver = false;
        this.lives = 5;
        this.score = 0;
        this.spaceship.x = this.canvasWidth * this.startingPosition; //reset spaceship x pos
        this.spaceship.y = this.canvasHeight * this.startingPosition; // reset spaceship y pos
        this.enemies = [];
        this.projectile = []; 
    }
}

canvas.width = window.innerWidth * 0.3;
canvas.height = window.innerHeight;

const game = new Game(canvas.height, canvas.width);
game.effect.init(ctx);
const btn = document.getElementById("mybtn");
btn.addEventListener("click", () => {
    game.restart();
    animate(0);
});

let lastTime = 0;

const animate = (timeStamp) => {
    const dt = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.height = window.innerHeight;
    game.update(dt);
    game.draw(ctx);
    if(game.gameOver == false) {
        requestAnimationFrame(animate);
        btn.style.display = 'none';
    } else {
        btn.style.display = 'block';
    }
}
animate(0);