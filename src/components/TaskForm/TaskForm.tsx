import { useDispatch } from 'react-redux';
import styles from './TaskForm.module.css';
import { useEffect, useRef } from 'react';
import { updateTaskEditorAction } from '../../store/reducers/taskEditorReducer';
import { GradientButton } from '../exports';

interface Props {
    placeHolder: string,
    btnText: string,
    func: (title: string) => void,
    value?: string
}

export const TaskForm: React.FC<Props> = ({ placeHolder, btnText, func, value }: Props) => {

    const inputRef = useRef<HTMLInputElement>(null!);

    const dispatch = useDispatch();

    const onHandleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        func(inputRef.current.value);
        inputRef.current.value = '';
        if (value) dispatch(updateTaskEditorAction());
    }

    useEffect(() => {
        if (value) inputRef.current.value = value;
    }, [value]);

    return (
        <form
            className={styles.root}
            onSubmit={event => onHandleSubmit(event)} >
            <input
                ref={inputRef}
                type='text'
                placeholder={placeHolder} />
            <GradientButton>
                {btnText}
            </GradientButton>
        </form>
    )
}