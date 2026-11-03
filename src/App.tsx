/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { ConstructionHUD } from './components/ConstructionHUD';
import { ConstructionCursorCrew } from './components/ConstructionCursorCrew';
import { HeroSection } from './components/HeroSection';
import { AcademicSection } from './components/AcademicSection';
import { TechnicalSkillsSection } from './components/TechnicalSkillsSection';
import { CivilBoqCalculator } from './components/CivilBoqCalculator';
import { CadBlueprintViewer } from './components/CadBlueprintViewer';
import { ContactAndDeclaration } from './components/ContactAndDeclaration';
import { CvModal } from './components/CvModal';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCrew, setShowCrew] = useState(true);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  const prevScrollRef = useRef(0);
  const autoPlayTimerRef = useRef<number | null>(null);

  // Monitor window scroll to calculate progress (0 to 1) and direction
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const currentScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScroll / totalScroll));
      setScrollProgress(progress);

      if (currentScroll < prevScrollRef.current) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
      prevScrollRef.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play construction sequence
  useEffect(() => {
    if (isPlaying) {
      autoPlayTimerRef.current = window.setInterval(() => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const nextScroll = window.scrollY + 6;

        if (nextScroll >= totalScroll) {
          setIsPlaying(false);
        } else {
          window.scrollTo({ top: nextScroll, behavior: 'auto' });
        }
      }, 20);
    } else {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPlaying]);

  // Handle manual scrub from HUD slider
  const handleProgressChange = (newProgress: number) => {
    setIsPlaying(false);
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: newProgress * totalScroll,
      behavior: 'smooth',
    });
  };

  const handleReset = () => {
    setIsPlaying(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToFinished = () => {
    setIsPlaying(false);
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: totalScroll, behavior: 'smooth' });
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('boq-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 blueprint-grid relative selection:bg-cyan-500 selection:text-slate-950">
      {/* Background CAD Ambient glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />

      {/* Construction Multi-Cursor Crew Simulation */}
      <ConstructionCursorCrew
        scrollProgress={scrollProgress}
        isScrollingUp={isScrollingUp}
        isVisible={showCrew}
      />

      {/* Construction Engineering HUD */}
      <ConstructionHUD
        progress={scrollProgress}
        onProgressChange={handleProgressChange}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReset={handleReset}
        showCrew={showCrew}
        onToggleCrew={() => setShowCrew(!showCrew)}
        onJumpToFinished={handleJumpToFinished}
        onOpenCvModal={() => setIsCvModalOpen(true)}
      />

      {/* Top 3-Zone Navigation Bar */}
      <Navbar
        onOpenCvModal={() => setIsCvModalOpen(true)}
        onOpenContact={handleOpenContact}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Phase 01: Hero Foundation & Profile */}
        <HeroSection
          progress={scrollProgress}
          onOpenCvModal={() => setIsCvModalOpen(true)}
          onScrollToCalculator={handleScrollToCalculator}
        />

        {/* Phase 02: Structural Framing (Academics) */}
        <AcademicSection progress={scrollProgress} />

        {/* Phase 03: Technical Outfitting & AutoCAD */}
        <TechnicalSkillsSection progress={scrollProgress} />

        {/* Phase 04: Civil BOQ & Material Estimation Engine */}
        <CivilBoqCalculator progress={scrollProgress} />

        {/* Phase 05: CAD Architectural Blueprint Viewer */}
        <CadBlueprintViewer progress={scrollProgress} />

        {/* Official Declaration & Project Contact */}
        <ContactAndDeclaration />
      </main>

      {/* Lightbox Modal for Original Verified CV */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />
    </div>
  );
}
