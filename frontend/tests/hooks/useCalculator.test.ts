import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalculator } from '../../src/hooks/useCalculator';

describe('useCalculator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.operand1).toBe(0);
    expect(result.current.operand2).toBe(0);
    expect(result.current.operation).toBe('add');
    expect(result.current.result).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('sets operand1 correctly', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setOperand1(10);
    });
    expect(result.current.operand1).toBe(10);
  });

  it('sets operand2 correctly', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setOperand2(5);
    });
    expect(result.current.operand2).toBe(5);
  });

  it('sets operation correctly', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setOperation('subtract');
    });
    expect(result.current.operation).toBe('subtract');
  });

  it('performs addition correctly', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setOperand1(10);
      result.current.setOperand2(5);
    });
    await act(async () => {
      await result.current.calculate();
    });
    expect(result.current.result).toBe(15);
    expect(result.current.error).toBe(null);
  });

  it('performs subtraction correctly', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setOperand1(10);
      result.current.setOperand2(3);
      result.current.setOperation('subtract');
    });
    await act(async () => {
      await result.current.calculate();
    });
    expect(result.current.result).toBe(7);
    expect(result.current.error).toBe(null);
  });

  it('handles negative results', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setOperand1(2);
      result.current.setOperand2(5);
      result.current.setOperation('subtract');
    });
    await act(async () => {
      await result.current.calculate();
    });
    expect(result.current.result).toBe(-3);
  });

  it('handles decimal numbers', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setOperand1(1.5);
      result.current.setOperand2(2.5);
    });
    await act(async () => {
      await result.current.calculate();
    });
    expect(result.current.result).toBe(4);
  });

  it('handles zero operands', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setOperand1(0);
      result.current.setOperand2(0);
    });
    await act(async () => {
      await result.current.calculate();
    });
    expect(result.current.result).toBe(0);
  });

  it('clears previous result on new calculation', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setOperand1(10);
      result.current.setOperand2(5);
    });
    await act(async () => {
      await result.current.calculate();
    });
    expect(result.current.result).toBe(15);
    act(() => {
      result.current.setOperand1(3);
      result.current.setOperand2(2);
    });
    await act(async () => {
      await result.current.calculate();
    });
    expect(result.current.result).toBe(5);
  });

  it('fetchHistory sets history to empty array', async () => {
    const { result } = renderHook(() => useCalculator());
    await act(async () => {
      await result.current.fetchHistory();
    });
    expect(result.current.history).toEqual([]);
  });
});