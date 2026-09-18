import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BookOpen,
  Bot,
  CheckSquare,
  ChevronDown,
  ClipboardList,
  FileText,
  FlaskConical,
  GraduationCap,
  Languages,
  LayoutDashboard,
  LogOut,
  Moon,
  PlayCircle,
  Plus,
  Search,
  Settings,
  ShieldPlus,
  Sparkles,
  Stethoscope,
  Sun,
  Trash2,
  TrendingUp,
  User
} from 'lucide-react';

const STORAGE_KEY = 'dental-angel-app-v1';

const messages = {
  'zh-TW': {
    appName: '牙科小天使',
    subtitle: 'Dental Angel',
    login: '登入',
    logout: '登出',
    username: '帳號',
    password: '密碼',
    role: '角色',
    theme: '主題',
    language: '語言',
    darkMode: '深色',
    lightMode: '淺色',
    globalSearch: '全域搜尋：器械、療程、代碼、急救情境',
    dashboard: '儀表板',
    chair: 'Chair 工作流',
    procedures: '療程資料庫',
    training: '助理訓練',
    instruments: '器械資料庫',
    emergency: '緊急應對',
    simulation: '臨床模擬',
    patient: '病患教育',
    admin: '管理後台',
    noData: '暫無資料',
    save: '儲存',
    cancel: '取消',
    beforeTreatment: '術前準備',
    duringTreatment: '術中流程',
    afterTreatment: '術後處理',
    missingItem: '可能缺少項目',
    nextStep: '下一步',
    previousStep: '上一步',
    dontKnow: '我不認識這個',
    startSimulation: '開始模擬',
    submitAnswer: '提交答案',
    disclaimer:
      '本系統僅為助理支援工具，不能取代專業臨床判斷、院內流程或緊急醫療處置標準。',
    searchResult: '搜尋結果',
    noResult: '查無結果',
    add: '新增',
    remove: '刪除'
  },
  'zh-CN': {
    appName: '牙科小天使',
    subtitle: 'Dental Angel',
    login: '登录',
    logout: '登出',
    username: '账号',
    password: '密码',
    role: '角色',
    theme: '主题',
    language: '语言',
    darkMode: '深色',
    lightMode: '浅色',
    globalSearch: '全局搜索：器械、治疗、代码、紧急情境',
    dashboard: '仪表板',
    chair: 'Chair 工作流',
    procedures: '治疗库',
    training: '助理训练',
    instruments: '器械库',
    emergency: '紧急应对',
    simulation: '临床模拟',
    patient: '患者教育',
    admin: '管理后台',
    noData: '暂无数据',
    save: '保存',
    cancel: '取消',
    beforeTreatment: '术前准备',
    duringTreatment: '术中流程',
    afterTreatment: '术后处理',
    missingItem: '可能缺少项目',
    nextStep: '下一步',
    previousStep: '上一步',
    dontKnow: '我不认识这个',
    startSimulation: '开始模拟',
    submitAnswer: '提交答案',
    disclaimer: '本系统仅为助理支持工具，不能替代专业临床判断或急救处置标准。',
    searchResult: '搜索结果',
    noResult: '无结果',
    add: '新增',
    remove: '删除'
  },
  en: {
    appName: 'Dental Angel',
    subtitle: 'Dental Angel',
    login: 'Login',
    logout: 'Logout',
    username: 'Username',
    password: 'Password',
    role: 'Role',
    theme: 'Theme',
    language: 'Language',
    darkMode: 'Dark',
    lightMode: 'Light',
    globalSearch: 'Global search: instruments, procedures, codes, emergency scenarios',
    dashboard: 'Dashboard',
    chair: 'Chair Workflow',
    procedures: 'Procedure Library',
    training: 'Assistant Training',
    instruments: 'Instrument Library',
    emergency: 'Emergency Response',
    simulation: 'Clinical Simulation',
    patient: 'Patient Education',
    admin: 'Admin Portal',
    noData: 'No data',
    save: 'Save',
    cancel: 'Cancel',
    beforeTreatment: 'Before Treatment',
    duringTreatment: 'During Treatment',
    afterTreatment: 'After Treatment',
    missingItem: 'Potential missing item',
    nextStep: 'Next Step',
    previousStep: 'Previous Step',
    dontKnow: "I don't know this",
    startSimulation: 'Start Simulation',
    submitAnswer: 'Submit Answer',
    disclaimer:
      'This system is an assistant-support tool and does not replace professional clinical judgment or emergency protocols.',
    searchResult: 'Search Results',
    noResult: 'No results',
    add: 'Add',
    remove: 'Remove'
  },
  th: {
    appName: 'Dental Angel',
    subtitle: 'Dental Angel',
    login: 'เข้าสู่ระบบ',
    logout: 'ออกจากระบบ',
    username: 'ชื่อผู้ใช้',
    password: 'รหัสผ่าน',
    role: 'บทบาท',
    theme: 'ธีม',
    language: 'ภาษา',
    darkMode: 'มืด',
    lightMode: 'สว่าง',
    globalSearch: 'ค้นหาทั่วระบบ',
    dashboard: 'แดชบอร์ด',
    chair: 'การทำงานข้างเก้าอี้',
    procedures: 'คลังหัตถการ',
    training: 'ฝึกผู้ช่วย',
    instruments: 'คลังอุปกรณ์',
    emergency: 'เหตุฉุกเฉิน',
    simulation: 'จำลองสถานการณ์',
    patient: 'ความรู้ผู้ป่วย',
    admin: 'ผู้ดูแล',
    noData: 'ไม่มีข้อมูล',
    save: 'บันทึก',
    cancel: 'ยกเลิก',
    beforeTreatment: 'ก่อนรักษา',
    duringTreatment: 'ระหว่างรักษา',
    afterTreatment: 'หลังรักษา',
    missingItem: 'อาจขาดอุปกรณ์',
    nextStep: 'ขั้นถัดไป',
    previousStep: 'ขั้นก่อนหน้า',
    dontKnow: 'ฉันไม่รู้จักสิ่งนี้',
    startSimulation: 'เริ่มจำลอง',
    submitAnswer: 'ส่งคำตอบ',
    disclaimer: 'ระบบนี้เป็นเครื่องมือช่วยเหลือ ไม่แทนที่การตัดสินใจทางคลินิก',
    searchResult: 'ผลการค้นหา',
    noResult: 'ไม่พบผลลัพธ์',
    add: 'เพิ่ม',
    remove: 'ลบ'
  },
  ja: {
    appName: 'Dental Angel',
    subtitle: 'Dental Angel',
    login: 'ログイン',
    logout: 'ログアウト',
    username: 'ユーザー名',
    password: 'パスワード',
    role: 'ロール',
    theme: 'テーマ',
    language: '言語',
    darkMode: 'ダーク',
    lightMode: 'ライト',
    globalSearch: 'グローバル検索',
    dashboard: 'ダッシュボード',
    chair: 'チェアワークフロー',
    procedures: '処置ライブラリ',
    training: 'アシスタント訓練',
    instruments: '器材ライブラリ',
    emergency: '緊急対応',
    simulation: '臨床シミュレーション',
    patient: '患者教育',
    admin: '管理',
    noData: 'データなし',
    save: '保存',
    cancel: 'キャンセル',
    beforeTreatment: '治療前',
    duringTreatment: '治療中',
    afterTreatment: '治療後',
    missingItem: '不足の可能性',
    nextStep: '次へ',
    previousStep: '戻る',
    dontKnow: 'これがわかりません',
    startSimulation: 'シミュレーション開始',
    submitAnswer: '回答送信',
    disclaimer: '本システムは補助ツールであり、臨床判断の代替ではありません。',
    searchResult: '検索結果',
    noResult: '結果なし',
    add: '追加',
    remove: '削除'
  }
};

const roles = [
  { id: 'admin', label: 'Admin' },
  { id: 'dentist', label: 'Director/Dentist' },
  { id: 'assistant', label: 'Assistant' },
  { id: 'trainee', label: 'Trainee' },
  { id: 'patient', label: 'Patient' }
];

