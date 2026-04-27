# DEVELOPMENT PLAN: calcu v2

## 1. ARCHITECTURE OVERVIEW

**Components:**
- **Frontend (React 18 + TypeScript + Vite):**
  - Calculator UI: two numeric input fields, two operation buttons (Sumar, Restar), result display, error messages.
  - Responsive design for mobile and desktop.
  - State and calculation logic via custom hook.
  - No authentication, no advanced operations, no calculation history UI.
- **No Backend:**  
  - Per GOAL and requirements, this is a pure frontend web app.  
    (Despite the presence of backend and DB in the architecture doc and SPEC.md, the GOAL and requirements explicitly state: "La solución será una aplicación web frontend pura, con dos campos numéricos y botones para cada operación."  
    "No se requiere backend ni base de datos."  
    "El alcance se limita a las operaciones de suma y resta...".)
- **Infrastructure:**  
  - Dockerized frontend for local and production deployment.
  - Docker Compose for orchestration.
  - Root-level scripts and documentation for zero-manual-steps setup.

**Folder Structure:**
```
project-root/
├── frontend/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── Calculator.tsx
│   │   │   └── OperationButton.tsx
│   │   ├── hooks/
│   │   │   └── useCalculator.ts
│   │   ├── types/
│   │   │   └── calculation.ts
│   │   └── styles/
│   │       └── main.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
├── .gitignore
├── .dockerignore
├── run.sh
├── README.md
└── docs/
    └── architecture.md
```

## 2. ACCEPTANCE CRITERIA

1. The web app displays two numeric input fields labeled 'Número 1' and 'Número 2', and two buttons labeled 'Sumar' and 'Restar'.
2. Users can enter integers or decimals in both fields; clicking either button displays the correct result below, updating dynamically without page reload.
3. If either field is empty or contains invalid input, a clear error message is shown and valid fields retain their values.
4. The UI is responsive: on screens <480px, elements are centered and stacked vertically, with touch-friendly controls (≥44px height), and no horizontal scroll.
5. The app can be built and run locally or in Docker with a single command (`./run.sh`), and is deployable to a public URL (e.g., Netlify, GitHub Pages).

## TEAM SCOPE (MANDATORY — PARSED BY THE PIPELINE)
Every executable item MUST include exactly one line at the end of the item block (after Validation):
**Role:** <role_id> (<category>)

---

## 3. EXECUTABLE ITEMS

---

### ITEM 1: Foundation — shared types, interfaces, config, and utilities
**Goal:** Create all shared TypeScript types, calculation interfaces, and utility functions for the frontend calculator.  
Includes: calculation types, validation helpers, and any shared constants.
**Files to create:**
- frontend/src/types/calculation.ts (create) — TypeScript interfaces for calculation request/result (operand1, operand2, operation, result, error).
- frontend/src/hooks/useCalculator.ts (create) — Custom hook for calculator state, input validation, calculation logic, error handling.
- frontend/src/styles/main.css (create) — Global CSS for layout, responsive design, and accessibility (≥44px controls, no horizontal scroll).
**Dependencies:** None
**Validation:**  
- `calculation.ts` exports all required types and matches usage in components.
- `useCalculator.ts` exports a hook with state and logic for calculation and validation.
- `main.css` provides responsive layout and touch-friendly controls.
**Role:** role-tl (technical_lead)

---

### ITEM 2: Frontend — Calculator UI and components
**Goal:** Implement the calculator UI, including input fields, operation buttons, result/error display, and responsive layout.  
All logic and state are handled via the custom hook from Item 1.
**Files to create:**
- frontend/src/components/Calculator.tsx (create) — Main calculator component: renders two numeric inputs, two operation buttons, result/error display, and uses the custom hook.
- frontend/src/components/OperationButton.tsx (create) — Button component for 'Sumar' and 'Restar' with props for operation, onClick, and disabled state.
- frontend/src/App.tsx (create) — Root React component: renders Calculator and applies global styles.
- frontend/src/main.tsx (create) — React entry point: renders App into the DOM.
- frontend/public/index.html (create) — HTML entry point for Vite.
**Dependencies:** Item 1
**Validation:**  
- Running `npm run dev` in `frontend/` shows the calculator UI, with correct calculation and error handling.
- UI is responsive and accessible per requirements.
**Role:** role-fe (frontend_developer)

---

### ITEM 3: Frontend — Build, configuration, and Dockerization
**Goal:** Provide all configuration and build files for the frontend, enabling local development, production builds, and Dockerized deployment.
**Files to create:**
- frontend/package.json (create) — All dependencies (React, Vite, TypeScript), scripts for dev/build/preview.
- frontend/tsconfig.json (create) — TypeScript configuration (strict mode, JSX support).
- frontend/vite.config.ts (create) — Vite config for React, public path, and build output.
- frontend/Dockerfile (create) — Multi-stage Dockerfile: builds static assets, serves with a minimal web server (e.g., nginx or Vite preview), non-root user, EXPOSE 80.
**Dependencies:** Item 1
**Validation:**  
- `npm run build` produces a working static site in `dist/`.
- `docker build .` and `docker run` serve the app at `http://localhost:80` with correct UI and functionality.
**Role:** role-fe (frontend_developer)

---

### ITEM 4: Infrastructure & Deployment
**Goal:** Complete Docker orchestration and deployment scripts for zero-manual-steps setup.  
Includes: Docker Compose, environment template, ignore files, run script, documentation, and architecture diagram.
**Files to create:**
- docker-compose.yml (create) — Defines frontend service with healthcheck, build context, ports, and environment.
- .env.example (create) — Documents all environment variables (if any).
- .gitignore (create) — Excludes node_modules, dist, .env, etc.
- .dockerignore (create) — Excludes node_modules, .git, dist, logs.
- run.sh (create) — Checks Docker, builds, starts, waits for healthy, prints access URL.
- README.md (create) — Prerequisites, setup, run instructions, deployment, and troubleshooting.
- docs/architecture.md (create) — System diagram and component descriptions.
**Dependencies:** Items 1, 2, 3
**Validation:**  
- `./run.sh` builds and starts the app; after completion, the calculator is accessible at `http://localhost:8080` (or configured port), with all acceptance criteria met.
**Role:** role-devops (devops_support)

---