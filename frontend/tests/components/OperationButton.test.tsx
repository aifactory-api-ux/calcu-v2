import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OperationButton from '../../src/components/OperationButton';

describe('OperationButton', () => {
  it('renders Sumar button for add operation', () => {
    render(<OperationButton operation="add" onClick={() => {}} disabled={false} />);
    expect(screen.getByRole('button', { name: 'Sumar' })).toBeDefined();
  });

  it('renders Restar button for subtract operation', () => {
    render(<OperationButton operation="subtract" onClick={() => {}} disabled={false} />);
    expect(screen.getByRole('button', { name: 'Restar' })).toBeDefined();
  });

  it('calls onClick when clicked and not disabled', () => {
    const handleClick = vi.fn();
    render(<OperationButton operation="add" onClick={handleClick} disabled={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<OperationButton operation="add" onClick={handleClick} disabled={true} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has correct class name for add operation', () => {
    render(<OperationButton operation="add" onClick={() => {}} disabled={false} />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('operation-btn');
    expect(button.className).toContain('add');
  });

  it('has correct class name for subtract operation', () => {
    render(<OperationButton operation="subtract" onClick={() => {}} disabled={false} />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('operation-btn');
    expect(button.className).toContain('subtract');
  });
});