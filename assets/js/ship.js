class Ship {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.radius = 10;
        this.heading = 0;
        this.rotation = 0;
        this.velocity = createVector(0, 0);
        this.isBoosting = false;
    }

    boosting(b) {
        this.isBoosting = b;
    }

    update() {
        if (this.isBoosting) {
            this.boost();
        }
        this.pos.add(this.velocity);
        this.velocity.mult(0.99);
    }

    boost() {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.velocity.add(force);
    }

    hits(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if(d < this.radius + asteroid.radius) return true;
        return false;
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        fill(0);
        stroke(255);
        triangle(-this.radius, this.radius, this.radius, this.radius, 0, -this.radius);
        pop();
    }

    edges() {
        if(this.pos.x > width + this.radius) {
            this.pos.x = -this.radius;
        }
        else if(this.pos.x < -this.radius) {
            this.pos.x = width + this.radius;
        }
        if(this.pos.y > height + this.radius) {
            this.pos.y = -this.radius;
        }
        else if(this.pos.y < -this.radius) {
            this.pos.y = height + this.radius;
        }
    }

    setRotation(a) {
        this.rotation = a;
    }

    turn() {
        this.heading += this.rotation / 3;
    }
}
