import React from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';
import Button from '../common/Button';

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <div className="card category-card">
      <div className="category-info">
        <h3>{category.name}</h3>
        <p>{category.count} jobs</p>
      </div>
      <div className="category-actions">
        <Button 
          variant="warning" 
          icon={<FaEdit />} 
          onClick={() => onEdit(category)}
        >
          Edit
        </Button>
        <Button 
          variant="danger" 
          icon={<FaTimes />} 
          onClick={() => onDelete(category.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CategoryCard; 
