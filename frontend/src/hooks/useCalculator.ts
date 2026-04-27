import { useState, useCallback } from 'react';
import { CalculationResult, CalculationHistoryEntry } from '../types/calculation';

interface UseCalculatorReturn {
  operand1: number;
  operand2: number;
  setOperand1: (value: number) => void;
  setOperand2: (value: number) => void;
  operation: 'add' | 'subtract';
  setOperation: (op: 'add' | 'subtract') => void;
  result: number | null;
  loading: boolean;
  error: string | null;
  calculate: () => Promise<void>;
  history: CalculationHistoryEntry[];
  fetchHistory: () => Promise<void>;
}

export function useCalculator(): UseCalculatorReturn {
  const [operand1, setOperand1] = useState<number>(0);
  const [operand2, setOperand2] = useState<number>(0);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<CalculationHistoryEntry[]>([]);

  const calculate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (isNaN(operand1) || isNaN(operand2)) {
        throw new Error('Ambos campos deben contener valores numéricos válidos.');
      }

      const computedResult = operation === 'add'
        ? operand1 + operand2
        : operand1 - operand2;

      const mockResult: CalculationResult = {
        id: Date.now(),
        operand1,
        operand2,
        operation,
        result: computedResult,
        createdAt: new Date().toISOString(),
      };

      setResult(mockResult.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el cálculo');
    } finally {
      setLoading(false);
    }
  }, [operand1, operand2, operation]);

  const fetchHistory = useCallback(async () => {
    setHistory([]);
  }, []);

  return {
    operand1,
    operand2,
    setOperand1,
    setOperand2,
    operation,
    setOperation,
    result,
    loading,
    error,
    calculate,
    history,
    fetchHistory,
  };
}