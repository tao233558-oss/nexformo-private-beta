export function sampleGlyphAlphaPoints(
  alpha: Uint8ClampedArray,
  width: number,
  height: number,
  targetCount: number,
) {
  const candidates: Array<[number, number]> = [];
  const stride = Math.max(1, Math.floor(Math.sqrt((width * height) / Math.max(1, targetCount * 5))));
  for (let y = 0; y < height; y += stride) {
    for (let x = 0; x < width; x += stride) {
      if (alpha[(y * width + x) * 4 + 3] > 96) candidates.push([x, y]);
    }
  }
  const result = new Float32Array(Math.max(0, targetCount) * 3);
  if (!candidates.length) return result;
  for (let index = 0; index < targetCount; index += 1) {
    const candidate = candidates[Math.floor(index * candidates.length / targetCount) % candidates.length];
    result[index * 3] = (candidate[0] / Math.max(1, width - 1) - 0.5) * 4.4;
    result[index * 3 + 1] = (0.5 - candidate[1] / Math.max(1, height - 1)) * 1.3;
    result[index * 3 + 2] = (((index * 2654435761) >>> 0) / 0xffffffff - 0.5) * 0.16;
  }
  return result;
}

export function glyphPointsAreBounded(points: Float32Array) {
  for (let index = 0; index < points.length; index += 3) {
    if (!Number.isFinite(points[index]) || Math.abs(points[index]) > 2.21) return false;
    if (!Number.isFinite(points[index + 1]) || Math.abs(points[index + 1]) > 0.66) return false;
    if (!Number.isFinite(points[index + 2]) || Math.abs(points[index + 2]) > 0.09) return false;
  }
  return true;
}
