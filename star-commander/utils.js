export const rectCircleColliding = (rect,circle) => {
        let distX = Math.abs(circle.x - rect.x-rect.width/2);
        let distY = Math.abs(circle.y - rect.y-rect.height/2);
    
        if (distX >= (rect.width/2 + circle.radius)) { return false; }
        if (distY >= (rect.height/2 + circle.radius)) { return false; }
    
        if (distX <= (rect.width/2)) { return true; } 
        if (distY <= (rect.height/2)) { return true; }
    
        let dx=distX-rect.width/2;
        let dy=distY-rect.height/2;
        return (dx*dx+dy*dy<=(circle.radius*circle.radius));
    }

export const checkForCollision = (rect1, rect2) => {

    if (
        rect1.x < rect2.x + rect2.width 
                && rect1.x + rect1.width > rect2.x 
                && rect1.y < rect2.y + rect2.height
                && rect1.y + rect1.height > rect2.y 
    ) {
        return true;
    } else return false;
}

