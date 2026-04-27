import { FunctionComponent, ChangeEvent } from 'react';
import OperationButton from './OperationButton';

interface CalculatorProps {
  operand1: number;
  operand2: number;
  setOperand1: (value: number) => void;
  setOperand2: (value: number) => void;
  operation: 'add' | 'subtract';
  setOperation: (op: 'add' | 'subtract') => void;
  onCalculate: () => void;
  result: number | null;
  loading: boolean;
  error: string | null;
}

const Calculator: FunctionComponent<CalculatorProps> = ({
  operand1,
  operand2,
  setOperand1,
  setOperand2,
  operation: _operation,
  setOperation,
  onCalculate,
  result,
  loading,
  error,
}) => {
  void _operation;
  const handleOperand1Change = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setOperand1(isNaN(value) ? 0 : value);
  };

  const handleOperand2Change = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setOperand2(isNaN(value) ? 0 : value);
  };

  const handleOperationClick = (op: 'add' | 'subtract') => {
    setOperation(op);
    onCalculate();
  };

  return (
    <div className="calculator">
      <h1>Calculadora</h1>

      <div className="input-group">
        <label htmlFor="operand1">Número 1</label>
        <input
          id="operand1"
          type="number"
          value={operand1}
          onChange={handleOperand1Change}
          placeholder="Ingrese el primer número"
        />
      </div>

      <div className="input-group">
        <label htmlFor="operand2">Número 2</label>
        <input
          id="operand2"
          type="number"
          value={operand2}
          onChange={handleOperand2Change}
          placeholder="Ingrese el segundo número"
        />
      </div>

      <div className="operation-buttons">
        <OperationButton
          operation="add"
          onClick={() => handleOperationClick('add')}
          disabled={loading}
        />
        <OperationButton
          operation="subtract"
          onClick={() => handleOperationClick('subtract')}
          disabled={loading}
        />
      </div>

      {loading && <div className="loading">Calculando...</div>}

      <div className="result-display">
        <div className="label">Resultado</div>
        {error ? (
          <div className="value error">{error}</div>
        ) : (
          <div className="value">{result !== null ? result : '—'}</div>
        )}
      </div>
    </div>
  );
};

export default Calculator;