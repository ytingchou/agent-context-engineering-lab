# Agent Context Engineering Lab (Cline + Qwen3)

## 目標
- 用 10 個 step，手把手建立可重用的 Context Engineering prompt 能力。
- 每一步都要能直接貼到 Cline 測試。
- 每一步都提供 Markdown prompt、解釋、示範、驗收點、失敗修正。
- 最後用單一 Capstone Prompt 組成 Delphi -> Next.js AI pipeline（純 prompt 模擬）。

## 學習旅程主軸
```text
Prompt Engineering
        ↓
Context Engineering
        ↓
Agent Skills
        ↓
Agent Pipelines
        ↓
AI-assisted Software Migration
```

對應文件：
- [LEARNING-JOURNEY.md](./LEARNING-JOURNEY.md)
- [DELPHI-TO-NEXTJS-PIPELINE.md](./pipelines/DELPHI-TO-NEXTJS-PIPELINE.md)

## 最終產物鏈
```text
Delphi Source
     ↓
DFM Analyzer
     ↓
Context Summary
     ↓
ASCII UI Layout
     ↓
Pseudo React
     ↓
Next.js Page
```

## 前置條件
- 開發環境：`Cline + Qwen3`。
- 模型上下文：`128k token`。
- 網路條件：`不能連網`（只能用本地 repo 與本地命令）。
- 專案情境：`大型 Delphi 專案`（DFM/Unit 多、跨模組相依複雜）。

## 快速開始
```bash
npm run check
npm run sessions:list
npm run prompts:list
npm run session:run:any -- --id session-06
npm run session:run
npm run session:run:chain
npm run session:run:capstone
npm run session:run:failure
npm run session:run:multi-form
npm run session:run:handoff
npm run session:run:traceability
npm run session:run:gates
npm run session:run:rubric
npm run session:run:audit
npm run session:run:change-control
npm run session:run:graduation
```

## Repo 結構
- `README.md`: 主教案（10 steps + 驗收規範）
- `CONTRIBUTING.md`: 維護與擴充規範
- `CHANGELOG.md`: 版本變更紀錄
- `ROADMAP.md`: 後續擴充方向
- `LEARNING-JOURNEY.md`: 學習階梯與能力對照
- `pipelines/`: Delphi -> Next.js pipeline 契約
- `SESSION-01-COMPLEX-EXCEL-LIKE-FORM.md`: 第一次完整實戰演練
- `SESSION-02-DELPHI-TO-NEXTJS-CHAIN.md`: 產物鏈六階段演練
- `SESSION-03-CHAIN-TO-CAPSTONE.md`: 產物鏈到 Capstone 整合演練
- `SESSION-04-FAILURE-INJECTION-AND-RECOVERY.md`: 失敗注入與恢復演練
- `SESSION-05-MULTI-FORM-PRIORITIZATION.md`: 多表單優先級與切片演練
- `SESSION-06-HANDOFF-PACKAGE-GENERATION.md`: Human-review 交接包產出演練
- `SESSION-07-DECISION-LOG-TRACEABILITY.md`: 決策日誌與追蹤矩陣演練
- `SESSION-08-READINESS-BOARD-AND-GATES.md`: Readiness board 與 release gates 演練
- `SESSION-09-RUBRIC-CALIBRATION.md`: Rubric v2 校準演練
- `SESSION-10-EVIDENCE-PACK-AND-AUDIT.md`: 證據包與審計敘事演練
- `SESSION-11-CHANGE-CONTROL-ROLLBACK.md`: 變更控制與回滾演練
- `SESSION-12-GRADUATION-MOCK-DELIVERY.md`: 畢業整合演練
- `prompts/`: 00~10 可重用 prompt packs
- `rubrics/`: capstone 評分規範
- `examples/`: capstone 與 pipeline 輸出骨架
- `sessions/`: sessions 索引與練習記錄模板
- `scripts/`: 自動檢查與導覽腳本
- `.cline/workflows/`: 可在 Cline 觸發的流程建議
- `.clinerules`: Lab 專用 Cline 約束

