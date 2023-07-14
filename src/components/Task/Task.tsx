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
    isEditing: boolean
}

export const Task: React.FC<Props> = ({ id, title, isCompleted, isEditing }: Props) => {

    const root = useRef<HTMLDivElement>(null!);

    const dispatch = useDispatch();

    const changeTaskCompletion = (event: React.MouseEvent, id: number) => {
        event.stopPropagation();
        dispatch(updateTaskAction({ id: id, isCompleted: !isCompleted }));
    }

    const editTask = (event: React.MouseEvent, id: number) => {
        event.stopPropagation();
        dispatch(updateTaskEditorAction(id));
        dispatch(updateTaskAction({ id: id, isEditing: !isEditing }))
    }

    const removeTask = (event: React.MouseEvent, id: number) => {
        event.stopPropagation();
        dispatch(removeTaskAction(id));
    }

    useEffect(() => {
        if (isEditing) root.current.classList.add(styles.editTask);
        else root.current.classList.remove(styles.editTask);
    }, [isEditing])

    return (
        <div ref={root} onClick={event => changeTaskCompletion(event, id)} className={styles.root}>
            <span className={isCompleted ? styles.completeTitle : null}>
                {title}
            </span>
            <div className={styles.controls}>
                <div className={styles.checkboxWrapper}>
                    <label className={styles.checkbox}>
                        <input checked={isCompleted} type="checkbox" readOnly />
                        <span className={styles.checkmark}></span>
                    </label>
                </div>
                <AiFillEdit
                    className={styles.btn}
                    size={24}
                    color='var(--yellow)'
                    onClick={event => editTask(event, id)} />
                <MdDelete
                    className={styles.btn}
                    size={24}
                    color='var(--red)'
                    onClick={event => removeTask(event, id)} />
            </div>
        </div>
    )
}