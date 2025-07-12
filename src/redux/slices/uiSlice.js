import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedCourse: null,
  courseDetailOpen: false,
  favoritesOpen: false,

  showScrollTop: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCourseDetail: (state, action) => {
      state.selectedCourse = action.payload
      state.courseDetailOpen = true
    },

    closeCourseDetail: (state) => {
      state.courseDetailOpen = false
      state.selectedCourse = null
    },

    openFavorites: (state) => {
      state.favoritesOpen = true
    },

    closeFavorites: (state) => {
      state.favoritesOpen = false
    },

    setShowScrollTop: (state, action) => {
      state.showScrollTop = action.payload
    }
  }
})

export const {
  openCourseDetail,
  closeCourseDetail,
  openFavorites,
  closeFavorites,
  setShowScrollTop
} = uiSlice.actions

export const selectSelectedCourse = (state) => state.ui.selectedCourse
export const selectCourseDetailOpen = (state) => state.ui.courseDetailOpen
export const selectFavoritesOpen = (state) => state.ui.favoritesOpen
export const selectShowScrollTop = (state) => state.ui.showScrollTop

export const uiReducer = uiSlice.reducer