## Lab 操作規則
- 每一步都先跑「你先寫版本」，再對照「示範版本」。
- 每一步都要在 Cline 實測，不只閱讀。
- 若輸出不達標，先用該步驟的修正 prompt，不要直接跳下一步。
- 除非特別說明，本 Lab 的提示詞都用英文，以降低模型理解歧義。

## Step Contract（每一步固定結構）
每個 Step 都包含以下欄位：
1. `Step Goal`
2. `Why this matters`
3. `How to write this prompt`
4. `Demo Prompt (Markdown)`
5. `How to test in Cline`
6. `Pass Criteria`

另外每一步都必須有：
- `Input -> Output`
- `你先寫版本`（練習 prompt）
- `示範版本`（可直接貼）
- `常見失敗訊號 x2`
- `修正 prompt x2`

## Prompt Packet 標準模板
每一步都盡量沿用以下欄位：

```md
## Role
<who the model is>

## Objective
<what must be produced>

## Project Context
<only relevant local context>

## Constraints
- offline only
- qwen3 context limit
- no assumptions without local evidence

## Input Artifacts
- <file paths / snippets / summaries>

## Output Format
<strict section names / JSON shape / table columns>

## Quality Gate
<what makes output acceptable>

## Stop Conditions
<when the model should stop and ask for missing info>
```

---

## Step 01 - 任務邊界 Prompt
### Step Goal
把任務範圍、成功標準、非目標先鎖定，避免模型在大型專案裡亂發散。

### Why this matters
在大型 Delphi 專案，若沒有邊界，模型會一次吃太多 context，浪費 128k 並提高 hallucination 風險。

### Input -> Output
- Input：你的任務描述（例：把某個 Delphi 視窗流程規劃成 Next.js 頁面需求）
- Output：`Goal / Success Criteria / Out of Scope / Unknowns`

### How to write this prompt
- 強制模型先定義目標與非目標。
- 限制只根據本地資訊，不可腦補。
- 指定固定輸出段落名稱。

### 你先寫版本
```md
Please define task scope for my Delphi-to-Next.js migration task.
Include goal, success criteria, out of scope, and unknowns.
Use only local repository facts.
```

### 示範版本（可直接貼到 Cline）
```md
## Role
You are a scope-definition assistant for an offline migration lab.

## Objective
Create a strict task boundary for a Delphi -> Next.js planning task.

## Project Context
- Environment: Cline + Qwen3
- Context budget: 128k tokens
- Network: unavailable
- Project type: large Delphi codebase

## Constraints
- Use only local repository evidence.
- Do not propose implementation yet.
- If evidence is missing, list it under Unknowns.

## Output Format
Return exactly these sections:
1) Goal
2) Success Criteria
3) Out of Scope
4) Unknowns

## Quality Gate
- Success criteria must be testable.
- Out-of-scope items must be explicit and non-overlapping with Goal.
```

### How to test in Cline
1. 把示範 prompt 貼到 Cline。
2. 檢查是否輸出 4 段固定標題。
3. 檢查 `Success Criteria` 是否可驗證（不是抽象語句）。

### Pass Criteria
- 有完整 4 段。
- `Out of Scope` 至少 3 點且不含 Goal 內容。
- `Unknowns` 不為空時，項目具體可追查。

### 常見失敗訊號
- 訊號 1：輸出直接跳進技術解法。
- 訊號 2：`Success Criteria` 是「做得更好」這類不可測描述。

### 修正 prompt A
```md
Revise your previous output.
Do not provide implementation ideas.
Only refine scope boundaries with testable success criteria.
```

### 修正 prompt B
```md
Reformat the result to exactly 4 sections and convert each success criterion into a measurable statement.
```

---

## Step 02 - 上下文盤點 Prompt
### Step Goal
把「要讀什麼」和「先不要讀什麼」分開，建立 context 載入優先序。

### Why this matters
大型 Delphi 專案中，盲目貼檔案會快速耗盡 token。先盤點可降低無效上下文。

### Input -> Output
- Input：Step 01 的 scope 結果
- Output：`Must Read / Should Read / Ignore for Now / Reason`

### How to write this prompt
- 要求模型用分層清單輸出。
- 每個檔案或資料夾都要有理由。
- 限制輸出只列與目前目標有關的內容。

