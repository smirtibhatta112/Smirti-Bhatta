import React, { useMemo } from 'react';
import { Compass, HardHat, Calculator, ShieldCheck } from 'lucide-react';

interface ConstructionCursorCrewProps {
  scrollProgress: number; // 0 to 1
  isScrollingUp: boolean;
  isVisible: boolean;
}

interface CursorDef {
  id: string;
  name: string;
  role: string;
  color: string;
  accentBg: string;
  borderColor: string;
  textColor: string;
  icon: React.ReactNode;
  // Waypoints at progress: 0.0, 0.25, 0.50, 0.75, 1.0
  points: { x: number; y: number; action: string; reverseAction: string }[];
}

export const ConstructionCursorCrew: React.FC<ConstructionCursorCrewProps> = ({
  scrollProgress,
  isScrollingUp,
  isVisible,
}) => {
  if (!isVisible) return null;

  // Define 4 specialized civil engineering cursors
  const cursors: CursorDef[] = useMemo(
    () => [
      {
        id: 'cad-designer',
        name: 'CAD Designer',
        role: 'Architectural Drafting',
        color: '#38bdf8', // sky-400
        accentBg: 'rgba(56, 189, 248, 0.15)',
        borderColor: '#38bdf8',
        textColor: '#e0f2fe',
        icon: <Compass className="w-3 h-3 text-sky-400" />,
        points: [
          { x: 18, y: 16, action: 'DRAFTING BLUEPRINT GRID', reverseAction: 'RETRACTING GRID' },
          { x: 74, y: 28, action: 'ALIGNING PROFILE FRAME', reverseAction: 'UNHOOKING FRAME' },
          { x: 26, y: 46, action: 'DRAWING TIMELINE AXES', reverseAction: 'ERASING AXES' },
          { x: 80, y: 64, action: 'AUTOCAD LAYER MESH', reverseAction: 'COLLAPSING LAYERS' },
          { x: 30, y: 84, action: 'CALIBRATING BOQ SLAB', reverseAction: 'DE-CALIBRATING' },
        ],
      },
      {
        id: 'site-engineer',
        name: 'Site Engineer',
        role: 'Structural Foundation',
        color: '#f59e0b', // amber-500
        accentBg: 'rgba(245, 158, 11, 0.15)',
        borderColor: '#f59e0b',
        textColor: '#fef3c7',
        icon: <HardHat className="w-3 h-3 text-amber-400" />,
        points: [
          { x: 62, y: 22, action: 'POURING FOOTING CONCRETE', reverseAction: 'CHIPPING CONCRETE' },
          { x: 84, y: 38, action: 'ANCHORING HERO BANNER', reverseAction: 'REMOVING ANCHORS' },
          { x: 68, y: 52, action: 'ERECTING COLUMN C1-C4', reverseAction: 'DISMANTLING COLUMNS' },
          { x: 22, y: 70, action: 'LEVEL INSPECTION ±0.00', reverseAction: 'RESETTING DATUM' },
          { x: 70, y: 88, action: 'REBAR CAGE PLACEMENT', reverseAction: 'LIFTING REBAR' },
        ],
      },
      {
        id: 'estimator',
        name: 'Estimator',
        role: 'Quantity & BOQ Engine',
        color: '#10b981', // emerald-500
        accentBg: 'rgba(16, 185, 129, 0.15)',
        borderColor: '#10b981',
        textColor: '#d1fae5',
        icon: <Calculator className="w-3 h-3 text-emerald-400" />,
        points: [
          { x: 38, y: 26, action: 'QUANTIFYING TOTAL AREA', reverseAction: 'CLEARING TAKEOFF' },
          { x: 32, y: 40, action: 'COMPUTING CEMENT RATIOS', reverseAction: 'RESETTING RATIOS' },
          { x: 78, y: 58, action: 'PRICING STEEL FE500', reverseAction: 'UNSETTING RATES' },
          { x: 48, y: 76, action: 'BALANCING BOQ FORMULAS', reverseAction: 'CLEARING SUMS' },
          { x: 54, y: 92, action: 'AUDITING TOTAL NPR/USD', reverseAction: 'RESETTING AUDIT' },
        ],
      },
      {
        id: 'structural-lead',
        name: 'Structural Lead',
        role: 'Field Quality Sign-off',
        color: '#a855f7', // purple-500
        accentBg: 'rgba(168, 85, 247, 0.15)',
        borderColor: '#a855f7',
        textColor: '#f3e8ff',
        icon: <ShieldCheck className="w-3 h-3 text-purple-400" />,
        points: [
          { x: 82, y: 14, action: 'VERIFYING CODE IS:456', reverseAction: 'UNSIGNING DRAWINGS' },
          { x: 46, y: 32, action: 'STAMPING CTEVT ACCREDITATION', reverseAction: 'REVOKING STAMP' },
          { x: 40, y: 62, action: 'INSPECTING FORM-WORK', reverseAction: 'STRIPPING SHUTTERING' },
          { x: 88, y: 78, action: 'TOLERANCE CHECK: 99.8%', reverseAction: 'RECALIBRATING' },
          { x: 86, y: 94, action: 'OFFICIAL DECLARATION SEAL', reverseAction: 'OPENING ENVELOPE' },
        ],
      },
    ],
    []
  );

  // Helper to interpolate between 5 waypoints based on progress 0 -> 1
  const getInterpolatedPosition = (cursor: CursorDef, progress: number) => {
    const clamped = Math.max(0, Math.min(1, progress));
    const segments = cursor.points.length - 1;
    const scaled = clamped * segments;
    const index = Math.min(Math.floor(scaled), segments - 1);
    const subProgress = scaled - index;

    const p0 = cursor.points[index];
    const p1 = cursor.points[index + 1];

    // Smooth cubic easing for mechanical precision
    const ease = (t: number) => t * t * (3 - 2 * t);
    const t = ease(subProgress);

    const x = p0.x + (p1.x - p0.x) * t;
    const y = p0.y + (p1.y - p0.y) * t;
    const action = isScrollingUp ? (p1.reverseAction || p0.reverseAction) : p0.action;

    return { x, y, action };
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* SVG Vector Laser guide beams */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="laser-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="laser-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {cursors.map((c, idx) => {
          const pos = getInterpolatedPosition(c, scrollProgress);
          // Target anchor offset simulating drafting crossline
          const targetX = (pos.x + (idx % 2 === 0 ? 12 : -12)) % 100;
          const targetY = (pos.y + (idx < 2 ? 8 : -8)) % 100;

          return (
            <g key={`laser-${c.id}`}>
              {/* Construction guide line */}
              <line
                x1={`${pos.x}vw`}
                y1={`${pos.y}vh`}
                x2={`${targetX}vw`}
                y2={`${targetY}vh`}
                stroke={c.color}
                strokeWidth="1.2"
                strokeDasharray="4 4"
                opacity="0.45"
              />
              {/* Target crosshair snap point */}
              <circle
                cx={`${targetX}vw`}
                cy={`${targetY}vh`}
                r="3"
                fill="none"
                stroke={c.color}
                strokeWidth="1.5"
                opacity="0.7"
              />
              <line
                x1={`calc(${targetX}vw - 6px)`}
                y1={`${targetY}vh`}
                x2={`calc(${targetX}vw + 6px)`}
                y2={`${targetY}vh`}
                stroke={c.color}
                strokeWidth="1"
                opacity="0.7"
              />
              <line
                x1={`${targetX}vw`}
                y1={`calc(${targetY}vh - 6px)`}
                x2={`${targetX}vw`}
                y2={`calc(${targetY}vh + 6px)`}
                stroke={c.color}
                strokeWidth="1"
                opacity="0.7"
              />
            </g>
          );
        })}
      </svg>

      {/* Render the 4 cursors */}
      {cursors.map((cursor, idx) => {
        const { x, y, action } = getInterpolatedPosition(cursor, scrollProgress);

        return (
          <div
            key={cursor.id}
            className="absolute transition-transform duration-100 ease-out will-change-transform"
            style={{
              transform: `translate3d(${x}vw, ${y}vh, 0)`,
              zIndex: 50 + idx,
            }}
          >
            {/* Architectural Drafting Pointer Cursor */}
            <div className="relative">
              {/* Cursor SVG Arrow with Precision Crosshair */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] filter"
              >
                <path
                  d="M3 2L10.5 21L13.5 13.5L21 10.5L3 2Z"
                  fill={cursor.color}
                  stroke="#0f172a"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Pulsing welding spark / laser point */}
              <span
                className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full animate-ping pointer-events-none"
                style={{ backgroundColor: cursor.color, opacity: 0.7 }}
              />

              {/* Multi-role cursor label badge */}
              <div
                className="absolute left-5 -top-1 flex flex-col gap-0.5 rounded-md px-2 py-1 shadow-xl backdrop-blur-md border whitespace-nowrap select-none"
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.92)',
                  borderColor: cursor.borderColor,
                }}
              >
                <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide">
                  {cursor.icon}
                  <span style={{ color: cursor.color }}>{cursor.name}</span>
                  <span className="text-[9px] text-slate-400 font-normal">[{cursor.role}]</span>
                </div>

                {/* Live construction action ticker */}
                <div className="flex items-center gap-1 text-[9px] font-mono text-slate-300">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: cursor.color }}
                  />
                  <span className="tracking-tighter">
                    {action} ({Math.round(x)}°, {Math.round(y)}°)
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
