import React, { useState } from 'react';
import { Calculator, Download, Printer, Layers, RefreshCw, CheckCircle2, ChevronRight, FileSpreadsheet } from 'lucide-react';

interface CivilBoqCalculatorProps {
  progress: number;
}

export const CivilBoqCalculator: React.FC<CivilBoqCalculatorProps> = ({ progress }) => {
  // Currency mode
  const [currency, setCurrency] = useState<'NPR' | 'USD'>('NPR');
  const currencyRate = currency === 'NPR' ? 1 : 1 / 132;
  const currencySymbol = currency === 'NPR' ? 'NPR ' : '$';

  // Calculator Mode
  const [calcMode, setCalcMode] = useState<'concrete' | 'brickwork' | 'rebar' | 'consolidated'>('concrete');

  // Concrete Inputs (in meters)
  const [slabLength, setSlabLength] = useState<number>(10);
  const [slabWidth, setSlabWidth] = useState<number>(8);
  const [slabDepth, setSlabDepth] = useState<number>(0.125); // 125mm slab
  const [mixGrade, setMixGrade] = useState<'M15' | 'M20' | 'M25'>('M20');

  // Brickwork Inputs
  const [wallLength, setWallLength] = useState<number>(15);
  const [wallHeight, setWallHeight] = useState<number>(2.8);
  const [wallThickness, setWallThickness] = useState<number>(0.23); // 230mm (9-inch)
  const [mortarRatio, setMortarRatio] = useState<'1:4' | '1:6'>('1:6');

  // Steel Rebar Inputs
  const [barDia, setBarDia] = useState<number>(12); // mm
  const [barLength, setBarLength] = useState<number>(12); // meters per bar
  const [barCount, setBarCount] = useState<number>(60);

  // Unit Rates (in NPR base)
  const rates = {
    cementBag: 750 * currencyRate,
    sandCum: 3200 * currencyRate,
    aggregateCum: 3600 * currencyRate,
    brickSingle: 18 * currencyRate,
    steelKg: 118 * currencyRate,
  };

  // Mix Ratios (Cement : Sand : Aggregate)
  const mixRatios = {
    M15: { c: 1, s: 2, a: 4, name: 'M15 (1:2:4) - Mass Concrete / Bedding' },
    M20: { c: 1, s: 1.5, a: 3, name: 'M20 (1:1.5:3) - Standard RCC Slabs & Beams' },
    M25: { c: 1, s: 1, a: 2, name: 'M25 (1:1:2) - Heavy Columns & Foundations' },
  };

  // 1. Concrete Calculations (Standard IS 456 & CTEVT Civil Engineering code)
  const wetVolume = slabLength * slabWidth * slabDepth;
  const dryVolume = wetVolume * 1.54; // 54% extra for dry voids
  const currentRatio = mixRatios[mixGrade];
  const sumOfRatios = currentRatio.c + currentRatio.s + currentRatio.a;

  const cementVolume = (dryVolume * currentRatio.c) / sumOfRatios;
  // Cement density = 1440 kg/m³, 50kg bag = 0.0347 m³
  const cementBags = Math.ceil(cementVolume / 0.0347);
  const sandVolume = (dryVolume * currentRatio.s) / sumOfRatios;
  const aggregateVolume = (dryVolume * currentRatio.a) / sumOfRatios;
  const concreteCost =
    cementBags * rates.cementBag +
    sandVolume * rates.sandCum +
    aggregateVolume * rates.aggregateCum;

  // 2. Brickwork Calculations
  const wallVolume = wallLength * wallHeight * wallThickness;
  // Standard metric brick size with mortar = 0.24m x 0.115m x 0.057m -> ~500 bricks per m³
  const totalBricks = Math.ceil(wallVolume * 500 * 1.05); // 5% breakage
  const mortarVolume = wallVolume * 0.3; // 30% of wall is mortar
  const mortarSum = mortarRatio === '1:4' ? 5 : 7;
  const mortarCementVol = (mortarVolume * 1.3) / mortarSum; // 1.3 dry factor for mortar
  const mortarCementBags = Math.ceil(mortarCementVol / 0.0347);
  const mortarSandVol = (mortarVolume * 1.3 * (mortarSum - 1)) / mortarSum;
  const brickworkCost =
    totalBricks * rates.brickSingle +
    mortarCementBags * rates.cementBag +
    mortarSandVol * rates.sandCum;

  // 3. Steel Calculations: W = (D^2 / 162) * Length
  const unitWeightPerMeter = (barDia * barDia) / 162; // kg/m
  const totalSteelLength = barLength * barCount;
  const totalSteelWeightKg = Math.round(unitWeightPerMeter * totalSteelLength);
  const totalSteelTonnes = (totalSteelWeightKg / 1000).toFixed(2);
  const steelCost = totalSteelWeightKg * rates.steelKg;

  // Total Consolidated Estimate
  const grandTotal = concreteCost + brickworkCost + steelCost;
  const vatTax = grandTotal * 0.13;
  const totalWithTax = grandTotal + vatTax;

  // Presets loader
  const applyPreset = (preset: 'residential' | 'wall' | 'footing') => {
    if (preset === 'residential') {
      setSlabLength(12);
      setSlabWidth(10);
      setSlabDepth(0.125);
      setMixGrade('M20');
      setBarDia(12);
      setBarCount(90);
    } else if (preset === 'wall') {
      setWallLength(30);
      setWallHeight(2.1);
      setWallThickness(0.23);
      setMortarRatio('1:6');
    } else if (preset === 'footing') {
      setSlabLength(2);
      setSlabWidth(2);
      setSlabDepth(0.6);
      setMixGrade('M25');
      setBarDia(16);
      setBarCount(24);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Reveal calculation
  const reveal = Math.min(1, Math.max(0, (progress - 0.55) / 0.3));

  return (
    <section id="boq-calculator" className="py-16 px-6 max-w-7xl mx-auto border-t border-cyan-500/20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <Calculator className="w-4 h-4" />
            <span>PHASE 04 · ESTIMATION & QUANTITY SURVEYING ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Civil Quantity & BOQ Calculator
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Live estimation tool applying standard civil engineering formulas (IS 456 / CTEVT norms) for concrete mix design, masonry units, and rebar tonnage.
          </p>
        </div>

        {/* Currency & Actions Strip */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono">
            <button
              onClick={() => setCurrency('NPR')}
              className={`px-2.5 py-1 rounded transition-colors ${
                currency === 'NPR' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              NPR (रू)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded transition-colors ${
                currency === 'USD' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 rounded-lg text-xs text-cyan-300 font-mono transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print BOQ</span>
          </button>
        </div>
      </div>

      {/* Quick Presets Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
        <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">Quick Presets:</span>
        <button
          onClick={() => applyPreset('residential')}
          className="px-3 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors"
        >
          1200 sq.ft RCC Roof Slab
        </button>
        <button
          onClick={() => applyPreset('wall')}
          className="px-3 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors"
        >
          30m Perimeter Wall
        </button>
        <button
          onClick={() => applyPreset('footing')}
          className="px-3 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors"
        >
          Isolated RCC Footing (M25)
        </button>
      </div>

      {/* Tabs for Calculator Modes */}
      <div className="flex border-b border-cyan-500/20 mb-8 overflow-x-auto gap-2">
        <button
          onClick={() => setCalcMode('concrete')}
          className={`pb-3 px-4 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
            calcMode === 'concrete'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>01. Concrete & Dry Mix</span>
        </button>
        <button
          onClick={() => setCalcMode('brickwork')}
          className={`pb-3 px-4 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
            calcMode === 'brickwork'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>02. Brickwork Masonry</span>
        </button>
        <button
          onClick={() => setCalcMode('rebar')}
          className={`pb-3 px-4 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
            calcMode === 'rebar'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>03. Steel Rebar ($D^2/162$)</span>
        </button>
        <button
          onClick={() => setCalcMode('consolidated')}
          className={`pb-3 px-4 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
            calcMode === 'consolidated'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>04. Master BOQ Table</span>
        </button>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Inputs based on selected mode (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-5">
          {calcMode === 'concrete' && (
            <>
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center justify-between">
                  <span>Concrete Member Dimensions</span>
                  <span className="text-xs font-mono text-cyan-400">Dry Factor: 1.54</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Input member length, width, and thickness in meters.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Length (L) [m]
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={slabLength}
                    onChange={(e) => setSlabLength(Math.max(0.1, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Width (W) [m]
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={slabWidth}
                    onChange={(e) => setSlabWidth(Math.max(0.1, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Depth / Thick (D) [m]
                  </label>
                  <input
                    type="number"
                    step="0.025"
                    min="0.05"
                    value={slabDepth}
                    onChange={(e) => setSlabDepth(Math.max(0.01, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Mix Grade (IS:456 Standard)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['M15', 'M20', 'M25'] as const).map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => setMixGrade(grade)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        mixGrade === grade
                          ? 'border-cyan-400 bg-cyan-950/60 text-cyan-200'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-sm">{grade}</div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {grade === 'M15' && '1:2:4'}
                        {grade === 'M20' && '1:1.5:3'}
                        {grade === 'M25' && '1:1:2'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {calcMode === 'brickwork' && (
            <>
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center justify-between">
                  <span>Brick Masonry Parameters</span>
                  <span className="text-xs font-mono text-amber-400">+5% Breakage Allowance</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Standard modular brick wall dimensions and mortar mix.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Wall Length [m]
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={wallLength}
                    onChange={(e) => setWallLength(Math.max(0.5, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Wall Height [m]
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={wallHeight}
                    onChange={(e) => setWallHeight(Math.max(0.5, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Thickness [m]
                  </label>
                  <select
                    value={wallThickness}
                    onChange={(e) => setWallThickness(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  >
                    <option value={0.115}>0.115m (4.5" Half-Brick)</option>
                    <option value={0.23}>0.230m (9" Full-Brick)</option>
                    <option value={0.35}>0.350m (14" Loadbearing)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Mortar Cement:Sand Ratio
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['1:4', '1:6'] as const).map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setMortarRatio(ratio)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        mortarRatio === ratio
                          ? 'border-amber-400 bg-amber-950/40 text-amber-200'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <div className="font-bold text-sm">{ratio} Mortar</div>
                      <div className="text-[10px] text-slate-400">
                        {ratio === '1:4' ? 'High Strength / Plinth' : 'Standard Superstructure'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {calcMode === 'rebar' && (
            <>
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center justify-between">
                  <span>TMT Steel Reinforcement</span>
                  <span className="text-xs font-mono text-emerald-400">Formula: D²/162 kg/m</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Calculate weight of bar reinforcement for stirrups, beams, and columns.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Rebar Diameter (D) [mm]
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[8, 10, 12, 16, 20, 25].map((dia) => (
                    <button
                      key={dia}
                      type="button"
                      onClick={() => setBarDia(dia)}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        barDia === dia
                          ? 'border-emerald-400 bg-emerald-950/50 text-emerald-300 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <div className="text-sm font-mono">{dia}mm</div>
                      <div className="text-[9px] text-slate-500 font-mono">
                        {((dia * dia) / 162).toFixed(2)} kg/m
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Length per Bar [m]
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={barLength}
                    onChange={(e) => setBarLength(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-400 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  />
                  <div className="text-[10px] text-slate-500 mt-1">Standard factory bar = 12m</div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Total Quantity (Pieces)
                  </label>
                  <input
                    type="number"
                    step="5"
                    min="1"
                    value={barCount}
                    onChange={(e) => setBarCount(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-400 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
              </div>
            </>
          )}

          {calcMode === 'consolidated' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">
                  Consolidated BOQ Summary Sheet
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Itemized quantities and estimated costs for concrete, masonry, and steel.
                </p>
              </div>

              <div className="text-xs text-slate-300 space-y-2">
                <p>
                  This bill of quantities combines the concrete casting, brickwork masonry, and TMT rebar calculations into a unified procurement estimate ready for tender or site procurement.
                </p>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300">
                  <span>Prepared by: Smirti Bhatta (Diploma Civil Engineer)</span>
                  <br />
                  <span>Approved for estimation according to standard norms.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Calculation Results & Material Quantities (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Key Output Metrics Card */}
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Material Quantities & Takeoff
              </span>
              <span className="text-xs font-mono text-slate-400">
                Unit System: SI (Metric)
              </span>
            </div>

            {calcMode === 'concrete' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Wet Concrete Volume</div>
                    <div className="text-xl font-bold font-mono text-white tabular-nums">
                      {wetVolume.toFixed(2)} m³
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Dry Mix (Wet × 1.54)</div>
                    <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
                      {dryVolume.toFixed(2)} m³
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">OPC Cement (50kg Bags):</span>
                    <span className="font-bold text-cyan-300 text-sm tabular-nums">
                      {cementBags} Bags
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Fine Aggregate (Sand):</span>
                    <span className="font-bold text-slate-200 tabular-nums">
                      {sandVolume.toFixed(2)} m³ ({(sandVolume * 35.315).toFixed(1)} cu.ft)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Coarse Aggregate (Gravel):</span>
                    <span className="font-bold text-slate-200 tabular-nums">
                      {aggregateVolume.toFixed(2)} m³
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Estimated Concrete Cost:</span>
                    <span className="font-bold text-amber-400 text-sm tabular-nums">
                      {currencySymbol}{concreteCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {calcMode === 'brickwork' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Wall Gross Volume</div>
                    <div className="text-xl font-bold font-mono text-white tabular-nums">
                      {wallVolume.toFixed(2)} m³
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Total Bricks Required</div>
                    <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
                      {totalBricks.toLocaleString()} Pcs
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Mortar Volume (30%):</span>
                    <span className="font-bold text-slate-200 tabular-nums">{mortarVolume.toFixed(2)} m³</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Cement for Mortar:</span>
                    <span className="font-bold text-cyan-300 tabular-nums">{mortarCementBags} Bags</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Sand for Mortar:</span>
                    <span className="font-bold text-slate-200 tabular-nums">{mortarSandVol.toFixed(2)} m³</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Estimated Masonry Cost:</span>
                    <span className="font-bold text-amber-400 text-sm tabular-nums">
                      {currencySymbol}{brickworkCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {calcMode === 'rebar' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Unit Weight (D²/162)</div>
                    <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                      {unitWeightPerMeter.toFixed(3)} kg/m
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Total Steel Tonnage</div>
                    <div className="text-xl font-bold font-mono text-white tabular-nums">
                      {totalSteelTonnes} Tonnes
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Total Length of Reinforcement:</span>
                    <span className="font-bold text-slate-200 tabular-nums">{totalSteelLength} Meters</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Total Net Weight:</span>
                    <span className="font-bold text-emerald-300 text-sm tabular-nums">{totalSteelWeightKg.toLocaleString()} kg</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Estimated Rebar Cost:</span>
                    <span className="font-bold text-amber-400 text-sm tabular-nums">
                      {currencySymbol}{steelCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {calcMode === 'consolidated' && (
              <div className="space-y-3">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-2">Item</th>
                        <th className="pb-2 text-right">Qty</th>
                        <th className="pb-2 text-right">Unit</th>
                        <th className="pb-2 text-right">Amount ({currency})</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2">01. Concrete (M20)</td>
                        <td className="py-2 text-right tabular-nums">{wetVolume.toFixed(1)}</td>
                        <td className="py-2 text-right">m³</td>
                        <td className="py-2 text-right tabular-nums">{concreteCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                      </tr>
                      <tr>
                        <td className="py-2">02. Brickwork</td>
                        <td className="py-2 text-right tabular-nums">{wallVolume.toFixed(1)}</td>
                        <td className="py-2 text-right">m³</td>
                        <td className="py-2 text-right tabular-nums">{brickworkCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                      </tr>
                      <tr>
                        <td className="py-2">03. Fe500 Steel</td>
                        <td className="py-2 text-right tabular-nums">{totalSteelWeightKg}</td>
                        <td className="py-2 text-right">kg</td>
                        <td className="py-2 text-right tabular-nums">{steelCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal:</span>
                    <span className="text-slate-200 tabular-nums">
                      {currencySymbol}{grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Contingency & VAT (13%):</span>
                    <span className="text-slate-200 tabular-nums">
                      {currencySymbol}{vatTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-800 text-amber-400">
                    <span>Grand Total BOQ:</span>
                    <span className="tabular-nums">
                      {currencySymbol}{totalWithTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Civil Code & Standards Footer Note */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-200">
                Engineering Invariants & Codes Followed:
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Calculations conform to IS 456 (Plain and Reinforced Concrete), IS 1200 (Method of Measurement of Building and Civil Engineering Works), and CTEVT syllabus guidelines.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
