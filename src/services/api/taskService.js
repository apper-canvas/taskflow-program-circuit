import tasksData from '../mockData/tasks.json';

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TaskService {
  constructor() {
    this.tasks = [...tasksData];
  }

  async getAll() {
    await delay(200);
    return [...this.tasks];
  }

  async getById(id) {
    await delay(150);
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return { ...task };
  }

  async create(taskData) {
    await delay(300);
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || '',
      dueDate: taskData.dueDate,
      priority: taskData.priority || 'medium',
      category: taskData.category,
      completed: false,
      createdAt: new Date(),
      completedAt: null
    };
    
    this.tasks.unshift(newTask);
    return { ...newTask };
  }

  async update(id, updates) {
    await delay(250);
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updates,
      id // Ensure ID doesn't change
    };

    return { ...this.tasks[taskIndex] };
  }

  async delete(id) {
    await delay(200);
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    this.tasks.splice(taskIndex, 1);
    return true;
  }

  async getByCategory(category) {
    await delay(200);
    return this.tasks.filter(task => task.category === category);
  }

  async search(query) {
    await delay(150);
    const lowercaseQuery = query.toLowerCase();
    return this.tasks.filter(task => 
      task.title.toLowerCase().includes(lowercaseQuery) ||
      task.description.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const taskService = new TaskService();