import React, { useState } from 'react';
import { LayoutDashboard, Stethoscope, BookOpen, FileText, GraduationCap, TrendingUp, Settings, CheckSquare, Search } from 'lucide-react';

const treatmentSOPs = {
  'OD 補牙': ['1. 破洞 + 軟齲 BUR', '2. Etch', '3. Bond + 各 + 0點轉', '4. Flow', '5. 填充', '6. 催化劑', '7. 切邊 + 阻點', '8. 咬合紙 + 咬合點'],
  'RCT 根管治療': ['1. NS 生理食鹽水', '2. Endo box / files', '3. Gauge', '4. Rubber Dam', '5. 各種病毒之特製材料與封填材料'],
  'EXT 拔牙': ['1. 麻醉', '2. 白麻藥', '3. 象牙 / 鉗子 + 注射器', '4. Forcep (上150/下151)', '5. Elevator (大/中/小、微創)'],
  'Crown 假牙/拆 Crown': ['1. Crown remove', '2. File check (雙微型套釬)', '3. 挑幾 + 直機 Bur', '4. 印模劑', '5. 牙膠', '6. 黏劑 (固定或臨時)']
};

export default function App() {
  const [activeTab, setActiveTab] = useState('chair');
  const [selectedTreatment, setSelectedTreatment] = useState('OD 补牙');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#121212] text-gray-100 font-sans">
      {/* 側邊導覽列 */}
      <div className="w-64 bg-[#1e1e1e] p-4 flex flex-col justify-between border-r border-gray-800">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center font-bold text-black">牙</div>
            <div>
              <h1 className="font-bold text-lg tracking-wide">牙天使</h1>
              <p className="text-xs text-cyan-400 font-medium">LUXURY DENTAL GPS</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: '總覽 Dashboard', icon: LayoutDashboard },
              { id: 'chair', label: '當椅模式 Chair Mode', icon: Stethoscope },
              { id: 'library', label: '治療庫 Treatment Library', icon: BookOpen },
              { id: 'codebook', label: '健保代碼 Codebook', icon: FileText },
              { id: 'training', label: '新人訓練 Training', icon: GraduationCap },
              { id: 'roi', label: '營運報表 ROI', icon: TrendingUp },
              { id: 'admin', label: '院所設定 Admin', icon: Settings }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive ? 'bg-[#2a2a2a] text-cyan-400 border-l-4 border-cyan-400' : 'text-gray-400 hover:bg-[#252525] hover:text-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="text-xs text-gray-500 px-2">v0.1 Prototype · 所有權者檢視</div>
      </div>

      {/* 主要內容區 */}
      <div className="flex-1 overflow-y-auto p-8 bg-[#141414]">
        {activeTab === 'chair' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <header className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Chair Mode</h2>
                <p className="text-sm text-gray-400">幫忙加到看診手機的人聽：三秒看懂「現在要準備什麼」</p>
              </div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-medium">
                單機模式：本地上線
              </span>
            </header>

            {/* 下拉選單與控制區 */}
            <div className="relative flex items-center gap-4 bg-[#1e1e1e] p-4 rounded-xl border border-gray-800">
              <span className="text-sm text-gray-300">診療項目：</span>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-[#2a2a2a] px-4 py-2 rounded-lg border border-gray-700 flex items-center gap-3 text-sm font-semibold text-white hover:border-gray-500 transition-colors"
                >
                  {selectedTreatment} <span className="text-xs text-gray-400">▼</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#252525] border border-gray-700 rounded-lg shadow-2xl py-2 z-50">
                    {Object.keys(treatmentSOPs).map((t) => (
                      <button
                        key={t}
                        onClick={() => { setSelectedTreatment(t); setDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-cyan-500/20 hover:text-cyan-300 text-gray-200"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 主要兩欄區域 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SOP 流程 */}
              <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-3">目標流程</h3>
                <p className="text-xs text-gray-400">選擇治療體系，系統只顯現精簡需要的物品；完成一項勾一項。</p>
                <div className="space-y-3 pt-2">
                  {treatmentSOPs[selectedTreatment]?.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-[#262626] rounded-lg border border-gray-800/80 hover:border-gray-700 transition-all">
                      <input type="checkbox" id={`step-${idx}`} className="w-4 h-4 rounded accent-cyan-500 bg-gray-800 border-gray-600 focus:ring-0" />
                      <label htmlFor={`step-${idx}`} className="text-sm font-medium text-gray-200 cursor-pointer select-none">
                        {step}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 防呆範本卡片 */}
              <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                  <CheckSquare className="text-cyan-400" size={20} />
                  <h3 className="text-lg font-bold text-white">防呆備籤</h3>
                </div>
                <ul className="space-y-3 pt-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span> 邊備個裝自動翻譯成中文
                  </li>
                  <li className="li-item flex items-center gap-2">
                    <span className="text-cyan-400">✓</span> 備物清單可複製貼到內本
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span> 賢時強檢需求要標記
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span> 完成後寫入看診簡報表
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'chair' && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-3">
            <Search size={48} className="text-gray-600" />
            <p className="text-lg font-medium text-gray-400">「{activeTab}」模組介面建置中...</p>
          </div>
        )}
      </div>
    </div>
  );
}