### 你先寫版本
```md
Given the scope, list which files I should read first in a large Delphi project.
```

### 示範版本（可直接貼到 Cline）
```md
## Role
You are a context triage assistant.

## Objective
Build a context loading priority list for a large offline Delphi migration task.

## Constraints
- Prioritize minimum context needed for current scope.
- Avoid broad repository crawling recommendations.
- Include reasoning per item.

## Output Format
Create a table with columns:
- Bucket (Must Read / Should Read / Ignore for Now)
- Candidate Path Pattern
- Why It Matters Now
- Risk If Skipped

## Quality Gate
- Must Read should fit into an initial 20-30% of context budget.
- Ignore for Now should include explicit defer reasons.
```

### How to test in Cline
1. 貼示範 prompt。
2. 檢查 `Must Read` 是否真的少而精。
3. 檢查每列有 `Risk If Skipped`。

### Pass Criteria
- `Must Read` 不超過 10 項。
- 每項都有理由與跳過風險。
- 有明確 `Ignore for Now`。

### 常見失敗訊號
- 訊號 1：模型列出整個 repo 幾乎全部路徑。
- 訊號 2：沒有風險說明，只有檔名清單。

### 修正 prompt A
```md
Reduce Must Read to the smallest set needed to start execution safely.
Keep only high-impact paths and justify each one.
```

### 修正 prompt B
```md
Add a concrete risk statement for every listed path.
If a path has no risk explanation, remove it.
```

---

## Step 03 - 128k Token 預算與切片 Prompt
### Step Goal
把 context 當成預算管理，用 phase-based control 明確切成可控批次。

### Why this matters
128k 很大但不是無限。大型 Delphi 專案若不切片，後續 prompt 穩定性會下降。

### Input -> Output
- Input：Step 02 的 context 盤點
- Output：`Budget Plan / Phase-based Slice Strategy / Reserve / Overflow Rule`

### How to write this prompt
- 指定 token 分配比例（例如：輸入 60%、推理與輸出 40%）。
- 要求切片策略可重複套用。
- 把切片流程拆成 phase（例如：Phase 0/1/2），每個 phase 都要有 entry/exit gate。
- 要求包含 overflow 時的降級策略。

### 你先寫版本
```md
Design a token budget and chunking strategy for this migration task with 128k context.
```

### 示範版本（可直接貼到 Cline）
```md
## Role
You are a token budget planner for Qwen3 (128k context).

## Objective
Create a reusable phase-based context slicing strategy for a large Delphi project analysis.

## Constraints
- Keep 20-30% reserved for reasoning + output.
- Assume no internet and no external retrieval.
- Prefer deterministic, repeatable slicing rules.
- Use phase-based context control with explicit entry criteria, context cap, and exit criteria per phase.

## Output Format
Return exactly these sections:
1) Budget Allocation (percent + rationale)
2) Slice Units (by module/form/feature)
3) Slice Order + Phase Gates
4) Overflow Handling
5) What Not to Include

## Quality Gate
- Strategy must be executable step-by-step.
- Every phase must define token cap and completion gate.
- Overflow handling must include at least 2 fallback levels.
```

### How to test in Cline
1. 貼示範 prompt。
2. 檢查是否有「百分比 + 原因」。
3. 檢查每個 phase 是否有 entry/exit gate 與 context cap。
4. 檢查 `Overflow Handling` 至少兩層 fallback。

### Pass Criteria
- 有 5 段固定格式。
- 切片單位不是抽象語（要能映射到實際模組/表單）。
- 每個 phase 都有 token 上限與完成條件。
- 明確保留輸出空間。

### 常見失敗訊號
- 訊號 1：只說「分批處理」，沒有規則。
- 訊號 2：沒有說明哪些內容明確不納入。

### 修正 prompt A
```md
Make the slice strategy deterministic.
For each slice unit and phase, define inclusion criteria, stop criteria, and entry/exit gates.
```

### 修正 prompt B
```md
Add an explicit exclusion list to protect context budget.
```

---

## Step 04 - Delphi UI/DFM 語意抽取 Prompt
### Step Goal
把 Delphi 表單與控制項語意抽成可轉譯的中介描述。

