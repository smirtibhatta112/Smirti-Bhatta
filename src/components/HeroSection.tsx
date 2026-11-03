import React from 'react';
import { MapPin, Phone, Mail, Globe, ArrowRight, Building, Ruler, Calculator, ShieldCheck } from 'lucide-react';
import { cvProfile } from '../data/cvData';

interface HeroSectionProps {
  progress: number;
  onOpenCvModal: () => void;
  onScrollToCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  progress,
  onOpenCvModal,
  onScrollToCalculator,
}) => {
  // Reveal intensity for Hero (0 -> 1 within progress 0.0 to 0.35)
  const reveal = Math.min(1, Math.max(0, progress / 0.35));
  const isWireframe = reveal < 0.6;

  return (
    <section id="profile" className="relative pt-12 pb-16 px-6 max-w-7xl mx-auto">
      {/* Top architectural reference line */}
      <div className="flex items-center justify-between text-[11px] font-mono text-cyan-500/70 pb-3 border-b border-cyan-500/20 mb-8">
        <div className="flex items-center gap-3">
          <span>PROJECT: SMIRTI_BHATTA_PORTFOLIO</span>
          <span>·</span>
          <span>DATUM: ±0.00m POKHARA</span>
          <span>·</span>
          <span>SHEET: 01/05</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-amber-400/80">
          <span>CONSTRUCTION STATUS:</span>
          <span className="font-semibold">{Math.round(reveal * 100)}% ASSEMBLED</span>
        </div>
      </div>

      {/* Main 2-column Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Architectural credentials & Career Objective (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Blueprint Stamp & Tagline */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 rounded">
                CIVIL ENGINEERING PORTFOLIO
              </span>
              <span className="text-slate-400 italic">"{cvProfile.tagline}"</span>
            </div>

            {/* Display Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-2">
                {cvProfile.name}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-cyan-400 tracking-tight">
                {cvProfile.title}
              </p>
              <p className="text-sm font-medium text-slate-300">
                {cvProfile.enrolledDegree} · Far Western University (FWU)
              </p>
            </div>

            {/* Contact & Location Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 font-mono py-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{cvProfile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${cvProfile.email}`} className="hover:text-cyan-300 transition-colors">
                  {cvProfile.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{cvProfile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Nationality: {cvProfile.nationality}</span>
              </div>
            </div>

            {/* Career Objective Box with dynamic construction border */}
            <div
              className={`p-5 rounded-xl transition-all duration-500 relative ${
                isWireframe
                  ? 'border-2 border-dashed border-cyan-500/40 bg-cyan-950/20'
                  : 'border border-cyan-500/30 bg-slate-900/80 shadow-xl'
              }`}
            >
              {/* Corner crosshairs */}
              <span className="absolute -top-1.5 -left-1.5 text-cyan-400 font-mono text-[10px]">+</span>
              <span className="absolute -bottom-1.5 -right-1.5 text-cyan-400 font-mono text-[10px]">+</span>

              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" />
                  <span>Career Objective</span>
                </h2>
                <span className="text-[10px] font-mono text-slate-500">
                  {isWireframe ? '[WIRE-FRAME DRAFT]' : '[SPECIFICATION LOCKED]'}
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {cvProfile.objective}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <button
              onClick={onScrollToCalculator}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg shadow-amber-500/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Civil BOQ Estimator</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCvModal}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-cyan-300 hover:text-cyan-200 bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 rounded-lg transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>View Verified CV Document</span>
            </button>
          </div>
        </div>

        {/* Right Column: Architectural Profile Card & Civil Engineering Visual (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div
            className={`h-full min-h-[380px] rounded-2xl relative overflow-hidden flex flex-col justify-between transition-all duration-500 p-6 ${
              isWireframe
                ? 'border-2 border-dashed border-cyan-500/40 bg-cyan-950/15'
                : 'border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 shadow-2xl'
            }`}
          >
            {/* Background CAD grid */}
            <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />

            {/* Top CAD dimension bar */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-cyan-400 border-b border-cyan-500/20 pb-2">
              <span>CAD_FRAME: PROFILE_01</span>
              <span>SCALE: 1:50</span>
              <span>28.2096° N, 83.9856° E</span>
            </div>

            {/* Photo & Silhouette Layout */}
            <div className="relative z-10 my-4 flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Image container with CAD technical bracket */}
              <div className="relative shrink-0">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-cyan-400/80 shadow-2xl bg-slate-800 relative group">
                  <img
                    src={cvProfile.photoUrl}
                    alt="Smirti Bhatta - Civil Engineer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Blueprint scanline overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-slate-950/70 pointer-events-none" />
                </div>
                {/* Engineering badge */}
                <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  NEPAL
                </div>
              </div>

              {/* Identity Details */}
              <div className="space-y-2 text-center sm:text-left">
                <div className="text-xs font-mono text-amber-400 font-semibold tracking-wider">
                  CERTIFIED DIPLOMA ENGINEER
                </div>
                <div className="text-lg font-bold text-white">
                  Smirti Bhatta
                </div>
                <div className="text-xs text-slate-300 leading-snug">
                  Specialized in building construction, AutoCAD layouts, surveying leveling loops, and material takeoff.
                </div>
                <div className="pt-1 flex flex-wrap gap-1.5 justify-center sm:justify-start text-[11px] font-mono text-cyan-300">
                  <span>AutoCAD</span>
                  <span>·</span>
                  <span>BOQ</span>
                  <span>·</span>
                  <span>RCC Design</span>
                </div>
              </div>
            </div>

            {/* Bottom structural motto */}
            <div className="relative z-10 pt-3 border-t border-cyan-500/20 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px]">{cvProfile.motto}</span>
              <button
                onClick={onOpenCvModal}
                className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] underline underline-offset-2 flex items-center gap-1"
              >
                <span>Full Sheet</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width KPI strip below the split (4 columns) */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-sm">
          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1">Undergraduate Study</div>
          <div className="text-lg font-bold text-white">B.E. Civil Engineering</div>
          <div className="text-xs text-slate-400 mt-0.5">Far Western University (FWU)</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-sm">
          <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-1">Technical Board</div>
          <div className="text-lg font-bold text-white">Diploma in Civil Eng.</div>
          <div className="text-xs text-slate-400 mt-0.5">CTEVT Nepal Accredited</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-sm">
          <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1">Drafting & CAD</div>
          <div className="text-lg font-bold text-white">AutoCAD 2D / 3D</div>
          <div className="text-xs text-slate-400 mt-0.5">Structural & Architectural</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-sm">
          <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">Estimation & BOQ</div>
          <div className="text-lg font-bold text-white">Quantity Surveying</div>
          <div className="text-xs text-slate-400 mt-0.5">Material & Cost Analysis</div>
        </div>
      </div>
    </section>
  );
};
