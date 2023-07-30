import { TaskState } from "./task";

export interface TaskListState {
    tasks: TaskState[]
}

export enum TaskListActionTypes {
    ADD_TASK = "ADD_TASK",
    REMOVE_TASK = "REMOVE_TASK",
    UPDATE_TASK = "UPDATE_TASK"
}

interface AddTaskAction {
    type: TaskListActionTypes.ADD_TASK,
    payload: TaskState
}

interface RemoveTaskAction {
    type: TaskListActionTypes.REMOVE_TASK,
    payload: number
}

interface UpdateTaskAction {
    type: TaskListActionTypes.UPDATE_TASK,
    payload: {
        id: number,
        title?: string,
        isCompleted?: boolean,
        isEditing?: boolean
    }
}

export type TaskListAction = AddTaskAction
    | RemoveTaskAction
    | UpdateTaskAction