### Why this matters
若只做字面轉換，Next.js 端會失去操作語意（狀態、互動、驗證、資料流）。

### Input -> Output
- Input：一批 DFM/Delphi UI 相關資訊（可用摘要）
- Output：`UI Intent Model`（元件角色、行為、狀態、互動事件）

### How to write this prompt
- 明確要求抽「語意」，不是直接產前端碼。
- 要求輸出結構化欄位。
- 要求列出不確定點。

### 你先寫版本
```md
Extract UI semantics from Delphi form descriptions for web migration.
```

### 示範版本（可直接貼到 Cline）
```md
## Role
You are a Delphi UI semantics extractor.

## Objective
Convert Delphi form/control descriptions into a web-oriented semantic model.

## Constraints
- Do not output React/Next.js code.
- Focus on intent, behavior, data interactions, and validation semantics.
- Mark uncertain mappings explicitly.

## Output Format
Return a Markdown table with columns:
- Delphi Element
- Semantic Role
- User Interaction Pattern
- Data Binding Intent
- Validation / Business Rule
- Confidence (High/Medium/Low)
- Open Question

## Quality Gate
- Every element must have a semantic role.
- Low-confidence items must have open questions.
```

### How to test in Cline
1. 貼示範 prompt。
2. 檢查每列是否都有 `Semantic Role`。
3. 檢查 Low confidence 是否真的附 `Open Question`。

### Pass Criteria
- 表格欄位完整。
- 無直接框架程式碼。
- 存在可追問的不確定點。

### 常見失敗訊號
- 訊號 1：模型開始輸出 JSX/TSX。
- 訊號 2：忽略驗證規則或資料綁定語意。

### 修正 prompt A
```md
Rewrite the output as pure semantic analysis.
Remove any framework-specific code or pseudo-code.
```

### 修正 prompt B
```md
Add missing validation and data-binding intent columns for each element.
```

---

## Step 05 - Delphi Domain -> Web Domain 映射 Prompt
### Step Goal
建立語意映射字典，把 Delphi 概念對應到 Web/Next.js 常見模式。

### Why this matters
大型遷移案常失敗在概念不對齊，而不是語法不會寫。

### Input -> Output
- Input：Step 04 的 UI Intent Model
- Output：`Mapping Matrix`（Delphi Concept -> Web Concept -> Rationale -> Caveat）

### How to write this prompt
- 要求一對多或多對一都可描述。
- 要求每個映射附風險與限制。
- 要求標註可直接轉換 vs 需人工判斷。

### 你先寫版本
```md
Map Delphi UI and behavior concepts to modern web equivalents.
```

### 示範版本（可直接貼到 Cline）
```md
## Role
You are a domain mapping assistant for Delphi-to-Web migration.

## Objective
Produce a concept mapping matrix from Delphi semantics to web/Next.js patterns.

## Constraints
- Explain why each mapping is valid.
- Include migration caveats and non-equivalent cases.
- Distinguish direct mapping vs needs-human-decision.

## Output Format
Return a table with columns:
- Delphi Concept
- Web/Next.js Concept
- Mapping Type (Direct / Partial / Manual)
- Rationale
- Caveat
- Suggested Verification

## Quality Gate
- No mapping without rationale.
- Manual mappings must include explicit verification guidance.
```

### How to test in Cline
1. 貼示範 prompt。
2. 檢查每個映射都有 `Rationale`。
3. 檢查 `Manual` 類型是否有驗證建議。

### Pass Criteria
- 矩陣完整。
- 至少包含 `Direct / Partial / Manual` 三種類型。
- 每列有 caveat。

### 常見失敗訊號
- 訊號 1：映射只有名詞替換，沒有理由。
- 訊號 2：所有映射都被標成 Direct。

### 修正 prompt A
```md
Reclassify mappings by confidence and equivalence.
Force realistic Partial/Manual cases where behavior differs.
```

### 修正 prompt B
```md
For each row, add one concrete caveat and one verification action.
```

---

## Step 06 - Next.js 目標頁面/路由規劃 Prompt
### Step Goal
把映射結果轉成可實作的 Next.js 資訊架構與頁面責任分工。

### Why this matters
沒有路由與頁面責任邊界，後續生成結果會過度耦合。

