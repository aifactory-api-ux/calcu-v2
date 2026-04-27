# Coverage Report — frontend
Fecha: 2026-04-27  |  Stack: TypeScript/React/Vite  |  Directorio: frontend

## Resumen
| Métrica | Valor |
|---------|-------|
| Estado | 🟢 BUENO |
| Cobertura total | 82.05% |
| Tests ejecutados | 27 |
| Tests pasados | 27 |
| Tests fallidos | 0 |

## Cobertura por archivo
| Archivo | Cobertura |
|---------|-----------|
| components/Calculator.tsx | 61.53% |
| components/OperationButton.tsx | 100% |
| hooks/useCalculator.ts | 90.9% |

## Tests fallidos / errores
Ninguno.

## Output completo
```
 RUN  v4.1.5 /workspace/b0a652fe-2367-4784-8d99-5a38e27c159e/frontend
      Coverage enabled with v8


 Test Files  3 passed (3)
      Tests  27 passed (27)
   Start at  21:22:50
   Duration  7.50s (transform 205ms, setup 0ms, import 1.22s, tests 975ms, environment 3.68s)

 % Coverage report from v8
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |   82.05 |       65 |      70 |   82.05 |
 components        |   70.58 |    66.66 |   57.14 |   70.58 |
  Calculator.tsx   |   61.53 |       60 |      50 |   61.53 | 30-31,35-36,78
 hooks             |    90.9 |     62.5 |     100 |    90.9 |
  useCalculator.ts |    90.9 |     62.5 |     100 |    90.9 | 35,53
-------------------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 82.05% ( 32/39 )
Branches     : 65% ( 13/20 )
Functions    : 70% ( 7/10 )
Lines        : 82.05% ( 32/39 )
================================================================================
```