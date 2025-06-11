import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  // Pass through any motion props
  whileHover,
  whileTap,
  // Any other standard button props to filter for DOM elements
  ...props
}) => {
  const isMotionButton = whileHover || whileTap;
  const Component = isMotionButton ? motion.button : 'button';

  // Filter out non-standard DOM props if not a motion component
  const filteredProps = { ...props };
  if (!isMotionButton) {
    delete filteredProps.whileHover;
    delete filteredProps.whileTap;
  }

  return (
    <Component
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
      whileHover={whileHover}
      whileTap={whileTap}
      {...filteredProps}
    >
      {children}
    </Component>
  );
};

export default Button;