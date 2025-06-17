import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import CategoryTag from "@/components/molecules/CategoryTag";

const TaskCard = ({
  task,
  categories,
  onUpdate,
  onDelete,
  onEdit,
  searchQuery,
  isCompleted = false,
}) => {
// Early return if task is null/undefined
  if (!task) return null;
  
  const [isHovered, setIsHovered] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Find category for this task
  const category = categories?.find(cat => cat.id === task?.category);
  const priorityColors = {
    low: '#4ECDC4',
    medium: '#FFE66D',
    high: '#FF6B6B'
  };

  const handleToggleComplete = async () => {
    if (!task.completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 400);
    }
    await onUpdate(task.id, {
      completed: !task.completed,
      completedAt: !task.completed ? new Date() : null
    });
  };

const formatDueDate = (date) => {
    if (!date) return null;
    const dueDate = new Date(date);

    if (isToday(dueDate)) return 'Today';
    if (isTomorrow(dueDate)) return 'Tomorrow';
    return format(dueDate, 'MMM d');
  };

  const isDueSoon = task?.dueDate && isPast(new Date(task.dueDate)) && !task?.completed;

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <motion.div
    layout
    initial={{
        opacity: 0,
        y: 20
    }}
    animate={{
        opacity: 1,
        y: 0
    }}
    exit={{
        opacity: 0,
        y: -20
    }}
    whileHover={{
        scale: 1.02
    }}
    onHoverStart={() => setIsHovered(true)}
    onHoverEnd={() => setIsHovered(false)}
    className={`bg-white rounded-lg p-4 shadow-sm border transition-all relative overflow-hidden max-w-full ${isCompleted ? "opacity-75 border-gray-200" : "border-gray-100 hover:shadow-lg hover:border-gray-200"}`}>
    {/* Confetti Effect */}
    {showConfetti && <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => <motion.div
            key={i}
            className="confetti-particle absolute"
            style={{
                left: `${20 + i * 10}%`,
                top: "50%",
                backgroundColor: ["#5B46F2", "#FF6B6B", "#4ECDC4", "#FFE66D"][i % 4]
            }}
            initial={{
                scale: 0,
                opacity: 1
            }}
            animate={{
                scale: [0, 1.2, 0],
                y: [-20, -40, -60],
                x: [0, (i % 2 ? 1 : -1) * 20, (i % 2 ? 1 : -1) * 40],
                opacity: [1, 0.8, 0],
                rotate: [0, 180, 360]
            }}
            transition={{
                duration: 0.4,
                ease: "easeOut"
            }} />)}
    </div>}
    <div className="flex items-start space-x-3">
        {/* Completion Checkbox */}
        <Button
            whileHover={{
                scale: 1.1
            }}
            whileTap={{
                scale: 0.9
            }}
            onClick={handleToggleComplete}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed ? "bg-success border-success" : "border-gray-300 hover:border-primary"}`}>
            {task.completed && <motion.div
                initial={{
                    scale: 0
                }}
                animate={{
                    scale: 1
                }}
                className="animation-scale-check">
                <ApperIcon name="Check" className="w-4 h-4 text-white" />
            </motion.div>}
        </Button>
        {/* Task Content */}
        <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
                <h3
                    className={`font-medium break-words ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                    {highlightText(task.title, searchQuery)}
                </h3>
                {/* Actions */}
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: isHovered || isCompleted ? 1 : 0
                    }}
                    className="flex items-center space-x-1 ml-2 flex-shrink-0">
                    <Button
                        whileHover={{
                            scale: 1.1
                        }}
                        whileTap={{
                            scale: 0.9
                        }}
                        onClick={() => onEdit(task)}
                        className="p-1 text-gray-400 hover:text-primary transition-colors">
                        <ApperIcon name="Edit2" className="w-4 h-4" />
                    </Button>
                    <Button
                        whileHover={{
                            scale: 1.1
                        }}
                        whileTap={{
                            scale: 0.9
                        }}
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete this task?")) {
                                onDelete(task.id);
                            }
                        }}
                        className="p-1 text-gray-400 hover:text-error transition-colors">
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                    </Button>
                </motion.div>
            </div>
            {task.description && <p
                className={`text-sm mb-3 break-words ${task.completed ? "text-gray-400" : "text-gray-600"}`}>
                {highlightText(task.description, searchQuery)}
            </p>}
            {/* Task Meta */}
            <div className="flex items-center flex-wrap gap-2">
                {/* Priority Badge */}
                <div className="flex items-center space-x-1">
                    <div
                        className="w-2 h-2 rounded-full"
                        style={{
                            backgroundColor: priorityColors[task?.priority] || priorityColors.medium
                        }} />
                    <span className="text-xs text-gray-500 capitalize">{task?.priority || "medium"}</span>
                </div>
                {/* Category */}
                <CategoryTag category={category} />
                {/* Due Date */}
                {task.dueDate && <div
                    className={`flex items-center space-x-1 ${isDueSoon ? "text-error" : "text-gray-500"}`}>
                    <ApperIcon name="Calendar" className="w-3 h-3" />
                    <span className="text-xs">
                        {formatDueDate(task.dueDate)}
                    </span>
                    {isDueSoon && <ApperIcon name="AlertCircle" className="w-3 h-3" />}
                </div>}
            </div>
        </div>
    </div>
</motion.div>
  );
};

export default TaskCard;