const portalConfig = [
  { id: 'dashboard', icon: LayoutDashboard, roles: ['admin', 'dentist', 'assistant', 'trainee'] },
  { id: 'chair', icon: Stethoscope, roles: ['admin', 'dentist', 'assistant'] },
  { id: 'procedures', icon: BookOpen, roles: ['admin', 'dentist', 'assistant', 'trainee'] },
  { id: 'training', icon: GraduationCap, roles: ['admin', 'assistant', 'trainee'] },
  { id: 'instruments', icon: FileText, roles: ['admin', 'dentist', 'assistant', 'trainee'] },
  { id: 'emergency', icon: AlertTriangle, roles: ['admin', 'dentist', 'assistant', 'trainee'] },
  { id: 'simulation', icon: Sparkles, roles: ['admin', 'assistant', 'trainee'] },
  { id: 'patient', icon: User, roles: ['admin', 'dentist', 'patient'] },
  { id: 'admin', icon: Settings, roles: ['admin'] }
];

const demoUsers = [
  { username: 'admin', password: 'demo123', role: 'admin', name: '王院長' },
  { username: 'dentist', password: 'demo123', role: 'dentist', name: '林醫師' },
  { username: 'assistant', password: 'demo123', role: 'assistant', name: '小美助理' },
  { username: 'trainee', password: 'demo123', role: 'trainee', name: '新訓學員' },
  { username: 'patient', password: 'demo123', role: 'patient', name: '病患模式' }
];

const proceduresSeed = [
  {
    id: 'od-composite',
    name: 'Composite restoration / OD',
    code: 'OD37',
    beforeItems: ['Basic tray', 'Mirror', 'Explorer/probe', 'Tweezers', 'Suction', '3-way syringe', 'Etchant', 'Bond', 'Composite resin', 'Curing light', 'Floss', 'Matrix band', 'Wooden wedge'],
    duringSteps: [
      { title: 'Basic setup', dentist: '確認齲齒範圍', assistantPrep: '擺放基本盤與吸唾', pass: 'Mirror, Explorer', refs: ['Mirror', 'Explorer/probe'] },
      { title: 'Isolation', dentist: '隔離操作區域', assistantPrep: '準備棉捲、吸唾', pass: 'Suction, Cotton roll', refs: ['Suction'] },
      { title: 'Etching', dentist: '酸蝕', assistantPrep: '準備 Etchant 與沖洗', pass: 'Etchant', refs: ['Etchant'] },
      { title: 'Bonding', dentist: '塗佈黏著劑', assistantPrep: '準備 Bond 與微刷', pass: 'Bond', refs: ['Bond'] },
      { title: 'Composite placement', dentist: '分層填補樹脂', assistantPrep: '準備 Composite resin', pass: 'Composite resin', refs: ['Composite resin'] },
      { title: 'Curing', dentist: '光照固化', assistantPrep: '準備 Curing light', pass: 'Curing light', refs: ['Curing light'] },
      { title: 'Finishing', dentist: '修整咬合與外型', assistantPrep: '準備修整器械', pass: 'Bur/strip', refs: ['Tweezers'] },
      { title: 'Flossing', dentist: '確認鄰接面', assistantPrep: '準備牙線', pass: 'Floss', refs: ['Floss'] },
      { title: 'Cleanup', dentist: '結束療程', assistantPrep: '分類器械與耗材', pass: 'Waste tray', refs: ['Basic tray'] }
    ],
    patientSummary: '本次將修補蛀牙並恢復牙齒外型與咬合。',
    aftercare: ['2 小時內避免使用該側咀嚼硬物', '如持續疼痛請回診']
  },
  {
    id: 'interproximal',
    name: 'Interproximal restoration',
    code: 'IPR',
    beforeItems: ['Matrix band', 'Wooden wedge', 'Composite resin', 'Bond', 'Etchant', 'Curing light'],
    duringSteps: [
      { title: 'Build proximal wall', dentist: '建立鄰接壁', assistantPrep: '裝好 matrix band', pass: 'Matrix band + wedge', refs: ['Matrix band', 'Wooden wedge'] },
      { title: 'Layering', dentist: '分層填補', assistantPrep: '準備樹脂', pass: 'Composite resin', refs: ['Composite resin'] }
    ],
    patientSummary: '本次為牙縫鄰接面修復，恢復食物不易卡住的接觸點。',
    aftercare: ['當日避免過度咬硬物']
  },
  {
    id: 'rct',
    name: 'Root canal treatment / RCT',
    code: 'RCT',
    beforeItems: ['Rubber dam', 'Clamp', 'Clamp holder', 'Rubber dam frame', 'Endodontic ruler', 'Endodontic instruments', 'Endodontic meter', 'Hooks', 'Saline', 'Irrigation materials'],
    duringSteps: [
      { title: 'Access opening', dentist: '打開髓腔', assistantPrep: '吸唾與照明', pass: 'Endodontic instruments', refs: ['Endodontic instruments'] },
      { title: 'Canal scouting', dentist: '探查根管', assistantPrep: '量測工具待命', pass: 'Endodontic ruler', refs: ['Endodontic ruler', 'Endodontic meter'] },
      { title: 'Irrigation', dentist: '沖洗根管', assistantPrep: '生理食鹽水', pass: 'Saline + irrigation set', refs: ['Saline'] }
    ],
    patientSummary: '根管治療將移除感染組織並消毒根管。',
    aftercare: ['治療後可能短暫痠痛', '依醫囑服藥與回診']
  },
  {
    id: 'rcf',
    name: 'Root canal filling / RCF',
    code: 'RCF',
    beforeItems: ['Absorbent points', 'Obturation materials', 'Sealer', 'Rubber dam'],
    duringSteps: [
      { title: 'Dry canal', dentist: '乾燥根管', assistantPrep: '吸水紙尖', pass: 'Absorbent points', refs: ['Absorbent points'] },
      { title: 'Obturation', dentist: '根管充填', assistantPrep: '準備封填材料', pass: 'Obturation materials', refs: ['Obturation-related materials'] }
    ],
    patientSummary: '根管充填將封閉根管，降低再感染風險。',
    aftercare: ['依醫囑安排後續假牙修復']
  },
  { id: 'exam', name: 'Dental examination', code: 'EXAM', beforeItems: ['Mirror', 'Explorer/probe'], duringSteps: [{ title: 'Examination', dentist: '口內檢查', assistantPrep: '資料紀錄', pass: 'Mirror', refs: ['Mirror'] }], patientSummary: '一般口腔檢查。', aftercare: ['依檢查結果安排後續'] },
  { id: 'xray-pa', name: 'X-ray / periapical', code: 'PA', beforeItems: ['X-ray sensor', 'Positioner'], duringSteps: [{ title: 'Positioning', dentist: '擺位', assistantPrep: '保護設備', pass: 'Sensor', refs: ['X-ray sensor'] }], patientSummary: '小範圍牙根 X 光檢查。', aftercare: ['無特殊限制'] },
  { id: 'xray-pano', name: 'Panoramic X-ray / PANO', code: 'PANO', beforeItems: ['Panoramic machine', 'Protective apron'], duringSteps: [{ title: 'Panoramic capture', dentist: '全口環景拍攝', assistantPrep: '病人站位與防護', pass: 'Protective apron', refs: ['Panoramic machine'] }], patientSummary: '全口環景 X 光檢查。', aftercare: ['無特殊限制'] },
  { id: 'la', name: 'Local anesthesia', code: 'LA', beforeItems: ['Anesthetic carpule', 'Syringe', 'Topical anesthetic'], duringSteps: [{ title: 'Injection support', dentist: '局部麻醉注射', assistantPrep: '觀察病人反應', pass: 'Syringe', refs: ['Syringe'] }], patientSummary: '局部麻醉降低治療不適。', aftercare: ['麻醉退前避免咬到嘴唇'] },
  { id: 'ext', name: 'Extraction', code: 'EXT', beforeItems: ['Forcep', 'Elevator', 'Suction', 'Gauze'], duringSteps: [{ title: 'Extraction', dentist: '拔牙操作', assistantPrep: '止血與吸唾', pass: 'Forcep', refs: ['Forcep'] }], patientSummary: '拔除無法保留牙齒。', aftercare: ['咬紗布止血', '24 小時內勿漱口'] },
  { id: 'scaling', name: 'Scaling', code: 'SCAL', beforeItems: ['Scaler tip', 'Suction'], duringSteps: [{ title: 'Scaling', dentist: '洗牙', assistantPrep: '水氣調整', pass: 'Suction', refs: ['Suction'] }], patientSummary: '清除牙結石維持牙周健康。', aftercare: ['短暫敏感屬常見'] },
  { id: 'temp', name: 'Temporary restoration', code: 'TEMP', beforeItems: ['Temporary material', 'Spatula'], duringSteps: [{ title: 'Temporary fill', dentist: '暫時填補', assistantPrep: '調拌材料', pass: 'Temporary material', refs: ['Temporary material'] }], patientSummary: '暫時封填等待正式療程。', aftercare: ['避免該側咀嚼黏硬食物'] }
];

