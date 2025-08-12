import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Subscribe to store changes to save to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('savedForms', JSON.stringify(state.form.savedForms));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