### Input -> Output
- Input：Step 05 Mapping Matrix
- Output：`Route Plan / Page Responsibilities / Data Boundaries`

### How to write this prompt
- 要求輸出 App Router 導向規劃（不寫程式碼）。
- 要求標示 server/client responsibility。
- 要求列出每頁依賴的資料與狀態。

### 你先寫版本
```md
Plan the target Next.js app structure based on migration mappings.
```

### 示範版本（可直接貼到 Cline）
```md
## Role
You are an architecture planner for Next.js App Router migration.

## Objective
Generate a page and route responsibility plan from Delphi-to-web mapping data.

## Constraints
- No implementation code.
- Use route-level and page-level responsibilities.
- Identify server/client boundaries.

## Output Format
Return sections:
1) Route Tree
2) Page Responsibility Matrix
3) Data Boundary Notes
4) Shared UI/State Candidates
5) Open Decisions

## Quality Gate
- Each route must have a clear primary responsibility.
- Data boundary notes must include at least one risk per major route.
```

### How to test in Cline
1. 貼示範 prompt。
2. 檢查每個 route 是否有責任描述。
3. 檢查是否真的有 server/client 邊界。

### Pass Criteria
- 5 段完整。
- 有路由樹且層級清晰。
- 有開放決策清單。

### 常見失敗訊號
- 訊號 1：只列路由，不寫責任。
- 訊號 2：沒有資料邊界與風險。

### 修正 prompt A
```md
Expand each route with one primary responsibility and one non-goal.
```

### 修正 prompt B
```md
Add server/client boundary decisions and one risk per boundary.
```

---

## Step 07 - Pipeline Stage Orchestration Prompt
### Step Goal
把前面成果組成 AI pipeline 的階段化流程（不是程式碼 pipeline）。

### Why this matters
你需要可重複執行的 prompt pipeline，而不是每次自由發揮。

### Input -> Output
- Input：Step 01~06 產物
- Output：`Stage List / Stage Inputs / Stage Outputs / Gate`

### How to write this prompt
- 要求每個 stage 有入口與出口。
- 要求 stage 間契約明確。
- 要求定義每階段失敗時的處理。

### 你先寫版本
```md
Create a staged AI pipeline for this migration planning workflow.
```

### 示範版本（可直接貼到 Cline）
```md
## Role
You are a prompt-pipeline orchestration designer.

## Objective
Define a Delphi -> Next.js AI planning pipeline with explicit stage contracts.

## Constraints
- Pure prompt simulation (no tool execution required).
- Offline-safe assumptions only.
- Keep stage outputs compact and reusable.

## Output Format
For each stage provide:
- Stage Name
- Input Contract
- Processing Goal
- Output Contract
- Quality Gate
- Failure Action

Then provide:
- End-to-end Data Flow Summary

## Quality Gate
- Every stage output must be consumable by the next stage.
- Failure action must be actionable (retry / narrow scope / request evidence).
```

### How to test in Cline
1. 貼示範 prompt。
2. 檢查每個 stage 是否有 `Input Contract` 和 `Output Contract`。
3. 檢查 `Failure Action` 是否可執行。

### Pass Criteria
- 所有 stage 契約欄位完整。
- 有明確資料流總結。
- 沒有斷鏈（上一階段輸出對不上下一階段輸入）。

### 常見失敗訊號
- 訊號 1：只列步驟名稱，沒有契約。
- 訊號 2：失敗處理只有「再試一次」。

### 修正 prompt A
```md
Add explicit input and output contracts for every stage.
Reject any stage without machine-checkable fields.
```

### 修正 prompt B
```md
Upgrade failure actions into concrete recovery paths with trigger conditions.
```

---

## Step 08 - 失敗模式與回退策略 Prompt
### Step Goal
先設計失敗清單與回復路徑，避免 pipeline 中途失控。

### Why this matters
大型 Delphi 遷移通常卡在語意缺失、映射誤判、上下文過載，不先做風險管理會反覆重工。

### Input -> Output
- Input：Step 07 stage pipeline
- Output：`Risk Register + Mitigation + Fallback`

### How to write this prompt
- 以 stage 為單位列風險。
- 每個風險要有 trigger、impact、mitigation。
- 要求 fallback 順序。