const instrumentSeed = [
  {
    id: 'mirror',
    name: 'Mirror',
    zhName: '口鏡',
    enName: 'Dental Mirror',
    category: 'Basic instruments',
    image: '🪞',
    purpose: '提供視野與牽引軟組織',
    procedures: ['od-composite', 'exam'],
    preparationStage: '術前放入基本盤',
    duringUsage: '視診、反射照明',
    cleaning: '超音波清洗後滅菌',
    disposable: false,
    disassemblable: false,
    packaging: '器械袋封裝',
    storage: '基本器械抽屜'
  },
  {
    id: 'matrix',
    name: 'Matrix band',
    zhName: '成型片',
    enName: 'Matrix band',
    category: 'Restorative materials',
    image: '🔩',
    purpose: '建立鄰接面外形',
    procedures: ['od-composite', 'interproximal'],
    preparationStage: '術前備妥尺寸',
    duringUsage: '鄰接壁重建時使用',
    cleaning: '多為一次性',
    disposable: true,
    disassemblable: false,
    packaging: '原包裝存放',
    storage: '耗材櫃'
  },
  {
    id: 'rubber-dam',
    name: 'Rubber dam',
    zhName: '橡皮障',
    enName: 'Rubber dam',
    category: 'Endodontic instruments',
    image: '🟦',
    purpose: '隔離術區避免污染',
    procedures: ['rct', 'rcf'],
    preparationStage: '術前確認尺寸與夾子',
    duringUsage: '根管/黏著流程隔離',
    cleaning: '依材質處理，多為一次性片材',
    disposable: true,
    disassemblable: false,
    packaging: '原包裝',
    storage: '根管器械區'
  },
  {
    id: 'forcep',
    name: 'Forcep',
    zhName: '拔牙鉗',
    enName: 'Extraction forceps',
    category: 'Surgical instruments',
    image: '🦷',
    purpose: '拔牙夾持',
    procedures: ['ext'],
    preparationStage: '術前挑選牙位對應型號',
    duringUsage: '拔牙操作',
    cleaning: '分類、刷洗、滅菌',
    disposable: false,
    disassemblable: false,
    packaging: '手術器械袋',
    storage: '拔牙器械櫃'
  }
];

const emergencySeed = [
  {
    id: 'anesthesia-discomfort',
    query: '麻醉不適 / anesthesia discomfort',
    immediate: '先停止操作，請病患平躺並監測意識與呼吸。',
    notify: '立即通知醫師，簡短回報症狀與時間點。',
    followUp: '依院內緊急流程持續監測並記錄。'
  },
  {
    id: 'instrument-dropped',
    query: '器械掉落 / instrument dropped',
    immediate: '立刻將掉落器械移出無菌區。',
    notify: '告知醫師更換器械。',
    followUp: '補位新器械並記錄器械追蹤。'
  },
  {
    id: 'cannot-locate-canal',
    query: '找不到牙根 / cannot locate canal',
    immediate: '保持視野清楚，準備放大與沖洗器材。',
    notify: '主動回報醫師可用的輔助器械。',
    followUp: '依醫師指示調整流程，避免催促造成失誤。'
  },
  {
    id: 'patient-vomit',
    query: '病人突然嘔吐 / patient suddenly vomits',
    immediate: '停止操作、協助側躺、防止嗆咳。',
    notify: '立即通知醫師與支援人員。',
    followUp: '清理汙染區域並確認病患生命徵象。'
  },
  {
    id: 'missing-material',
    query: '缺少醫師突然需要的材料',
    immediate: '先告知醫師正在補拿，提供替代品評估。',
    notify: '請同仁支援拿取。',
    followUp: '療程後補入術前清單與教育回訓。'
  }
];

const simulationSeed = [
  {
    id: 'sim-1',
    level: 'Beginner',
    prompt: '醫師突然要 matrix band，但你尚未準備。',
    options: ['先道歉並立刻補拿，同時提醒目前進度', '假裝聽不到', '請病人自行等待不說明'],
    answer: 0,
    reason: '先溝通再快速補位，可降低中斷風險。',
    risk: '若不回應會造成流程斷裂與醫病不安。',
    remember: '術前依療程勾選必備物，特別是鄰接面修復。',
    tag: 'tray-prep'
  },
  {
    id: 'sim-2',
    level: 'Intermediate',
    prompt: '病患治療中突然不舒服且想吐。',
    options: ['停止操作、協助側躺、通知醫師', '讓病患忍耐一下', '先繼續把步驟做完'],
    answer: 0,
    reason: '先確保安全與呼吸道是優先。',
    risk: '延誤處理可能造成吸入或暈厥風險。',
    remember: '遇到突發狀況先停手再通報。',
    tag: 'patient-safety'
  },
  {
    id: 'sim-3',
    level: 'Advanced',
    prompt: '醫師將 X-ray 指示從 periapical 改成 PANO。',
    options: ['立即切換流程並確認防護與機台', '照舊做 PA 不告知', '請病患自行去找機台'],
    answer: 0,
    reason: '快速確認醫囑變更並切換資源。',
    risk: '錯誤影像檢查造成重工與風險。',
    remember: '醫囑改變時先重述確認再執行。',
    tag: 'order-change'
  }
];

const authService = {
  login(username, password, role) {
    const found = demoUsers.find((user) => user.username === username && user.password === password && user.role === role);
    if (!found) {
      throw new Error('帳號、密碼或角色不正確');
    }
    return { name: found.name, role: found.role, username: found.username };
  }
};

const aiAssistService = {
  explainItem(item) {
    return {
      what: `${item.zhName}（${item.enName}）`,
      purpose: item.purpose,
      when: `常見於：${item.procedures.join(', ')}`,
      action: `${item.preparationStage}；治療中：${item.duringUsage}`,
      visual: item.image
    };
  }
};

const initialData = {
  clinic: {
    name: 'Luxury Dental GPS Clinic',
    chairs: ['Chair 1', 'Chair 2', 'Chair 3'],
    doctors: ['Dr. Lin', 'Dr. Wang'],
    assistants: ['Amy', 'Ben', 'Cindy']
  },
  procedures: proceduresSeed,
  instruments: instrumentSeed,
  emergencies: emergencySeed,
  simulations: simulationSeed,
  sopVersions: proceduresSeed.reduce((acc, procedure) => {
    acc[procedure.id] = {
      version: 1,
      doctorInstructions: '',
      warnings: '',
      steps: procedure.duringSteps
    };
    return acc;
  }, {}),
  trainingResults: [],
  searchHistory: []
};

function loadStoredData() {
  if (typeof window === 'undefined') return initialData;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialData;
  try {
    return { ...initialData, ...JSON.parse(raw) };
  } catch {
    return initialData;
  }
}

