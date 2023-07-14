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

    const changeTaskCompletion = (event: React.MouseEvent | React.FormEvent, id: number) => {
        event.stopPropagation();
        dispatch(updateTaskAction({ id: id, isCompleted: !isCompleted }));
        console.log(isCompleted)
    }

    const editTask = (event: React.MouseEvent, id: number) => {
        event.stopPropagation();
        dispatch(updateTaskEditorAction(id));
    }

    const removeTask = (id: number) => {
        dispatch(removeTaskAction(id));
    }

    useEffect(() => {
        root.current.classList.toggle(styles.editTask);
    }, [isEditing])

    return (
        <div ref={root} onClick={event => { console.log('click'); changeTaskCompletion(event, id) }} className={styles.root}>
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
                    onClick={() => removeTask(id)} />
            </div>
        </div>
    )
}