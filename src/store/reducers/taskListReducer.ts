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
                    if (task.id === action.payload.id && action.payload.title !== '') {
                        if (action.payload.title) {
                            return { ...task, title: action.payload.title }
                        }
                        return { ...task, isCompleted: !task.isCompleted }
                    }
                    return task;
                })
            }

        case TaskListActionTypes.TOGGLE_TASK_UPDATING:
            return {
                ...state, tasks: state.tasks.map(task =>
                    task.id === action.payload ? { ...task, isUpdating: !task.isUpdating } : { ...task, isUpdating: false })
            }

        default: return state;
    }
});

export const addTaskAction = (payload: TaskState) => ({ type: TaskListActionTypes.ADD_TASK, payload });

export const removeTaskAction = (payload: number) => ({ type: TaskListActionTypes.REMOVE_TASK, payload });

export const updateTaskAction = (payload: { id: number, title?: string }) => ({ type: TaskListActionTypes.UPDATE_TASK, payload });

export const toggleTaskUpdatingAction = (payload: number) => ({ type: TaskListActionTypes.TOGGLE_TASK_UPDATING, payload });