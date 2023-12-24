import React, { Component, RefObject } from "react";

interface CharacterState {
  x: number;
  y: number;
  direction: string;
}

class Character extends Component<{}, CharacterState> {
  private canvasRef: RefObject<HTMLCanvasElement>;

  constructor(props: {}) {
    super(props);
    this.state = {
      x: 50, // 初始x座標
      y: 50, // 初始y座標
      direction: "right", // 初始方向
    };
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.drawCharacter();
    window.addEventListener("keydown", this.handleKeyPress as any);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress as any);
  }

  drawCharacter() {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height); // 清空Canvas

    // 繪製人物（示例中使用簡單的圓形代表人物）
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(this.state.x, this.state.y, 15, 0, Math.PI * 2);
    context.fill();
    context.closePath();

    // 繪製手和腳（示例中使用線段代表）
    context.strokeStyle = "blue";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(this.state.x - 10, this.state.y);
    context.lineTo(this.state.x + 10, this.state.y);
    context.stroke();
    context.moveTo(this.state.x, this.state.y + 15);
    context.lineTo(this.state.x - 10, this.state.y + 30);
    context.lineTo(this.state.x + 10, this.state.y + 30);
    context.stroke();
    context.closePath();
  }

  handleKeyPress = (event: React.KeyboardEvent) => {
    const speed = 5; // 移動速度

    switch (event.key) {
      case "ArrowUp":
        this.setState({ y: this.state.y - speed, direction: "up" });
        break;
      case "ArrowDown":
        this.setState({ y: this.state.y + speed, direction: "down" });
        break;
      case "ArrowLeft":
        this.setState({ x: this.state.x - speed, direction: "left" });
        break;
      case "ArrowRight":
        this.setState({ x: this.state.x + speed, direction: "right" });
        break;
      default:
        break;
    }
  };

  render() {
    return <canvas ref={this.canvasRef} width={500} height={300}></canvas>;
  }
}

export default Character;
