import React from 'react';
import { GraduationCap, Award, BookOpen, Check, Layers } from 'lucide-react';
import { academicRecords } from '../data/cvData';

interface AcademicSectionProps {
  progress: number;
}

export const AcademicSection: React.FC<AcademicSectionProps> = ({ progress }) => {
  // Reveal calculation (Phase 2 active between progress 0.15 and 0.45)
  const reveal = Math.min(1, Math.max(0, (progress - 0.15) / 0.3));
  const isWireframe = reveal < 0.55;

  return (
    <section id="academics" className="py-16 px-6 max-w-7xl mx-auto border-t border-cyan-500/20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>PHASE 02 · STRUCTURAL BEAMS & EDUCATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academic Qualifications
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Rigorous civil engineering curriculum accredited by Far Western University and CTEVT Nepal.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>REINFORCEMENT LEVEL: {Math.round(reveal * 100)}%</span>
        </div>
      </div>

      {/* 3-Column Academic Grid matching design reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {academicRecords.map((record, index) => (
          <div
            key={record.id}
            className={`p-6 rounded-2xl flex flex-col justify-between transition-all duration-500 relative overflow-hidden ${
              isWireframe
                ? 'border-2 border-dashed border-cyan-500/40 bg-cyan-950/15'
                : 'border border-cyan-500/30 bg-slate-900/80 shadow-xl hover:border-cyan-400/60'
            }`}
          >
            {/* Structural Column Marker */}
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4 text-[10px] font-mono text-slate-400">
              <span className="text-cyan-400 font-semibold">GRID_COLUMN_C0{index + 1}</span>
              <span className="text-amber-400">{record.status}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-300">
                <BookOpen className="w-4 h-4 shrink-0 text-cyan-400" />
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {record.degree}
                </h3>
              </div>

              <div className="text-xs text-slate-300 font-medium">
                <span className="text-slate-400 font-normal">Institution: </span>
                {record.institution}
              </div>

              <div className="text-xs text-slate-300">
                <span className="text-slate-400 font-normal">Accrediting Board: </span>
                <span className="text-amber-400 font-semibold">{record.board}</span>
              </div>

              {/* Key Curriculum Highlights */}
              <div className="pt-3 border-t border-slate-800/80">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-cyan-400" />
                  <span>Key Competencies Covered</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {record.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 text-[10px] mt-0.5">▪</span>
                      <span className="leading-tight">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom structural verification footer */}
            <div className="mt-6 pt-3 border-t border-cyan-500/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>STATUS: VERIFIED</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>CLEARED</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
