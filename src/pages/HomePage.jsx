import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Grid, Box, Pagination, Typography, Paper } from '@mui/material'
import { toast } from 'react-toastify'

// Import components
import Banner from '~/components/layout/Banner'
import CourseCard from '~/components/course/CourseCard'
import CourseFilters from '~/components/course/CourseFilters'
import CourseSuggestions from '~/components/course/CourseSuggestions'

// Import Redux actions and selectors
import {
  selectFilteredCourses,
  selectFavorites,
  selectCourses,
  toggleFavorite,
  addToViewHistory,
  filterCourses
} from '../redux/slices/coursesSlice'

import {
  openCourseDetail
} from '../redux/slices/uiSlice'

import {
  selectActiveFilters,
  updateFilters,
  selectSearchQuery
} from '../redux/slices/filtersSlice'

function HomePage() {
  const dispatch = useDispatch()

  // Redux selectors
  const filteredCourses = useSelector(selectFilteredCourses)
  const favorites = useSelector(selectFavorites)
  const courses = useSelector(selectCourses)
  const activeFilters = useSelector(selectActiveFilters)
  const searchQuery = useSelector(selectSearchQuery)
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 9

  // Redux actions
  const handleCourseClick = (course) => {
    dispatch(addToViewHistory(course))
    dispatch(openCourseDetail(course))
  }

  const handleToggleFavorite = (course) => {
    const wasFavorite = favorites.includes(course.id)
    dispatch(toggleFavorite(course.id))

    if (wasFavorite) {
      toast.warning(`Đã xóa "${course.title}" khỏi danh sách yêu thích`)
    } else {
      toast.success(`Đã thêm "${course.title}" vào danh sách yêu thích`)
    }
  }

  const handleFiltersChange = (filters) => {
    dispatch(updateFilters(filters))
    dispatch(filterCourses({ searchQuery, filters }))
  }

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)
  const startIndex = (currentPage - 1) * coursesPerPage
  const endIndex = startIndex + coursesPerPage
  const currentCourses = useMemo(() =>
    filteredCourses.slice(startIndex, endIndex),
  [filteredCourses, startIndex, endIndex]
  )

  React.useEffect(() => {
    dispatch(filterCourses({ searchQuery, filters: activeFilters }))
  }, [searchQuery, activeFilters, dispatch])

  React.useEffect(() => {
    if (courses.length > 0 && filteredCourses.length === 0) {
      dispatch(filterCourses({ searchQuery, filters: activeFilters }))
    }
  }, [courses, filteredCourses.length, searchQuery, activeFilters, dispatch])

  React.useEffect(() => {
    setCurrentPage(1)
  }, [filteredCourses.length])

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Banner />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Course Suggestions */}
        <CourseSuggestions />

        {/* ai suggest section */}
        <Box sx={{
          display: 'flex',
          gap: { xs: 0, md: 4 },
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', md: 'row' }
        }}>
          <Box
            sx={{
              width: { xs: '100%', md: 280 },
              flexShrink: 0,
              position: { xs: 'static', md: 'sticky' },
              top: 24,
              maxHeight: { xs: 'auto', md: 'calc(100vh - 120px)' },
              overflowY: { xs: 'visible', md: 'auto' },
              borderRadius: 2,
              boxShadow: { xs: 0, md: 1 },
              mb: { xs: 3, md: 0 }
            }}
          >
            <CourseFilters
              filters={activeFilters}
              onFiltersChange={handleFiltersChange}
              resultsCount={filteredCourses.length}
            />
          </Box>

          <Box sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
            {/* Results Info */}
            {filteredCourses.length > 0 && (
              <Paper sx={{
                p: { xs: 1.5, md: 2 },
                mb: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1, sm: 0 }
              }}>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                  Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredCourses.length)} trong tổng số {filteredCourses.length} khóa học
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Trang {currentPage} / {totalPages}
                </Typography>
              </Paper>
            )}

            <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
              {filteredCourses.length > 0 ? (
                currentCourses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{
                      width: { xs: '100%', sm: 350 },
                      maxWidth: 350,
                      height: 450
                    }}>
                      <CourseCard
                        course={course}
                        isFavorite={favorites.includes(course.id)}
                        onToggleFavorite={() => handleToggleFavorite(course)}
                        onViewDetails={() => handleCourseClick(course)}
                      />
                    </Box>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 8
                    }}
                  >
                    <Box sx={{
                      fontSize: '4rem',
                      mb: 2,
                      opacity: 0.3
                    }}>
                      📚
                    </Box>
                    <Box sx={{
                      typography: 'h6',
                      color: 'text.secondary',
                      mb: 1
                    }}>
                      Không tìm thấy khóa học nào
                    </Box>
                    <Box sx={{
                      typography: 'body2',
                      color: 'text.secondary'
                    }}>
                      Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>

            {/* Pagination */}
            {filteredCourses.length > coursesPerPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  size="large"
                  showFirstButton
                  showLastButton
                  sx={{
                    fontWeight: 1000
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default HomePage
