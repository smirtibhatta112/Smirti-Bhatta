import React, { useState } from 'react';
import { Cpu, PenTool, CheckCircle, Compass, HardHat, Terminal } from 'lucide-react';
import { skillCategories } from '../data/cvData';

interface TechnicalSkillsSectionProps {
  progress: number;
}

export const TechnicalSkillsSection: React.FC<TechnicalSkillsSectionProps> = ({ progress }) => {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);

  // Reveal intensity for Phase 3 (progress between 0.35 and 0.65)
  const reveal = Math.min(1, Math.max(0, (progress - 0.35) / 0.3));
  const isWireframe = reveal < 0.55;

  const currentCategory = skillCategories.find((cat) => cat.id === activeTab) || skillCategories[0];

  return (
    <section id="skills" className="py-16 px-6 max-w-7xl mx-auto border-t border-cyan-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Compass className="w-4 h-4" />
            <span>PHASE 03 · TECHNICAL SPECIFICATIONS & CAD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Matrix & Skills
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            AutoCAD drafting capabilities, surveying instrument handling, and on-site construction management.
          </p>
        </div>

        {/* Tab switcher buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-cyan-500/30 rounded-xl overflow-x-auto">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeTab === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat.id === 'technical-civil' && 'Civil Principles'}
              {cat.id === 'computer-cad' && 'AutoCAD & Software'}
              {cat.id === 'personal-strengths' && 'Field Mindset'}
            </button>
          ))}
        </div>
      </div>

      {/* Category description & status */}
      <div className="mb-6 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div>{currentCategory.description}</div>
        <div className="text-amber-400">
          OUTFITTING LEVEL: {Math.round(reveal * 100)}%
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentCategory.skills.map((skill, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl transition-all duration-500 flex flex-col justify-between ${
              isWireframe
                ? 'border-2 border-dashed border-cyan-500/40 bg-cyan-950/10'
                : 'border border-cyan-500/30 bg-slate-900/70 shadow-lg hover:border-cyan-400/50 hover:bg-slate-900/90'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-cyan-400">
                  SPEC_{String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-mono text-amber-400 font-semibold px-2 py-0.5 bg-amber-400/10 rounded border border-amber-400/20">
                  {skill.level}
                </span>
              </div>

              <h4 className="text-base font-bold text-white tracking-tight mb-2">
                {skill.name}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {skill.details}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Standard: IS/NBC Standard</span>
              <span className="text-cyan-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Operational</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AutoCAD Interactive Command Prompt Terminal Widget */}
      <div className="mt-8 p-4 rounded-xl bg-slate-950 border border-cyan-500/30 font-mono text-xs text-slate-300 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2 text-cyan-400 text-[11px]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>AUTOCAD CIVIL WORKSPACE CONSOLE — COMMAND LINE</span>
          </div>
          <span className="text-[10px] text-slate-500">UCS: WORLD · ORTHO: ON · OSNAP: ACTIVE</span>
        </div>
        <div className="space-y-1 text-[11px]">
          <div className="text-slate-400">
            <span className="text-cyan-400">Command:</span> _LAYER [Loaded: 0_WALL, S_BEAM, S_COLUMN, D_DIMENSION, REBAR_TIE]
          </div>
          <div className="text-slate-400">
            <span className="text-cyan-400">Command:</span> _DIST 1st point (0,0) 2nd point (6500, 3200) Distance = 7244.99mm
          </div>
          <div className="text-emerald-400 flex items-center gap-2">
            <span className="text-cyan-400">Command:</span> _READY: Smirti Bhatta technical drafting profile verified.
            <span className="w-2 h-3.5 bg-cyan-400 animate-pulse inline-block" />
          </div>
        </div>
      </div>
    </section>
  );
};
