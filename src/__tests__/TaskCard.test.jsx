import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '../components/TaskCard';

describe('TaskCard Component', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    priority: 'high',
    status: 'todo',
    tags: ['urgent', 'bug'],
    dueDate: '2024-12-31'
  };

  it('should render task information correctly', () => {
    render(<TaskCard task={mockTask} onEdit={() => {}} onDelete={() => {}} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', () => {
    const onEdit = vi.fn();
    const { container } = render(<TaskCard task={mockTask} onEdit={onEdit} onDelete={() => {}} />);
    
    const editButton = container.querySelector('button');
    fireEvent.click(editButton);
    
    expect(onEdit).toHaveBeenCalledWith(mockTask);
  });

  it('should display tags correctly', () => {
    render(<TaskCard task={mockTask} onEdit={() => {}} onDelete={() => {}} />);
    
    expect(screen.getByText('urgent')).toBeInTheDocument();
    expect(screen.getByText('bug')).toBeInTheDocument();
  });
});
