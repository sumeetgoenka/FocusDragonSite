"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// TopoJSON of world countries — served via jsdelivr CDN, lazy-fetched
// by react-simple-maps on first render.
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MapPoint {
  lat: number;
  lng: number;
  count: number;
  city: string | null;
  country: string | null;
}

export default function WorldMap({ points }: { points: MapPoint[] }) {
  // Cluster identical lat/lng so a city with 5 downloads renders as one
  // bubble sized 5x, not 5 overlapping bubbles.
  const grouped = new Map<string, MapPoint>();
  for (const p of points) {
    const key = `${p.lat.toFixed(2)},${p.lng.toFixed(2)}`;
    const existing = grouped.get(key);
    if (existing) {
      existing.count += p.count;
    } else {
      grouped.set(key, { ...p });
    }
  }
  const merged = [...grouped.values()];
  const max = Math.max(1, ...merged.map((p) => p.count));

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 160 }}
        style={{ width: "100%", height: "auto", background: "transparent" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1f2937"
                stroke="#374151"
                strokeWidth={0.4}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#374151" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {merged.map((p, i) => {
          // 4px min, 24px max — sqrt scale so big counts don't dominate
          const r = 4 + 20 * Math.sqrt(p.count / max);
          return (
            <Marker key={i} coordinates={[p.lng, p.lat]}>
              <circle
                r={r}
                fill="#f97316"
                fillOpacity={0.55}
                stroke="#fb923c"
                strokeWidth={1}
              />
              <title>
                {[p.city, p.country].filter(Boolean).join(", ") || "Unknown"} — {p.count}
              </title>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}
