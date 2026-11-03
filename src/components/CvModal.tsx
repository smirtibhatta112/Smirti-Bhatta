import React, { useState } from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCcw, CheckCircle2, ShieldCheck, MapPin, Mail, Phone } from 'lucide-react';
import { cvProfile } from '../data/cvData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      {/* Modal Card */}
      <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-cyan-500/20 text-xs font-mono">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-bold">OFFICIAL CV DOCUMENT INSPECTION</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400">SMIRTI BHATTA · DIPLOMA CIVIL ENGINEER</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.min(2.0, zoom + 0.2))}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(Math.max(0.6, zoom - 0.2))}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <a
              href={cvProfile.photoUrl}
              download="Smirti_Bhatta_Civil_Engineer_CV.png"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg font-bold text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Viewer Body (Split: verified image preview + sidebar check) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-950/60">
          {/* Left: Scrollable & Zoomable Image Canvas */}
          <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950">
            <div
              className="transition-transform duration-200 origin-center max-w-full shadow-2xl rounded-lg overflow-hidden border border-slate-700"
              style={{ transform: `scale(${zoom})` }}
            >
              <img
                src={cvProfile.photoUrl}
                alt="Official CV - Smirti Bhatta"
                className="max-h-[80vh] w-auto object-contain block mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right: Verified Data Summary Sidebar */}
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-cyan-500/20 bg-slate-900/90 p-5 overflow-y-auto space-y-4 text-xs font-mono">
            <div className="border-b border-slate-800 pb-3">
              <div className="text-[10px] text-amber-400 uppercase tracking-wider">Document Verification</div>
              <div className="text-base font-bold text-white mt-0.5">Smirti Bhatta</div>
              <div className="text-cyan-400 text-xs">Diploma Civil Engineer</div>
            </div>

            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Pokhara, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>+977 98XXXXXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">smirtibhatta@gmail.com</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="text-slate-400 font-semibold uppercase text-[10px]">Verified Credentials</div>
              <div className="flex items-start gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-slate-200">B.E. Civil Engineering (Enrolled, Far Western University FWU)</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-slate-200">Diploma in Civil Engineering (Completed, CTEVT Nepal)</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-slate-200">AutoCAD 2D/3D & Construction Estimation</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <div className="text-slate-400 font-semibold uppercase text-[10px] mb-1">Declaration</div>
              <p className="text-[11px] text-slate-300 italic leading-snug">
                "{cvProfile.declaration}"
              </p>
              <div className="mt-2 text-amber-400 text-right font-bold">
                (Smirti Bhatta)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
