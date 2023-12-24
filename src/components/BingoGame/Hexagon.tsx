import { useEffect, useRef } from "react";

function HexagonAbilityChart({
  data,
  width,
  height,
  color,
}: {
  data: any;
  width: number;
  height: number;
  color: string;
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
   

    function computeHexagonPoints(width: number, height: number, edge: number) {
      let centerX = width / 2;
      let centerY = height / 2;
      let x = (edge * Math.sqrt(3)) / 2;
      let left = centerX - x;
      let x1, x2, x3, x4, x5, x6;
      let y1, y2, y3, y4, y5, y6;
      x5 = x6 = left;
      x2 = x3 = left + x * 2; // 修复：定义 x2 和 x3
      x1 = x4 = left + x;

      let y = edge / 2;
      let top = centerY - 2 * y;
      y1 = top;
      y2 = y6 = top + y;
      y3 = y5 = top + 3 * y;
      y4 = top + 4 * y;

      let points = new Array();
      points[0] = [x1, y1];
      points[1] = [x2, y2];
      points[2] = [x3, y3];
      points[3] = [x4, y4];
      points[4] = [x5, y5];
      points[5] = [x6, y6];
      return points;
    }

    function drawHexagonInner(edge: number) {
      ctx.strokeStyle = color;
      for (let i = 0; i < 6; i++) {
        const points = computeHexagonPoints(edge - (i * edge) / 5, edge, edge); // TODO
        ctx.beginPath();
        ctx.moveTo(points[5][0], points[5][1]);
        for (let j = 0; j < 6; j++) {
          ctx.lineTo(points[j][0], points[j][1]);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }

    function drawLines() {
      ctx.beginPath();
      ctx.strokeStyle = color;
      for (let i = 0; i < 3; i++) {
        ctx.moveTo(data[0][i][0], data[0][i][1]);
        ctx.lineTo(data[0][i + 3][0], data[0][i + 3][1]);
        ctx.stroke();
      }
      ctx.closePath();
    }

    function drawCover() {
      const centerX = width / 2;
      const centerY = height / 2;
      const coverPoints = [];

      for (let i = 0; i < data[0].length; i++) {
        coverPoints.push([
          centerX + (data[0][i][0] - centerX) * (data[1][i].score / 100.0),
          centerY + (data[0][i][1] - centerY) * (data[1][i].score / 100.0),
        ]);
      }

      ctx.beginPath();
      ctx.fillStyle = "rgba(90,200,250,0.4)";
      ctx.moveTo(coverPoints[5][0], coverPoints[5][1]);
      for (let j = 0; j < 6; j++) {
        ctx.lineTo(coverPoints[j][0], coverPoints[j][1]);
      }
      ctx.stroke();
      ctx.closePath();
      ctx.fill();
    }

    function drawPoints(pointRadius: number) {
      ctx.fillStyle = color;
      for (let i = 0; i < data[1].length; i++) {
        ctx.beginPath();
        ctx.arc(data[0][i][0], data[0][i][1], pointRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    function drawText() {
      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      const textPos = data[0];

      for (let i = 0; i < textPos.length; i++) {
        const item = data[1][i];
        const pos = textPos[i];

        function drawUpText() {
          const nameMeasure = ctx.measureText(item.name);
          const scoreMeasure = ctx.measureText(item.score);

          ctx.fillStyle = "#8E8E8E";
          ctx.fillText(item.name, pos[0] - nameMeasure.width / 2, pos[1] - 26);
          ctx.fillStyle = "#212121";
          ctx.fillText(
            item.score,
            pos[0] - scoreMeasure.width / 2,
            pos[1] - 10
          );
        }

        function drawDownText() {
          const nameMeasure = ctx.measureText(item.name);
          const scoreMeasure = ctx.measureText(item.score);

          ctx.fillStyle = "#8E8E8E";
          ctx.fillText(item.name, pos[0] - nameMeasure.width / 2, pos[1] + 16);
          ctx.fillStyle = "#212121";
          ctx.fillText(
            item.score,
            pos[0] - scoreMeasure.width / 2,
            pos[1] + 32
          );
        }

        function drawLeftText() {
          const nameMeasure = ctx.measureText(item.name);
          const scoreMeasure = ctx.measureText(item.score);

          ctx.fillStyle = "#8E8E8E";
          ctx.fillText(item.name, pos[0] - nameMeasure.width - 10, pos[1]);
          ctx.fillStyle = "#212121";
          ctx.fillText(
            item.score,
            pos[0] - 10 - (nameMeasure.width + scoreMeasure.width) / 2,
            pos[1] + 16
          );
        }

        function drawRightText() {
          const nameMeasure = ctx.measureText(item.name);
          const scoreMeasure = ctx.measureText(item.score);

          ctx.fillStyle = "#8E8E8E";
          ctx.fillText(item.name, pos[0] - nameMeasure.width + 26, pos[1]);
          ctx.fillStyle = "#212121";
          ctx.fillText(
            item.score,
            pos[0] + 26 - (nameMeasure.width + scoreMeasure.width) / 2,
            pos[1] + 16
          );
        }

        if (i === 0) {
          drawUpText();
        } else if (i === 1 || i === 2) {
          drawRightText();
        } else if (i === 3) {
          drawDownText();
        } else if (i === 4 || i === 5) {
          drawLeftText();
        }
      }
    }

    drawHexagonInner(100);
    drawLines();
    drawCover();
    drawPoints(5);
    drawText();
  }, [data, width, height, color]);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
}

export default HexagonAbilityChart;