### 你先寫版本
```md
Identify failure modes and fallback strategy for the pipeline.
```

### 示範版本（可直接貼到 Cline）
```md
## Role
You are a risk engineer for prompt-based migration pipelines.

## Objective
Create a stage-by-stage failure mode and fallback strategy.

## Constraints
- Focus on realistic failures in offline large-repo analysis.
- Include context overflow, ambiguous semantics, and mapping drift.

## Output Format
Return a table with columns:
- Stage
- Failure Mode
- Trigger Signal
- Impact
- First Mitigation
- Fallback Level 1
- Fallback Level 2
- Escalation Condition

## Quality Gate
- Every stage must have at least one failure mode.
- Fallback levels must be strictly ordered.
```

### How to test in Cline
1. 貼示範 prompt。
2. 檢查每個 stage 是否至少一個失敗模式。
3. 檢查 fallback 是否有層級順序。

### Pass Criteria
- 風險表完整。
- 有 trigger signal，不是抽象風險。
- 有 escalation condition。

### 常見失敗訊號
- 訊號 1：只有一般性風險，沒有對應 stage。
- 訊號 2：沒有具體 trigger。

### 修正 prompt A
```md
Bind each risk to a specific stage and add measurable trigger signals.
```

### 修正 prompt B
```md
Define two ordered fallback levels before escalation for every risk.
```

---

## Step 09 - 驗收 Rubric 與自評 Prompt
### Step Goal
建立一致驗收標準，讓你可以快速判斷輸出能不能進下一輪。

### Why this matters
沒有 rubric，模型看似回答很多，但品質可能不穩定且無法比較。

### Input -> Output
- Input：Step 07/08 pipeline 與風險內容
- Output：`Scoring Rubric + Self-check`

### How to write this prompt
- 要求可量化分數。
- 要求每維度有 fail condition。
- 要求模型先自評再給修正建議。

### 你先寫版本
```md
Create an evaluation rubric for this pipeline output quality.
```

### 示範版本（可直接貼到 Cline）
```md
## Role
You are a quality gatekeeper for prompt pipeline outputs.

## Objective
Define a scoring rubric and a self-review checklist.

## Constraints
- Rubric must be practical for manual Cline review.
- Include pass/fail threshold.
- Include critical fail conditions.

## Output Format
Return sections:
1) Rubric Dimensions (name, weight, score range)
2) Critical Fail Conditions
3) Pass Threshold
4) Self-Review Checklist (binary yes/no)
5) If-Fail Repair Loop

## Quality Gate
- Total score must be 100.
- At least 5 rubric dimensions.
- Repair loop must map to concrete prompt adjustments.
```

### How to test in Cline
1. 貼示範 prompt。
2. 檢查總分是否 100。
3. 檢查是否包含 critical fail 與 repair loop。

### Pass Criteria
- 至少 5 個評分維度。
- 有通過門檻。
- 有 fail 後修正流程。

### 常見失敗訊號
- 訊號 1：rubric 維度太少或無權重。
- 訊號 2：只有評分，沒有修正閉環。

### 修正 prompt A
```md
Rebuild the rubric to total 100 points with explicit weights.
```

### 修正 prompt B
```md
Add a fail-to-repair loop that specifies which prompt section to revise first.
```

---

## Step 10 - Capstone 單一整合 Prompt（Delphi -> Next.js Pipeline）
### Step Goal
用一個 prompt 輸出完整 pipeline 規劃，成為你後續專案可複用的母版。

### Why this matters
你需要一個可重複、可擴充、可驗收的總控提示詞，而不是分散片段。

### Input -> Output
- Input：Step 01~09 的產物
- Output：完整 Capstone 規格文件（固定 5 段）

### How to write this prompt
- 鎖定固定輸出介面，避免模型自由發散。
- 嵌入 offline、128k、大型 Delphi 的硬限制。
- 加入 stop condition，避免模型在缺資訊時亂補。

### 你先寫版本
```md
Create a complete Delphi-to-Next.js AI pipeline plan using previous outputs.
```

