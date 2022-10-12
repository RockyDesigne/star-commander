export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Helvetica";
    }

    draw(context) {
        context.save();
        //add cooldown bar
        context.fillStyle = "green";
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = "white";
        context.shadowBlur = 0;
        context.font = this.fontSize + "px " + this.fontFamily;
        context.textAlign = "left";
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText("Score: " + this.game.score, 20, 50);
        context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
        //lives
        context.fillText("Lives: " + this.game.lives, 20, 80);
        context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
        //game over
        if (this.game.gameOver) {
            context.textAlign = "center";
            context.font = this.fontSize * 1 + "px " + this.fontFamily;
            if (this.game.score > 5) {
                context.fillText("Final Score: " + this.game.score, 230, 300);
                context.font = this.fontSize * 1 + "px " + this.fontFamily;
                context.fillText("Good Job, Commander!", 230, 250);
                context.font = this.fontSize * 1 + "px " + this.fontFamily;
            } else {
                context.fillText("Final Score: " + this.game.score, 230, 300);
                context.font = this.fontSize * 1 + "px " + this.fontFamily;
                context.fillText("Tough luck, Commander!", 230, 250);
                context.font = this.fontSize * 1 + "px " + this.fontFamily;
            }
        }
        context.restore();
    }
}