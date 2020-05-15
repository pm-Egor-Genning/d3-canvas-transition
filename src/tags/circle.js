import { sizeTags } from '../size';

const tau = 2;

export default function(node, stroke, fill, point) {
  const attrs = node.attrs,
    ctx = node.context,
    f = node.factor;
  ctx.beginPath();
  ctx.arc(
    f * (attrs.get('cx') || 0),
    f * (attrs.get('cy') || 0),
    f * (attrs.get('r') || 0),
    attrs.get('startAngle') || 0,
    (attrs.get('endAngle') || tau) * Math.PI,
    attrs.get('anticlockwise') || false
  );
  ctx.closePath();
  if (stroke) {
    const dash = attrs.get('stroke-dasharray');
    if (dash) {
      ctx.setLineDash(dash.split(','));
    }
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }
  if (point && ctx.isPointInPath(point.x, point.y)) {
    point.nodes.push(node);
  }
}

sizeTags.circle = function(node) {
  const r = node.factor * (node.attrs.get('r') || 0);
  return {
    x: node.factor * (node.attrs.get('cx') || 0) - r,
    y: node.factor * (node.attrs.get('cy') || 0) - r,
    width: 2 * r,
    height: 2 * r
  };
};
