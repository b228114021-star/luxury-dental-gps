import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  LayoutDashboard,
  Stethoscope,
  BookOpen,
  FileText,
  GraduationCap,
  TrendingUp,
  Settings,
  CheckSquare,
  Search,
  Copy,
  RotateCcw
} from 'lucide-react';

const TREATMENT_SOPS = {
  'OD 補牙': ['1. 破洞 + 軟齲 BUR', '2. Etch', '3. Bond + 各 + 0點轉', '4. Flow', '5. 填充', '6. 催化劑', '7. 切邊 + 阻點', '8. 咬合紙 + 咬合點'],
  'RCT 根管治療': ['1. NS 生理食鹽水', '2. Endo box / files', '3. Gauge', '4. Rubber Dam', '5. 各種病毒之特製材料與封填材料'],
  'EXT 拔牙': ['1. 麻醉', '2. 白麻藥', '3. 象牙 / 鉗子 + 注射器', '4. Forcep (上150/下151)', '5. Elevator (大/中/小、微創)'],
  'Crown 假牙/拆 Crown': ['1. Crown remove', '2. File check (雙微型套釬)', '3. 挑幾 + 直機 Bur', '4. 印模劑', '5. 牙膠', '6. 黏劑 (固定或臨時)']
};

const TABS = [
  { id: 'dashboard', label: '總覽 Dashboard', icon: LayoutDashboard },
  { id: 'chair', label: '當椅模式 Chair Mode', icon: Stethoscope },
  { id: 'library', label: '治療庫 Treatment Library', icon: BookOpen },
  { id: 'codebook', label: '健保代碼 Codebook', icon: FileText },
  { id: 'training', label: '新人訓練 Training', icon: GraduationCap },
  { id: 'roi', label: '營運報表 ROI', icon: TrendingUp },
  { id: 'admin', label: '院所設定 Admin', icon: Settings }
];

const MODULE_COPY = {
  codebook: {
    title: '健保代碼 Codebook',
    description: '健保代碼與常用給付說明整理中，將提供快速查詢與常見搭配。'
  },
  training: {
    title: '新人訓練 Training',
    description: '新人訓練流程與考核素材建置中，之後可用於每日交班演練。'
  },
  roi: {
    title: '營運報表 ROI',
    description: '診次與流程效率儀表板開發中，後續將支援月報與趨勢追蹤。'
  },
  admin: {
    title: '院所設定 Admin',
    description: '角色權限、流程模板與院所偏好設定功能建置中。'
  }
};

const STORAGE_KEY = 'luxury-dental-gps-chair-mode-v1';
const DEFAULT_TAB = 'chair';
const DEFAULT_TREATMENT = 'OD 補牙';

function buildDefaultChecklistState() {
  return Object.fromEntries(Object.entries(TREATMENT_SOPS).map(([name, steps]) => [name, steps.map(() => false)]));
}

function parseStoredState() {
  if (typeof window === 'undefined') {
    return {
      activeTab: DEFAULT_TAB,
      selectedTreatment: DEFAULT_TREATMENT,
      completedByTreatment: buildDefaultChecklistState()
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        activeTab: DEFAULT_TAB,
        selectedTreatment: DEFAULT_TREATMENT,
        completedByTreatment: buildDefaultChecklistState()
      };
    }

    const parsed = JSON.parse(raw);
    const fallbackState = buildDefaultChecklistState();

    const normalizedCompleted = Object.fromEntries(
      Object.entries(TREATMENT_SOPS).map(([name, steps]) => {
        const storedArray = Array.isArray(parsed?.completedByTreatment?.[name]) ? parsed.completedByTreatment[name] : [];
        const normalized = steps.map((_, index) => Boolean(storedArray[index]));
        return [name, normalized.length ? normalized : fallbackState[name]];
      })
    );

    return {
      activeTab: TABS.some((tab) => tab.id === parsed?.activeTab) ? parsed.activeTab : DEFAULT_TAB,
      selectedTreatment: Object.prototype.hasOwnProperty.call(TREATMENT_SOPS, parsed?.selectedTreatment)
        ? parsed.selectedTreatment
        : DEFAULT_TREATMENT,
      completedByTreatment: normalizedCompleted
    };
  } catch (error) {
    return {
      activeTab: DEFAULT_TAB,
      selectedTreatment: DEFAULT_TREATMENT,
      completedByTreatment: buildDefaultChecklistState()
    };
  }
}

