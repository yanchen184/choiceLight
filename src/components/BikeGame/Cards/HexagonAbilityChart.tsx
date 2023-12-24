import { useEffect, useRef, useState } from "react";
import bob from "../../../image/Cards/bob.png";

function HexagonAbilityChart(props: {
  edge: number;
  data: any;
  width: number;
  height: number;
}) {
  const canvasRef = useRef(null);
  const [hoverInfo, setHoverInfo] = useState("");
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [showHoverInfo, setShowHoverInfo] = useState(false);
  const [hoverInfoTimer, setHoverInfoTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const [countdown, setCountdown] = useState(0);
  // 使用 useEffect 来更新倒计时
  useEffect(() => {
    if (countdown === null) {
      return;
    }

    if (countdown > 0) {
      // 每秒减少倒计时
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // 返回清除定时器的函数
      return () => clearInterval(timer);
    } else {
      // 倒计时结束，清除倒计时状态
      setCountdown(0);
    }
  }, [countdown]);

  const MAX_LIMIT = 10; // 设置能力值的最大值
  function computeHexagonPoints(width: number, height: number, edge: number) {
    let centerX = width / 2;
    let centerY = height / 2;
    let x = (edge * Math.sqrt(3)) / 2;
    let left = centerX - x;
    let x1, x2, x3, x4, x5, x6;
    let y1, y2, y3, y4, y5, y6;
    x5 = x6 = left;
    x2 = x3 = left + x * 2;
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

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.font = "18px Arial"; // 設置字體大小
    // 在需要绘制文本之前设置发光效果属性
    const width = canvas.width;
    const height = canvas.height;
    const edge = props.edge; // 六边形边长
    const data = props.data; // 六种能力数据

    function drawHexagonInner(edge: number) {
      context.strokeStyle = "#000"; // 六边形边框颜色
      for (var i = 0; i < 6; i++) {
        var allPoints = computeHexagonPoints(
          width,
          height,
          edge - (i * edge) / 5
        );
        context.beginPath();
        context.moveTo(allPoints[5][0], allPoints[5][1]);
        for (var j = 0; j < 6; j++) {
          context.lineTo(allPoints[j][0], allPoints[j][1]);
        }
        context.closePath();
        context.stroke();
      }
    }

    function drawLines() {
      context.beginPath();
      context.strokeStyle = "#000"; // 直线颜色
      for (let i = 0; i < 3; i++) {
        context.moveTo(
          computeHexagonPoints(width, height, edge)[i][0],
          computeHexagonPoints(width, height, edge)[i][1]
        );
        context.lineTo(
          computeHexagonPoints(width, height, edge)[i + 3][0],
          computeHexagonPoints(width, height, edge)[i + 3][1]
        );
        context.stroke();
      }
      context.closePath();
    }

    function drawCover() {
      let tmpCoverPoints = computeHexagonPoints(width, height, edge);
      let coverPoints = [];

      let centerX = width / 2;
      let centerY = height / 2;
      for (let i = 0; i < tmpCoverPoints.length; i++) {
        coverPoints.push([
          centerX +
            (tmpCoverPoints[i][0] - centerX) * (data[i].score / MAX_LIMIT),
          centerY +
            (tmpCoverPoints[i][1] - centerY) * (data[i].score / MAX_LIMIT),
        ]);
      }

      context.beginPath();
      context.fillStyle = "rgba(90, 200, 250, 0.4)"; // 覆盖区域颜色
      context.moveTo(coverPoints[5][0], coverPoints[5][1]);
      for (var j = 0; j < 6; j++) {
        context.lineTo(coverPoints[j][0], coverPoints[j][1]);
      }
      context.stroke();
      context.closePath();
      context.fill();
    }

    function drawPoints(pointRadius: number) {
      context.fillStyle = "#000"; // 点的颜色
      let coverPoints = [];
      let centerX = width / 2;
      let centerY = height / 2;
      for (let i = 0; i < data.length; i++) {
        coverPoints.push([
          centerX +
            (computeHexagonPoints(width, height, edge)[i][0] - centerX) *
              (data[i].score / MAX_LIMIT),
          centerY +
            (computeHexagonPoints(width, height, edge)[i][1] - centerY) *
              (data[i].score / MAX_LIMIT),
        ]);
      }
      for (let i = 0; i < coverPoints.length; i++) {
        context.beginPath();
        context.arc(
          coverPoints[i][0],
          coverPoints[i][1],
          pointRadius,
          0,
          Math.PI * 2
        );
        context.closePath();
        context.fill();
      }
    }

    function hoverChange(i: number) {
      if (i === hoverIndex) {
        context.fillStyle = "#FF0000"; // 文本颜色
      }
    }
    // 绘制上侧的文字
    function drawUpText(
      item: { name: any; score: any },
      pos: number[],
      i: number
    ) {
      let nameMeasure = context.measureText(item.name);
      let scoreMeasure = context.measureText(item.score);

      context.fillStyle = "#8E8E8E"; // 文本颜色

      hoverChange(i);
      context.fillText(item.name, pos[0] - nameMeasure.width / 2, pos[1] - 26);
      context.fillStyle = "#212121"; // 文本颜色
      hoverChange(i);
      context.fillText(
        item.score,
        pos[0] - scoreMeasure.width / 2,
        pos[1] - 10
      );
    }

    // 绘制右侧的文字
    function drawRightText(
      item: { name: any; score: any },
      pos: number[],
      i: number
    ) {
      let nameMeasure = context.measureText(item.name);
      let scoreMeasure = context.measureText(item.score);
      context.fillStyle = "#8E8E8E"; // 文本颜色
      hoverChange(i);
      context.fillText(item.name, pos[0] - nameMeasure.width + 60, pos[1]);
      context.fillStyle = "#212121"; // 文本颜色
      hoverChange(i);
      context.fillText(
        item.score,
        pos[0] + 60 - (nameMeasure.width + scoreMeasure.width) / 2,
        pos[1] + 16
      );
    }

    // 绘制下侧的文字
    function drawDownText(
      item: { name: any; score: any },
      pos: number[],
      i: number
    ) {
      let nameMeasure = context.measureText(item.name);
      let scoreMeasure = context.measureText(item.score);

      context.fillStyle = "#8E8E8E"; // 文本颜色
      hoverChange(i);
      context.fillText(item.name, pos[0] - nameMeasure.width / 2, pos[1] + 16);
      context.fillStyle = "#212121"; // 文本颜色
      hoverChange(i);
      context.fillText(
        item.score,
        pos[0] - scoreMeasure.width / 2,
        pos[1] + 32
      );
    }

    // 绘制左侧的文字
    function drawLeftText(
      item: { name: any; score: any },
      pos: number[],
      i: number
    ) {
      let nameMeasure = context.measureText(item.name);
      let scoreMeasure = context.measureText(item.score);

      context.fillStyle = "#8E8E8E"; // 文本颜色
      hoverChange(i);
      context.fillText(item.name, pos[0] - nameMeasure.width - 10, pos[1]);
      context.fillStyle = "#212121"; // 文本颜色
      hoverChange(i);
      context.fillText(
        item.score,
        pos[0] - 10 - (nameMeasure.width + scoreMeasure.width) / 2,
        pos[1] + 16
      );
    }

    function drawText() {
      context.fillStyle = "#000"; // 文本颜色
      context.strokeStyle = "#000"; // 文本边框颜色
      let textPos = computeHexagonPoints(width, height, edge);
      for (let i = 0; i < textPos.length; i++) {
        let item = data[i];
        let pos = textPos[i];
        if (i === 0) {
          drawUpText(item, pos, i);
        } else if (i === 1 || i === 2) {
          drawRightText(item, pos, i);
        } else if (i === 3) {
          drawDownText(item, pos, i);
        } else if (i === 4 || i === 5) {
          drawLeftText(item, pos, i);
        }
      }
    }

    // 清空画布
    context.clearRect(0, 0, width, height);

    // 绘制六边形能力图
    drawHexagonInner(edge);
    drawLines();
    drawCover();
    drawPoints(5); // 设置点的半径大小
    drawText();
  }, [props.data, props.edge, props.width, props.height, hoverIndex]);

  return (
    <div className="flex justify-center items-center">
      <canvas
        ref={canvasRef}
        width={props.width as number}
        height={props.height as number}
        onMouseMove={(e: React.MouseEvent<HTMLCanvasElement>) =>
          handleMouseMove(e)
        }
        onMouseLeave={() => handleMouseLeave()}
        style={{ cursor: "pointer" }} // 设置鼠标样式为指针
      ></canvas>
      {showHoverInfo && (
        <div className="hover-info right-0 top-0 mt-4 ml-4 absolute p-4 bg-white rounded shadow-lg">
          <img src={bob} alt="bob" className="w-200 h-200" />
          <p>{hoverInfo}</p>
          {countdown !== null && <p>到計時: {countdown} 秒</p>}
        </div>
      )}
    </div>
  );

  // 在 handleMouseMove 函数中修改 setHoverIndex
  function handleMouseMove(event: any) {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    // const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 检查鼠标位置是否在文本区域内
    let textPos = computeHexagonPoints(props.width, props.height, props.edge);
    for (let i = 0; i < textPos.length; i++) {
      let pos = textPos[i];
      let textWidth = 150;
      let textHeight = 70; // 文本高度

      if (
        x >= pos[0] - textWidth / 2 &&
        x <= pos[0] + textWidth / 2 &&
        y >= pos[1] - textHeight / 2 &&
        y <= pos[1] + textHeight / 2
      ) {
        // 在此處添加條件，以確定是否應該設置悬停索引
        if (i !== hoverIndex) {
          setHoverIndex(i); // 设置悬停的文本索引
          setHoverInfo(props.data[i].describe); // 你可以根据需要从数据中获取 hoverInfo
          setShowHoverInfo(true); // 显示 hoverInfo
          if (hoverInfoTimer) {
            clearTimeout(hoverInfoTimer);
          }
          setCountdown(0);
        }
        return;
      }
    }
  }

  // 在 handleMouseLeave 函数中设置定时器来延迟隐藏 hoverInfo
  function handleMouseLeave() {
    // 停止之前的倒计时
    setCountdown(3);
    setHoverIndex(-1);
    // 延迟三秒后隐藏 hoverInfo
    const timer = setTimeout(() => {
      setHoverInfo("");
      setShowHoverInfo(false);
    }, 3000);

    // 存储定时器的引用，以便后续取消
    setHoverInfoTimer(timer);
  }
}

export default HexagonAbilityChart;