### 示範版本（可直接貼到 Cline）
```md
## Role
You are the lead context engineer designing an offline Delphi -> Next.js prompt pipeline.

## Objective
Produce a decision-complete pipeline blueprint that can be executed in Cline with Qwen3.

## Project Context
- Tooling: Cline + Qwen3
- Context window: 128k
- Network: unavailable
- Codebase type: large Delphi project
- Approach: prompt-only simulation, no external services

## Input Artifacts
- Scope boundary output
- Context triage output
- Token slicing strategy
- UI semantics model
- Delphi-to-web mapping matrix
- Route responsibility plan
- Stage orchestration plan
- Risk register
- Evaluation rubric

## Constraints
- Do not invent external dependencies.
- Use only provided artifacts and locally verifiable assumptions.
- If any key artifact is missing, list it and stop finalization.

## Output Format
Return exactly these 5 sections:
1) Stage Plan
2) Context Slicing Strategy
3) Pipeline Prompt Set
4) Risk Register
5) Verification Checklist

## Quality Gate
- Stage Plan must include input/output contracts.
- Context strategy must show budget percentages.
- Prompt set must be reusable templates, not one-off text.
- Risk register must include trigger + fallback.
- Verification checklist must map to pass/fail decisions.

## Stop Conditions
If required input artifacts are missing, do not complete the full plan.
Return a "Missing Inputs" list first.
```

### How to test in Cline
1. 貼示範 prompt。
2. 檢查是否只輸出固定 5 段。
3. 檢查每段是否符合 gate（契約/比例/風險/驗收）。

### Pass Criteria
- 5 段完整且可直接拿來當後續工作底稿。
- 內容無違反 offline/128k/large-project 限制。
- 若輸入不足，模型會先輸出 `Missing Inputs` 而非硬編。

### 常見失敗訊號
- 訊號 1：輸出段落名稱不一致，導致不可程式化比對。
- 訊號 2：忽略 stop condition，缺資料仍硬產完整方案。

### 修正 prompt A
```md
Normalize your output to the exact 5 required section names.
No additional sections.
```

### 修正 prompt B
```md
Apply stop conditions strictly.
If inputs are incomplete, return only Missing Inputs + minimal next-step request.
```

---

## 驗收標準
- 你能完成 Step 01 到 Step 10 並在 Cline 實測。
- 每一步都能產生符合該步 `Pass Criteria` 的輸出。
- 最後 Capstone Prompt 能穩定輸出 5 段固定介面內容。
- 你能解釋這條 pipeline 如何處理：
  - offline 限制
  - 128k token 預算
  - 大型 Delphi 專案的上下文切片

## 常見錯誤
- 一開始就貼大量檔案，沒有做 context triage。
- Prompt 沒有固定輸出格式，導致每次回答結構不同。
- 把「語意抽取」和「程式碼生成」混在同一步。
- 沒有設計失敗模式，只靠重試。
- 驗收只看內容長度，不看可測試性與可重複性。

## 延伸挑戰
1. 把 Step 10 的 `Pipeline Prompt Set` 拆成三種 profile：`Conservative / Balanced / Fast`。
2. 為每個 profile 設計不同 token 預算比例與風險容忍度。
3. 用同一批輸入做三次 Cline 實測，比較輸出穩定性與可行性。

---

## 一次跑完實戰流程（建議 45-60 分鐘）
以下流程只用本地資料，符合 `offline + 128k + large Delphi` 限制。

### 建議使用的本地情境（你目前 workspace 可直接用）
- Delphi/DFM 來源參考：
  - `examples/local-inputs/ComplexExcelLikeForm.dfm`
  - `pipelines/DELPHI-TO-NEXTJS-PIPELINE.md`
  - `examples/local-inputs/pipeline-config.json`
- Next.js 目標參考：
  - `examples/local-inputs/target-page-requirements.md`

### 實戰順序
1. 先把 Step 01~03 做完，得到可執行的 scope 與 token slicing 策略。
2. 用 Step 04~05 把 Delphi 語意抽取與概念映射完成。
3. 用 Step 06 產生 Next.js 路由與責任矩陣。
4. 用 Step 07~08 定義 pipeline stage contract 與 fallback。
5. 用 Step 09 做 rubric，先自評一次。
6. 最後貼 Step 10 Capstone prompt，輸出完整五段結果。

