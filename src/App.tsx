import { useDispatch } from 'react-redux';
import './App.css';
import { Task, TaskForm } from './components';
import { useTypedSelector } from './hooks/useTypedSelector';
import { addTaskAction, updateTaskAction } from './store/reducers/taskListReducer';
import { updateTaskEditorAction } from './store/reducers/taskEditorReducer';
import { useEffect, useState } from 'react';

const App: React.FC = () => {

  const [visibility, setVisibility] = useState(false);

  const { tasks } = useTypedSelector(state => state.taskList);
  const taskEditor = useTypedSelector(state => state.taskEditor);

  const dispatch = useDispatch();

  const addTask = (title: string) => {
    const task = {
      id: Date.now(),
      title: title,
      isCompleted: false,
      isEditing: false
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
    setVisibility(true);
  }, []);

  useEffect(() => {
    if (tasks.length < 1 || !tasks.find(task => task.id === taskEditor.id)) {
      dispatch(updateTaskEditorAction());
    }
  }, [tasks]);

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
              isEditing={item.isEditing} />
          )}
        </div>
      )
    }
    return <div className="message">Now your only job is to relax! &#128516;</div>
  }

  return (
    <div className={`app ${visibility ? 'app-show' : null}`}>
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
              task={{ id: taskEditor.id, title: tasks.find(task => task.id === taskEditor.id)?.title }}
            /> : null
          }
        </div>

        {renderTasks()}
      </div>
    </div>
  )
}

export default App;
