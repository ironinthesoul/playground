class Laser {
    constructor(spos, angle) {
        this.pos = createVector(spos.x, spos.y);
        this.velocity = p5.Vector.fromAngle(angle);
        this.velocity.mult(10);
    }

    update() {
        this.pos.add(this.velocity);
    }

    render() {
        push();
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
        pop();
    }

    hits(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < asteroid.radius) return true;
        return false;
    }

    offscreen() {
      if (this.pos.x > width || this.pos.x < 0) return true;
      if (this.pos.y > height || this.pos.y < 0) return true;
      return false;
    }


}
