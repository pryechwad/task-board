const STORAGE_KEYS = {
  USER: 'taskboard_user',
  TASKS: 'taskboard_tasks',
  ACTIVITY: 'taskboard_activity',
  REMEMBER_ME: 'taskboard_remember'
};

export const storage = {
  getUser: () => {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
  
  setUser: (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },
  
  removeUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
  
  getTasks: () => {
    try {
      const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      return tasks ? JSON.parse(tasks) : [];
    } catch {
      return [];
    }
  },
  
  setTasks: (tasks) => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },
  
  getActivity: () => {
    try {
      const activity = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
      return activity ? JSON.parse(activity) : [];
    } catch {
      return [];
    }
  },
  
  setActivity: (activity) => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activity));
  },
  
  getRememberMe: () => {
    return localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
  },
  
  setRememberMe: (value) => {
    localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, value.toString());
  },
  
  clearAll: () => {
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITY);
  }
};
