import React from 'react';
import { Play, Pause, RotateCcw, Users, CheckCircle, Eye } from 'lucide-react';

interface ConstructionHUDProps {
  progress: number; // 0 to 1
  onProgressChange: (newProgress: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  showCrew: boolean;
  onToggleCrew: () => void;
  onJumpToFinished: () => void;
  onOpenCvModal: () => void;
}

export const ConstructionHUD: React.FC<ConstructionHUDProps> = ({
  progress,
  onProgressChange,
  isPlaying,
  onTogglePlay,
  onReset,
  showCrew,
  onToggleCrew,
  onJumpToFinished,
  onOpenCvModal,
}) => {
  const percentage = Math.round(progress * 100);

  const getPhaseName = (p: number) => {
    if (p < 0.2) return 'Phase 01: Site Survey & Foundation';
    if (p < 0.4) return 'Phase 02: Structural Framing (Academics)';
    if (p < 0.6) return 'Phase 03: Technical Outfitting & AutoCAD';
    if (p < 0.8) return 'Phase 04: BOQ & Civil Estimation Engine';
    return 'Phase 05: Inspection Sign-off & Handover';
  };

  return (
    <div className="fixed top-20 right-4 md:right-8 z-30 select-none max-w-sm">
      <div className="bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-3 shadow-2xl text-xs text-slate-200">
        {/* Header telemetry */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono uppercase tracking-wider text-[11px] text-cyan-400 font-semibold">
              Site Construction HUD
            </span>
          </div>
          <span className="font-mono text-amber-400 font-bold tabular-nums">
            {percentage}% BUILT
          </span>
        </div>

        {/* Current active milestone */}
        <div className="mb-2.5">
          <div className="text-[10px] text-slate-400 font-mono uppercase tracking-tight">Active Milestone</div>
          <div className="font-medium text-slate-100 truncate text-[12px]">
            {getPhaseName(progress)}
          </div>
        </div>

        {/* Interactive Scrub Slider */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
            <span>0% Blueprint</span>
            <span>100% Complete</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => onProgressChange(Number(e.target.value) / 100)}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
            aria-label="Construction Progress Scrubber"
          />
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          <button
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause Construction' : 'Auto-Construct Site'}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-[11px]"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isPlaying ? 'Pause' : 'Auto'}</span>
          </button>

          <button
            onClick={onReset}
            title="Reset to Blueprint"
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-[11px]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
            <span>Reset</span>
          </button>

          <button
            onClick={onToggleCrew}
            title="Toggle Cursor Crew"
            className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-md transition-colors text-[11px] ${
              showCrew ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Crew</span>
          </button>

          <button
            onClick={onJumpToFinished}
            title="Fast Forward to Complete Site"
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-700/50 transition-colors text-[11px]"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Finish</span>
          </button>
        </div>

        {/* Quick link to Original Verified CV */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Verified Credentials:</span>
          <button
            onClick={onOpenCvModal}
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium underline-offset-2 hover:underline transition-colors"
          >
            <Eye className="w-3 h-3" />
            <span>Inspect Original CV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
