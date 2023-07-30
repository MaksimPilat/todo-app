import styles from './TaskList.module.css';
import { Task } from '../Task/Task';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { updateTaskEditorAction } from '../../redux/reducers/taskEditorReducer';
import { TaskState } from '../../redux/types'
import { useEffect } from 'react';

interface Props {
    editableTaskId?: number
}

export const TaskList: React.FC<Props> = ({ editableTaskId }: Props) => {

    const dispatch = useDispatch();
    const { tasks } = useTypedSelector(state => state.taskList);

    useEffect(() => {
        if (tasks.length < 1 || !tasks.find((task: TaskState) => task.id === editableTaskId)) {
            dispatch(updateTaskEditorAction());
        }
    }, [tasks]);

    if (tasks.length > 0) {
        return (
            <div className={styles.root}>
                {tasks.map((item: TaskState) =>
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
