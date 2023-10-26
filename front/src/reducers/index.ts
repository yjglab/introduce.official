import { combineReducers, AnyAction } from 'redux';
import user, { UserState } from './user';

export interface ReducerStates {
  user: UserState;
}
const combinedReducer = combineReducers({
  user: user.reducer,
});

type AppReducer = typeof combinedReducer;

const rootReducer: AppReducer = (state: ReducerStates | undefined, action: AnyAction) => {
  return combinedReducer(state, action);
};
export default rootReducer;
