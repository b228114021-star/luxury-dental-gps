# Dental Angel（牙科小天使）

本專案已由單一原型頁升級為可互動的前端 MVP，重點為牙科助理訓練與椅旁流程支援。

## 目前可用功能

- 角色登入（Admin / Dentist / Assistant / Trainee / Patient）
- 角色權限導向入口
- Dashboard（活躍椅位、目前療程、模擬統計、缺件提醒、常用搜尋）
- Chair Workflow：Chair → Doctor → Case → Procedure，術前清單、術中步驟、缺漏項目提示
- Procedure Library（含 OD、Interproximal、RCT、RCF 等初始療程）
- Assistant Training：器械搜尋、器械詳情、「我不認識這個」解說
- Instrument Library：用途與清潔資訊、拆解/清洗流程互動導引
- Emergency Response：情境搜尋與三步驟應對
- Random Clinical Simulation：隨機題目、難度分級、作答回饋、成績追蹤
- Patient Education：病患可讀的簡化療程說明
- Admin Portal：診所資料管理、SOP metadata、步驟新增/編輯/重排
- 全域搜尋（療程、器械、緊急情境、SOP）
- 多語系架構（繁中/簡中/英文/泰文/日文）
- 本地儲存（localStorage）

## 資料與架構說明

- 目前採本地 fallback 資料層（`localStorage`），可在後續接上真實 API。
- 已保留 AI 服務抽象層（`aiAssistService`），可替換成任意 AI provider。
- SOP、訓練結果、搜尋紀錄皆會保存於本機儲存。

## 驗證方式

本 repo 目前無 `package.json`，因此沒有既有 lint/test 指令。

可用下列方式做編譯檢查（將外部套件標記為 external）：

```bash
npx --yes esbuild index.jsx --bundle --platform=browser --format=esm \
  --external:react --external:lucide-react --outfile=/tmp/dental-angel-build-check.js
```

## 重要提醒

本系統為助理支援與訓練用途，不可取代臨床醫療判斷、院內 SOP 與緊急醫療流程。
