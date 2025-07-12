import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchQuery: '',
  activeFilters: {
    level: '',
    priceRange: [0, 5000000],
    minRating: 0,
    sortBy: 'newest'
  }
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },

    updateFilters: (state, action) => {
      state.activeFilters = {
        ...state.activeFilters,
        ...action.payload
      }
    },

    resetFilters: (state) => {
      state.searchQuery = ''
      state.activeFilters = {
        level: '',
        priceRange: [0, 5000000],
        minRating: 0,
        sortBy: 'newest'
      }
    },

    setLevel: (state, action) => {
      state.activeFilters.level = action.payload
    },

    setPriceRange: (state, action) => {
      state.activeFilters.priceRange = action.payload
    },

    setMinRating: (state, action) => {
      state.activeFilters.minRating = action.payload
    },

    setSortBy: (state, action) => {
      state.activeFilters.sortBy = action.payload
    }
  }
})

export const {
  setSearchQuery,
  updateFilters,
  resetFilters,
  setLevel,
  setPriceRange,
  setMinRating,
  setSortBy
} = filtersSlice.actions

export const selectSearchQuery = (state) => state.filters.searchQuery
export const selectActiveFilters = (state) => state.filters.activeFilters

export const filtersReducer = filtersSlice.reducer
