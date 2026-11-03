import React, { useState } from 'react';
import { Layers, Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw, Ruler, Check } from 'lucide-react';
import { civilProjects } from '../data/cvData';

interface CadBlueprintViewerProps {
  progress: number;
}

export const CadBlueprintViewer: React.FC<CadBlueprintViewerProps> = ({ progress }) => {
  // Layer visibility state
  const [showGrid, setShowGrid] = useState(true);
  const [showColumns, setShowColumns] = useState(true);
  const [showWalls, setShowWalls] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showRebar, setShowRebar] = useState(true);

  // Zoom level
  const [zoom, setZoom] = useState(1);

  // Active project tab
  const [activeProject, setActiveProject] = useState(civilProjects[0].id);
  const currentProject = civilProjects.find((p) => p.id === activeProject) || civilProjects[0];

  // Measure mode
  const [measureMode, setMeasureMode] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<{ x: number; y: number }[]>([]);

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!measureMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 800);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 500);

    if (measurePoints.length >= 2) {
      setMeasurePoints([{ x, y }]);
    } else {
      setMeasurePoints([...measurePoints, { x, y }]);
    }
  };

  // Calculate measured distance in mm (scale: 1px = 15mm)
  const measuredDistanceMm =
    measurePoints.length === 2
      ? Math.round(
          Math.sqrt(
            Math.pow(measurePoints[1].x - measurePoints[0].x, 2) +
              Math.pow(measurePoints[1].y - measurePoints[0].y, 2)
          ) * 15
        )
      : null;

  return (
    <section id="cad-viewer" className="py-16 px-6 max-w-7xl mx-auto border-t border-cyan-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Layers className="w-4 h-4" />
            <span>PHASE 05 · AUTOCAD ARCHITECTURAL BLUEPRINT VIEWER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            CAD Architectural & Structural Plans
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Interactive vector CAD viewport with toggleable structural layers, grid axes, and digital measurement calipers.
          </p>
        </div>

        {/* Project selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
          {civilProjects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeProject === p.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p.title.split(' ')[0]} {p.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Main CAD Viewer Container */}
      <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden relative">
        {/* CAD Top Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border-b border-cyan-500/20 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">AUTOCAD CIVIL 2026</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 truncate max-w-xs">{currentProject.title}</span>
            <span className="text-slate-500">|</span>
            <span className="text-amber-400">SCALE 1:50</span>
          </div>

          {/* Layer Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 text-[11px]">LAYERS:</span>
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-2 py-1 rounded text-[11px] border transition-colors ${
                showGrid
                  ? 'border-cyan-400 bg-cyan-950 text-cyan-300'
                  : 'border-slate-800 bg-slate-950 text-slate-500 line-through'
              }`}
            >
              01_GRID
            </button>
            <button
              onClick={() => setShowColumns(!showColumns)}
              className={`px-2 py-1 rounded text-[11px] border transition-colors ${
                showColumns
                  ? 'border-amber-400 bg-amber-950 text-amber-300'
                  : 'border-slate-800 bg-slate-950 text-slate-500 line-through'
              }`}
            >
              02_COLUMNS
            </button>
            <button
              onClick={() => setShowWalls(!showWalls)}
              className={`px-2 py-1 rounded text-[11px] border transition-colors ${
                showWalls
                  ? 'border-slate-300 bg-slate-800 text-slate-100'
                  : 'border-slate-800 bg-slate-950 text-slate-500 line-through'
              }`}
            >
              03_WALLS
            </button>
            <button
              onClick={() => setShowDimensions(!showDimensions)}
              className={`px-2 py-1 rounded text-[11px] border transition-colors ${
                showDimensions
                  ? 'border-sky-400 bg-sky-950 text-sky-300'
                  : 'border-slate-800 bg-slate-950 text-slate-500 line-through'
              }`}
            >
              04_DIMS
            </button>
            <button
              onClick={() => setShowRebar(!showRebar)}
              className={`px-2 py-1 rounded text-[11px] border transition-colors ${
                showRebar
                  ? 'border-emerald-400 bg-emerald-950 text-emerald-300'
                  : 'border-slate-800 bg-slate-950 text-slate-500 line-through'
              }`}
            >
              05_REBAR
            </button>
          </div>

          {/* Viewport Zoom & Measure controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setMeasureMode(!measureMode);
                setMeasurePoints([]);
              }}
              title="Click-to-measure point-to-point"
              className={`flex items-center gap-1 px-2.5 py-1 rounded border text-[11px] transition-colors ${
                measureMode
                  ? 'border-amber-400 bg-amber-950 text-amber-300 font-bold'
                  : 'border-slate-800 bg-slate-900 text-slate-300'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>{measureMode ? 'Measuring...' : 'Measure'}</span>
            </button>

            <button
              onClick={() => setZoom(Math.min(1.8, zoom + 0.15))}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(Math.max(0.7, zoom - 0.15))}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setZoom(1);
                setMeasurePoints([]);
              }}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Viewport interactive SVG CAD canvas */}
        <div className="relative w-full h-[450px] overflow-hidden blueprint-grid flex items-center justify-center p-4">
          {/* Caliper HUD readout when measuring */}
          {measureMode && (
            <div className="absolute top-4 left-4 z-20 bg-slate-900/95 border border-amber-400 rounded-lg p-2.5 shadow-2xl text-xs font-mono">
              <div className="text-amber-400 font-bold flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5" />
                <span>MEASURE TOOL ACTIVE</span>
              </div>
              <div className="text-slate-300 text-[11px] mt-1">
                {measurePoints.length === 0 && 'Click first point on blueprint...'}
                {measurePoints.length === 1 && 'Click second point to measure distance...'}
                {measurePoints.length === 2 && (
                  <span className="text-emerald-400 font-bold">
                    Distance: {measuredDistanceMm?.toLocaleString()} mm ({(measuredDistanceMm! / 1000).toFixed(2)}m)
                  </span>
                )}
              </div>
            </div>
          )}

          {/* SVG Vector Architectural Drawing */}
          <svg
            viewBox="0 0 800 500"
            className="w-full h-full max-w-4xl transition-transform duration-200 select-none cursor-crosshair"
            style={{ transform: `scale(${zoom})` }}
            onClick={handleSvgClick}
          >
            {/* Background CAD axes */}
            {showGrid && (
              <g id="layer-grid" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.4">
                {/* Horizontal grid lines */}
                <line x1="80" y1="100" x2="720" y2="100" />
                <line x1="80" y1="220" x2="720" y2="220" />
                <line x1="80" y1="360" x2="720" y2="360" />

                {/* Vertical grid lines */}
                <line x1="120" y1="60" x2="120" y2="420" />
                <line x1="300" y1="60" x2="300" y2="420" />
                <line x1="500" y1="60" x2="500" y2="420" />
                <line x1="680" y1="60" x2="680" y2="420" />

                {/* Grid Bubbles & Labels */}
                {/* Letters Vertical */}
                <circle cx="90" cy="100" r="14" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="90" y="104" fill="#38bdf8" fontSize="12" fontFamily="monospace" textAnchor="middle">A</text>

                <circle cx="90" cy="220" r="14" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="90" y="224" fill="#38bdf8" fontSize="12" fontFamily="monospace" textAnchor="middle">B</text>

                <circle cx="90" cy="360" r="14" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="90" y="364" fill="#38bdf8" fontSize="12" fontFamily="monospace" textAnchor="middle">C</text>

                {/* Numbers Horizontal */}
                <circle cx="120" cy="40" r="14" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="120" y="44" fill="#38bdf8" fontSize="12" fontFamily="monospace" textAnchor="middle">1</text>

                <circle cx="300" cy="40" r="14" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="300" y="44" fill="#38bdf8" fontSize="12" fontFamily="monospace" textAnchor="middle">2</text>

                <circle cx="500" cy="40" r="14" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="500" y="44" fill="#38bdf8" fontSize="12" fontFamily="monospace" textAnchor="middle">3</text>

                <circle cx="680" cy="40" r="14" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="680" y="44" fill="#38bdf8" fontSize="12" fontFamily="monospace" textAnchor="middle">4</text>
              </g>
            )}

            {/* Plinth Beams & Walls Layer */}
            {showWalls && (
              <g id="layer-walls" stroke="#f8fafc" strokeWidth="3" fill="none">
                {/* External Perimeter Wall */}
                <rect x="120" y="100" width="560" height="260" stroke="#94a3b8" strokeWidth="4" />

                {/* Internal partitions */}
                <line x1="300" y1="100" x2="300" y2="360" stroke="#64748b" strokeWidth="2.5" />
                <line x1="500" y1="100" x2="500" y2="240" stroke="#64748b" strokeWidth="2.5" />
                <line x1="120" y1="220" x2="300" y2="220" stroke="#64748b" strokeWidth="2.5" />

                {/* Door openings & swing arcs */}
                <path d="M 280 220 A 40 40 0 0 1 300 180" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" />
                <line x1="280" y1="220" x2="300" y2="180" stroke="#38bdf8" strokeWidth="1.5" />

                {/* Room Names */}
                <text x="210" y="160" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" textAnchor="middle">MASTER BEDROOM</text>
                <text x="210" y="175" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">4.2m × 3.6m</text>

                <text x="210" y="290" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" textAnchor="middle">LIVING / DINING</text>
                <text x="210" y="305" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">4.2m × 4.8m</text>

                <text x="400" y="230" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" textAnchor="middle">KITCHEN & UTILITY</text>
                <text x="400" y="245" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">3.0m × 3.6m</text>

                <text x="590" y="170" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" textAnchor="middle">VERANDAH / BALCONY</text>
                <text x="590" y="300" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" textAnchor="middle">STAIRCASH HALL</text>
              </g>
            )}

            {/* RCC Structural Columns Layer */}
            {showColumns && (
              <g id="layer-columns">
                {[
                  { x: 120, y: 100, label: 'C1' },
                  { x: 300, y: 100, label: 'C2' },
                  { x: 500, y: 100, label: 'C3' },
                  { x: 680, y: 100, label: 'C4' },
                  { x: 120, y: 220, label: 'C5' },
                  { x: 300, y: 220, label: 'C6' },
                  { x: 500, y: 220, label: 'C7' },
                  { x: 680, y: 220, label: 'C8' },
                  { x: 120, y: 360, label: 'C9' },
                  { x: 300, y: 360, label: 'C10' },
                  { x: 500, y: 360, label: 'C11' },
                  { x: 680, y: 360, label: 'C12' },
                ].map((col, i) => (
                  <g key={`col-${i}`}>
                    {/* Column 300x300mm hatch */}
                    <rect
                      x={col.x - 10}
                      y={col.y - 10}
                      width="20"
                      height="20"
                      fill="#b45309"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                    />
                    <line x1={col.x - 10} y1={col.y - 10} x2={col.x + 10} y2={col.y + 10} stroke="#fef3c7" strokeWidth="0.8" />
                    <line x1={col.x - 10} y1={col.y + 10} x2={col.x + 10} y2={col.y - 10} stroke="#fef3c7" strokeWidth="0.8" />
                    <text
                      x={col.x + 14}
                      y={col.y - 4}
                      fill="#f59e0b"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {col.label}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {/* Rebar Ties Layer */}
            {showRebar && (
              <g id="layer-rebar" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3">
                <line x1="120" y1="100" x2="680" y2="100" />
                <line x1="120" y1="220" x2="680" y2="220" />
                <line x1="120" y1="360" x2="680" y2="360" />
                <text x="690" y="224" fill="#10b981" fontSize="9" fontFamily="monospace">4-16Φ TMT</text>
              </g>
            )}

            {/* Dimension Lines Layer */}
            {showDimensions && (
              <g id="layer-dimensions" stroke="#38bdf8" strokeWidth="1" fill="#38bdf8">
                {/* Horizontal Top Overall Dimension */}
                <line x1="120" y1="75" x2="680" y2="75" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
                <line x1="120" y1="70" x2="120" y2="85" />
                <line x1="680" y1="70" x2="680" y2="85" />
                <text x="400" y="70" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  TOTAL SPAN: 14,000 mm (14.00m)
                </text>

                {/* Vertical Left Overall Dimension */}
                <line x1="60" y1="100" x2="60" y2="360" />
                <line x1="55" y1="100" x2="70" y2="100" />
                <line x1="55" y1="360" x2="70" y2="360" />
                <text
                  x="50"
                  y="235"
                  fill="#38bdf8"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                  transform="rotate(-90 50 235)"
                >
                  WIDTH: 8,400 mm (8.40m)
                </text>
              </g>
            )}

            {/* Active Measure Line */}
            {measurePoints.map((pt, i) => (
              <g key={`measure-pt-${i}`}>
                <circle cx={pt.x} cy={pt.y} r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                <text x={pt.x + 6} y={pt.y - 4} fill="#f59e0b" fontSize="10" fontFamily="monospace">
                  P{i + 1} ({pt.x}, {pt.y})
                </text>
              </g>
            ))}
            {measurePoints.length === 2 && (
              <line
                x1={measurePoints[0].x}
                y1={measurePoints[0].y}
                x2={measurePoints[1].x}
                y2={measurePoints[1].y}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            )}
          </svg>
        </div>

        {/* Project Technical Specifications Footer */}
        <div className="p-4 bg-slate-900 border-t border-cyan-500/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          {currentProject.specs.map((spec, i) => (
            <div key={i}>
              <div className="text-slate-400 text-[10px] uppercase">{spec.label}</div>
              <div className="text-cyan-300 font-bold mt-0.5">{spec.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
