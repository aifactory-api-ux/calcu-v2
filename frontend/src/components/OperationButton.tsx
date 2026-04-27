import { FunctionComponent } from 'react';

interface OperationButtonProps {
  operation: 'add' | 'subtract';
  onClick: () => void;
  disabled: boolean;
}

const OperationButton: FunctionComponent<OperationButtonProps> = ({ operation, onClick, disabled }) => {
  const label = operation === 'add' ? 'Sumar' : 'Restar';
  const className = `operation-btn ${operation}`;

  return (
    <button type="button" className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default OperationButton;