### 每一步的最小驗收動作
- 只做一件事：確認該步輸出符合 `Pass Criteria`。
- 不符合就先用該步 `修正 prompt A/B`，不要跳步。
- 每步最多重試 2 次；超過 2 次代表前一步輸入品質不足，回退到前一步修正。

---

## Session 記錄模板（建議每次練習都保留）
把下列模板貼到你的筆記檔，跑完 10 steps 填一次。

```md
# Agent Context Engineering Lab Session Record

## Meta
- Date:
- Model: Qwen3
- Environment: Cline (offline)
- Scenario:

## Step Results
| Step | Pass/Fail | Retry Count | Key Issue | Fix Prompt Used |
|---|---|---:|---|---|
| 01 |  |  |  |  |
| 02 |  |  |  |  |
| 03 |  |  |  |  |
| 04 |  |  |  |  |
| 05 |  |  |  |  |
| 06 |  |  |  |  |
| 07 |  |  |  |  |
| 08 |  |  |  |  |
| 09 |  |  |  |  |
| 10 |  |  |  |  |

## Capstone Output Check (Step 10)
- [ ] Stage Plan present
- [ ] Context Slicing Strategy present
- [ ] Pipeline Prompt Set present
- [ ] Risk Register present
- [ ] Verification Checklist present

## Lessons Learned
- What failed most often:
- Which prompt pattern was most stable:
- What to improve in next session:
```

## Session Packs
- 第一次完整演練（ComplexExcelLikeForm）：
  - [SESSION-01-COMPLEX-EXCEL-LIKE-FORM.md](./SESSION-01-COMPLEX-EXCEL-LIKE-FORM.md)
- 第二次產物鏈演練（Delphi Source -> Next.js Page）：
  - [SESSION-02-DELPHI-TO-NEXTJS-CHAIN.md](./SESSION-02-DELPHI-TO-NEXTJS-CHAIN.md)
- 第三次整合演練（Artifact Chain -> Capstone）：
  - [SESSION-03-CHAIN-TO-CAPSTONE.md](./SESSION-03-CHAIN-TO-CAPSTONE.md)
- 第四次故障演練（Failure Injection + Recovery）：
  - [SESSION-04-FAILURE-INJECTION-AND-RECOVERY.md](./SESSION-04-FAILURE-INJECTION-AND-RECOVERY.md)
- 第五次多表單演練（Multi-Form Prioritization + Slicing）：
  - [SESSION-05-MULTI-FORM-PRIORITIZATION.md](./SESSION-05-MULTI-FORM-PRIORITIZATION.md)
- 第六次交接包演練（Human-Review Handoff Package）：
  - [SESSION-06-HANDOFF-PACKAGE-GENERATION.md](./SESSION-06-HANDOFF-PACKAGE-GENERATION.md)
- 第七次追蹤演練（Decision Log + Traceability Matrix）：
  - [SESSION-07-DECISION-LOG-TRACEABILITY.md](./SESSION-07-DECISION-LOG-TRACEABILITY.md)
- 第八次就緒門檻演練（Readiness Board + Release Gates）：
  - [SESSION-08-READINESS-BOARD-AND-GATES.md](./SESSION-08-READINESS-BOARD-AND-GATES.md)
- 第九次評分校準演練（Rubric v2 Calibration）：
  - [SESSION-09-RUBRIC-CALIBRATION.md](./SESSION-09-RUBRIC-CALIBRATION.md)
- 第十次審計演練（Evidence Pack + Audit Narrative）：
  - [SESSION-10-EVIDENCE-PACK-AND-AUDIT.md](./SESSION-10-EVIDENCE-PACK-AND-AUDIT.md)
- 第十一次變更控制演練（Change Control + Rollback Drill）：
  - [SESSION-11-CHANGE-CONTROL-ROLLBACK.md](./SESSION-11-CHANGE-CONTROL-ROLLBACK.md)
- 第十二次畢業演練（Graduation Mock Delivery）：
  - [SESSION-12-GRADUATION-MOCK-DELIVERY.md](./SESSION-12-GRADUATION-MOCK-DELIVERY.md)
