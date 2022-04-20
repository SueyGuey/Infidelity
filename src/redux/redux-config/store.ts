/**
 * store.ts
 * Configures store and reducers.
 */

import { configureStore } from '@reduxjs/toolkit';
import reducers from '../reducers';
export const store = configureStore({
	reducer: {
		...reducers,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
