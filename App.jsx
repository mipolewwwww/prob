import React from 'react';
import { createAssistant, createSmartappDebugger } from '@salutejs/client';
import { TaskList } from './pages/TaskList';
import './App.css';

const initializeAssistant = (getState) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      return createSmartappDebugger({
        token: process.env.REACT_APP_TOKEN || 'test_token', // test_token для разработки
        initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP || 'управление расходами'}`,
        getState,
        nativePanel: {
          defaultText: 'Что вы хотите сделать?',
          screenshotMode: false,
        },
      });
    }
    return createAssistant({ getState });
  } catch (error) {
    console.error('Assistant init error:', error);
    return {
      sendData: () => {},
      on: () => {},
    };
  }
};

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        { id: 1, title: "Молоко", amount: 85 },
        { id: 2, title: "Бензин", amount: 2500 },
        { id: 3, title: "Коммуналка", amount: 3500 }
      ],
      assistantError: null
    };

    try {
      this.assistant = initializeAssistant(() => this.getStateForAssistant());
      this.setupAssistant();
    } catch (error) {
      console.error('Assistant setup failed:', error);
      this.state.assistantError = 'Ассистент временно недоступен';
    }
  }

  setupAssistant() {
    this.assistant.on('data', (event) => {
      console.log('Assistant event:', event);
      if (event.type === 'error') {
        this.setState({ assistantError: 'Ошибка соединения с ассистентом' });
        return;
      }
      this.processAssistantAction(event.action);
    });

    this.assistant.on('start', () => {
      this.setState({ assistantError: null });
      console.log('Assistant started');
    });
  }

  processAssistantAction(action) {
    if (!action) return;

    switch (action.type) {
      case 'add_note':
        this.handleAddTask(action.note, action.price);
        break;
      case 'delete_note':
        this.handleDeleteTask(action.id);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  handleAddTask = (title, amount) => {
    this.setState(prevState => ({
      tasks: [
        ...prevState.tasks,
        {
          id: Date.now(),
          title,
          amount: Number(amount)
        }
      ]
    }), () => {
      this.assistant.sendData({ action: { action_id: 'task_added' } });
    });
  };

  handleDeleteTask = (taskId) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== taskId)
    }), () => {
      this.assistant.sendData({ action: { action_id: 'task_deleted' } });
    });
  };

  handleMoveAmount = (sourceId, targetId) => {
    this.setState(prevState => {
      const newTasks = [...prevState.tasks];
      const sourceIndex = newTasks.findIndex(task => task.id === sourceId);
      const targetIndex = newTasks.findIndex(task => task.id === targetId);

      if (sourceIndex === -1 || targetIndex === -1) return prevState;

      const amountToTransfer = newTasks[sourceIndex].amount;
      newTasks[sourceIndex] = {
        ...newTasks[sourceIndex],
        amount: 0
      };
      newTasks[targetIndex] = {
        ...newTasks[targetIndex],
        amount: newTasks[targetIndex].amount + amountToTransfer
      };

      return { tasks: newTasks };
    }, () => {
      this.assistant.sendData({ action: { action_id: 'price_moved' } });
    });
  };

  render() {
    return (
      <div className="app-container">
        <h1>Управление расходами</h1>
        {this.state.assistantError && (
          <div className="assistant-error">{this.state.assistantError}</div>
        )}
        <TaskList
          tasks={this.state.tasks}
          onAdd={this.handleAddTask}
          onDelete={this.handleDeleteTask}
          onMove={this.handleMoveAmount}
        />
      </div>
    );
  }
}

export default App;