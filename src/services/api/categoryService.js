import categoriesData from '../mockData/categories.json';

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  async getAll() {
    await delay(150);
    return [...this.categories];
  }

  async getById(id) {
    await delay(100);
    const category = this.categories.find(cat => cat.id === id);
    if (!category) {
      throw new Error('Category not found');
    }
    return { ...category };
  }

  async create(categoryData) {
    await delay(200);
    const newCategory = {
      id: Date.now().toString(),
      name: categoryData.name,
      color: categoryData.color,
      taskCount: 0
    };
    
    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, updates) {
    await delay(200);
    const categoryIndex = this.categories.findIndex(cat => cat.id === id);
    
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }

    this.categories[categoryIndex] = {
      ...this.categories[categoryIndex],
      ...updates,
      id // Ensure ID doesn't change
    };

    return { ...this.categories[categoryIndex] };
  }

  async delete(id) {
    await delay(200);
    const categoryIndex = this.categories.findIndex(cat => cat.id === id);
    
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }

    this.categories.splice(categoryIndex, 1);
    return true;
  }
}

export const categoryService = new CategoryService();