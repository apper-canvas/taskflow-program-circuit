import React from 'react';

const CategoryTag = ({ category }) => {
  if (!category) return null;

  return (
    <span
      className="px-2 py-1 text-xs rounded-full text-gray-700 whitespace-nowrap"
      style={{ backgroundColor: `${category.color}40` }}
    >
      {category.name}
    </span>
  );
};

export default CategoryTag;