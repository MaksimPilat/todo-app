import { TaskState } from "../../types/task";
import { TaskListState, TaskListAction, TaskListActionTypes } from "../../types/taskList";

const initialState: TaskListState = {
    tasks: []
}

export const taskListReducer = ((state = initialState, action: TaskListAction): TaskListState => {
    switch (action.type) {

        case TaskListActionTypes.ADD_TASK:
            if (!action.payload.title) return state;
            return { ...state, tasks: [...state.tasks, action.payload] }

        case TaskListActionTypes.REMOVE_TASK:
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) }

        case TaskListActionTypes.UPDATE_TASK:
            return {
                ...state, tasks: state.tasks.map(task => {
                    if (task.id === action.payload.id) {
                        const { title, isCompleted, isEditing } = action.payload;
                        const newTitle = title || task.title;
                        const newIsCompleted = isCompleted !== undefined ? isCompleted : task.isCompleted;
                        const newIsEditing = isEditing !== undefined ? isEditing : task.isEditing;
                        return { ...task, title: newTitle, isCompleted: newIsCompleted, isEditing: newIsEditing }
                    }
                    if (action.payload.isEditing !== undefined) return { ...task, isEditing: false };
                    return { ...task };
                })
            }

        default: return state;
    }
});

export const addTaskAction = (payload: TaskState) =>
    ({ type: TaskListActionTypes.ADD_TASK, payload });

export const removeTaskAction = (payload: number) =>
    ({ type: TaskListActionTypes.REMOVE_TASK, payload });

export const updateTaskAction = (payload: { id: number, title?: string, isCompleted?: boolean, isEditing?: boolean }) =>
    ({ type: TaskListActionTypes.UPDATE_TASK, payload });