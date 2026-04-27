import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from '../../src/components/Calculator';

describe('Calculator', () => {
  const defaultProps = {
    operand1: 0,
    operand2: 0,
    setOperand1: vi.fn(),
    setOperand2: vi.fn(),
    operation: 'add' as const,
    setOperation: vi.fn(),
    onCalculate: vi.fn(),
    result: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders calculator with title', () => {
    render(<Calculator {...defaultProps} />);
    expect(screen.getByText('Calculadora')).toBeDefined();
  });

  it('renders both input fields', () => {
    render(<Calculator {...defaultProps} />);
    expect(screen.getByLabelText('Número 1')).toBeDefined();
    expect(screen.getByLabelText('Número 2')).toBeDefined();
  });

  it('renders operation buttons', () => {
    render(<Calculator {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Sumar' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Restar' })).toBeDefined();
  });

  it('renders result display with placeholder', () => {
    render(<Calculator {...defaultProps} />);
    expect(screen.getByText('Resultado')).toBeDefined();
    expect(screen.getByText('—')).toBeDefined();
  });

  it('displays result when available', () => {
    render(<Calculator {...defaultProps} result={42} />);
    expect(screen.getByText('42')).toBeDefined();
  });

  it('displays error message when error is set', () => {
    render(<Calculator {...defaultProps} error="Error de prueba" />);
    expect(screen.getByText('Error de prueba')).toBeDefined();
  });

  it('displays loading message when loading', () => {
    render(<Calculator {...defaultProps} loading={true} />);
    expect(screen.getByText('Calculando...')).toBeDefined();
  });

  it('calls onCalculate when operation button is clicked', () => {
    render(<Calculator {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sumar' }));
    expect(defaultProps.onCalculate).toHaveBeenCalledTimes(1);
  });

  it('updates operand1 input value', () => {
    render(<Calculator {...defaultProps} operand1={10} />);
    const input = screen.getByLabelText('Número 1') as HTMLInputElement;
    expect(input.value).toBe('10');
  });

  it('updates operand2 input value', () => {
    render(<Calculator {...defaultProps} operand2={5} />);
    const input = screen.getByLabelText('Número 2') as HTMLInputElement;
    expect(input.value).toBe('5');
  });
});