import React, { useState } from "react";
import "../App.css";

export const TaskItem = ({ 
  item, 
  isSelected,
  onSelect,
  onSelectTarget,
  onDelete, 
  onMove,
  availableTargets 
}) => {
  const [targetId, setTargetId] = useState("");

  const handleMove = () => {
    if (!targetId) return;
    if (item.id === targetId) return;
    
    onMove(item.id, targetId);
    setTargetId("");
  };

  return (
    <li 
      className={`task-item ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="task-content">
        <span className="task-info">
          {item.title} ({item.amount} ₽)
        </span>
        
        <div className="task-controls">
          <div className="select-wrapper">
            <select
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              className="target-select"
              onClick={(e) => e.stopPropagation()}
            >
              <option value="">Выберите цель</option>
              {availableTargets.map(target => (
                <option key={target.id} value={target.id}>
                  {target.title} ({target.amount} ₽)
                </option>
              ))}
            </select>
          </div>
          
          <button 
            className="move-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleMove();
            }}
            disabled={!targetId}
          >
            Перенести в
          </button>
          
          <button 
            className="target-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelectTarget(item.id);
            }}
          >
            Выбрать цель
          </button>
          
          <button 
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
          >
            Удалить
          </button>
        </div>
      </div>
    </li>
  );
};