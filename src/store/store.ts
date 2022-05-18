import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import displayReducer from './features/display/displaySlice';
import positionReducer from './features/position/positionSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    display: displayReducer,
    position: positionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
