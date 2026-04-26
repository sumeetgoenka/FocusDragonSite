// Tiny inline SVG area chart — no deps. Server-renderable.
// Shows a smooth area + gradient fill + dot at last point.

interface Point {
  label: string;
  value: number;
}

export default function AreaChart({
  points,
  height = 180,
  accent = "#f97316",
}: {
  points: Point[];
  height?: number;
  accent?: string;
}) {
  if (points.length === 0) {
    return (
      <div
        style={{ height }}
        className="flex items-center justify-center text-sm text-zinc-500"
      >
        Not enough data yet.
      </div>
    );
  }

  const W = 1000;
  const H = height;
  const padX = 8;
  const padY = 16;
  const max = Math.max(1, ...points.map((p) => p.value));
  const stepX = (W - padX * 2) / Math.max(1, points.length - 1);

  const xy = points.map((p, i) => {
    const x = padX + i * stepX;
    const y = padY + (1 - p.value / max) * (H - padY * 2);
    return [x, y] as const;
  });

  // Smooth path via Catmull-Rom → cubic Bezier
  const linePath = xy
    .map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`;
      const [px, py] = xy[i - 1];
      const cx1 = px + (x - px) / 2;
      const cy1 = py;
      const cx2 = x - (x - px) / 2;
      const cy2 = y;
      return `C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`;
    })
    .join(" ");

  const areaPath = `${linePath} L ${xy[xy.length - 1][0]} ${H - padY} L ${xy[0][0]} ${H - padY} Z`;
  const gradId = `g-${Math.random().toString(36).slice(2, 8)}`;

  // Show ~6 evenly-spaced x-axis labels
  const labelEvery = Math.max(1, Math.ceil(points.length / 6));

  return (
    <svg
      viewBox={`0 0 ${W} ${H + 24}`}
      preserveAspectRatio="none"
      className="w-full"
      style={{ height: H + 24 }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity={0.45} />
          <stop offset="100%" stopColor={accent} stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* Horizontal gridlines */}
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={padX}
          x2={W - padX}
          y1={padY + t * (H - padY * 2)}
          y2={padY + t * (H - padY * 2)}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={1}
        />
      ))}
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} fill="none" stroke={accent} strokeWidth={2} />
      {/* Last point dot */}
      <circle
        cx={xy[xy.length - 1][0]}
        cy={xy[xy.length - 1][1]}
        r={4}
        fill={accent}
        stroke="#0a0a0b"
        strokeWidth={2}
      />
      {/* X-axis labels */}
      {points.map((p, i) =>
        i % labelEvery === 0 || i === points.length - 1 ? (
          <text
            key={i}
            x={xy[i][0]}
            y={H + 16}
            fontSize={10}
            fill="rgba(255,255,255,0.4)"
            textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            {p.label}
          </text>
        ) : null,
      )}
    </svg>
  );
}
