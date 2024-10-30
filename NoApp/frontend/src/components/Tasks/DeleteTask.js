import React from 'react';
import './DeleteTask.css';
import axios from 'axios';

function DeleteTask({ taskId, onDelete }) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://NoApp-backend.cloud-stacks.com/api/task/${taskId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        onDelete(taskId);
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="delete-task">
      <button className="delete-task-button" onClick={handleDelete}>
        Delete Task
      </button>
    </div>
  );
}

export default DeleteTask;

.delete-task {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.delete-task-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.delete-task-button:hover {
  background-color: #cc0000;
}
