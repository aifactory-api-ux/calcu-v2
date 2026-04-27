# SPEC.md

## 1. TECHNOLOGY STACK

- **Frontend**
  - React 18.2.0
  - TypeScript 5.2
  - Vite 4.4
  - Node.js 20.x (for tooling)
- **Backend**
  - Node.js 20.x
  - Express 4.18.2
  - TypeScript 5.2
- **Database**
  - PostgreSQL 15
- **Infrastructure**
  - Docker 24.x
  - Docker Compose 2.x

---

## 2. DATA CONTRACTS

### TypeScript Interfaces (Frontend & Backend)

```typescript
// Calculation request sent from frontend to backend
export interface CalculationRequest {
  operand1: number;
  operand2: number;
  operation: 'add' | 'subtract';
}

// Calculation result returned from backend to frontend
export interface CalculationResult {
  result: number;
  operation: 'add' | 'subtract';
  operand1: number;
  operand2: number;
  id: number;
  createdAt: string; // ISO 8601 timestamp
}

// Calculation history entry (used in history list)
export interface CalculationHistoryEntry {
  id: number;
  operand1: number;
  operand2: number;
  operation: 'add' | 'subtract';
  result: number;
  createdAt: string; // ISO 8601 timestamp
}
```

### Database Schema

```sql
CREATE TABLE calculations (
  id SERIAL PRIMARY KEY,
  operand1 NUMERIC NOT NULL,
  operand2 NUMERIC NOT NULL,
  operation VARCHAR(8) NOT NULL CHECK (operation IN ('add', 'subtract')),
  result NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
```

---

## 3. API ENDPOINTS

### 1. Calculate

- **Method:** POST
- **Path:** `/api/calculate`
- **Request Body:** `CalculationRequest`
  ```json
  {
    "operand1": 5,
    "operand2": 3,
    "operation": "add"
  }
  ```
- **Response:** `CalculationResult`
  ```json
  {
    "id": 42,
    "operand1": 5,
    "operand2": 3,
    "operation": "add",
    "result": 8,
    "createdAt": "2024-06-01T12:34:56.789Z"
  }
  ```

### 2. Get Calculation History

- **Method:** GET
- **Path:** `/api/history`
- **Response:** Array of `CalculationHistoryEntry`
  ```json
  [
    {
      "id": 41,
      "operand1": 10,
      "operand2": 2,
      "operation": "subtract",
      "result": 8,
      "createdAt": "2024-06-01T12:33:00.000Z"
    },
    {
      "id": 42,
      "operand1": 5,
      "operand2": 3,
      "operation": "add",
      "result": 8,
      "createdAt": "2024-06-01T12:34:56.789Z"
    }
  ]
  ```

---

## 4. FILE STRUCTURE

```
/
├── docker-compose.yml                # Multi-service orchestration
├── .env.example                     # Environment variable template
├── .gitignore                       # Git ignore rules
├── README.md                        # Project documentation
├── start.sh                         # Root startup script
├── backend/
│   ├── Dockerfile                   # Backend service Dockerfile
│   ├── package.json                 # Backend dependencies and scripts
│   ├── tsconfig.json                # Backend TypeScript config
│   ├── src/
│   │   ├── index.ts                 # Express app entry point
│   │   ├── app.ts                   # Express app instance
│   │   ├── routes/
│   │   │   ├── calculate.ts         # /api/calculate route handler
│   │   │   └── history.ts           # /api/history route handler
│   │   ├── controllers/
│   │   │   ├── calculateController.ts # Calculation logic
│   │   │   └── historyController.ts   # History retrieval logic
│   │   ├── models/
│   │   │   └── calculation.ts       # Calculation TypeScript interfaces
│   │   ├── db/
│   │   │   ├── index.ts             # DB connection pool
│   │   │   └── migrations/
│   │   │       └── 001_create_calculations.sql # Table schema
│   │   └── utils/
│   │       └── validate.ts          # Request validation helpers
│   └── .env.example                 # Backend-specific env vars
├── frontend/
│   ├── Dockerfile                   # Frontend service Dockerfile
│   ├── package.json                 # Frontend dependencies and scripts
│   ├── tsconfig.json                # Frontend TypeScript config
│   ├── vite.config.ts               # Vite configuration
│   ├── public/
│   │   └── index.html               # HTML entry point
│   └── src/
│       ├── main.tsx                 # React entry point
│       ├── App.tsx                  # Root React component
│       ├── components/
│       │   ├── Calculator.tsx       # Calculator UI component
│       │   ├── HistoryList.tsx      # Calculation history list
│       │   └── OperationButton.tsx  # Button for add/subtract
│       ├── hooks/
│       │   └── useCalculator.ts     # State and API logic
│       ├── types/
│       │   └── calculation.ts       # Shared TypeScript interfaces
│       └── styles/
│           └── main.css             # Global styles
```

