import React, { useState } from 'react';
import { Send, CheckCircle2, MapPin, Mail, Phone, FileSignature, Building2, Check } from 'lucide-react';
import { cvProfile } from '../data/cvData';

export const ContactAndDeclaration: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'residential',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', projectType: 'residential', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 px-6 max-w-7xl mx-auto border-t border-cyan-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Official Declaration & Verification Seal (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="border-b border-cyan-500/20 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <FileSignature className="w-4 h-4 text-amber-400" />
              <span>OFFICIAL SEAL & DECLARATION</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Declaration of Authenticity
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm leading-relaxed italic relative">
            "{cvProfile.declaration}"
          </div>

          {/* Signature & Date/Place grid matching CV */}
          <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
            <div>
              <span className="text-slate-400">Date: </span>
              <span className="text-cyan-300">Active 2026</span>
            </div>
            <div>
              <span className="text-slate-400">Place: </span>
              <span className="text-cyan-300">Pokhara, Nepal</span>
            </div>
            <div>
              <span className="text-slate-400">Status: </span>
              <span className="text-emerald-400 font-bold">Verified Fresher</span>
            </div>
            <div>
              <span className="text-slate-400">Authorized: </span>
              <span className="text-amber-400 font-bold">Smirti Bhatta</span>
            </div>
          </div>

          {/* Signature SVG representation */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="text-[11px] font-mono text-slate-400">
              DIGITAL SIGNATURE HASH: #FWU-CTEVT-CE-2026
            </div>
            <div className="font-serif italic text-xl font-bold text-amber-400 border-b-2 border-amber-400/60 pb-1">
              Smirti Bhatta
            </div>
          </div>
        </div>

        {/* Right: Site Inspection & Collaboration Portal (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="border-b border-cyan-500/20 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>PROJECT COLLABORATION & HIRING</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Get in Touch with Smirti
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Available for junior civil engineering roles, AutoCAD drafting contracts, and site supervision.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Inquiry Transmitted Successfully</h4>
              <p className="text-xs text-slate-300">
                Thank you for reaching out! Smirti will review your project requirements and respond promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Your Name / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kathmandu Engineering Consultants"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-3 py-2 text-white font-sans text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-3 py-2 text-white font-sans text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Opportunity Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-3 py-2 text-white font-sans text-xs"
                >
                  <option value="residential">Site Engineer / Field Supervision</option>
                  <option value="cad">AutoCAD 2D/3D Drafting Work</option>
                  <option value="boq">Quantity Surveying & BOQ Takeoff</option>
                  <option value="fulltime">Full-time Civil Engineering Position</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Project Details / Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your project scope, location, and requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-3 py-2 text-white font-sans text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-sans rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-500/10"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Collaboration Request</span>
              </button>
            </form>
          )}

          {/* Quick Direct Links */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono gap-2">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>smirtibhatta@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pokhara, Nepal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="mt-16 pt-8 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          © 2026 Smirti Bhatta · Diploma Civil Engineer · B.E. Civil Engineering (FWU)
        </div>
        <div className="flex items-center gap-3 text-cyan-500/70">
          <span>{cvProfile.motto}</span>
          <span>·</span>
          <span>{cvProfile.tagline}</span>
        </div>
      </footer>
    </section>
  );
};
