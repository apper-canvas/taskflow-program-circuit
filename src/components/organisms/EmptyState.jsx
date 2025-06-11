import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const EmptyState = ({ onCreateTask }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-12 max-w-md mx-auto"
    >
      {/* Animated Icon */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-6"
      >
        <div className="relative">
          <ApperIcon name="CheckSquare" className="w-20 h-20 text-primary mx-auto" />

          {/* Floating particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-secondary rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>

      <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">
        Ready to get organized?
      </h3>

      <p className="text-gray-500 mb-8 leading-relaxed">
        Start by creating your first task. Break down your goals into manageable steps
        and watch your productivity soar!
      </p>

      {/* CTA Button */}
      <Button
        whileHover={{
          scale: 1.05,
          brightness: 1.1,
          boxShadow: "0 10px 25px rgba(91, 70, 242, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={onCreateTask}
        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg transition-all font-medium text-lg"
      >
        <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
        Create Your First Task
      </Button>

      {/* Tips */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        {[
          {
            icon: 'Target',
            title: 'Set Priorities',
            description: 'Focus on what matters most'
          },
          {
            icon: 'Calendar',
            title: 'Add Due Dates',
            description: 'Never miss a deadline'
          },
          {
            icon: 'Tag',
            title: 'Organize by Category',
            description: 'Keep everything structured'
          }
        ].map((tip, index) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="text-center p-4"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name={tip.icon} className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">{tip.title}</h4>
            <p className="text-sm text-gray-500">{tip.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EmptyState;