function Sidebar({ activeTab, onSelectTab }) {
  return (
    <aside className="w-full md:w-72 shrink-0 bg-[#1e1e1e] border-b md:border-b-0 md:border-r border-gray-800 p-4 md:p-5 flex flex-col gap-5">
      <div>
        <div className="flex items-center gap-3 mb-6 px-1">
          <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center font-bold text-black">牙</div>
          <div>
            <h1 className="font-bold text-lg tracking-wide">牙天使</h1>
            <p className="text-xs text-cyan-400 font-medium">LUXURY DENTAL GPS</p>
          </div>
        </div>

        <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-1.5">
          {TABS.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#2a2a2a] text-cyan-400 border-l-4 border-cyan-400'
                    : 'text-gray-400 hover:bg-[#252525] hover:text-gray-200'
                }`}
              >
                <Icon size={18} />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="text-xs text-gray-500 px-1">v0.2 Chair Mode · Prototype</div>
    </aside>
  );
}

function Dashboard({ treatmentCount, completedCount, totalSteps, selectedTreatment, onGoChairMode }) {
  const completionRate = totalSteps ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-white">總覽 Dashboard</h2>
        <p className="text-sm text-gray-400">目前系統摘要與 Chair Mode 快速入口。</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="治療種類" value={`${treatmentCount} 種`} />
        <SummaryCard title="目前治療" value={selectedTreatment} />
        <SummaryCard title="Checklist 完成率" value={`${completionRate}%`} />
      </div>

      <section className="bg-[#1e1e1e] p-5 rounded-xl border border-gray-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">當前進度</h3>
            <p className="text-sm text-gray-400">
              已完成 {completedCount} / {totalSteps} 項
            </p>
          </div>
          <button
            type="button"
            onClick={onGoChairMode}
            className="px-4 py-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-sm font-medium hover:bg-cyan-500/20 transition-colors"
          >
            快速進入 Chair Mode
          </button>
        </div>

        <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden" aria-hidden="true">
          <div
            className="h-full bg-cyan-500 transition-all"
            style={{ width: `${completionRate}%` }}
          />
        </div>

        <p className="text-xs text-amber-300/90 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
          僅供院內流程參考，請依院所規範與專業人員指示。
        </p>
      </section>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="text-lg font-semibold text-white mt-2 break-words">{value}</p>
    </div>
  );
}

function TreatmentSelector({ selectedTreatment, dropdownOpen, onToggleDropdown, onSelectTreatment, dropdownRef }) {
  const listboxId = 'treatment-listbox';

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={onToggleDropdown}
        aria-label="選擇診療項目"
        aria-expanded={dropdownOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        className="w-full sm:w-auto bg-[#2a2a2a] px-4 py-2 rounded-lg border border-gray-700 flex items-center justify-between gap-3 text-sm font-semibold text-white hover:border-gray-500 transition-colors"
      >
        <span className="truncate">{selectedTreatment}</span>
        <span className="text-xs text-gray-400" aria-hidden="true">▼</span>
      </button>

      {dropdownOpen && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute top-full left-0 mt-2 w-full sm:w-64 bg-[#252525] border border-gray-700 rounded-lg shadow-2xl py-2 z-50"
        >
          {Object.keys(TREATMENT_SOPS).map((treatment) => (
            <button
              key={treatment}
              type="button"
              role="option"
              aria-selected={selectedTreatment === treatment}
              onClick={() => onSelectTreatment(treatment)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                selectedTreatment === treatment
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'hover:bg-cyan-500/20 hover:text-cyan-300 text-gray-200'
              }`}
            >
              {treatment}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChecklistCard({
  selectedTreatment,
  steps,
  checks,
  completedCount,
  onToggleStep,
  onReset,
  onCopy
}) {
  const progressPercent = steps.length ? Math.round((completedCount / steps.length) * 100) : 0;

  return (
    <section className="bg-[#1e1e1e] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white">目標流程</h3>
          <p className="text-xs text-gray-400 mt-1">選擇治療體系，系統只顯現精簡需要的物品；完成一項勾一項。</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium hover:bg-cyan-500/20 transition-colors"
          >
            <Copy size={14} />
            複製清單
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-600 bg-[#2a2a2a] text-gray-200 text-xs font-medium hover:bg-[#303030] transition-colors"
          >
            <RotateCcw size={14} />
            重設清單
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-cyan-300">{selectedTreatment}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>目前進度</span>
          <span>{completedCount} / {steps.length}</span>
        </div>
        <div className="h-2 rounded-full bg-gray-800 overflow-hidden" aria-hidden="true">
          <div className="h-full bg-cyan-500 transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {steps.map((step, idx) => {
          const checked = Boolean(checks[idx]);
          const checkboxId = `step-${encodeURIComponent(selectedTreatment)}-${idx}`;

          return (
            <div
              key={checkboxId}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                checked
                  ? 'bg-cyan-500/5 border-cyan-500/30'
                  : 'bg-[#262626] border-gray-800/80 hover:border-gray-700'
              }`}
            >
              <input
                type="checkbox"
                id={checkboxId}
                checked={checked}
                onChange={() => onToggleStep(idx)}
                className="w-4 h-4 rounded accent-cyan-500 bg-gray-800 border-gray-600 focus:ring-0"
              />
              <label
                htmlFor={checkboxId}
                className={`text-sm font-medium cursor-pointer select-none ${
                  checked ? 'text-cyan-300 line-through' : 'text-gray-200'
                }`}
              >
                {step}
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function NotesCard() {
  return (
    <section className="bg-[#1e1e1e] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
        <CheckSquare className="text-cyan-400" size={20} />
        <h3 className="text-lg font-bold text-white">防呆備籤</h3>
      </div>

      <ul className="space-y-3 pt-1 text-sm text-gray-300">
        <li className="flex items-center gap-2">
          <span className="text-cyan-400">✓</span> 邊備個裝自動翻譯成中文
        </li>
        <li className="flex items-center gap-2">
          <span className="text-cyan-400">✓</span> 備物清單可複製貼到內本
        </li>
        <li className="flex items-center gap-2">
          <span className="text-cyan-400">✓</span> 賢時強檢需求要標記
        </li>
        <li className="flex items-center gap-2">
          <span className="text-cyan-400">✓</span> 完成後寫入看診簡報表
        </li>
      </ul>
    </section>
  );
}

function ChairMode({
  selectedTreatment,
  dropdownOpen,
  onToggleDropdown,
  onSelectTreatment,
  dropdownRef,
  steps,
  checks,
  completedCount,
  onToggleStep,
  onReset,
  onCopy
}) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Chair Mode</h2>
          <p className="text-sm text-gray-400">幫忙加到看診手機的人聽：三秒看懂「現在要準備什麼」</p>
        </div>
        <span className="w-fit px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-medium">
          單機模式：本地上線
        </span>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-[#1e1e1e] p-4 rounded-xl border border-gray-800">
        <span className="text-sm text-gray-300">診療項目：</span>
        <TreatmentSelector
          selectedTreatment={selectedTreatment}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={onToggleDropdown}
          onSelectTreatment={onSelectTreatment}
          dropdownRef={dropdownRef}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChecklistCard
          selectedTreatment={selectedTreatment}
          steps={steps}
          checks={checks}
          completedCount={completedCount}
          onToggleStep={onToggleStep}
          onReset={onReset}
          onCopy={onCopy}
        />
        <NotesCard />
      </div>

      <p className="text-xs text-amber-300/90 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
        僅供院內流程參考，請依院所規範與專業人員指示。
      </p>
    </div>
  );
}

function TreatmentLibrary({ onOpenTreatment }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-white">治療庫 Treatment Library</h2>
        <p className="text-sm text-gray-400">快速查看所有治療流程與步驟數，點一下即可切換到 Chair Mode。</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(TREATMENT_SOPS).map(([treatment, steps]) => (
          <button
            key={treatment}
            type="button"
            onClick={() => onOpenTreatment(treatment)}
            className="text-left bg-[#1e1e1e] p-4 rounded-xl border border-gray-800 hover:border-cyan-500/40 hover:bg-[#222] transition-colors"
          >
            <p className="font-semibold text-white">{treatment}</p>
            <p className="text-sm text-gray-400 mt-2">SOP 步驟數：{steps.length}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ModulePlaceholder({ moduleId }) {
  const copy = MODULE_COPY[moduleId] || {
    title: '模組建置中',
    description: '此模組正在完善中，將提供更完整的診務支援。'
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex items-center justify-center">
      <div className="w-full bg-[#1e1e1e] p-8 rounded-xl border border-gray-800 text-center space-y-4">
        <Search size={44} className="text-gray-600 mx-auto" />
        <h2 className="text-xl font-semibold text-white">{copy.title}</h2>
        <p className="text-sm text-gray-400">{copy.description}</p>
      </div>
    </div>
  );
}

export default function App() {
  const initialState = useMemo(() => parseStoredState(), []);
  const [activeTab, setActiveTab] = useState(initialState.activeTab);
  const [selectedTreatment, setSelectedTreatment] = useState(initialState.selectedTreatment);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [completedByTreatment, setCompletedByTreatment] = useState(initialState.completedByTreatment);
  const [statusMessage, setStatusMessage] = useState('');
  const dropdownRef = useRef(null);

  const steps = useMemo(() => TREATMENT_SOPS[selectedTreatment] ?? [], [selectedTreatment]);
  const checks = completedByTreatment[selectedTreatment] ?? [];
  const completedCount = checks.filter(Boolean).length;
  const totalSteps = steps.length;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeTab,
        selectedTreatment,
        completedByTreatment
      })
    );
  }, [activeTab, selectedTreatment, completedByTreatment]);

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const toggleStep = (index) => {
    setCompletedByTreatment((prev) => {
      const existing = Array.isArray(prev[selectedTreatment])
        ? [...prev[selectedTreatment]]
        : steps.map(() => false);
      existing[index] = !existing[index];
      return {
        ...prev,
        [selectedTreatment]: existing
      };
    });
  };

  const resetChecklist = () => {
    setCompletedByTreatment((prev) => ({
      ...prev,
      [selectedTreatment]: steps.map(() => false)
    }));
    setStatusMessage(`已重設 ${selectedTreatment} 清單`);
  };

  const copyChecklist = async () => {
    const lines = steps.map((step, idx) => `${checks[idx] ? '[x]' : '[ ]'} ${step}`);
    const text = [`治療項目：${selectedTreatment}`, ...lines].join('\n');

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', 'true');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (!copied) {
          throw new Error('fallback copy failed');
        }
      }

      setStatusMessage('清單已複製到剪貼簿');
    } catch (error) {
      setStatusMessage('複製失敗，請手動複製');
    }
  };

  const openTreatmentInChairMode = (treatment) => {
    setSelectedTreatment(treatment);
    setActiveTab('chair');
    setDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 font-sans">
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#141414]">
          <p className="sr-only" aria-live="polite">{statusMessage}</p>
          {statusMessage && (
            <div className="max-w-5xl mx-auto mb-4" role="status" aria-live="polite">
              <p className="text-sm text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-3 py-2">
                {statusMessage}
              </p>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <Dashboard
              treatmentCount={Object.keys(TREATMENT_SOPS).length}
              completedCount={completedCount}
              totalSteps={totalSteps}
              selectedTreatment={selectedTreatment}
              onGoChairMode={() => setActiveTab('chair')}
            />
          )}

          {activeTab === 'chair' && (
            <ChairMode
              selectedTreatment={selectedTreatment}
              dropdownOpen={dropdownOpen}
              onToggleDropdown={() => setDropdownOpen((prev) => !prev)}
              onSelectTreatment={(treatment) => {
                setSelectedTreatment(treatment);
                setDropdownOpen(false);
              }}
              dropdownRef={dropdownRef}
              steps={steps}
              checks={checks}
              completedCount={completedCount}
              onToggleStep={toggleStep}
              onReset={resetChecklist}
              onCopy={copyChecklist}
            />
          )}

          {activeTab === 'library' && (
            <TreatmentLibrary onOpenTreatment={openTreatmentInChairMode} />
          )}

          {!['dashboard', 'chair', 'library'].includes(activeTab) && (
            <ModulePlaceholder moduleId={activeTab} />
          )}
        </main>
      </div>
    </div>
  );
}
