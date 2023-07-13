import { combineReducers } from 'redux';
import { taskListReducer } from './taskListReducer';
import { taskEditorReducer } from './taskEditorReducer';


export const rootReducer = combineReducers({
    taskList: taskListReducer,
    taskEditor: taskEditorReducer
})

export type RootState = ReturnType<typeof rootReducer>