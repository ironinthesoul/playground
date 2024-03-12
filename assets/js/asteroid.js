class Asteroid {
    constructor(pos, radius, points) {
        if(pos) {
            this.pos = pos.copy();
        }
        else {
            this.pos = createVector(random(width), random(height));
        }
        if(radius) {
            this.radius = radius * 0.5;
            this.points = ++points;
        }
        else {
            this.radius = random(15, 50);
            this.points = 1;
        }

        this.velocity = p5.Vector.random2D();
        this.total = floor(random(5, 15));
        this.offset = [];
        for (var i = 0; i < this.total; i++) {
            this.offset[i] = random(-this.radius * 0.5, this.radius * 0.5);
        }
    }

    update() {
        this.pos.add(this.velocity);
    }

    render() {
        push();
        stroke(255);
        noFill();
        translate(this.pos.x, this.pos.y);
        beginShape();
            for (var i = 0; i < this.total; i++) {
                var angle = map(i, 0, this.total, 0, TWO_PI);
                var r = this.radius + this.offset[i];
                var x = r * cos(angle);
                var y = r * sin(angle);
                vertex(x, y);
            }
        endShape(CLOSE);
        pop();
    }

    destroy() {
        var new_asteroid = [];
        new_asteroid[0] = new Asteroid(this.pos, this.radius, this.points);
        new_asteroid[1] = new Asteroid(this.pos, this.radius, this.points);
        return new_asteroid;
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
}