function App() {
  const [data, setData] = useState(loadStoredData);
  const [locale, setLocale] = useState('zh-TW');
  const [theme, setTheme] = useState('dark');
  const [currentUser, setCurrentUser] = useState(null);
  const [activePortal, setActivePortal] = useState('dashboard');
  const [globalQuery, setGlobalQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [authForm, setAuthForm] = useState({ username: 'assistant', password: 'demo123', role: 'assistant' });
  const [authError, setAuthError] = useState('');

  const [chairState, setChairState] = useState({
    chair: 'Chair 3',
    doctor: 'Dr. Lin',
    patientCase: 'Case A001',
    procedureId: 'od-composite',
    preparedByProcedure: {},
    currentStepIndex: 0
  });

  const [trainingProcedureId, setTrainingProcedureId] = useState('od-composite');
  const [trainingSearch, setTrainingSearch] = useState('');
  const [selectedInstrumentId, setSelectedInstrumentId] = useState('');
  const [explanation, setExplanation] = useState(null);

  const [emergencyQuery, setEmergencyQuery] = useState('');
  const [selectedEmergencyId, setSelectedEmergencyId] = useState('anesthesia-discomfort');

  const [simulationLevel, setSimulationLevel] = useState('Beginner');
  const [activeScenario, setActiveScenario] = useState(null);
  const [scenarioStartAt, setScenarioStartAt] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [scenarioFeedback, setScenarioFeedback] = useState(null);

  const [adminProcedureId, setAdminProcedureId] = useState('od-composite');
  const [newStepTitle, setNewStepTitle] = useState('');
  const [uploadedSopName, setUploadedSopName] = useState('');
  const [clinicDrafts, setClinicDrafts] = useState({ chairs: '', doctors: '', assistants: '' });

  const [cleaningStep, setCleaningStep] = useState(0);

  const t = (key) => messages[locale]?.[key] || messages['zh-TW'][key] || key;
  const isDark = theme === 'dark';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data]);

  const portalItems = useMemo(() => {
    if (!currentUser) return [];
    return portalConfig
      .filter((portal) => portal.roles.includes(currentUser.role))
      .map((portal) => ({ ...portal, label: t(portal.id) }));
  }, [currentUser, locale]);

  useEffect(() => {
    if (!portalItems.find((portal) => portal.id === activePortal) && portalItems[0]) {
      setActivePortal(portalItems[0].id);
    }
  }, [portalItems, activePortal]);

  const selectedProcedure = useMemo(
    () => data.procedures.find((procedure) => procedure.id === chairState.procedureId) || data.procedures[0],
    [data.procedures, chairState.procedureId]
  );

  const selectedTrainingProcedure = useMemo(
    () => data.procedures.find((procedure) => procedure.id === trainingProcedureId) || data.procedures[0],
    [data.procedures, trainingProcedureId]
  );

  const selectedEmergency = useMemo(
    () => data.emergencies.find((item) => item.id === selectedEmergencyId) || data.emergencies[0],
    [data.emergencies, selectedEmergencyId]
  );

  const selectedAdminSop = data.sopVersions[adminProcedureId];

  const currentPreparedState =
    chairState.preparedByProcedure[chairState.procedureId] ||
    selectedProcedure.beforeItems.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {});

  const missingItems = selectedProcedure.beforeItems.filter((item) => !currentPreparedState[item]);

  const trainingInstruments = useMemo(() => {
    const ids = new Set(selectedTrainingProcedure.beforeItems);
    return data.instruments.filter(
      (item) => item.procedures.includes(selectedTrainingProcedure.id) || ids.has(item.name)
    );
  }, [data.instruments, selectedTrainingProcedure]);

  const filteredTrainingInstruments = trainingInstruments.filter((item) => {
    if (!trainingSearch.trim()) return true;
    const query = trainingSearch.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.zhName.toLowerCase().includes(query) ||
      item.enName.toLowerCase().includes(query)
    );
  });

  const globalSearchCategories = useMemo(() => {
    const q = globalQuery.trim().toLowerCase();
    if (!q) return [];

    const procedures = data.procedures
      .filter((p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q))
      .map((p) => ({ type: 'procedure', id: p.id, title: `${p.name} (${p.code})` }));

    const instruments = data.instruments
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.zhName.toLowerCase().includes(q) ||
          item.enName.toLowerCase().includes(q)
      )
      .map((item) => ({ type: 'instrument', id: item.id, title: `${item.zhName} / ${item.enName}` }));

    const emergencies = data.emergencies
      .filter((item) => item.query.toLowerCase().includes(q))
      .map((item) => ({ type: 'emergency', id: item.id, title: item.query }));

    const sopMatches = data.procedures
      .filter((procedure) =>
        data.sopVersions[procedure.id]?.steps?.some((step) => step.title.toLowerCase().includes(q))
      )
      .map((procedure) => ({ type: 'sop', id: procedure.id, title: `SOP: ${procedure.name}` }));

    return [...procedures, ...instruments, ...emergencies, ...sopMatches];
  }, [globalQuery, data]);

  const frequentSearches = useMemo(() => {
    const map = data.searchHistory.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [data.searchHistory]);

  const simulationMetrics = useMemo(() => {
    const results = data.trainingResults;
    if (!results.length) return { accuracy: 0, averageTime: 0, weakAreas: [] };
    const correctCount = results.filter((item) => item.correct).length;
    const accuracy = Math.round((correctCount / results.length) * 100);
    const averageTime = Math.round(results.reduce((sum, item) => sum + item.responseMs, 0) / results.length / 1000);
    const weakMap = results.filter((item) => !item.correct).reduce((acc, item) => {
      acc[item.tag] = (acc[item.tag] || 0) + 1;
      return acc;
    }, {});
    const weakAreas = Object.entries(weakMap).sort((a, b) => b[1] - a[1]);
    return { accuracy, averageTime, weakAreas };
  }, [data.trainingResults]);

  const handleLogin = () => {
    setAuthError('');
    try {
      const session = authService.login(authForm.username, authForm.password, authForm.role);
      setCurrentUser(session);
      setActivePortal('dashboard');
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleGlobalSearch = (event) => {
    event.preventDefault();
    setSearchOpen(true);
    setSearchResults(globalSearchCategories);
    if (globalQuery.trim()) {
      setData((prev) => ({
        ...prev,
        searchHistory: [globalQuery.trim(), ...prev.searchHistory].slice(0, 100)
      }));
    }
  };

  const handleSearchResultClick = (result) => {
    if (result.type === 'procedure' || result.type === 'sop') {
      setChairState((prev) => ({ ...prev, procedureId: result.id, currentStepIndex: 0 }));
      setTrainingProcedureId(result.id);
      setAdminProcedureId(result.id);
      setActivePortal('procedures');
    }
    if (result.type === 'instrument') {
      setSelectedInstrumentId(result.id);
      setActivePortal('instruments');
    }
    if (result.type === 'emergency') {
      setSelectedEmergencyId(result.id);
      setActivePortal('emergency');
    }
    setSearchOpen(false);
  };

  const togglePreparedItem = (itemName) => {
    setChairState((prev) => {
      const procedureMap = prev.preparedByProcedure[prev.procedureId] || {};
      return {
        ...prev,
        preparedByProcedure: {
          ...prev.preparedByProcedure,
          [prev.procedureId]: {
            ...procedureMap,
            [itemName]: !procedureMap[itemName]
          }
        }
      };
    });
  };

  const changeProcedure = (procedureId) => {
    setChairState((prev) => ({
      ...prev,
      procedureId,
      currentStepIndex: 0,
      preparedByProcedure: {
        ...prev.preparedByProcedure,
        [procedureId]: {}
      }
    }));
  };

  const launchSimulation = () => {
    const pool = data.simulations.filter((scenario) => scenario.level === simulationLevel);
    if (!pool.length) return;
    const scenario = pool[Math.floor(Math.random() * pool.length)];
    setActiveScenario(scenario);
    setScenarioStartAt(Date.now());
    setSelectedAnswer(null);
    setScenarioFeedback(null);
  };

  const submitSimulationAnswer = () => {
    if (selectedAnswer === null || !activeScenario || !scenarioStartAt) return;
    const correct = selectedAnswer === activeScenario.answer;
    const responseMs = Date.now() - scenarioStartAt;
    const result = {
      id: `${activeScenario.id}-${Date.now()}`,
      scenarioId: activeScenario.id,
      prompt: activeScenario.prompt,
      correct,
      responseMs,
      tag: activeScenario.tag,
      timestamp: new Date().toISOString()
    };
    setData((prev) => ({
      ...prev,
      trainingResults: [result, ...prev.trainingResults].slice(0, 200)
    }));
    setScenarioFeedback({
      correct,
      reason: activeScenario.reason,
      risk: activeScenario.risk,
      remember: activeScenario.remember
    });
  };

  const addClinicField = (key, value) => {
    if (!value.trim()) return;
    setData((prev) => ({
      ...prev,
      clinic: {
        ...prev.clinic,
        [key]: [...prev.clinic[key], value.trim()]
      }
    }));
  };

  const removeClinicField = (key, value) => {
    setData((prev) => ({
      ...prev,
      clinic: {
        ...prev.clinic,
        [key]: prev.clinic[key].filter((item) => item !== value)
      }
    }));
  };

  const updateSopStep = (index, field, value) => {
    setData((prev) => {
      const target = prev.sopVersions[adminProcedureId];
      const nextSteps = target.steps.map((step, i) => (i === index ? { ...step, [field]: value } : step));
      return {
        ...prev,
        sopVersions: {
          ...prev.sopVersions,
          [adminProcedureId]: {
            ...target,
            steps: nextSteps
          }
        }
      };
    });
  };

  const reorderSopStep = (index, direction) => {
    setData((prev) => {
      const target = prev.sopVersions[adminProcedureId];
      const nextIndex = direction === 'up' ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= target.steps.length) return prev;
      const nextSteps = [...target.steps];
      const [picked] = nextSteps.splice(index, 1);
      nextSteps.splice(nextIndex, 0, picked);
      return {
        ...prev,
        sopVersions: {
          ...prev.sopVersions,
          [adminProcedureId]: {
            ...target,
            version: target.version + 1,
            steps: nextSteps
          }
        },
        procedures: prev.procedures.map((procedure) =>
          procedure.id === adminProcedureId ? { ...procedure, duringSteps: nextSteps } : procedure
        )
      };
    });
  };

  const addSopStep = () => {
    if (!newStepTitle.trim()) return;
    setData((prev) => {
      const target = prev.sopVersions[adminProcedureId];
      const step = {
        title: newStepTitle.trim(),
        dentist: '',
        assistantPrep: '',
        pass: '',
        refs: []
      };
      const nextSteps = [...target.steps, step];
      return {
        ...prev,
        sopVersions: {
          ...prev.sopVersions,
          [adminProcedureId]: {
            ...target,
            version: target.version + 1,
            steps: nextSteps
          }
        },
        procedures: prev.procedures.map((procedure) =>
          procedure.id === adminProcedureId ? { ...procedure, duringSteps: nextSteps } : procedure
        )
      };
    });
    setNewStepTitle('');
  };

  const updateSopMetadata = (field, value) => {
    setData((prev) => ({
      ...prev,
      sopVersions: {
        ...prev.sopVersions,
        [adminProcedureId]: {
          ...prev.sopVersions[adminProcedureId],
          [field]: value
        }
      }
    }));
  };

  const handleUploadSop = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadedSopName(file.name);
  };

  const selectedInstrument = data.instruments.find((item) => item.id === selectedInstrumentId) || data.instruments[0];

  const cleaningStages = ['Sorting', 'Disassembly', 'Washing', 'Drying', 'Inspection', 'Packaging', 'Sterilization', 'Storage'];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#111] text-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#1b1b1b] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h1 className="text-2xl font-bold">{t('appName')}</h1>
          <p className="text-sm text-gray-400">{t('subtitle')} · demo123</p>
          <label className="block text-sm">
            {t('username')}
            <input
              aria-label={t('username')}
              value={authForm.username}
              onChange={(event) => setAuthForm((prev) => ({ ...prev, username: event.target.value }))}
              className="mt-1 w-full bg-[#252525] border border-gray-700 rounded px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            {t('password')}
            <input
              aria-label={t('password')}
              type="password"
              value={authForm.password}
              onChange={(event) => setAuthForm((prev) => ({ ...prev, password: event.target.value }))}
              className="mt-1 w-full bg-[#252525] border border-gray-700 rounded px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            {t('role')}
            <select
              aria-label={t('role')}
              value={authForm.role}
              onChange={(event) => setAuthForm((prev) => ({ ...prev, role: event.target.value }))}
              className="mt-1 w-full bg-[#252525] border border-gray-700 rounded px-3 py-2"
            >
              {roles.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          {authError ? <p className="text-rose-400 text-sm">{authError}</p> : null}
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded px-3 py-2"
          >
            {t('login')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDark ? 'bg-[#121212] text-gray-100' : 'bg-gray-100 text-gray-900'} min-h-screen flex`}>
      <aside className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-200'} w-72 border-r p-4 flex flex-col gap-4`}>
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded bg-cyan-500 text-black font-bold flex items-center justify-center">牙</div>
            <div>
              <h1 className="font-bold">{t('appName')}</h1>
              <p className="text-xs text-cyan-500">{t('subtitle')}</p>
            </div>
          </div>
          <div className="text-xs space-y-1 mb-4">
            <p className="text-gray-400">{currentUser.name}</p>
            <p className="text-gray-500">{currentUser.role}</p>
          </div>
          <nav className="space-y-1" aria-label="Portal navigation">
            {portalItems.map((item) => {
              const Icon = item.icon;
              const active = activePortal === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setActivePortal(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${
                    active
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40'
                      : isDark
                      ? 'text-gray-300 hover:bg-[#2a2a2a]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <label className="space-y-1">
              <span className="flex items-center gap-1"><Languages size={12} />{t('language')}</span>
              <select
                aria-label={t('language')}
                value={locale}
                onChange={(event) => setLocale(event.target.value)}
                className={`${isDark ? 'bg-[#252525] border-gray-700' : 'bg-white border-gray-300'} w-full border rounded px-2 py-1`}
              >
                <option value="zh-TW">繁中</option>
                <option value="zh-CN">简中</option>
                <option value="en">EN</option>
                <option value="th">TH</option>
                <option value="ja">日本語</option>
              </select>
            </label>
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className={`${isDark ? 'bg-[#252525] border-gray-700' : 'bg-white border-gray-300'} border rounded px-2 py-1 flex items-center justify-center gap-1`}
              aria-label={t('theme')}
            >
              {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
              {theme === 'dark' ? t('darkMode') : t('lightMode')}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setCurrentUser(null)}
            className="w-full border border-rose-500/40 text-rose-400 rounded px-3 py-2 text-sm flex items-center justify-center gap-2"
          >
            <LogOut size={14} /> {t('logout')}
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 space-y-6">
        <form onSubmit={handleGlobalSearch} className="relative">
          <Search className="absolute left-3 top-3 text-gray-500" size={16} />
          <input
            aria-label={t('globalSearch')}
            value={globalQuery}
            onChange={(event) => setGlobalQuery(event.target.value)}
            className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} w-full border rounded-xl pl-10 pr-4 py-3 text-sm`}
            placeholder={t('globalSearch')}
          />
        </form>

        {searchOpen ? (
          <section className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4`}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{t('searchResult')}</h2>
              <button type="button" onClick={() => setSearchOpen(false)} className="text-xs text-gray-400">×</button>
            </div>
            <div className="space-y-2">
              {searchResults.length === 0 ? (
                <p className="text-sm text-gray-400">{t('noResult')}</p>
              ) : (
                searchResults.map((result, index) => (
                  <button
                    type="button"
                    key={`${result.type}-${result.id}-${index}`}
                    onClick={() => handleSearchResultClick(result)}
                    className="w-full text-left px-3 py-2 rounded border border-transparent hover:border-cyan-500/50 hover:bg-cyan-500/10"
                  >
                    <span className="text-xs text-cyan-400 mr-2">[{result.type}]</span>
                    {result.title}
                  </button>
                ))
              )}
            </div>
          </section>
        ) : null}

        {activePortal === 'dashboard' && (
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { title: 'Active chairs', value: data.clinic.chairs.length, icon: Stethoscope },
              { title: 'Current procedure', value: selectedProcedure.name, icon: ClipboardList },
              { title: 'Training accuracy', value: `${simulationMetrics.accuracy}%`, icon: TrendingUp },
              { title: 'Missing-item alerts', value: missingItems.length, icon: AlertTriangle }
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4`}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-400">{card.title}</p>
                    <Icon size={16} className="text-cyan-400" />
                  </div>
                  <p className="font-semibold">{card.value}</p>
                </div>
              );
            })}
            <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 xl:col-span-2`}>
              <h3 className="font-semibold mb-2">Recent simulations</h3>
              <div className="space-y-2 text-sm">
                {data.trainingResults.slice(0, 4).map((result) => (
                  <div key={result.id} className="flex justify-between border-b border-gray-700/30 pb-1">
                    <span>{result.prompt}</span>
                    <span className={result.correct ? 'text-emerald-400' : 'text-rose-400'}>
                      {result.correct ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                ))}
                {data.trainingResults.length === 0 ? <p className="text-gray-400">{t('noData')}</p> : null}
              </div>
            </div>
            <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 xl:col-span-2`}>
              <h3 className="font-semibold mb-2">Frequently searched</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {frequentSearches.length === 0 ? (
                  <span className="text-gray-400">{t('noData')}</span>
                ) : (
                  frequentSearches.map(([term, count]) => (
                    <button
                      type="button"
                      key={term}
                      onClick={() => {
                        setGlobalQuery(term);
                        setSearchResults(globalSearchCategories);
                        setSearchOpen(true);
                      }}
                      className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                    >
                      {term} ({count})
                    </button>
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {activePortal === 'chair' && (
          <section className="space-y-4">
            <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-3`}>
              <label className="text-sm">
                Chair
                <select
                  aria-label="Select chair"
                  value={chairState.chair}
                  onChange={(event) => setChairState((prev) => ({ ...prev, chair: event.target.value }))}
                  className="mt-1 w-full bg-transparent border border-gray-600 rounded px-2 py-2"
                >
                  {data.clinic.chairs.map((chair) => (
                    <option key={chair} value={chair}>{chair}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                Doctor
                <select
                  aria-label="Select doctor"
                  value={chairState.doctor}
                  onChange={(event) => setChairState((prev) => ({ ...prev, doctor: event.target.value }))}
                  className="mt-1 w-full bg-transparent border border-gray-600 rounded px-2 py-2"
                >
                  {data.clinic.doctors.map((doctor) => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                Patient/Case
                <input
                  aria-label="Patient case"
                  value={chairState.patientCase}
                  onChange={(event) => setChairState((prev) => ({ ...prev, patientCase: event.target.value }))}
                  className="mt-1 w-full bg-transparent border border-gray-600 rounded px-2 py-2"
                />
              </label>
              <label className="text-sm">
                Procedure
                <div className="relative">
                  <select
                    aria-label="Select procedure"
                    value={chairState.procedureId}
                    onChange={(event) => changeProcedure(event.target.value)}
                    className="mt-1 w-full bg-transparent border border-gray-600 rounded px-2 py-2 appearance-none"
                  >
                    {data.procedures.map((procedure) => (
                      <option key={procedure.id} value={procedure.id}>{procedure.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-3 text-gray-500" size={14} />
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4`}>
                <h3 className="font-semibold mb-2">{t('beforeTreatment')}</h3>
                <div className="space-y-2">
                  {selectedProcedure.beforeItems.map((item) => (
                    <label key={`${selectedProcedure.id}-${item}`} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        aria-label={`Prepare ${item}`}
                        checked={Boolean(currentPreparedState[item])}
                        onChange={() => togglePreparedItem(item)}
                      />
                      {item}
                    </label>
                  ))}
                </div>
                <div className="mt-3 border-t border-gray-700/30 pt-3">
                  <p className="text-sm text-amber-400">{t('missingItem')}</p>
                  <ul className="text-sm mt-1 space-y-1">
                    {missingItems.length === 0 ? <li className="text-emerald-400">Ready</li> : missingItems.map((item) => (
                      <li key={`missing-${item}`}>
                        <button
                          type="button"
                          onClick={() => {
                            const instrument = data.instruments.find((candidate) => candidate.name === item);
                            if (instrument) {
                              setSelectedInstrumentId(instrument.id);
                              setActivePortal('instruments');
                            }
                          }}
                          className="text-left underline decoration-dotted"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4`}>
                <h3 className="font-semibold mb-2">{t('duringTreatment')}</h3>
                <div className="space-y-2">
                  {selectedProcedure.duringSteps.map((step, index) => (
                    <div
                      key={`${selectedProcedure.id}-${index}-${step.title}`}
                      className={`rounded-lg border p-3 ${
                        chairState.currentStepIndex === index
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : isDark
                          ? 'border-gray-700'
                          : 'border-gray-300'
                      }`}
                    >
                      <p className="font-semibold text-sm">{index + 1}. {step.title}</p>
                      <p className="text-xs text-gray-400 mt-1">Dentist: {step.dentist}</p>
                      <p className="text-xs text-gray-400">Assistant prepare: {step.assistantPrep}</p>
                      <p className="text-xs text-cyan-400">Pass: {step.pass}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setChairState((prev) => ({ ...prev, currentStepIndex: Math.max(prev.currentStepIndex - 1, 0) }))}
                    className="px-3 py-2 rounded border border-gray-600 text-sm"
                  >
                    {t('previousStep')}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setChairState((prev) => ({
                        ...prev,
                        currentStepIndex: Math.min(prev.currentStepIndex + 1, selectedProcedure.duringSteps.length - 1)
                      }))
                    }
                    className="px-3 py-2 rounded border border-cyan-500/60 text-cyan-400 text-sm"
                  >
                    {t('nextStep')}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activePortal === 'procedures' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.procedures.map((procedure) => (
              <article key={procedure.id} className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{procedure.name}</h3>
                    <p className="text-xs text-gray-400">Code: {procedure.code}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setChairState((prev) => ({ ...prev, procedureId: procedure.id }));
                      setActivePortal('chair');
                    }}
                    className="text-xs px-2 py-1 rounded border border-cyan-500/40 text-cyan-400"
                  >
                    Open Workflow
                  </button>
                </div>
                <p className="text-sm mt-3 text-gray-400">{procedure.patientSummary}</p>
                <ul className="text-xs mt-2 space-y-1">
                  {procedure.aftercare.map((item) => <li key={`${procedure.id}-${item}`}>• {item}</li>)}
                </ul>
              </article>
            ))}
          </section>
        )}

        {activePortal === 'training' && (
          <section className="space-y-4">
            <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-3`}>
              <label className="text-sm">
                Procedure
                <select
                  aria-label="Training procedure"
                  value={trainingProcedureId}
                  onChange={(event) => {
                    setTrainingProcedureId(event.target.value);
                    setExplanation(null);
                  }}
                  className="mt-1 w-full bg-transparent border border-gray-600 rounded px-2 py-2"
                >
                  {data.procedures.map((procedure) => (
                    <option key={procedure.id} value={procedure.id}>{procedure.name}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm md:col-span-2">
                Search unfamiliar instrument
                <input
                  aria-label="Search instruments"
                  value={trainingSearch}
                  onChange={(event) => setTrainingSearch(event.target.value)}
                  className="mt-1 w-full bg-transparent border border-gray-600 rounded px-2 py-2"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4`}>
                <h3 className="font-semibold mb-2">Required instruments/materials</h3>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {filteredTrainingInstruments.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSelectedInstrumentId(item.id)}
                      className="w-full text-left border border-gray-700/40 rounded p-2 hover:border-cyan-500/50"
                    >
                      <p className="text-sm">{item.zhName} / {item.enName}</p>
                      <p className="text-xs text-gray-400">{item.purpose}</p>
                    </button>
                  ))}
                  {filteredTrainingInstruments.length === 0 ? <p className="text-sm text-gray-400">{t('noData')}</p> : null}
                </div>
              </div>

              <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 space-y-3`}>
                <h3 className="font-semibold">Instrument detail</h3>
                {selectedInstrument ? (
                  <>
                    <p className="text-xl">{selectedInstrument.image}</p>
                    <p className="font-semibold">{selectedInstrument.zhName} / {selectedInstrument.enName}</p>
                    <p className="text-sm text-gray-400">{selectedInstrument.purpose}</p>
                    <button
                      type="button"
                      onClick={() => setExplanation(aiAssistService.explainItem(selectedInstrument))}
                      className="px-3 py-2 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-sm"
                    >
                      <Bot size={14} className="inline mr-1" /> {t('dontKnow')}
                    </button>
                    {explanation ? (
                      <div className="text-sm space-y-1 border border-cyan-500/30 rounded p-3 bg-cyan-500/5">
                        <p><strong>1) What:</strong> {explanation.what}</p>
                        <p><strong>2) Use:</strong> {explanation.purpose}</p>
                        <p><strong>3) When:</strong> {explanation.when}</p>
                        <p><strong>4) Assistant action:</strong> {explanation.action}</p>
                        <p><strong>5) Visual:</strong> {explanation.visual}</p>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <p className="text-sm text-gray-400">{t('noData')}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {activePortal === 'instruments' && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4`}>
              <h3 className="font-semibold mb-3">Instrument library</h3>
              <div className="space-y-2 max-h-[28rem] overflow-y-auto">
                {data.instruments.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedInstrumentId(item.id)}
                    className={`w-full text-left rounded border p-3 ${selectedInstrumentId === item.id ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-700/40'}`}
                  >
                    <p className="font-semibold text-sm">{item.zhName} / {item.enName}</p>
                    <p className="text-xs text-gray-400">{item.category}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 space-y-3`}>
              {selectedInstrument ? (
                <>
                  <h3 className="font-semibold">{selectedInstrument.zhName} / {selectedInstrument.enName}</h3>
                  <p className="text-2xl">{selectedInstrument.image}</p>
                  <div className="text-sm space-y-1">
                    <p><strong>Category:</strong> {selectedInstrument.category}</p>
                    <p><strong>Purpose:</strong> {selectedInstrument.purpose}</p>
                    <p><strong>Preparation:</strong> {selectedInstrument.preparationStage}</p>
                    <p><strong>During treatment:</strong> {selectedInstrument.duringUsage}</p>
                    <p><strong>Cleaning:</strong> {selectedInstrument.cleaning}</p>
                    <p><strong>Disposable:</strong> {selectedInstrument.disposable ? 'Yes' : 'No'}</p>
                    <p><strong>Disassemblable:</strong> {selectedInstrument.disassemblable ? 'Yes' : 'No'}</p>
                    <p><strong>Packaging:</strong> {selectedInstrument.packaging}</p>
                    <p><strong>Storage:</strong> {selectedInstrument.storage}</p>
                  </div>

                  <div className="border-t border-gray-700/40 pt-3">
                    <h4 className="font-semibold text-sm mb-2">Cleaning / teardown guide</h4>
                    <div className="flex flex-wrap gap-2 mb-2 text-xs">
                      {cleaningStages.map((stage, index) => (
                        <span
                          key={stage}
                          className={`px-2 py-1 rounded-full border ${index <= cleaningStep ? 'border-cyan-500 text-cyan-400' : 'border-gray-600 text-gray-400'}`}
                        >
                          {stage}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCleaningStep((prev) => Math.max(prev - 1, 0))}
                        className="px-2 py-1 text-xs rounded border border-gray-600"
                      >
                        {t('previousStep')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCleaningStep((prev) => Math.min(prev + 1, cleaningStages.length - 1))}
                        className="px-2 py-1 text-xs rounded border border-cyan-500/50 text-cyan-400"
                      >
                        {t('nextStep')}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-400">{t('noData')}</p>
              )}
            </div>
          </section>
        )}

        {activePortal === 'emergency' && (
          <section className="space-y-4">
            <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4`}>
              <label className="text-sm block mb-2">Search emergency situation</label>
              <input
                aria-label="Search emergency protocol"
                value={emergencyQuery}
                onChange={(event) => setEmergencyQuery(event.target.value)}
                className="w-full bg-transparent border border-gray-600 rounded px-2 py-2"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 lg:col-span-1`}>
                <div className="space-y-2">
                  {data.emergencies
                    .filter((item) => item.query.toLowerCase().includes(emergencyQuery.toLowerCase()))
                    .map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedEmergencyId(item.id)}
                        className={`w-full text-left text-sm rounded p-2 border ${selectedEmergencyId === item.id ? 'border-cyan-500 text-cyan-300' : 'border-gray-700/50'}`}
                      >
                        {item.query}
                      </button>
                    ))}
                </div>
              </div>

              <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 lg:col-span-2`}>
                {selectedEmergency ? (
                  <div className="space-y-3">
                    <h3 className="font-semibold">{selectedEmergency.query}</h3>
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                      <p className="text-sm"><strong>Step 1 — Immediate Action:</strong> {selectedEmergency.immediate}</p>
                      <p className="text-sm mt-2"><strong>Step 2 — Notify / Communicate:</strong> {selectedEmergency.notify}</p>
                      <p className="text-sm mt-2"><strong>Step 3 — Follow-up / Safety:</strong> {selectedEmergency.followUp}</p>
                    </div>
                    <p className="text-xs text-amber-300">⚠ {t('disclaimer')}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">{t('noData')}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {activePortal === 'simulation' && (
          <section className="space-y-4">
            <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 flex flex-wrap items-center gap-3`}>
              <label className="text-sm">
                Difficulty
                <select
                  aria-label="Simulation difficulty"
                  value={simulationLevel}
                  onChange={(event) => setSimulationLevel(event.target.value)}
                  className="ml-2 bg-transparent border border-gray-600 rounded px-2 py-1"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>
              <button
                type="button"
                onClick={launchSimulation}
                className="px-3 py-2 rounded bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-sm"
              >
                <PlayCircle size={14} className="inline mr-1" /> {t('startSimulation')}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4`}>
                <h3 className="font-semibold mb-2">Scenario</h3>
                {activeScenario ? (
                  <div className="space-y-3">
                    <p className="text-sm">{activeScenario.prompt}</p>
                    {activeScenario.options.map((option, index) => (
                      <label key={`${activeScenario.id}-${index}`} className="flex items-start gap-2 text-sm border border-gray-700/40 rounded p-2">
                        <input
                          type="radio"
                          name="simulation-answer"
                          checked={selectedAnswer === index}
                          onChange={() => setSelectedAnswer(index)}
                        />
                        {option}
                      </label>
                    ))}
                    <button
                      type="button"
                      onClick={submitSimulationAnswer}
                      className="px-3 py-2 rounded border border-cyan-500/50 text-cyan-300 text-sm"
                    >
                      {t('submitAnswer')}
                    </button>
                    {scenarioFeedback ? (
                      <div className={`rounded p-3 border ${scenarioFeedback.correct ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-rose-500/40 bg-rose-500/10'}`}>
                        <p className="text-sm font-semibold">{scenarioFeedback.correct ? 'Correct response' : 'Need improvement'}</p>
                        <p className="text-xs mt-1"><strong>Why:</strong> {scenarioFeedback.reason}</p>
                        <p className="text-xs"><strong>Risk:</strong> {scenarioFeedback.risk}</p>
                        <p className="text-xs"><strong>Remember:</strong> {scenarioFeedback.remember}</p>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Click start to generate a random clinical scenario.</p>
                )}
              </div>

              <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 space-y-3`}>
                <h3 className="font-semibold">Training analytics</h3>
                <p className="text-sm">Accuracy: <span className="text-cyan-400">{simulationMetrics.accuracy}%</span></p>
                <p className="text-sm">Average response time: <span className="text-cyan-400">{simulationMetrics.averageTime}s</span></p>
                <div>
                  <p className="text-sm mb-1">Weak areas:</p>
                  {simulationMetrics.weakAreas.length === 0 ? (
                    <p className="text-xs text-gray-400">{t('noData')}</p>
                  ) : (
                    <ul className="text-xs space-y-1">
                      {simulationMetrics.weakAreas.map(([tag, count]) => (
                        <li key={tag}>• {tag}: {count}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {activePortal === 'patient' && (
          <section className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 space-y-4`}>
            <h3 className="font-semibold">Patient education mode</h3>
            <label className="text-sm block">
              Treatment
              <select
                aria-label="Patient procedure"
                value={chairState.procedureId}
                onChange={(event) => setChairState((prev) => ({ ...prev, procedureId: event.target.value }))}
                className="mt-1 w-full max-w-md bg-transparent border border-gray-600 rounded px-2 py-2"
              >
                {data.procedures.map((procedure) => (
                  <option key={procedure.id} value={procedure.id}>{procedure.name}</option>
                ))}
              </select>
            </label>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">{selectedProcedure.patientSummary}</p>
              <p className="text-sm font-semibold">Basic treatment steps</p>
              <ol className="list-decimal list-inside text-sm space-y-1">
                {selectedProcedure.duringSteps.map((step) => (
                  <li key={`patient-step-${step.title}`}>{step.title}</li>
                ))}
              </ol>
              <p className="text-sm font-semibold mt-2">Aftercare</p>
              <ul className="list-disc list-inside text-sm">
                {selectedProcedure.aftercare.map((item) => (
                  <li key={`patient-after-${item}`}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {activePortal === 'admin' && currentUser.role === 'admin' && (
          <section className="space-y-4">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 space-y-3`}>
                <h3 className="font-semibold">Clinic management</h3>
                <label className="text-sm block">
                  Clinic name
                  <input
                    aria-label="Clinic name"
                    value={data.clinic.name}
                    onChange={(event) =>
                      setData((prev) => ({ ...prev, clinic: { ...prev.clinic, name: event.target.value } }))
                    }
                    className="mt-1 w-full bg-transparent border border-gray-600 rounded px-2 py-2"
                  />
                </label>

                {[
                  { key: 'chairs', label: 'Dental chairs' },
                  { key: 'doctors', label: 'Doctors' },
                  { key: 'assistants', label: 'Assistants' }
                ].map((group) => (
                  <div key={group.key} className="space-y-2">
                    <p className="text-sm">{group.label}</p>
                    <div className="flex gap-2">
                      <input
                        aria-label={`Add ${group.label}`}
                        value={clinicDrafts[group.key]}
                        onChange={(event) =>
                          setClinicDrafts((prev) => ({ ...prev, [group.key]: event.target.value }))
                        }
                        className="flex-1 bg-transparent border border-gray-600 rounded px-2 py-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          addClinicField(group.key, clinicDrafts[group.key]);
                          setClinicDrafts((prev) => ({ ...prev, [group.key]: '' }));
                        }}
                        className="px-2 py-1 rounded border border-cyan-500/50 text-cyan-300"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.clinic[group.key].map((item) => (
                        <span key={`${group.key}-${item}`} className="text-xs px-2 py-1 rounded-full border border-gray-600 flex items-center gap-1">
                          {item}
                          <button type="button" aria-label={`Remove ${item}`} onClick={() => removeClinicField(group.key, item)}>
                            <Trash2 size={12} className="text-rose-400" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 space-y-3`}>
                <h3 className="font-semibold">SOP import / metadata</h3>
                <label className="text-sm block">
                  Procedure
                  <select
                    aria-label="Select SOP procedure"
                    value={adminProcedureId}
                    onChange={(event) => setAdminProcedureId(event.target.value)}
                    className="mt-1 w-full bg-transparent border border-gray-600 rounded px-2 py-2"
                  >
                    {data.procedures.map((procedure) => (
                      <option key={procedure.id} value={procedure.id}>{procedure.name}</option>
                    ))}
                  </select>
                </label>
                <label className="text-sm block">
                  Upload SOP file
                  <input
                    aria-label="Upload SOP"
                    type="file"
                    onChange={handleUploadSop}
                    className="mt-1 w-full text-sm"
                  />
                </label>
                {uploadedSopName ? <p className="text-xs text-cyan-400">Uploaded: {uploadedSopName}</p> : null}
                <label className="text-sm block">
                  Warnings
                  <textarea
                    aria-label="SOP warnings"
                    value={selectedAdminSop.warnings}
                    onChange={(event) => updateSopMetadata('warnings', event.target.value)}
                    className="mt-1 w-full bg-transparent border border-gray-600 rounded px-2 py-2 min-h-[72px]"
                  />
                </label>
                <label className="text-sm block">
                  Doctor-specific instructions
                  <textarea
                    aria-label="Doctor instructions"
                    value={selectedAdminSop.doctorInstructions}
                    onChange={(event) => updateSopMetadata('doctorInstructions', event.target.value)}
                    className="mt-1 w-full bg-transparent border border-gray-600 rounded px-2 py-2 min-h-[72px]"
                  />
                </label>
                <p className="text-xs text-gray-400">Current SOP version: v{selectedAdminSop.version}</p>
              </div>
            </div>

            <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4 space-y-3`}>
              <h3 className="font-semibold">SOP step editor</h3>
              <div className="flex gap-2">
                <input
                  aria-label="New SOP step"
                  value={newStepTitle}
                  onChange={(event) => setNewStepTitle(event.target.value)}
                  className="flex-1 bg-transparent border border-gray-600 rounded px-2 py-2"
                  placeholder="新增步驟名稱"
                />
                <button
                  type="button"
                  onClick={addSopStep}
                  className="px-3 py-2 rounded border border-cyan-500/50 text-cyan-300"
                >
                  {t('add')}
                </button>
              </div>

              <div className="space-y-2">
                {selectedAdminSop.steps.map((step, index) => (
                  <div key={`admin-step-${index}`} className="border border-gray-700/40 rounded p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">#{index + 1}</span>
                      <input
                        aria-label={`Step ${index + 1} title`}
                        value={step.title}
                        onChange={(event) => updateSopStep(index, 'title', event.target.value)}
                        className="flex-1 bg-transparent border border-gray-600 rounded px-2 py-1"
                      />
                      <button type="button" aria-label="Move up" onClick={() => reorderSopStep(index, 'up')} className="p-1 border border-gray-600 rounded"><ArrowUp size={14} /></button>
                      <button type="button" aria-label="Move down" onClick={() => reorderSopStep(index, 'down')} className="p-1 border border-gray-600 rounded"><ArrowDown size={14} /></button>
                    </div>
                    <input
                      aria-label={`Step ${index + 1} dentist action`}
                      value={step.dentist}
                      onChange={(event) => updateSopStep(index, 'dentist', event.target.value)}
                      className="w-full bg-transparent border border-gray-600 rounded px-2 py-1"
                      placeholder="Dentist action"
                    />
                    <input
                      aria-label={`Step ${index + 1} assistant prep`}
                      value={step.assistantPrep}
                      onChange={(event) => updateSopStep(index, 'assistantPrep', event.target.value)}
                      className="w-full bg-transparent border border-gray-600 rounded px-2 py-1"
                      placeholder="Assistant prepare"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={`${isDark ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-300'} border rounded-xl p-4`}>
              <h3 className="font-semibold mb-2">Permissions matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400">
                      <th className="py-1">Role</th>
                      <th className="py-1">Allowed portals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((roleItem) => (
                      <tr key={roleItem.id} className="border-t border-gray-700/30">
                        <td className="py-1">{roleItem.label}</td>
                        <td className="py-1">{portalConfig.filter((portal) => portal.roles.includes(roleItem.id)).map((portal) => portal.id).join(', ') || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        <footer className="text-xs text-gray-500 border-t border-gray-700/30 pt-4 flex items-center gap-2">
          <ShieldPlus size={12} />
          {t('disclaimer')}
          <span className="ml-auto flex items-center gap-1"><FlaskConical size={12} /> Local fallback mode</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
