import { combineReducers } from 'redux';
import { IStore } from './IStore';

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({});

export default rootReducer;
