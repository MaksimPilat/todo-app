import './App.css';
import { TaskForm, TaskList } from './components';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from './hooks/useTypedSelector';
import { addTaskAction, updateTaskAction } from './store/reducers/taskListReducer';
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
              task={{
                id: taskEditor.id,
                title: tasks.find(task => task.id === taskEditor.id)?.title
              }}
            /> : null
          }
        </div>

        <TaskList editableTaskId={taskEditor.id} />
      </div>
    </div>
  )
}

export default App;