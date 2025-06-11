import React from 'react';

const Input = ({
  type = 'text',
  value,
  onChange,
  className = '',
  placeholder = '',
  error,
  rows, // For textarea
  children, // For select options
  autoFocus = false,
  ...props
}) => {
  // Common classes for all input types
  const commonClasses = `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
    error ? 'border-error' : 'border-gray-300'
  } ${className}`;

  // Filter out props not applicable to a standard input if it's a textarea or select
  const filteredProps = { ...props };
  if (type === 'textarea') {
    delete filteredProps.type;
  } else if (type === 'select') {
    delete filteredProps.type;
  }

  if (type === 'textarea') {
    return (
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className={`${commonClasses} resize-none`}
        placeholder={placeholder}
        autoFocus={autoFocus}
        {...filteredProps}
      />
    );
  }

  if (type === 'select') {
    return (
      <select
        value={value}
        onChange={onChange}
        className={commonClasses}
        autoFocus={autoFocus}
        {...filteredProps}
      >
        {children}
      </select>
    );
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={commonClasses}
      placeholder={placeholder}
      autoFocus={autoFocus}
      {...filteredProps}
    />
  );
};

export default Input;