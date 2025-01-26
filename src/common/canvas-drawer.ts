export function drawX(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  strokeWidth: number,
  color: string,
  size: number,
): void {
  ctx.beginPath();
  // Top-left to bottom-right
  ctx.moveTo(cx - size, cy - size);
  ctx.lineTo(cx + size, cy + size);

  // Top-right to bottom-left
  ctx.moveTo(cx + size, cy - size);
  ctx.lineTo(cx - size, cy + size);

  ctx.strokeStyle = color;
  ctx.lineWidth = strokeWidth;
  ctx.stroke();
  ctx.closePath();
}

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  length: number,
  angleFromX: number,
  color: string,
  lineWidth: number,
): void {
  const arrowHeadLength = 10; // Fixed arrowhead length
  const endX = x + length * Math.cos(angleFromX);
  const endY = y + length * Math.sin(angleFromX);

  ctx.beginPath();

  // Main line
  ctx.moveTo(x, y);
  ctx.lineTo(endX, endY);

  // Arrowhead
  ctx.lineTo(
    endX - arrowHeadLength * Math.cos(angleFromX - Math.PI / 6),
    endY - arrowHeadLength * Math.sin(angleFromX - Math.PI / 6),
  );
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - arrowHeadLength * Math.cos(angleFromX + Math.PI / 6),
    endY - arrowHeadLength * Math.sin(angleFromX + Math.PI / 6),
  );

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();
}
