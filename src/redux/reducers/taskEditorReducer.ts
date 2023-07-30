import { TaskEditorState, TaskEditorAction, TaskEditorActionTypes } from '../types';

const initialState: TaskEditorState = {
    id: 0,
    isMounted: false
}

export const taskEditorReducer = ((state = initialState, action: TaskEditorAction) => {
    switch (action.type) {

        case TaskEditorActionTypes.UPDATE:
            if (action.payload === undefined || action.payload === state.id) {
                return { ...state, id: 0, isMounted: false }
            }
            return { ...state, id: action.payload, isMounted: true }

        default: return state;
    }
});

export const updateTaskEditorAction = (payload?: number) => ({ type: TaskEditorActionTypes.UPDATE, payload });

