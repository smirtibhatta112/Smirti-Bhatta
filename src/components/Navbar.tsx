import React from 'react';
import { Eye, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenCvModal: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCvModal, onOpenContact }) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/85 backdrop-blur-md border-b border-cyan-500/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single Brand element wordmark */}
        <a
          href="#profile"
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 bg-cyan-400 rotate-45 border border-cyan-200" />
          <span>Smirti Bhatta</span>
        </a>

        {/* Zone 2: 4–5 single-line clean text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#profile"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Profile
          </a>
          <a
            href="#academics"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Academics
          </a>
          <a
            href="#skills"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Technical Skills
          </a>
          <a
            href="#boq-calculator"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            BOQ Calculator
          </a>
          <a
            href="#cad-viewer"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            CAD Blueprint
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCvModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect Verified CV</span>
          </button>
        </div>
      </div>
    </header>
  );
};
