import { useDispatch } from 'react-redux';
import './App.css';
import { Task, TaskForm } from './components/exports';
import { useTypedSelector } from './hooks/useTypedSelector';
import { addTaskAction, toggleTaskUpdatingAction, updateTaskAction } from './store/reducers/taskListReducer';
import { updateTaskEditorAction } from './store/reducers/taskEditorReducer';
import { useEffect } from 'react';

const App: React.FC = () => {

  const { tasks } = useTypedSelector(state => state.taskList);
  const taskEditor = useTypedSelector(state => state.taskEditor);

  const dispatch = useDispatch();

  const addTask = (title: string) => {
    const task = {
      id: Date.now(),
      title: title,
      isCompleted: false,
      isUpdating: false
    }
    dispatch(addTaskAction(task));
  }

  const editTask = (title: string) => {
    const task = {
      id: taskEditor.id,
      title: title
    }
    dispatch(updateTaskAction(task));
  }

  useEffect(() => {
    if (tasks.length < 1) dispatch(updateTaskEditorAction());
  }, [tasks]);

  useEffect(() => {
    dispatch(toggleTaskUpdatingAction(taskEditor.id));
  }, [taskEditor.id]);

  const renderTasks = () => {
    if (tasks.length > 0) {
      return (
        <div className="tasksContainer">
          {tasks.map(item =>
            <Task
              key={item.id}
              id={item.id}
              title={item.title}
              isCompleted={item.isCompleted}
              isUpdating={item.isUpdating} />
          )}
        </div>
      )
    }
    return <div className="warn">Task list is empty</div>
  }

  return (
    <div className="app">
      <div className="wrapper">
        <h1>Your Tasks</h1>

        <div className="formsContainer">
          <TaskForm
            placeHolder='Type task'
            btnText='Add Task'
            func={addTask}
          />
          {taskEditor.isMounted ?
            <TaskForm
              placeHolder='Edit task'
              btnText='Update'
              func={editTask}
              value={tasks.find(task => task.id === taskEditor.id)?.title}
            /> : null
          }
        </div>

        {renderTasks()}
      </div>
    </div>
  )
}

export default App;
