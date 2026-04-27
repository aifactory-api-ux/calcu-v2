# Architecture

## Overview

This is a pure frontend calculator application built with React, TypeScript, and Vite.

## Components

- **Calculator**: Main UI component with input fields, operation buttons, and result display
- **OperationButton**: Reusable button component for operations
- **useCalculator**: Custom hook managing state and calculation logic

## Data Flow

```
User Input → Calculator Component → useCalculator Hook → State Update → UI Re-render
```

## Technology Stack

- React 18.2.0
- TypeScript 5.2
- Vite 4.4
- Docker + Nginx