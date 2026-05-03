'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
type EventType = 'sprint' | 'olympic' | '70.3' | 'ironman';
type Condition = 'wetsuit' | 'cold' | 'hot' | 'rain';

interface ChecklistItem {
  id: string;
  label: string;
  tip?: string;
  conditions?: Condition[];          // show ONLY when one of these is active
  excludeConditions?: Condition[];   // HIDE when one of these is active
  minDistance?: EventType;           // show only at this distance or longer
}

interface Category {
  id: string;
  label: string;
  icon: string;
  items: ChecklistItem[];
}

// Distance order for minDistance filtering
const DIST_ORDER: EventType[] = ['sprint', 'olympic', '70.3', 'ironman'];
const distIdx = (d: EventType) => DIST_ORDER.indexOf(d);

// ─── Master Checklist Data ───────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    id: 'admin', label: 'Admin & Registration', icon: '📋',
    items: [
      { id: 'race_confirmation', label: 'Race confirmation / e-ticket' },
      { id: 'photo_id', label: 'Photo ID' },
      { id: 'federation_license', label: 'Federation license / membership card' },
      { id: 'medical_certificate', label: 'Medical certificate (if required)' },
      { id: 'cash_card', label: 'Cash / payment card' },
      { id: 'safety_pins', label: 'Safety pins (spare set)' },
      { id: 'marker_pen', label: 'Permanent marker (body marking backup)', tip: 'In case race marking washes off' },
    ],
  },
  {
    id: 'swim', label: 'Swim', icon: '🏊',
    items: [
      { id: 'tri_suit', label: 'Tri suit / race kit' },
      { id: 'goggles_main', label: 'Goggles (primary pair)' },
      { id: 'goggles_spare', label: 'Goggles (spare pair)', tip: 'Strap can snap — always have a backup' },
      { id: 'goggles_tinted', label: 'Tinted / mirrored goggles', tip: 'For bright, sunny conditions' },
      { id: 'swim_cap', label: 'Swim cap (personal)', tip: 'Race usually provides one, but bring your own underneath' },
      { id: 'wetsuit', label: 'Wetsuit', conditions: ['wetsuit'] },
      { id: 'wetsuit_lubricant', label: 'Wetsuit lubricant / Body Glide', conditions: ['wetsuit'], tip: 'Apply to neck, wrists, ankles for easy removal' },
      { id: 'anti_fog', label: 'Anti-fog spray' },
      { id: 'ear_plugs', label: 'Ear plugs (optional)', conditions: ['cold'] },
      { id: 'neoprene_cap', label: 'Neoprene swim cap', conditions: ['cold'], tip: 'Double cap for cold open water' },
    ],
  },
  {
    id: 't1', label: 'Transition 1 (Swim → Bike)', icon: '🔄',
    items: [
      { id: 't1_towel', label: 'Small towel (for feet)', tip: 'Bright color to spot your spot easily' },
      { id: 'helmet', label: 'Helmet (mandatory)', tip: 'Must be buckled before touching bike' },
      { id: 'cycling_shoes', label: 'Cycling shoes' },
      { id: 'cycling_socks', label: 'Cycling socks (optional)' },
      { id: 'sunglasses', label: 'Sunglasses' },
      { id: 'race_belt', label: 'Race number belt' },
      { id: 'sunscreen', label: 'Sunscreen (pre-applied or in transition)', conditions: ['hot'] },
      { id: 'arm_warmers', label: 'Arm warmers', conditions: ['cold'] },
      { id: 'gilet', label: 'Cycling gilet / vest', conditions: ['cold', 'rain'] },
    ],
  },
  {
    id: 'bike', label: 'Bike', icon: '🚴',
    items: [
      { id: 'bike', label: 'Bike (fully serviced)' },
      { id: 'bike_computer', label: 'Bike computer / GPS' },
      { id: 'front_rear_lights', label: 'Front & rear lights (if required)' },
      { id: 'spare_tube', label: 'Spare inner tube' },
      { id: 'spare_tube_2', label: 'Second spare tube', minDistance: '70.3' },
      { id: 'tire_levers', label: 'Tire levers' },
      { id: 'co2_cartridges', label: 'CO₂ inflator + cartridges' },
      { id: 'mini_pump', label: 'Mini pump (backup)', tip: 'CO₂ can fail — pump is the safety net' },
      { id: 'floor_pump', label: 'Floor pump (for morning setup)' },
      { id: 'bottles_hydration', label: 'Water bottles (filled)' },
      { id: 'bike_nutrition', label: 'Bike nutrition (mounted / taped)' },
      { id: 'bike_nutrition_extra', label: 'Extra bike nutrition (special needs bag)', minDistance: 'ironman' },
      { id: 'aero_bottle', label: 'Aero bottle / between-the-arms hydration', tip: 'For TT / triathlon bikes' },
      { id: 'chain_lube', label: 'Chain lube (morning of)' },
      { id: 'multi_tool', label: 'Multi-tool / Allen keys' },
      { id: 'rain_cape', label: 'Light rain cape / Gabba', conditions: ['rain'] },
    ],
  },
  {
    id: 't2', label: 'Transition 2 (Bike → Run)', icon: '🔄',
    items: [
      { id: 'run_shoes', label: 'Running shoes' },
      { id: 'run_socks', label: 'Running socks (if changing)' },
      { id: 'run_hat_visor', label: 'Running hat / visor', conditions: ['hot'] },
      { id: 'run_cap_rain', label: 'Running cap', conditions: ['rain'] },
      { id: 'elastic_laces', label: 'Elastic laces (pre-installed)', tip: 'Don\'t fumble with knots in T2' },
      { id: 'run_belt', label: 'Run gel belt / vest', minDistance: '70.3' },
    ],
  },
  {
    id: 'run', label: 'Run', icon: '🏃',
    items: [
      { id: 'run_nutrition', label: 'Run gels / nutrition' },
      { id: 'run_special_needs', label: 'Special needs bag (run)', minDistance: 'ironman' },
      { id: 'headlamp', label: 'Headlamp / reflective gear', minDistance: 'ironman', tip: 'Full Ironman can run into the dark' },
    ],
  },
  {
    id: 'nutrition', label: 'Nutrition & Hydration', icon: '⚡',
    items: [
      { id: 'race_gels', label: 'Race gels (full count for distance)' },
      { id: 'electrolyte_tabs', label: 'Electrolyte tablets / powder' },
      { id: 'salt_caps', label: 'Salt / electrolyte capsules', conditions: ['hot'], tip: 'Critical for hot conditions to prevent cramping' },
      { id: 'pre_race_breakfast', label: 'Pre-race breakfast food', tip: 'Eat what you\'ve practiced — nothing new on race day' },
      { id: 'pre_race_coffee', label: 'Coffee / caffeine' },
      { id: 'race_drink_mix', label: 'Race drink mix (bottles pre-mixed)' },
      { id: 'post_race_recovery', label: 'Post-race recovery shake / food' },
      { id: 'water_bottle_personal', label: 'Personal water bottle (pre-race hydration)' },
    ],
  },
  {
    id: 'electronics', label: 'Electronics', icon: '⌚',
    items: [
      { id: 'gps_watch', label: 'GPS watch (fully charged)' },
      { id: 'hr_strap', label: 'Heart rate strap / sensor' },
      { id: 'watch_charger', label: 'Watch charger' },
      { id: 'bike_computer_charger', label: 'Bike computer charger' },
      { id: 'phone', label: 'Phone' },
      { id: 'phone_charger', label: 'Phone charger / power bank' },
      { id: 'headphones', label: 'Headphones (pre-race warmup only)', tip: 'Usually banned during race' },
    ],
  },
  {
    id: 'postrace', label: 'Post-Race & Comfort', icon: '🎒',
    items: [
      { id: 'change_of_clothes', label: 'Full change of dry clothes' },
      { id: 'warm_jacket', label: 'Warm jacket / hoodie', conditions: ['cold'] },
      { id: 'flip_flops', label: 'Flip flops / slides' },
      { id: 'compression_socks', label: 'Compression socks (recovery)' },
      { id: 'body_towel', label: 'Full-size towel' },
      { id: 'plastic_bags', label: 'Plastic bags (for wet / dirty gear)', tip: 'Keep your car clean' },
      { id: 'folding_chair', label: 'Folding camp chair' },
      { id: 'umbrella', label: 'Umbrella', conditions: ['rain'] },
    ],
  },
];

