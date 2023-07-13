import styles from './Task.module.css';
import { MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { removeTaskAction, updateTaskAction } from '../../store/reducers/taskListReducer';
import { updateTaskEditorAction } from '../../store/reducers/taskEditorReducer';
import { useEffect, useRef } from 'react';

interface Props {
    id: number
    title: string,
    isCompleted: boolean,
    isUpdating: boolean
}

export const Task: React.FC<Props> = ({ id, title, isCompleted, isUpdating }: Props) => {

    const root = useRef<HTMLDivElement>(null!);

    const dispatch = useDispatch();

    const toggleTaskCompletion = (id: number) => {
        dispatch(updateTaskAction({ id: id }));
    }

    const editTask = (event: React.MouseEvent, id: number) => {
        event.stopPropagation();
        dispatch(updateTaskEditorAction(id));
    }

    const removeTask = (id: number) => {
        dispatch(removeTaskAction(id));
    }

    useEffect(() => {
        root.current.classList.toggle(styles.offset);
    }, [isUpdating])


    return (
        <div ref={root} onClick={() => toggleTaskCompletion(id)} className={styles.root}>
            <span className={isCompleted ? styles.title : null}>
                {title}
            </span>
            <div className={styles.controls}>
                <input
                    className={styles.btn}
                    type='checkbox'
                    checked={isCompleted} />
                <AiFillEdit
                    className={styles.btn}
                    size={24}
                    color='var(--yellow)'
                    onClick={event => editTask(event, id)} />
                <MdDelete
                    className={styles.btn}
                    size={24}
                    color='var(--red)'
                    onClick={() => removeTask(id)} />
            </div>
        </div>
    )
}