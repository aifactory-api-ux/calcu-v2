import { FunctionComponent } from 'react';
import Calculator from './components/Calculator';
import { useCalculator } from './hooks/useCalculator';
import './styles/main.css';

const App: FunctionComponent = () => {
  const {
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
  } = useCalculator();

  return (
    <Calculator
      operand1={operand1}
      operand2={operand2}
      setOperand1={setOperand1}
      setOperand2={setOperand2}
      operation={operation}
      setOperation={setOperation}
      onCalculate={calculate}
      result={result}
      loading={loading}
      error={error}
    />
  );
};

export default App;