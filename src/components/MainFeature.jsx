import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from './ApperIcon';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import EmptyState from './EmptyState';

const MainFeature = ({ 
  tasks, 
  categories, 
  onTaskCreate, 
  onTaskUpdate, 
  onTaskDelete,
  searchQuery 
}) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskSubmit = async (taskData) => {
    if (editingTask) {
      await onTaskUpdate(editingTask.id, taskData);
      setEditingTask(null);
    } else {
      await onTaskCreate(taskData);
    }
    setShowTaskForm(false);
  };

  const handleFormClose = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (tasks.length === 0 && !searchQuery) {
    return (
      <div className="p-6">
        <EmptyState 
          onCreateTask={() => setShowTaskForm(true)}
        />
        
        <AnimatePresence>
          {showTaskForm && (
            <TaskForm
              categories={categories}
              onSubmit={handleTaskSubmit}
              onClose={handleFormClose}
              task={editingTask}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-full max-w-full overflow-hidden">
      {/* Task List */}
      <div className="lg:col-span-2 space-y-4 overflow-y-auto custom-scrollbar min-w-0">
        {tasks.length === 0 && searchQuery ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <ApperIcon name="Search" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <>
            {/* Active Tasks */}
            {activeTasks.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900 font-heading">
                  Active Tasks ({activeTasks.length})
                </h2>
                <AnimatePresence>
                  {activeTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TaskCard
                        task={task}
                        categories={categories}
                        onUpdate={onTaskUpdate}
                        onDelete={onTaskDelete}
                        onEdit={handleTaskEdit}
                        searchQuery={searchQuery}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="space-y-3 mt-8">
                <h2 className="text-lg font-medium text-gray-500 font-heading">
                  Completed ({completedTasks.length})
                </h2>
                <AnimatePresence>
                  {completedTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: (activeTasks.length + index) * 0.05 }}
                    >
                      <TaskCard
                        task={task}
                        categories={categories}
                        onUpdate={onTaskUpdate}
                        onDelete={onTaskDelete}
                        onEdit={handleTaskEdit}
                        searchQuery={searchQuery}
                        isCompleted
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick Add Panel */}
      <div className="space-y-4 overflow-y-auto custom-scrollbar min-w-0">
        <motion.button
          whileHover={{ scale: 1.02, brightness: 1.1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowTaskForm(true)}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          <span className="font-medium">Add New Task</span>
        </motion.button>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 font-heading">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Total Tasks</span>
              <span className="font-semibold text-gray-900">{tasks.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Active</span>
              <span className="font-semibold text-primary">{activeTasks.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Completed</span>
              <span className="font-semibold text-success">{completedTasks.length}</span>
            </div>
          </div>
        </div>

        {/* Categories Overview */}
        {categories.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 font-heading">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => {
                const categoryTasks = tasks.filter(task => task.category === category.name);
                const completedInCategory = categoryTasks.filter(task => task.completed).length;
                
                return (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm text-gray-600 break-words min-w-0">{category.name}</span>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {completedInCategory}/{categoryTasks.length}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Task Form Modal */}
      <AnimatePresence>
        {showTaskForm && (
          <TaskForm
            categories={categories}
            onSubmit={handleTaskSubmit}
            onClose={handleFormClose}
            task={editingTask}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;