import { configureStore } from '@reduxjs/toolkit'
import { coursesReducer } from './slices/coursesSlice'
import { uiReducer } from './slices/uiSlice'
import { filtersReducer } from './slices/filtersSlice'

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    ui: uiReducer,
    filters: filtersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})
