import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
            y: [0, -10, 0, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <ApperIcon name="FileQuestion" className="w-24 h-24 text-primary mx-auto mb-6" />
        </motion.div>

        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-4">
          404
        </h1>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist. Let's get you back to your tasks!
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors shadow-lg"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
            Back to Tasks
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;