'use client';

import { useState, useMemo, useEffect } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
type RaceType = 'tri_sprint' | 'tri_olympic' | 'tri_703' | 'tri_ironman' | 'bike' | 'run';
type HeatLevel = 'cool' | 'moderate' | 'hot';
type GutLevel = 'beginner' | 'moderate' | 'advanced';
type NutritionType = 'gels' | 'bars' | 'drink_mix';
type FuelingStrategy = 'conservative' | 'standard' | 'aggressive';

type CoffeeType = 'none' | 'single_espresso' | 'double_espresso' | 'cappuccino_single' | 'cappuccino_double' | 'nespresso' | 'brewed' | 'custom';
type CafGelPattern = 'none' | 'first_half' | 'alternate' | 'all';

interface LegPlan {
  name: string;
  durationMin: number;
  carbGPerH: number;
  carbTotal: number;
  fluidMlPerH: number;
  fluidTotal: number;
  sodiumMgPerH: number;
  sodiumTotal: number;
  caffeineNote: string;
  caffeineMg: number;
  canFuel: boolean;
}

// ─── Constants (evidence-based) ──────────────────────────────────────────────
const RACE_PRESETS: Record<RaceType, { label: string; legs: { name: string; defaultMin: number; canFuel: boolean }[] }> = {
  tri_sprint:  { label: 'Sprint Triathlon',  legs: [{ name: 'Swim', defaultMin: 15, canFuel: false }, { name: 'Bike', defaultMin: 35, canFuel: true }, { name: 'Run', defaultMin: 22, canFuel: true }] },
  tri_olympic: { label: 'Olympic Triathlon', legs: [{ name: 'Swim', defaultMin: 25, canFuel: false }, { name: 'Bike', defaultMin: 70, canFuel: true }, { name: 'Run', defaultMin: 50, canFuel: true }] },
  tri_703:     { label: 'Half Ironman (70.3)', legs: [{ name: 'Swim', defaultMin: 38, canFuel: false }, { name: 'Bike', defaultMin: 165, canFuel: true }, { name: 'Run', defaultMin: 120, canFuel: true }] },
  tri_ironman: { label: 'Ironman',           legs: [{ name: 'Swim', defaultMin: 75, canFuel: false }, { name: 'Bike', defaultMin: 360, canFuel: true }, { name: 'Run', defaultMin: 270, canFuel: true }] },
  bike:        { label: 'Cycling Event',     legs: [{ name: 'Bike', defaultMin: 180, canFuel: true }] },
  run:         { label: 'Running Event',     legs: [{ name: 'Run', defaultMin: 120, canFuel: true }] },
};

const GUT_CARB_CEILING: Record<GutLevel, number> = { beginner: 60, moderate: 80, advanced: 120 };
const GUT_LABELS: Record<GutLevel, string> = {
  beginner: 'Beginner — haven\'t practiced race fueling much',
  moderate: 'Moderate — regular gel/drink training',
  advanced: 'Advanced — trained gut, dual-transport carbs',
};

// Strategy multiplier applied to base carb rate
const STRATEGY_MULT: Record<FuelingStrategy, number> = { conservative: 0.85, standard: 1.0, aggressive: 1.15 };
const STRATEGY_LABELS: Record<FuelingStrategy, string> = {
  conservative: 'Conservative — lower risk',
  standard: 'Standard — balanced',
  aggressive: 'Aggressive — max performance',
};

// Caffeine dose derived from fueling strategy — no separate sensitivity selector
const STRATEGY_CAFFEINE_DOSE: Record<FuelingStrategy, number> = { conservative: 2, standard: 3, aggressive: 5 };

const COFFEE_CAFFEINE: Record<CoffeeType, number> = {
  none: 0,
  single_espresso: 65,
  double_espresso: 130,
  cappuccino_single: 65,
  cappuccino_double: 130,
  nespresso: 70,
  brewed: 100,
  custom: 0
};

const COFFEE_LABELS: Record<CoffeeType, string> = {
  none: 'None',
  single_espresso: 'Single Espresso',
  double_espresso: 'Double Espresso',
  cappuccino_single: 'Cappuccino (Single)',
  cappuccino_double: 'Cappuccino (Double)',
  nespresso: 'Nespresso Capsule',
  brewed: 'Brewed Coffee (200ml)',
  custom: 'Custom Dose'
};

const NUTRITION_LABELS: Record<NutritionType, string> = {
  gels: 'Energy Gels',
  bars: 'Energy Bars',
  drink_mix: 'Drink Mix',
};

const FLUID_RANGE: Record<HeatLevel, [number, number]> = { cool: [350, 500], moderate: [500, 700], hot: [700, 1000] };
const SODIUM_RANGE: Record<HeatLevel, [number, number]> = { cool: [300, 500], moderate: [500, 700], hot: [700, 1000] };

// Base carb rate by race duration, then clamped to gut ceiling and scaled by strategy
function carbRateForDuration(totalRaceMin: number, gutCeiling: number, strategy: FuelingStrategy): number {
  if (totalRaceMin < 60) return 0;
  let base: number;
  if (totalRaceMin < 120) base = 45;
  else if (totalRaceMin < 180) base = 60;
  else if (totalRaceMin < 300) base = 80; // 70.3 range
  else base = 90; // Ironman range
  return Math.min(Math.round(base * STRATEGY_MULT[strategy]), gutCeiling);
}

function avg(range: [number, number]): number { return Math.round((range[0] + range[1]) / 2); }

