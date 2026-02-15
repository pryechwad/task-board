import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from '../utils/storage';

describe('Storage Utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save and retrieve tasks', () => {
    const tasks = [
      { id: 1, title: 'Test Task', status: 'todo', priority: 'high' }
    ];
    storage.setTasks(tasks);
    const retrieved = storage.getTasks();
    expect(retrieved).toEqual(tasks);
  });

  it('should return empty array when no tasks exist', () => {
    const tasks = storage.getTasks();
    expect(tasks).toEqual([]);
  });

  it('should handle remember me preference', () => {
    storage.setRememberMe(true);
    expect(storage.getRememberMe()).toBe(true);
    
    storage.setRememberMe(false);
    expect(storage.getRememberMe()).toBe(false);
  });
});
