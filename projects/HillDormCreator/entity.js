class Entity {
  constructor(params) {
    this.width = params.width || 0;
    this.height = params.height || 0;
    this.color = params.color || '#000000';
    this.label = params.label || '';
    this.fontColor = params.fontColor || '#ffffff';
    this.xPos = params.x || 0;
    this.yPos = params.y || 0;
    this.isStatic = params.static || false;
  }

  render(context) {
    context.fillStyle = this.color;
    context.fillRect(this.xPos, this.yPos, this.width, this.height);
    context.fillStyle = this.fontColor;
    context.strokeStyle = this.fontColor;
    context.strokeRect(this.xPos, this.yPos, this.width, this.height);
    context.textAlign = 'center';
    context.font = '10px sans-serif';
    context.fillText(this.label, this.xPos + this.width / 2, this.yPos + this.height / 2);
  }

  isContained(x, y) {
    return x > this.xPos && x < this.xPos + this.width &&
           y > this.yPos && y < this.yPos + this.height;
  }

  translate(dx, dy) {
    if(!this.isStatic) {
      this.xPos += dx;
      this.yPos += dy;
    }
  }

  containTo(width, height) {
    if(this.xPos < 0) {
      this.xPos = 0;
    } else if (this.xPos + this.width > width) {
      this.xPos = width - this.width;
    }

    if(this.yPos < 0) {
      this.yPos = 0;
    } else if (this.yPos + this.height > height) {
      this.yPos = height - this.height;
    }
  }

  rotate() {
    if(!this.isStatic) {
      let oldWidth = this.width;
      this.width = this.height;
      this.height = oldWidth;
    }
  }
}