// ─── Component ───────────────────────────────────────────────────────────────
export default function NutritionCalculator() {
  const [raceType, setRaceType] = useState<RaceType>('tri_703');
  const [bodyMass, setBodyMass] = useState<number>(75);
  const [gutLevel, setGutLevel] = useState<GutLevel>('moderate');
  const [heat, setHeat] = useState<HeatLevel>('moderate');
  const [strategy, setStrategy] = useState<FuelingStrategy>('standard');
  const [useCaffeine, setUseCaffeine] = useState<boolean>(true);
  const [bikeFuelType, setBikeFuelType] = useState<NutritionType>('drink_mix');
  const [runFuelType, setRunFuelType] = useState<NutritionType>('gels');
  const [bikeBottleCount, setBikeBottleCount] = useState<number>(2);
  const [bikeBottleVolume, setBikeBottleVolume] = useState<number>(750);
  const [legDurations, setLegDurations] = useState<number[]>([]);
  // Product customization
  const [carbsPerGel, setCarbsPerGel] = useState<number>(25);
  const [carbsPerBar, setCarbsPerBar] = useState<number>(40);
  const [carbsPerScoop, setCarbsPerScoop] = useState<number>(30);
  const [sodiumPerGel, setSodiumPerGel] = useState<number>(50);
  const [sodiumPerScoop, setSodiumPerScoop] = useState<number>(300);
  const [sodiumPerCap, setSodiumPerCap] = useState<number>(215);

  // Caffeine customization
  const [coffeeType, setCoffeeType] = useState<CoffeeType>('none');
  const [coffeeCaffeine, setCoffeeCaffeine] = useState<number>(0);
  const [coffeeTiming, setCoffeeTiming] = useState<number>(60);
  const [caffeinePerGel, setCaffeinePerGel] = useState<number>(0);
  const [caffeinePerScoop, setCaffeinePerScoop] = useState<number>(0);
  const [caffeineTablet, setCaffeineTablet] = useState<number>(100);

  // Caffeinated gel profile
  const [cafGelCarbs, setCafGelCarbs] = useState<number>(25);
  const [cafGelSodium, setCafGelSodium] = useState<number>(50);
  const [cafGelCaffeine, setCafGelCaffeine] = useState<number>(30);
  const [runCafGelPattern, setRunCafGelPattern] = useState<CafGelPattern>('none');

  const preset = RACE_PRESETS[raceType];
  const durations = preset.legs.map((leg, i) => legDurations[i] ?? leg.defaultMin);
  const totalRaceMin = durations.reduce((a, b) => a + b, 0);

  const handleRaceChange = (r: RaceType) => {
    setRaceType(r);
    setLegDurations([]);
  };

  const setLegDuration = (idx: number, val: number) => {
    setLegDurations(prev => {
      const next = [...preset.legs.map((l, i) => prev[i] ?? l.defaultMin)];
      next[idx] = val;
      return next;
    });
  };

  // Sync coffee caffeine when type changes (non-custom only)
  useEffect(() => {
    if (coffeeType !== 'custom') {
      setTimeout(() => {
        setCoffeeCaffeine(COFFEE_CAFFEINE[coffeeType]);
      }, 0);
    }
  }, [coffeeType]);

  // Compute plan
  const plan = useMemo((): LegPlan[] => {
    const gutCeiling = GUT_CARB_CEILING[gutLevel];
    const baseCarb = carbRateForDuration(totalRaceMin, gutCeiling, strategy);
    const fluidPerH = avg(FLUID_RANGE[heat]);
    const sodiumPerH = avg(SODIUM_RANGE[heat]);

    return preset.legs.map((leg, i) => {
      const dur = durations[i];
      if (!leg.canFuel) {
        return { name: leg.name, durationMin: dur, carbGPerH: 0, carbTotal: 0, fluidMlPerH: 0, fluidTotal: 0, sodiumMgPerH: 0, sodiumTotal: 0, caffeineNote: 'No fueling during swim', caffeineMg: 0, canFuel: false };
      }
      // Bike gets slightly higher carb rate than run (easier to digest)
      const isRun = leg.name === 'Run';
      const carbRate = isRun ? Math.min(baseCarb, Math.round(baseCarb * 0.85)) : baseCarb;
      const fluid = isRun ? Math.round(fluidPerH * 0.85) : fluidPerH;
      const sodium = isRun ? Math.round(sodiumPerH * 0.9) : sodiumPerH;

      const firstFuelableIdx = preset.legs.findIndex(l => l.canFuel);
      const isFirstFuelable = i === firstFuelableIdx;

      let cafNote = '';
      if (useCaffeine && isFirstFuelable && caffeineTablet > 0) {
        cafNote = `Take ${caffeineTablet} mg pill pre-race`;
      }

      return {
        name: leg.name, durationMin: dur, canFuel: true,
        carbGPerH: carbRate, carbTotal: Math.round(carbRate * (dur / 60)),
        fluidMlPerH: fluid, fluidTotal: Math.round(fluid * (dur / 60)),
        sodiumMgPerH: sodium, sodiumTotal: Math.round(sodium * (dur / 60)),
        caffeineNote: cafNote, caffeineMg: 0,
      };
    });
  }, [preset, durations, totalRaceMin, gutLevel, strategy, heat, useCaffeine, caffeineTablet]);

  const totals = useMemo(() => ({
    carbs: plan.reduce((a, l) => a + l.carbTotal, 0),
    fluid: plan.reduce((a, l) => a + l.fluidTotal, 0),
    sodium: plan.reduce((a, l) => a + l.sodiumTotal, 0),
    caffeine: plan.reduce((a, l) => a + l.caffeineMg, 0),
  }), [plan]);



  const sodiumAccounting = useMemo(() => {
    const bikeLeg = plan.find(l => l.name === 'Bike' && l.canFuel);
    const runLeg = plan.find(l => l.name === 'Run' && l.canFuel);

    const getLegSodium = (leg: LegPlan | undefined, fuelType: NutritionType) => {
      if (!leg) return { targetSodiumMg: 0, productSodiumMg: 0, deficitSodiumMg: 0, surplusSodiumMg: 0, additionalCaps: 0, plannedCapSodiumMg: 0, plannedTotalSodiumMg: 0 };
      let prodSodium = 0;
      if (fuelType === 'drink_mix') {
        prodSodium = Math.ceil(leg.carbTotal / carbsPerScoop) * sodiumPerScoop;
      } else if (fuelType === 'gels') {
        prodSodium = Math.ceil(leg.carbTotal / carbsPerGel) * sodiumPerGel;
      }
      const targetSodiumMg = leg.sodiumTotal;
      const productSodiumMg = prodSodium;
      const deficitSodiumMg = Math.max(0, targetSodiumMg - productSodiumMg);
      const surplusSodiumMg = Math.max(0, productSodiumMg - targetSodiumMg);
      const additionalCaps = deficitSodiumMg > 0 ? Math.ceil(deficitSodiumMg / sodiumPerCap) : 0;
      const plannedCapSodiumMg = additionalCaps * sodiumPerCap;
      const plannedTotalSodiumMg = productSodiumMg + plannedCapSodiumMg;
      
      return { targetSodiumMg, productSodiumMg, deficitSodiumMg, surplusSodiumMg, additionalCaps, plannedCapSodiumMg, plannedTotalSodiumMg };
    };

    const bike = getLegSodium(bikeLeg, bikeFuelType);
    const run = getLegSodium(runLeg, runFuelType);
    
    const totalTargetSodiumMg = bike.targetSodiumMg + run.targetSodiumMg;
    const totalProductSodiumMg = bike.productSodiumMg + run.productSodiumMg;
    const totalCapSodiumMg = bike.plannedCapSodiumMg + run.plannedCapSodiumMg;
    const totalPlannedSodiumMg = bike.plannedTotalSodiumMg + run.plannedTotalSodiumMg;
    const totalSurplusOrDeficitMg = totalPlannedSodiumMg - totalTargetSodiumMg;
    
    return { bike, run, totalTargetSodiumMg, totalProductSodiumMg, totalCapSodiumMg, totalPlannedSodiumMg, totalSurplusOrDeficitMg };
  }, [plan, bikeFuelType, runFuelType, carbsPerGel, carbsPerScoop, sodiumPerGel, sodiumPerScoop, sodiumPerCap]);

  const caffeineAccounting = useMemo(() => {
    const empty = { caffeineBudgetMg: 0, standalonePlannedCaffeineMg: 0, morningCoffeeCaffeineMg: 0, productCaffeineMg: 0, bikeCaffeineMg: 0, runCaffeineMg: 0, runGelDist: { totalGels: 0, cafGels: 0, regGels: 0 }, totalCaffeineMg: 0, totalCaffeineMgPerKg: 0, remainingBudgetMg: 0 };
    if (!useCaffeine) return empty;
    
    const caffeineBudgetMg = Math.round(bodyMass * STRATEGY_CAFFEINE_DOSE[strategy]);
    const morningCoffeeCaffeineMg = coffeeCaffeine;
    const standalonePlannedCaffeineMg = caffeineTablet;

    // Remaining budget after pre-race sources
    const preRaceCaffeineMg = morningCoffeeCaffeineMg + standalonePlannedCaffeineMg;
    const productBudgetMg = Math.max(0, caffeineBudgetMg - preRaceCaffeineMg);

    // Bike products caffeine
    const bikeCaffeineMg = (() => {
      const bikeLeg = plan.find(l => l.name === 'Bike' && l.canFuel);
      if (!bikeLeg) return 0;
      if (bikeFuelType === 'gels' && caffeinePerGel > 0) return Math.ceil(bikeLeg.carbTotal / carbsPerGel) * caffeinePerGel;
      if (bikeFuelType === 'drink_mix' && caffeinePerScoop > 0) return Math.ceil(bikeLeg.carbTotal / carbsPerScoop) * caffeinePerScoop;
      return 0;
    })();

    // Run caf gels — capped to remaining budget after pre-race + bike
    const runProductBudgetMg = Math.max(0, productBudgetMg - bikeCaffeineMg);
    const getRunCafGelCount = (): { totalGels: number; cafGels: number; regGels: number } => {
      const runLeg = plan.find(l => l.name === 'Run' && l.canFuel);
      if (!runLeg || runFuelType !== 'gels') return { totalGels: 0, cafGels: 0, regGels: 0 };
      const totalGels = Math.ceil(runLeg.carbTotal / carbsPerGel);
      if (runCafGelPattern === 'none' || cafGelCaffeine <= 0) return { totalGels, cafGels: 0, regGels: totalGels };
      // How many caf gels can fit within remaining budget?
      const maxCafGels = cafGelCaffeine > 0 ? Math.round(runProductBudgetMg / cafGelCaffeine) : 0;
      let desiredCafGels: number;
      if (runCafGelPattern === 'all') desiredCafGels = totalGels;
      else desiredCafGels = Math.ceil(totalGels / 2); // first_half or alternate
      const cafGels = Math.min(desiredCafGels, maxCafGels, totalGels);
      return { totalGels, cafGels, regGels: totalGels - cafGels };
    };
    const runGelDist = getRunCafGelCount();
    const runCaffeineMg = runGelDist.cafGels * cafGelCaffeine;
    const productCaffeineMg = bikeCaffeineMg + runCaffeineMg;

    const totalCaffeineMg = preRaceCaffeineMg + productCaffeineMg;
    const totalCaffeineMgPerKg = Number((totalCaffeineMg / bodyMass).toFixed(1));
    const remainingBudgetMg = Math.max(0, caffeineBudgetMg - totalCaffeineMg);

    return { caffeineBudgetMg, standalonePlannedCaffeineMg, morningCoffeeCaffeineMg, productCaffeineMg, bikeCaffeineMg, runCaffeineMg, runGelDist, totalCaffeineMg, totalCaffeineMgPerKg, remainingBudgetMg };
  }, [useCaffeine, bodyMass, strategy, coffeeCaffeine, caffeineTablet, plan, bikeFuelType, runFuelType, carbsPerGel, carbsPerScoop, caffeinePerGel, caffeinePerScoop, runCafGelPattern, cafGelCaffeine]);

  // --- Warnings engine (P0) ---
  const warnings = useMemo(() => {
    const w: { type: 'danger' | 'caution' | 'info'; text: string }[] = [];
    // Caffeine threshold
    if (useCaffeine) {
      const { totalCaffeineMgPerKg } = caffeineAccounting;
      if (totalCaffeineMgPerKg > 7.0) {
        w.push({ type: 'danger', text: `Caffeine dose is ${totalCaffeineMgPerKg} mg/kg — STRONG DANGER. Exceeds toxic threshold. Extreme risk of GI distress, tachycardia, and anxiety.` });
      } else if (totalCaffeineMgPerKg > 6.0) {
        w.push({ type: 'danger', text: `Caffeine dose is ${totalCaffeineMgPerKg} mg/kg — above the 6 mg/kg safety ceiling. Reduce dose or consult a sports dietitian.` });
      } else if (totalCaffeineMgPerKg >= 5.0) {
        w.push({ type: 'caution', text: `Caffeine dose is ${totalCaffeineMgPerKg} mg/kg — high. Only use if well-practiced in training.` });
      }
    }
    // Sodium Warning
    const sodiumRatio = sodiumAccounting.totalTargetSodiumMg > 0 ? (sodiumAccounting.totalPlannedSodiumMg / sodiumAccounting.totalTargetSodiumMg) : 0;
    if (sodiumRatio > 1.2) {
      w.push({ type: 'caution', text: `Planned total sodium (${sodiumAccounting.totalPlannedSodiumMg} mg) exceeds target by >20%. Check your product choices or salt cap plan.` });
    }
    // Bottle concentration
    plan.filter(l => l.name === 'Bike' && l.canFuel).forEach(leg => {
      if (bikeFuelType === 'drink_mix' && bikeBottleCount > 0) {
        const carbsPerBottle = Math.round(leg.carbTotal / bikeBottleCount);
        const concGPerL = Math.round((carbsPerBottle / bikeBottleVolume) * 1000);
        if (concGPerL > 160) {
          w.push({ type: 'danger', text: `Bottle concentration is ~${concGPerL}g/L — extremely high GI risk. Use smaller bottles as concentrates and chase with water, or add more bottles.` });
        } else if (concGPerL > 120) {
          w.push({ type: 'caution', text: `Bottle concentration is ~${concGPerL}g/L — treat as concentrate and chase each sip with plain water.` });
        } else if (concGPerL > 80) {
          w.push({ type: 'info', text: `Bottle concentration is ~${concGPerL}g/L — dense but manageable if practiced. If you experience GI issues, dilute further.` });
        }
      }
    });
    // Carrying capacity
    const bikeLeg = plan.find(l => l.name === 'Bike' && l.canFuel);
    if (bikeLeg && bikeBottleCount > 0 && bikeBottleVolume > 0) {
      const capVol = bikeBottleCount * bikeBottleVolume;
      const targetVol = bikeLeg.fluidTotal;
      if (targetVol > 0) {
        const ratio = capVol / targetVol;
        if (ratio < 0.7) {
          w.push({ type: 'danger', text: `Your ${bikeBottleCount} bottles hold ${capVol}mL but your plan calls for ${targetVol}mL. Serious under-capacity — plan for multiple aid station refills.` });
        } else if (ratio < 0.85) {
          w.push({ type: 'caution', text: `Your ${bikeBottleCount} bottles hold ${capVol}mL (target: ${targetVol}mL). Refill required.` });
        } else if (ratio < 1.0) {
          w.push({ type: 'info', text: `Your ${bikeBottleCount} bottles hold ${capVol}mL (target: ${targetVol}mL). Small shortfall — refill optional or use aid station.` });
        }
      }
    }
    return w;
  }, [plan, useCaffeine, bikeFuelType, bikeBottleCount, bikeBottleVolume, caffeineAccounting, sodiumAccounting]);

  return (
    <div className="font-inter space-y-6">
      {/* ── Inputs ──────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {/* 1. Event Profile */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2"><span className="text-brand">1.</span> Event Profile</h2>
          
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Race Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.entries(RACE_PRESETS) as [RaceType, typeof RACE_PRESETS[RaceType]][]).map(([key, val]) => (
                <button key={key} onClick={() => handleRaceChange(key)}
                  className={`py-2.5 text-sm font-bold uppercase tracking-widest rounded-lg transition-all border ${raceType === key ? 'bg-brand/20 border-brand/50 text-brand shadow-[0_0_15px_rgba(var(--brand-rgb),0.2)]' : 'bg-black/40 border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'}`}>
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Expected Leg Durations (minutes)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {preset.legs.map((leg, i) => (
                <div key={leg.name}>
                  <span className="text-xs text-neutral-500 mb-1 block">{leg.name}</span>
                  <input type="number" value={durations[i]} onChange={e => setLegDuration(i, Number(e.target.value) || 0)}
                    className="w-full bg-black border border-neutral-800 rounded-lg px-3 h-10 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-600 mt-2">Total race: <span className="text-neutral-400 font-mono">{Math.floor(totalRaceMin / 60)}h {totalRaceMin % 60}m</span></p>
          </div>
        </div>

        {/* 2. Athlete & Strategy */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2"><span className="text-brand">2.</span> Athlete Profile & Strategy</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Body Mass</label>
              <div className="relative">
                <input type="number" value={bodyMass} onChange={e => setBodyMass(Number(e.target.value) || 60)}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-3 h-10 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                <span className="absolute right-3 top-2.5 text-sm text-neutral-500 font-mono">kg</span>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Conditions</label>
              <div className="flex gap-1 h-10">
                {(['cool', 'moderate', 'hot'] as HeatLevel[]).map(h => (
                  <button key={h} onClick={() => setHeat(h)}
                    className={`flex-1 text-xs font-bold uppercase tracking-widest rounded-lg transition-all border ${heat === h ? (h === 'hot' ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : h === 'cool' ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-brand/20 border-brand/50 text-brand') : 'bg-black/40 border-neutral-800 text-neutral-500 hover:border-neutral-600'}`}>
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-2 lg:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Caffeine Strategy</label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-neutral-500 mb-1">Use Caffeine?</label>
                  <button onClick={() => setUseCaffeine(!useCaffeine)}
                    className={`w-full h-10 text-xs font-bold uppercase tracking-widest rounded-lg transition-all border ${useCaffeine ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-black/40 border-neutral-800 text-neutral-500 hover:border-neutral-600'}`}>
                    {useCaffeine ? 'Yes' : 'No'}
                  </button>
                </div>
                {useCaffeine && (
                  <>
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">Morning Coffee</label>
                      <div className="flex gap-1">
                        <select value={coffeeType} onChange={e => setCoffeeType(e.target.value as CoffeeType)}
                          className="flex-1 bg-black border border-neutral-800 rounded-lg px-2 h-10 text-neutral-300 text-xs focus:border-brand outline-none cursor-pointer">
                          {(Object.entries(COFFEE_LABELS) as [CoffeeType, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                        </select>
                        {coffeeType === 'custom' && (
                          <div className="relative w-16">
                            <input type="number" value={coffeeCaffeine} onChange={e => setCoffeeCaffeine(Number(e.target.value) || 0)} className="w-full bg-black border border-neutral-800 rounded-lg pl-2 pr-6 h-10 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" title="Caffeine (mg)" />
                            <span className="absolute right-1.5 top-2.5 text-[10px] text-neutral-400 font-mono pointer-events-none">mg</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {coffeeType !== 'none' && (
                      <div>
                        <label className="block text-[10px] uppercase text-neutral-500 mb-1">Coffee Timing</label>
                        <div className="relative w-full">
                          <input type="number" value={coffeeTiming} onChange={e => setCoffeeTiming(Number(e.target.value) || 0)} className="w-full bg-black border border-neutral-800 rounded-lg pl-3 pr-14 h-10 text-white font-mono text-sm focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="60" />
                          <span className="absolute right-3 top-2.5 text-[10px] text-neutral-400 font-mono pointer-events-none">min pre</span>
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">Pre-Race Pill/Tablet</label>
                      <div className="relative w-full">
                        <input type="number" value={caffeineTablet} onChange={e => setCaffeineTablet(Number(e.target.value) || 0)} className="w-full bg-black border border-neutral-800 rounded-lg pl-3 pr-8 h-10 text-white font-mono text-sm focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="100" />
                        <span className="absolute right-3 top-2.5 text-[10px] text-neutral-400 font-mono pointer-events-none">mg</span>
                      </div>
                      {caffeineTablet === 0 && totalRaceMin > 120 && <p className="text-[9px] text-green-400/60 mt-0.5 italic">Tip: 100-200mg pill 30 min pre-swim boosts late-race performance</p>}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="col-span-2 lg:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Gut Training (Carb Ceiling)</label>
              <select value={gutLevel} onChange={e => setGutLevel(e.target.value as GutLevel)}
                className="w-full bg-black border border-neutral-800 rounded-lg px-3 h-10 text-neutral-300 text-sm focus:border-brand outline-none cursor-pointer">
                {(Object.entries(GUT_LABELS) as [GutLevel, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            
            <div className="col-span-2 lg:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Fueling Strategy</label>
              <select value={strategy} onChange={e => setStrategy(e.target.value as FuelingStrategy)}
                className="w-full bg-black border border-neutral-800 rounded-lg px-3 h-10 text-neutral-300 text-sm focus:border-brand outline-none cursor-pointer">
                {(Object.entries(STRATEGY_LABELS) as [FuelingStrategy, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* 3. Gear & Products */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2"><span className="text-brand">3.</span> Gear & Nutrition Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Bike Fuel Type</label>
              <select value={bikeFuelType} onChange={e => setBikeFuelType(e.target.value as NutritionType)}
                className="w-full bg-black border border-neutral-800 rounded-lg px-3 h-10 text-neutral-300 text-sm focus:border-brand outline-none cursor-pointer">
                {(Object.entries(NUTRITION_LABELS) as [NutritionType, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Bike Bottles Setup</label>
              <div className="flex gap-2">
                <input type="number" value={bikeBottleCount} onChange={e => setBikeBottleCount(Number(e.target.value) || 1)}
                    className="w-16 bg-black border border-neutral-800 rounded-lg px-3 h-10 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                <div className="relative flex-1">
                  <select value={bikeBottleVolume} onChange={e => setBikeBottleVolume(Number(e.target.value) || 500)}
                    className="w-full bg-black border border-neutral-800 rounded-lg pl-3 pr-6 h-10 text-neutral-300 text-sm focus:border-brand outline-none cursor-pointer appearance-none">
                    <option value={500}>500 mL</option>
                    <option value={600}>600 mL</option>
                    <option value={700}>700 mL</option>
                    <option value={750}>750 mL</option>
                    <option value={900}>900 mL</option>
                    <option value={1000}>1000 mL</option>
                  </select>
                  <div className="absolute right-2 top-0 bottom-0 flex items-center pointer-events-none">
                    <svg className="w-3 h-3 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Run Fuel Type</label>
              <select value={runFuelType} onChange={e => setRunFuelType(e.target.value as NutritionType)}
                className="w-full bg-black border border-neutral-800 rounded-lg px-3 h-10 text-neutral-300 text-sm focus:border-brand outline-none cursor-pointer">
                {(Object.entries(NUTRITION_LABELS) as [NutritionType, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-800/50">
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Product Nutrition Profiles (per unit)</label>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div>
                <span className="text-xs text-neutral-500 mb-2 block uppercase tracking-wider font-bold">Regular Gel</span>
                <div className="flex gap-1">
                  <div className="w-1/3">
                    <span className="text-[9px] text-amber-400/70 font-bold uppercase block mb-0.5 text-center">Carbs</span>
                    <div className="relative">
                      <input type="number" value={carbsPerGel} onChange={e => setCarbsPerGel(Number(e.target.value) || 0)} className="w-full bg-black border border-neutral-800 rounded-lg px-1 pr-3 h-9 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <span className="absolute right-1.5 top-2 text-[10px] text-neutral-400 font-mono pointer-events-none">g</span>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <span className="text-[9px] text-rose-400/70 font-bold uppercase block mb-0.5 text-center">Sodium</span>
                    <div className="relative">
                      <input type="number" value={sodiumPerGel} onChange={e => setSodiumPerGel(Number(e.target.value) || 0)} className="w-full bg-black border border-neutral-800 rounded-lg px-1 pr-4 h-9 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <span className="absolute right-1.5 top-2 text-[10px] text-neutral-400 font-mono pointer-events-none">mg</span>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <span className="text-[9px] text-green-400/70 font-bold uppercase block mb-0.5 text-center">Caffeine</span>
                    <div className="relative">
                      <input type="number" value={caffeinePerGel} onChange={e => setCaffeinePerGel(Number(e.target.value) || 0)} className="w-full bg-black border border-neutral-800 rounded-lg px-1 pr-5 h-9 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <span className="absolute right-1.5 top-2 text-[10px] text-neutral-400 font-mono pointer-events-none">mg</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-xs text-green-400/80 mb-2 block uppercase tracking-wider font-bold">Caffeinated Gel ☕</span>
                <div className="flex gap-1">
                  <div className="w-1/3">
                    <span className="text-[9px] text-amber-400/70 font-bold uppercase block mb-0.5 text-center">Carbs</span>
                    <div className="relative">
                      <input type="number" value={cafGelCarbs} onChange={e => setCafGelCarbs(Number(e.target.value) || 0)} className="w-full bg-black border border-green-900/50 rounded-lg px-1 pr-3 h-9 text-white font-mono text-sm text-center focus:border-green-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <span className="absolute right-1.5 top-2 text-[10px] text-neutral-400 font-mono pointer-events-none">g</span>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <span className="text-[9px] text-rose-400/70 font-bold uppercase block mb-0.5 text-center">Sodium</span>
                    <div className="relative">
                      <input type="number" value={cafGelSodium} onChange={e => setCafGelSodium(Number(e.target.value) || 0)} className="w-full bg-black border border-green-900/50 rounded-lg px-1 pr-4 h-9 text-white font-mono text-sm text-center focus:border-green-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <span className="absolute right-1.5 top-2 text-[10px] text-neutral-400 font-mono pointer-events-none">mg</span>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <span className="text-[9px] text-green-400/70 font-bold uppercase block mb-0.5 text-center">Caffeine</span>
                    <div className="relative">
                      <input type="number" value={cafGelCaffeine} onChange={e => setCafGelCaffeine(Number(e.target.value) || 0)} className="w-full bg-black border border-green-900/50 rounded-lg px-1 pr-5 h-9 text-white font-mono text-sm text-center focus:border-green-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <span className="absolute right-1.5 top-2 text-[10px] text-green-400 font-mono pointer-events-none">mg</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-xs text-neutral-500 mb-2 block uppercase tracking-wider font-bold">Drink Mix (scoop)</span>
                <div className="flex gap-1">
                  <div className="w-1/3">
                    <span className="text-[9px] text-amber-400/70 font-bold uppercase block mb-0.5 text-center">Carbs</span>
                    <div className="relative">
                      <input type="number" value={carbsPerScoop} onChange={e => setCarbsPerScoop(Number(e.target.value) || 0)} className="w-full bg-black border border-neutral-800 rounded-lg px-1 pr-3 h-9 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <span className="absolute right-1.5 top-2 text-[10px] text-neutral-400 font-mono pointer-events-none">g</span>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <span className="text-[9px] text-rose-400/70 font-bold uppercase block mb-0.5 text-center">Sodium</span>
                    <div className="relative">
                      <input type="number" value={sodiumPerScoop} onChange={e => setSodiumPerScoop(Number(e.target.value) || 0)} className="w-full bg-black border border-neutral-800 rounded-lg px-1 pr-4 h-9 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <span className="absolute right-1.5 top-2 text-[10px] text-neutral-400 font-mono pointer-events-none">mg</span>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <span className="text-[9px] text-green-400/70 font-bold uppercase block mb-0.5 text-center">Caffeine</span>
                    <div className="relative">
                      <input type="number" value={caffeinePerScoop} onChange={e => setCaffeinePerScoop(Number(e.target.value) || 0)} className="w-full bg-black border border-neutral-800 rounded-lg px-1 pr-5 h-9 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <span className="absolute right-1.5 top-2 text-[10px] text-neutral-400 font-mono pointer-events-none">mg</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-xs text-neutral-500 mb-2 block uppercase tracking-wider font-bold">Bar / Solid</span>
                <span className="text-[9px] text-amber-400/70 font-bold uppercase block mb-0.5 text-center">Carbs</span>
                <div className="relative w-full">
                  <input type="number" value={carbsPerBar} onChange={e => setCarbsPerBar(Number(e.target.value) || 0)} className="w-full bg-black border border-neutral-800 rounded-lg px-2 h-9 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  <span className="absolute right-3 top-2 text-[10px] text-neutral-400 font-mono pointer-events-none">g</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-neutral-400 mb-2 block uppercase tracking-wider font-bold">Salt Cap</span>
                <span className="text-[9px] text-rose-400/70 font-bold uppercase block mb-0.5 text-center">Sodium</span>
                <div className="relative w-full">
                  <input type="number" value={sodiumPerCap} onChange={e => setSodiumPerCap(Number(e.target.value) || 0)} className="w-full bg-black border border-neutral-800 rounded-lg px-2 h-9 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  <span className="absolute right-3 top-2 text-[10px] text-neutral-400 font-mono pointer-events-none">mg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Run caffeinated gel pattern */}
          {useCaffeine && plan.some(l => l.name === 'Run' && l.canFuel) && runFuelType === 'gels' && (
            <div className="pt-6 border-t border-neutral-800/50">
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Run Caffeinated Gel Strategy</label>
              <div className="flex gap-1 h-10">
                {([['none', 'No Caf Gels'], ['first_half', 'First Half'], ['alternate', 'Alternate'], ['all', 'All Caffeinated']] as [CafGelPattern, string][]).map(([k, v]) => (
                  <button key={k} onClick={() => setRunCafGelPattern(k)}
                    className={`flex-1 text-xs font-bold uppercase tracking-widest rounded-lg transition-all border ${runCafGelPattern === k ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-black/40 border-neutral-800 text-neutral-500 hover:border-neutral-600'}`}>
                    {v}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-neutral-600 mt-1.5 italic">
                {runCafGelPattern === 'none' && 'All run gels will be regular (no caffeine).'}
                {runCafGelPattern === 'first_half' && 'First half of run gels are caffeinated — caffeine peaks when you need it most in the second half.'}
                {runCafGelPattern === 'alternate' && 'Every other gel is caffeinated — steady caffeine intake throughout.'}
                {runCafGelPattern === 'all' && 'Every run gel is caffeinated — maximum caffeine from products.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Warnings ────────────────────────────────────────────────────── */}
      {warnings.length > 0 && (
        <div className="space-y-2">
          {warnings.map((w, i) => (
            <div key={i} className={`p-4 rounded-xl border flex items-center gap-3 ${w.type === 'danger' ? 'bg-red-500/10 border-red-500/30 text-red-200' : w.type === 'caution' ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-blue-500/10 border-blue-500/30 text-blue-200'}`}>
              <span className="text-base leading-none">{w.type === 'danger' ? '🚨' : w.type === 'caution' ? '⚠️' : 'ℹ️'}</span>
              <p className="text-xs m-0">{w.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Results: Totals Summary ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ResultCard label="Total Carbs" value={`${totals.carbs} g`} sub="See plan for products" color="text-amber-400" />
        <ResultCard label="Total Fluid" value={`${(totals.fluid / 1000).toFixed(1)} L`} sub={`${totals.fluid} mL`} color="text-blue-400" />
        <ResultCard label="Total Sodium" value={`${sodiumAccounting.totalTargetSodiumMg} mg`} sub={`${sodiumAccounting.totalPlannedSodiumMg} mg planned`} color="text-rose-400" />
        <ResultCard label="Caffeine" value={useCaffeine ? `${caffeineAccounting.totalCaffeineMg} mg` : '—'} sub={useCaffeine ? `of ${caffeineAccounting.caffeineBudgetMg} mg budget (${caffeineAccounting.totalCaffeineMgPerKg} mg/kg)` : 'disabled'} color="text-green-400" />
      </div>

      {/* ── Per-Leg Breakdown ───────────────────────────────────────────── */}
      <div className="space-y-4">
        {plan.map(leg => (
          <div key={leg.name} className={`bg-neutral-900 border rounded-2xl overflow-hidden shadow-2xl ${!leg.canFuel ? 'border-neutral-800/50 opacity-60' : 'border-neutral-800'}`}>
            <div className="px-6 py-4 border-b border-neutral-800/50 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest font-montserrat">{leg.name}</h3>
              <span className="text-xs font-mono text-neutral-500">{leg.durationMin} min</span>
            </div>
            {leg.canFuel ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-neutral-800/30">
                <LegStat label="Carbs" rate={`${leg.carbGPerH} g/h`} total={`${leg.carbTotal} g total`} color="text-amber-400" />
                <LegStat label="Fluid" rate={`${leg.fluidMlPerH} mL/h`} total={`${leg.fluidTotal} mL total`} color="text-blue-400" />
                <LegStat label="Sodium" rate={`${leg.sodiumMgPerH} mg/h`} total={`${leg.sodiumTotal} mg total`} color="text-rose-400" />
                <LegStat label="Caffeine" rate={(() => {
                  if (!useCaffeine) return '—';
                  const legCaf = leg.name === 'Bike' ? caffeineAccounting.bikeCaffeineMg : caffeineAccounting.runCaffeineMg;
                  if (leg.name === 'Run' && runCafGelPattern !== 'none' && caffeineAccounting.runGelDist.cafGels > 0) {
                    return `${legCaf} mg (${caffeineAccounting.runGelDist.cafGels} caf gels)`;
                  }
                  if (legCaf > 0) return `${legCaf} mg`;
                  return 'No caffeine this leg';
                })()} total="" color="text-green-400" />
              </div>
            ) : (
              <div className="px-6 py-4 text-xs text-neutral-500 italic">No fueling during swim — focus on pacing and positioning.</div>
            )}
          </div>
        ))}
      </div>

      {/* ── Race Execution Timelines (Per Leg) ─────────────────────────── */}
      <div className="space-y-8 mt-8">
        {plan.filter(l => l.canFuel).map(leg => (
          <FuelingTimeline 
            key={leg.name} 
            leg={leg} 
            useCaffeine={useCaffeine} 
            nutritionType={leg.name === 'Bike' ? bikeFuelType : runFuelType} 
            bikeBottleCount={bikeBottleCount}
            bikeBottleVolume={bikeBottleVolume}
            raceType={raceType}
            carbsPerGel={carbsPerGel}
            carbsPerBar={carbsPerBar}
            sodiumCaps={leg.name === 'Bike' ? sodiumAccounting.bike.additionalCaps : sodiumAccounting.run.additionalCaps}
            caffeineTablet={leg.name === plan.find(l => l.canFuel)?.name ? caffeineTablet : 0}
            cafGelPattern={leg.name === 'Run' ? runCafGelPattern : 'none'}
            cafGelCaffeine={cafGelCaffeine}
          />
        ))}
      </div>

      {/* ── Practical Guide ─────────────────────────────────────────────── */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl mt-8">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest font-montserrat mb-4">Practical Fueling Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm text-neutral-400">
          <div className="bg-black/30 rounded-xl p-4 border border-neutral-800/50">
            <span className="text-brand font-bold uppercase tracking-widest text-xs block mb-2">Pre-Race (Morning)</span>
            <ul className="space-y-1.5">
              <li>• Breakfast: <span className="text-neutral-300">1.5 - 2.5g carbs / kg</span> (~{Math.round(bodyMass * 2)}g) 2-3h prior</li>
              <li>• Fluid: <span className="text-neutral-300">500-750mL</span> with electrolytes upon waking</li>
              {useCaffeine && coffeeType !== 'none' && <li>• Coffee: <span className="text-neutral-300">{COFFEE_LABELS[coffeeType]}</span> ({coffeeCaffeine}mg caf) {coffeeTiming > 0 ? `${coffeeTiming} min before start` : 'with breakfast'}</li>}
              {useCaffeine && caffeineTablet > 0 && <li>• Caffeine pill: <span className="text-neutral-300">{caffeineTablet} mg</span> 30-45 min before start</li>}
              <li>• Primer: <span className="text-neutral-300">1 gel</span> 15 mins before swim start</li>
            </ul>
          </div>
            <div className="bg-black/30 rounded-xl p-4 border border-neutral-800/50">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-xs block mb-2">Carbohydrate Products</span>
            <ul className="space-y-1.5">
              {plan.filter(l => l.canFuel && l.carbTotal > 0).map(leg => {
                const fType = leg.name === 'Bike' ? bikeFuelType : runFuelType;
                if (fType === 'drink_mix' && leg.name === 'Bike') {
                  const carbsPerBottle = Math.round(leg.carbTotal / Math.max(1, bikeBottleCount));
                  return <li key={leg.name}>• <strong className="text-white">{leg.name}:</strong> <span className="text-neutral-300">{bikeBottleCount} × {bikeBottleVolume}mL bottles</span> (Dissolve ~{carbsPerBottle}g carbs/bottle)</li>;
                } else if (fType === 'drink_mix') {
                  const bottles = Math.max(1, Math.ceil(leg.fluidTotal / 600));
                  const carbsPerBottle = Math.round(leg.carbTotal / bottles);
                  return <li key={leg.name}>• <strong className="text-white">{leg.name}:</strong> <span className="text-neutral-300">{bottles} × 600mL bottles</span> (Dissolve ~{carbsPerBottle}g carbs/bottle)</li>;
                } else {
                  const cPU = fType === 'gels' ? carbsPerGel : carbsPerBar;
                  const uName = fType === 'gels' ? 'gels' : 'bars';
                  const total = Math.ceil(leg.carbTotal / cPU);
                  if (leg.name === 'Run' && fType === 'gels' && runCafGelPattern !== 'none' && useCaffeine) {
                    const { regGels, cafGels } = caffeineAccounting.runGelDist;
                    return <li key={leg.name}>• <strong className="text-white">{leg.name}:</strong> <span className="text-neutral-300">{regGels} regular gels</span> + <span className="text-green-400">{cafGels} caffeinated gels</span></li>;
                  }
                  return <li key={leg.name}>• <strong className="text-white">{leg.name}:</strong> <span className="text-neutral-300">{total} {uName}</span></li>;
                }
              })}
              <li className="text-neutral-500 pt-1 italic">Use glucose:fructose 2:1 ratio for {'>'} 60g/h</li>
            </ul>
          </div>
          <div className="bg-black/30 rounded-xl p-4 border border-neutral-800/50">
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs block mb-2">Hydration Strategy</span>
            <ul className="space-y-1.5">
              <li>• Target range: <span className="text-neutral-300">{FLUID_RANGE[heat][0]}–{FLUID_RANGE[heat][1]} ml/h</span>. Current plan starts at {avg(FLUID_RANGE[heat])} ml/h.</li>
              <li>• Bike: <span className="text-neutral-300">{bikeBottleCount} × {bikeBottleVolume}mL bottles</span></li>
              {plan.some(l => l.name === 'Run' && l.canFuel) && <li>• Run: <span className="text-neutral-300">{((plan.find(l => l.name === 'Run')?.fluidTotal || 0) / 1000).toFixed(1)}L</span> via aid stations (target: {Math.round(avg(FLUID_RANGE[heat]) * 0.85)} ml/h)</li>}
              <li>• Adjust down if stomach sloshing; adjust up if hot/high sweat rate.</li>
            </ul>
          </div>
          <div className="bg-black/30 rounded-xl p-4 border border-neutral-800/50">
            <span className="text-rose-400 font-bold uppercase tracking-widest text-xs block mb-2">Sodium / Electrolytes</span>
            <ul className="space-y-1.5">
              <li>• Total target: <span className="text-neutral-300">{sodiumAccounting.totalTargetSodiumMg} mg</span></li>
              <li>• Product breakdown:
                <ul className="ml-3 space-y-1 mt-1 text-xs text-neutral-400">
                  {plan.find(l => l.name === 'Bike')?.canFuel && (
                    <li>- Bike {NUTRITION_LABELS[bikeFuelType].toLowerCase()}: <span className="text-neutral-300">{sodiumAccounting.bike.productSodiumMg} mg</span></li>
                  )}
                  {plan.find(l => l.name === 'Run')?.canFuel && (
                    <li>- Run {NUTRITION_LABELS[runFuelType].toLowerCase()}: <span className="text-neutral-300">{sodiumAccounting.run.productSodiumMg} mg</span></li>
                  )}
                </ul>
              </li>
              <li>• Leg-specific balance:
                 <ul className="ml-3 space-y-1 mt-1 text-xs text-neutral-400">
                  {plan.find(l => l.name === 'Bike')?.canFuel && (
                    <li>- Bike: {sodiumAccounting.bike.additionalCaps > 0 ? <><span className="text-rose-400">+{sodiumAccounting.bike.additionalCaps} extra caps</span> (deficit {sodiumAccounting.bike.deficitSodiumMg} mg)</> : <span className="text-green-400">On target (surplus {sodiumAccounting.bike.surplusSodiumMg} mg)</span>}</li>
                  )}
                  {plan.find(l => l.name === 'Run')?.canFuel && (
                    <li>- Run: {sodiumAccounting.run.additionalCaps > 0 ? <><span className="text-rose-400">+{sodiumAccounting.run.additionalCaps} extra caps</span> (deficit {sodiumAccounting.run.deficitSodiumMg} mg)</> : <span className="text-green-400">On target (surplus {sodiumAccounting.run.surplusSodiumMg} mg)</span>}</li>
                  )}
                 </ul>
              </li>
              <li className="pt-1">• Planned total: <span className="text-neutral-300 font-bold">{sodiumAccounting.totalPlannedSodiumMg} mg</span></li>
              <li className="text-neutral-600 pt-1 text-xs italic leading-tight">Supports replacement of sweat sodium and fluid retention. May reduce risk of sodium depletion in long/hot races, but does not guarantee cramp prevention.</li>
            </ul>
          </div>
          <div className="bg-black/30 rounded-xl p-4 border border-neutral-800/50">
            <span className="text-green-400 font-bold uppercase tracking-widest text-xs block mb-2">Caffeine Accounting</span>
            {useCaffeine ? (
              <ul className="space-y-1.5 text-xs sm:text-sm">
                <li>• Budget: <span className="text-neutral-300">{caffeineAccounting.caffeineBudgetMg} mg</span> <span className="text-neutral-500">({STRATEGY_CAFFEINE_DOSE[strategy]} mg/kg — {strategy})</span></li>
                <li>• Distribution:
                  <ul className="ml-3 space-y-1 mt-1 text-xs text-neutral-400">
                    {coffeeCaffeine > 0 && <li>- Morning coffee: <span className="text-neutral-300">{caffeineAccounting.morningCoffeeCaffeineMg} mg</span></li>}
                    {caffeineTablet > 0 && <li>- Pre-race pill: <span className="text-neutral-300">{caffeineAccounting.standalonePlannedCaffeineMg} mg</span> (30-45 min pre)</li>}
                    {caffeineAccounting.bikeCaffeineMg > 0 && <li>- Bike products: <span className="text-neutral-300">{caffeineAccounting.bikeCaffeineMg} mg</span></li>}
                    {caffeineAccounting.runCaffeineMg > 0 && <li>- Run caf gels: <span className="text-neutral-300">{caffeineAccounting.runCaffeineMg} mg</span> ({caffeineAccounting.runGelDist.cafGels} of {caffeineAccounting.runGelDist.totalGels} gels)</li>}
                    {caffeineAccounting.totalCaffeineMg === 0 && <li className="italic">No caffeine sources configured</li>}
                  </ul>
                </li>
                <li className="pt-1 border-t border-neutral-800/50 mt-1">• Total planned: <strong className="text-green-400">{caffeineAccounting.totalCaffeineMg} mg</strong> <span className="text-neutral-500">({caffeineAccounting.totalCaffeineMgPerKg} mg/kg)</span></li>
                {caffeineAccounting.remainingBudgetMg > 0 && <li className="text-neutral-500">• Unused budget: {caffeineAccounting.remainingBudgetMg} mg</li>}
                {coffeeType !== 'none' && coffeeTiming > 180 && <li className="text-neutral-600 pt-1 text-[10px] sm:text-xs italic leading-tight">Coffee counts toward total exposure; performance peak may be reduced by race start.</li>}
              </ul>
            ) : (
              <p className="text-neutral-500 italic">Caffeine disabled. Consider 3mg/kg dose for races {'>'} 2h.</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Evidence disclaimer ─────────────────────────────────────────── */}
      <p className="text-xs text-neutral-600 text-center px-8">
        Targets derived from Jeukendrup (2014), ACSM Position Stand, Precision Hydration, and Burke (2008) caffeine meta-analysis. Individual needs vary — always practice your race nutrition in training.
      </p>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function ResultCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 text-center shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-current opacity-30" style={{ color: 'inherit' }}></div>
      <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 block mb-1">{label}</span>
      <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
      <span className="text-xs text-neutral-600 block mt-1">{sub}</span>
    </div>
  );
}

function LegStat({ label, rate, total, color }: { label: string; rate: string; total: string; color: string }) {
  return (
    <div className="px-4 py-4 text-center">
      <span className={`text-xs font-bold uppercase tracking-widest ${color} block mb-1`}>{label}</span>
      <div className="text-base font-mono text-white">{rate}</div>
      {total && <span className="text-xs text-neutral-600">{total}</span>}
    </div>
  );
}

function FuelingTimeline({ leg, useCaffeine, nutritionType, bikeBottleCount, bikeBottleVolume, raceType, carbsPerGel, carbsPerBar, sodiumCaps, caffeineTablet, cafGelPattern, cafGelCaffeine }: { leg: LegPlan, useCaffeine: boolean, nutritionType: NutritionType, bikeBottleCount?: number, bikeBottleVolume?: number, raceType: RaceType, carbsPerGel: number, carbsPerBar: number, sodiumCaps: number, caffeineTablet: number, cafGelPattern: CafGelPattern, cafGelCaffeine: number }) {
  const carbPerUnit = nutritionType === 'gels' ? carbsPerGel : nutritionType === 'bars' ? carbsPerBar : 30;
  const unitName = nutritionType === 'gels' ? 'gel' : nutritionType === 'bars' ? 'bar' : 'scoop';
  
  type TimelineEvent = { time: number; label: string; title: string; isMajor: boolean; bgColor: string; borderColor?: string; items: { icon: string; text: string }[] };
  const events: TimelineEvent[] = [];
  
  // Start node
  events.push({
    time: 0,
    label: '0:00',
    title: `${leg.name} Start`,
    isMajor: true,
    bgColor: leg.name === 'Bike' ? 'bg-brand' : 'bg-orange-500',
    items: (useCaffeine && caffeineTablet > 0) ? [{ icon: '💊', text: `Take ${caffeineTablet}mg pre-race pill` }] : []
  });

  const drinkInterval = 20;
  const legEvents = new Map<number, { icon: string; text: string }[]>();
  
  const fluidPerInterval = Math.round(leg.fluidMlPerH / (60/drinkInterval));
  let mixPerInterval = fluidPerInterval;
  let waterPerInterval = 0;

  if (leg.name === 'Bike' && nutritionType === 'drink_mix' && bikeBottleCount && bikeBottleVolume) {
     const totalMixVol = bikeBottleCount * bikeBottleVolume;
     const plannedDrinkMl = Math.min(totalMixVol, leg.fluidTotal);
     const mixMlPerH = plannedDrinkMl / (leg.durationMin / 60);
     mixPerInterval = Math.round(mixMlPerH / (60/drinkInterval));
     if (fluidPerInterval > mixPerInterval) {
         waterPerInterval = fluidPerInterval - mixPerInterval;
     }
  }

  const sipsMix = Math.max(1, Math.round(mixPerInterval / 35));
  const sipsWater = Math.max(1, Math.round(waterPerInterval / 35));
  const sipsTotal = Math.max(1, Math.round(fluidPerInterval / 35));

  for (let t = drinkInterval; t < leg.durationMin - 5; t += drinkInterval) {
     if (!legEvents.has(t)) legEvents.set(t, []);
     
     if (leg.carbGPerH > 0 && nutritionType === 'drink_mix') {
       if (waterPerInterval > 0) {
         legEvents.get(t)!.unshift({ icon: '💧⚡', text: `Take ~${sipsMix} sips mix (${mixPerInterval}ml) & ~${sipsWater} sips water (${waterPerInterval}ml)` });
       } else {
         legEvents.get(t)!.unshift({ icon: '💧⚡', text: `Take ~${sipsMix} sips mixed bottle (${mixPerInterval}ml)` });
       }
     } else if (leg.fluidMlPerH > 0) {
       legEvents.get(t)!.push({ icon: '💧', text: `Take ~${sipsTotal} sips fluid (${fluidPerInterval}ml)` });
     }
  }

  if (leg.carbGPerH > 0 && nutritionType !== 'drink_mix') {
    const totalUnits = Math.ceil(leg.carbTotal / carbPerUnit);
    if (totalUnits > 0) {
      const interval = Math.floor(leg.durationMin / totalUnits);
      // Determine which gels are caffeinated
      // Caffeine needs 30-45 min to reach peak; gels in last 30 min are always regular
      const CAFFEINE_ONSET_MIN = 30;
      const isCafGel = (idx: number, timeMin: number): boolean => {
        if (cafGelPattern === 'none' || !useCaffeine) return false;
        if (timeMin > leg.durationMin - CAFFEINE_ONSET_MIN) return false; // too late to benefit
        if (cafGelPattern === 'all') return true;
        if (cafGelPattern === 'first_half') return idx < Math.ceil(totalUnits / 2);
        /* alternate */ return idx % 2 === 0; // start with caf gel first
      };
      for (let i = 0; i < totalUnits; i++) {
        const rawTime = (interval / 2) + (i * interval);
        const t = Math.max(5, Math.round(rawTime / 5) * 5);
        if (t < leg.durationMin - 2) {
          if (!legEvents.has(t)) legEvents.set(t, []);
          if (isCafGel(i, t)) {
            legEvents.get(t)!.push({ icon: '⚡☕', text: `1 caf ${unitName} (${cafGelCaffeine}mg)` });
          } else {
            legEvents.get(t)!.push({ icon: '⚡', text: `1 ${unitName}` });
          }
        }
      }
    }
  }

  if (sodiumCaps > 0) {
    const saltInterval = Math.round(leg.durationMin / (sodiumCaps + 1));
    for (let i = 1; i <= sodiumCaps; i++) {
       const t = i * saltInterval;
       if (t < leg.durationMin - 5) {
         if (!legEvents.has(t)) legEvents.set(t, []);
         legEvents.get(t)!.push({ icon: '💊', text: `1 salt cap` });
       }
    }
  }



  const getRunDistance = (tick: number) => {
    if (leg.name !== 'Run') return '';
    let totalDist = 0;
    if (raceType === 'tri_sprint') totalDist = 5;
    else if (raceType === 'tri_olympic') totalDist = 10;
    else if (raceType === 'tri_703') totalDist = 21.1;
    else if (raceType === 'tri_ironman') totalDist = 42.2;
    else if (raceType === 'run' && leg.durationMin > 180) totalDist = 42.2;
    else if (raceType === 'run') totalDist = 21.1;

    if (totalDist > 0) {
      const distAtTick = (tick / leg.durationMin) * totalDist;
      return `~${distAtTick.toFixed(1)} km`;
    }
    return '';
  };

  const sortedTicks = Array.from(legEvents.keys()).sort((a,b) => a - b);

  sortedTicks.forEach(tick => {
    const distStr = getRunDistance(tick);
    events.push({
      time: tick,
      label: formatTime(tick),
      title: distStr,
      isMajor: false,
      bgColor: 'bg-neutral-800',
      borderColor: leg.name === 'Bike' ? 'border-brand/40' : 'border-orange-500/40',
      items: legEvents.get(tick) || []
    });
  });

  events.push({
    time: leg.durationMin,
    label: formatTime(leg.durationMin),
    title: `${leg.name} End`,
    isMajor: true,
    bgColor: 'bg-neutral-700',
    items: []
  });

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl overflow-hidden relative">
      <h3 className="text-sm font-bold text-white uppercase tracking-widest font-montserrat mb-1 flex items-center gap-2">
        <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        {leg.name} Fueling Timeline
      </h3>
      {leg.name === 'Bike' && nutritionType === 'drink_mix' && !!bikeBottleCount && !!bikeBottleVolume && (bikeBottleCount * bikeBottleVolume > leg.fluidTotal) && (
        <p className="text-[10px] sm:text-xs text-amber-400 mb-2 italic px-1">Note: Do not necessarily finish all bottles; target is {(leg.fluidTotal/1000).toFixed(1)}L of the {((bikeBottleCount * bikeBottleVolume)/1000).toFixed(1)}L carried.</p>
      )}
      <p className="text-xs text-neutral-500 mb-6 uppercase tracking-widest font-mono mt-1">Scroll horizontally to view full plan ➔</p>

      {/* Horizontal Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neutral-900 to-transparent pointer-events-none z-20" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none z-20" />

      <div className="overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex min-w-max items-start pt-2 px-4">
          {events.map((ev, i) => (
            <div key={i} className="relative flex flex-col items-center w-32 sm:w-40 flex-shrink-0 snap-start">
              {/* Horizontal Line connecting nodes */}
              {i < events.length - 1 && (
                <div className="absolute top-[40px] left-1/2 w-full h-0.5 bg-neutral-800 -z-10" />
              )}
              
              {/* Time label above */}
              <div className="h-10 flex flex-col items-center justify-end mb-2">
                {ev.title && <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white mb-0.5 text-center px-1 leading-tight">{ev.title}</span>}
                <span className={`text-[10px] sm:text-xs font-mono tracking-widest ${ev.isMajor ? 'text-brand' : 'text-neutral-500'}`}>
                  {ev.label}
                </span>
              </div>

              {/* Node Dot */}
              <div className={`w-3.5 h-3.5 rounded-full border-[3px] border-neutral-900 ${ev.bgColor} z-10 mb-3 shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-transform hover:scale-125`} />

              {/* Content Box */}
              {ev.items.length > 0 && (
                <div className={`w-[90%] bg-black/50 border ${ev.isMajor ? 'border-neutral-700 bg-neutral-800/50' : ev.borderColor || 'border-neutral-800'} rounded-xl p-2.5 sm:p-3 flex flex-col gap-2 shadow-xl`}>
                  {ev.items.map((item: { icon: string; text: string }, idx: number) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs sm:text-sm text-neutral-300">
                      <span className="flex-shrink-0 text-sm sm:text-base leading-none mt-0.5">{item.icon}</span>
                      <span className="leading-tight font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatTime(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}:${m.toString().padStart(2, '0')}`;
}
