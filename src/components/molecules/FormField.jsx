import React from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';

const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  rows,
  required = false,
  children, // For select options
  autoFocus = false,
  ...props
}) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        error={error}
        rows={rows}
        autoFocus={autoFocus}
        {...props}
      >
        {children}
      </Input>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-error mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FormField;