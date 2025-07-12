import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as mockApi from '../../apis/mockApi'

const initialState = {
  courses: [],
  filteredCourses: [],
  categories: [],
  favorites: [],
  viewHistory: [],
  loading: false,
  error: null
}

export const loadCoursesAPI = createAsyncThunk(
  'courses/loadCoursesAPI',
  async () => {
    const [coursesResponse, categoriesResponse] = await Promise.all([
      mockApi.getCourses(),
      mockApi.getCategories()
    ])

    const courses = Array.isArray(coursesResponse?.data) ? coursesResponse.data : []
    const categories = Array.isArray(categoriesResponse?.data) ? categoriesResponse.data : []

    return {
      courses,
      categories,
      savedFavorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
      savedViewHistory: JSON.parse(localStorage.getItem('viewHistory') || '[]')
    }
  }
)

export const searchCoursesAPI = createAsyncThunk(
  'courses/searchCoursesAPI',
  async ({ searchQuery, filters }) => {
    const response = await mockApi.searchCourses(searchQuery, filters)
    return Array.isArray(response?.data) ? response.data : []
  }
)

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    filterCourses: (state, action) => {
      const { searchQuery, filters } = action.payload

      state.filteredCourses = state.courses.filter(course => {
        let matchesSearch = true
        if (searchQuery && searchQuery.trim()) {
          const searchLower = searchQuery.toLowerCase()
          matchesSearch =
            course.title.toLowerCase().includes(searchLower) ||
            course.description.toLowerCase().includes(searchLower) ||
            course.category.toLowerCase().includes(searchLower) ||
            course.instructor.name.toLowerCase().includes(searchLower)
        }

        const matchesLevel = !filters.level || course.level === filters.level
        const matchesPrice = course.price >= filters.priceRange[0] && course.price <= filters.priceRange[1]
        const matchesRating = course.rating >= filters.minRating

        return matchesSearch && matchesLevel && matchesPrice && matchesRating
      })

      if (filters.sortBy === 'newest') {
        state.filteredCourses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      } else if (filters.sortBy === 'rating') {
        state.filteredCourses.sort((a, b) => b.rating - a.rating)
      } else if (filters.sortBy === 'price-low') {
        state.filteredCourses.sort((a, b) => a.price - b.price)
      } else if (filters.sortBy === 'price-high') {
        state.filteredCourses.sort((a, b) => b.price - a.price)
      }
    },

    toggleFavorite: (state, action) => {
      const courseId = action.payload
      const index = state.favorites.indexOf(courseId)

      if (index > -1) {
        state.favorites.splice(index, 1)
      } else {
        state.favorites.push(courseId)
      }

      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },

    addToViewHistory: (state, action) => {
      const course = action.payload
      const existingIndex = state.viewHistory.findIndex(item => item.id === course.id)

      const viewHistoryItem = {
        ...course,
        viewedAt: new Date().toISOString()
      }

      if (existingIndex > -1) {
        state.viewHistory[existingIndex] = viewHistoryItem
      } else {
        state.viewHistory.unshift(viewHistoryItem)
      }

      if (state.viewHistory.length > 50) {
        state.viewHistory = state.viewHistory.slice(0, 50)
      }

      localStorage.setItem('viewHistory', JSON.stringify(state.viewHistory))
    },

    removeFromViewHistory: (state, action) => {
      const courseId = action.payload
      state.viewHistory = state.viewHistory.filter(item => item.id !== courseId)
      localStorage.setItem('viewHistory', JSON.stringify(state.viewHistory))
    },

    clearViewHistory: (state) => {
      state.viewHistory = []
      localStorage.removeItem('viewHistory')
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadCoursesAPI.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadCoursesAPI.fulfilled, (state, action) => {
        state.loading = false
        state.courses = action.payload.courses
        state.filteredCourses = action.payload.courses
        state.categories = action.payload.categories
        state.favorites = action.payload.savedFavorites
        state.viewHistory = action.payload.savedViewHistory
      })
      .addCase(loadCoursesAPI.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        state.courses = []
        state.filteredCourses = []
        state.categories = []
      })
      .addCase(searchCoursesAPI.fulfilled, (state, action) => {
        state.filteredCourses = action.payload
      })
  }
})

export const {
  filterCourses,
  toggleFavorite,
  addToViewHistory,
  removeFromViewHistory,
  clearViewHistory
} = coursesSlice.actions

export const selectCourses = (state) => state.courses.courses
export const selectFilteredCourses = (state) => state.courses.filteredCourses
export const selectCategories = (state) => state.courses.categories
export const selectFavorites = (state) => state.courses.favorites
export const selectViewHistory = (state) => state.courses.viewHistory
export const selectCoursesLoading = (state) => state.courses.loading
export const selectCoursesError = (state) => state.courses.error

export const coursesReducer = coursesSlice.reducer
