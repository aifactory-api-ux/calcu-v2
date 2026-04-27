export interface CalculationRequest {
  operand1: number;
  operand2: number;
  operation: 'add' | 'subtract';
}

export interface CalculationResult {
  result: number;
  operation: 'add' | 'subtract';
  operand1: number;
  operand2: number;
  id: number;
  createdAt: string;
}

export interface CalculationHistoryEntry {
  id: number;
  operand1: number;
  operand2: number;
  operation: 'add' | 'subtract';
  result: number;
  createdAt: string;
}