// ─── Local Storage Key ───────────────────────────────────────────────────────
const STORAGE_KEY = 'resiliento_tri_checklist';

// ─── Component ───────────────────────────────────────────────────────────────
export default function ChecklistPlanner() {
  const [eventType, setEventType] = useState<EventType>('olympic');
  const [conditions, setConditions] = useState<Set<Condition>>(new Set(['wetsuit']));
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set());
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.eventType) setEventType(data.eventType);
        if (data.conditions) setConditions(new Set(data.conditions));
        if (data.checked) setChecked(new Set(data.checked));
      }
    } catch { /* ignore parse errors */ }
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        eventType,
        conditions: Array.from(conditions),
        checked: Array.from(checked),
      }));
    } catch { /* ignore storage errors */ }
  }, [eventType, conditions, checked]);

  const toggleCondition = (c: Condition) => {
    setConditions(prev => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c); else next.add(c);
      return next;
    });
  };

  const toggleCheck = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleTip = (id: string) => {
    setExpandedTips(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // Filter items based on current event + conditions
  const isItemVisible = useCallback((item: ChecklistItem): boolean => {
    // Distance filter
    if (item.minDistance && distIdx(eventType) < distIdx(item.minDistance)) return false;
    // Condition include filter (show only if at least one condition matches)
    if (item.conditions && item.conditions.length > 0) {
      if (!item.conditions.some(c => conditions.has(c))) return false;
    }
    // Condition exclude filter
    if (item.excludeConditions && item.excludeConditions.length > 0) {
      if (item.excludeConditions.some(c => conditions.has(c))) return false;
    }
    return true;
  }, [eventType, conditions]);

  // Compute visible items and progress
  const { visibleCategories, totalVisible, totalChecked } = useMemo(() => {
    let totalV = 0;
    let totalC = 0;
    const cats = CATEGORIES.map(cat => {
      const visItems = cat.items.filter(isItemVisible);
      const checkedCount = visItems.filter(i => checked.has(i.id)).length;
      totalV += visItems.length;
      totalC += checkedCount;
      return { ...cat, visibleItems: visItems, checkedCount };
    }).filter(cat => cat.visibleItems.length > 0);
    return { visibleCategories: cats, totalVisible: totalV, totalChecked: totalC };
  }, [isItemVisible, checked]);

  const progressPct = totalVisible > 0 ? Math.round((totalChecked / totalVisible) * 100) : 0;

  const resetChecklist = () => {
    setChecked(new Set());
  };

  // ─── Export Helpers ──────────────────────────────────────────────────────────
  const buildPlainText = (): string => {
    const eventLabel = eventType === '70.3' ? 'Half Ironman' : eventType.charAt(0).toUpperCase() + eventType.slice(1);
    const condList = Array.from(conditions).join(', ') || 'none';
    let text = `TRIATHLON RACE DAY CHECKLIST\n`;
    text += `Event: ${eventLabel} | Conditions: ${condList}\n`;
    text += `${'─'.repeat(40)}\n\n`;

    visibleCategories.forEach(cat => {
      text += `${cat.icon} ${cat.label.toUpperCase()} (${cat.checkedCount}/${cat.visibleItems.length})\n`;
      cat.visibleItems.forEach(item => {
        const mark = checked.has(item.id) ? '☑' : '☐';
        text += `  ${mark} ${item.label}\n`;
      });
      text += '\n';
    });

    text += `Progress: ${totalChecked}/${totalVisible} (${progressPct}%)\n`;
    text += `Generated by resiliento.app/tools/triathlon-checklist`;
    return text;
  };

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(buildPlainText());
      setCopyFeedback('Copied!');
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch {
      setCopyFeedback('Failed');
      setTimeout(() => setCopyFeedback(null), 2000);
    }
  };

  const handlePrint = () => {
    const text = buildPlainText();
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Race Day Checklist</title>
      <style>
        body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 40px; color: #111; line-height: 1.6; max-width: 700px; margin: 0 auto; }
        pre { white-space: pre-wrap; font-family: inherit; font-size: 14px; }
        @media print { body { padding: 20px; } }
      </style></head>
      <body><pre>${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleShareLink = async () => {
    const params = new URLSearchParams();
    params.set('e', eventType);
    params.set('c', Array.from(conditions).join(','));
    if (checked.size > 0) params.set('k', Array.from(checked).join(','));
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopyFeedback('Link copied!');
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch {
      setCopyFeedback('Failed');
      setTimeout(() => setCopyFeedback(null), 2000);
    }
  };

  const conditionConfig: { key: Condition; label: string; activeColor: string }[] = [
    { key: 'wetsuit', label: 'Wetsuit Legal', activeColor: 'bg-blue-500/20 border-blue-500/50 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]' },
    { key: 'cold', label: 'Cold Weather', activeColor: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]' },
    { key: 'hot', label: 'Hot Weather', activeColor: 'bg-orange-500/20 border-orange-500/50 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.15)]' },
    { key: 'rain', label: 'Rain Expected', activeColor: 'bg-slate-400/20 border-slate-400/50 text-slate-300 shadow-[0_0_12px_rgba(148,163,184,0.15)]' },
  ];

  return (
    <div className="font-inter">
      {/* Settings Panel */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Event Type */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Event Distance</label>
            <div className="grid grid-cols-2 gap-2">
              {(['sprint', 'olympic', '70.3', 'ironman'] as EventType[]).map(e => (
                <button
                  key={e}
                  onClick={() => setEventType(e)}
                  className={`py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all border ${eventType === e ? 'bg-brand/20 border-brand/50 text-brand shadow-[0_0_15px_rgba(var(--brand-rgb),0.2)]' : 'bg-black/40 border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'}`}
                >
                  {e === '70.3' ? 'Half Ironman' : e}
                </button>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Race Conditions</label>
            <div className="grid grid-cols-2 gap-2">
              {conditionConfig.map(({ key, label, activeColor }) => (
                <button
                  key={key}
                  onClick={() => toggleCondition(key)}
                  className={`py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all border ${conditions.has(key) ? activeColor : 'bg-black/40 border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-2xl mb-6">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white font-mono">{totalChecked} / {totalVisible}</span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">items packed</span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-sm font-bold font-mono ${progressPct === 100 ? 'text-green-400' : 'text-brand'}`}>{progressPct}%</span>
            <button
              onClick={resetChecklist}
              className="text-[10px] uppercase tracking-widest text-neutral-600 hover:text-red-400 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${progressPct === 100 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-brand shadow-[0_0_10px_rgba(var(--brand-rgb),0.3)]'}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {progressPct === 100 && (
          <p className="text-green-400 text-xs font-semibold mt-3 text-center animate-pulse">
            ✓ All packed — you&apos;re ready to race!
          </p>
        )}

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-neutral-800/50">
          <button
            onClick={handleCopyClipboard}
            className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-400 bg-black/40 border border-neutral-800 rounded-lg hover:border-neutral-600 hover:text-neutral-200 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            Copy to Clipboard
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-400 bg-black/40 border border-neutral-800 rounded-lg hover:border-neutral-600 hover:text-neutral-200 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print / PDF
          </button>
          <button
            onClick={handleShareLink}
            className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-400 bg-black/40 border border-neutral-800 rounded-lg hover:border-neutral-600 hover:text-neutral-200 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
            Share Link
          </button>
          {copyFeedback && (
            <span className="flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand animate-pulse">
              ✓ {copyFeedback}
            </span>
          )}
        </div>
      </div>

      {/* Checklist Categories */}
      <div className="space-y-4">
        {visibleCategories.map(cat => {
          const allChecked = cat.checkedCount === cat.visibleItems.length;
          return (
            <div key={cat.id} className={`bg-neutral-900 border rounded-2xl overflow-hidden shadow-2xl transition-all ${allChecked ? 'border-green-500/30' : 'border-neutral-800'}`}>
              {/* Category Header */}
              <div className={`px-6 py-4 flex justify-between items-center border-b ${allChecked ? 'border-green-500/20 bg-green-500/5' : 'border-neutral-800/50'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{cat.icon}</span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest font-montserrat">{cat.label}</h3>
                </div>
                <span className={`text-xs font-mono font-bold ${allChecked ? 'text-green-400' : 'text-neutral-500'}`}>
                  {cat.checkedCount}/{cat.visibleItems.length}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-neutral-800/30">
                {cat.visibleItems.map(item => {
                  const isChecked = checked.has(item.id);
                  const hasTip = !!item.tip;
                  const tipOpen = expandedTips.has(item.id);
                  return (
                    <div key={item.id} className={`transition-all ${isChecked ? 'bg-brand/[0.03]' : 'hover:bg-white/[0.02]'}`}>
                      <div className="flex items-center gap-4 px-6 py-3.5 cursor-pointer" onClick={() => toggleCheck(item.id)}>
                        {/* Checkbox */}
                        <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${isChecked ? 'bg-brand border-brand' : 'border-neutral-700 hover:border-neutral-500'}`}>
                          {isChecked && (
                            <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>

                        {/* Label */}
                        <span className={`text-sm flex-1 transition-all ${isChecked ? 'text-neutral-500 line-through' : 'text-neutral-200'}`}>
                          {item.label}
                        </span>

                        {/* Conditional badges */}
                        {item.conditions && item.conditions.length > 0 && (
                          <div className="flex gap-1.5">
                            {item.conditions.filter(c => conditions.has(c)).map(c => (
                              <span key={c} className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 text-neutral-500 border border-neutral-800">
                                {c}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Tip toggle */}
                        {hasTip && (
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleTip(item.id); }}
                            className={`text-neutral-600 hover:text-brand transition-colors text-xs flex-shrink-0 ${tipOpen ? 'text-brand' : ''}`}
                            aria-label="Toggle tip"
                          >
                            💡
                          </button>
                        )}
                      </div>

                      {/* Tip content */}
                      {hasTip && tipOpen && (
                        <div className="px-6 pb-3 pl-[3.75rem]">
                          <p className="text-xs text-neutral-500 italic bg-black/30 rounded-lg px-3 py-2 border border-neutral-800/50">
                            {item.tip}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