---

## PORT TABLE

| Service   | Listening Port | Path           |
|-----------|---------------|----------------|
| backend   | 4000          | backend/       |

---

## 5. ENVIRONMENT VARIABLES

| Name                | Type   | Description                                         | Example Value           |
|---------------------|--------|-----------------------------------------------------|------------------------|
| POSTGRES_HOST       | string | PostgreSQL hostname                                 | db                     |
| POSTGRES_PORT       | number | PostgreSQL port                                     | 5432                   |
| POSTGRES_DB         | string | PostgreSQL database name                            | calcu                  |
| POSTGRES_USER       | string | PostgreSQL username                                 | calcu_user             |
| POSTGRES_PASSWORD   | string | PostgreSQL password                                 | supersecret            |
| BACKEND_PORT        | number | Port for backend Express server                     | 4000                   |
| FRONTEND_PORT       | number | Port for frontend dev server (Vite)                 | 5173                   |
| VITE_API_URL        | string | API base URL for frontend (Vite env var)            | http://localhost:4000  |

---

## 6. IMPORT CONTRACTS

### Backend

- `from models/calculation import CalculationRequest, CalculationResult, CalculationHistoryEntry`
- `from controllers/calculateController import calculate`
- `from controllers/historyController import getHistory`
- `from db/index import dbPool`
- `from utils/validate import validateCalculationRequest`

### Frontend

- `import { CalculationRequest, CalculationResult, CalculationHistoryEntry } from '../types/calculation'`
- `import { useCalculator } from '../hooks/useCalculator'`
- `import Calculator from '../components/Calculator'`
- `import HistoryList from '../components/HistoryList'`
- `import OperationButton from '../components/OperationButton'`

---

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### React Hook

```typescript
useCalculator() → {
  operand1: number,
  operand2: number,
  setOperand1: (value: number) => void,
  setOperand2: (value: number) => void,
  operation: 'add' | 'subtract',
  setOperation: (op: 'add' | 'subtract') => void,
  result: number | null,
  loading: boolean,
  error: string | null,
  calculate: () => Promise<void>,
  history: CalculationHistoryEntry[],
  fetchHistory: () => Promise<void>
}
```

### Components

- **Calculator**
  - props: 
    ```typescript
    {
      operand1: number,
      operand2: number,
      setOperand1: (value: number) => void,
      setOperand2: (value: number) => void,
      operation: 'add' | 'subtract',
      setOperation: (op: 'add' | 'subtract') => void,
      onCalculate: () => void,
      result: number | null,
      loading: boolean,
      error: string | null
    }
    ```

- **OperationButton**
  - props:
    ```typescript
    {
      operation: 'add' | 'subtract',
      onClick: () => void,
      disabled: boolean
    }
    ```

- **HistoryList**
  - props:
    ```typescript
    {
      history: CalculationHistoryEntry[]
    }
    ```

---

## 8. FILE EXTENSION CONVENTION

- **Frontend files:** `.tsx` (TypeScript React)
- **Backend files:** `.ts` (TypeScript)
- **Project language:** TypeScript throughout (no JavaScript files)
- **Entry point:** `/src/main.tsx` (as referenced in `public/index.html`)

---

**All field names, types, and API contracts must be used verbatim as specified above.**