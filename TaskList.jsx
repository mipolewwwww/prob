import React from "react";
import { TaskItem } from "../components/TaskItem";
import { AddTask } from "../components/AddTask";

export const TaskList = ({ 
  tasks, 
  onAdd, 
  onDelete, 
  onMove,
  selectedTaskId,
  onSelectTask,
  onSelectTarget
}) => {
  return (
    <div className="task-list-container">
      <AddTask onAdd={onAdd} />
      
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            item={task}
            isSelected={task.id === selectedTaskId}
            onSelect={() => onSelectTask(task.id)}
            onSelectTarget={() => onSelectTarget(task.id)}
            onDelete={onDelete}
            onMove={onMove}
            availableTargets={tasks.filter(t => t.id !== task.id)}
          />
        ))}
      </ul>
    </div>
  );
};