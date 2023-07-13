export interface TaskEditorState {
    id: number,
    isMounted: boolean
}

export enum TaskEditorActionTypes {
    UPDATE = "UPDATE"
}

interface UpdateAction {
    type: TaskEditorActionTypes.UPDATE,
    payload: number
}

export type TaskEditorAction = UpdateAction
