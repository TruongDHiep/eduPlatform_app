import React, { useState, useMemo } from 'react'
import {
  Container, Typography, Box, Grid,
  Paper, Alert, TextField, InputAdornment,
  Select, MenuItem, FormControl, InputLabel,
  Pagination, Chip
} from '@mui/material'
import { History, Search, FilterList } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectViewHistory, addToViewHistory, toggleFavorite, selectFavorites
} from '../redux/slices/coursesSlice'
import { openCourseDetail } from '../redux/slices/uiSlice'
import CourseCard from '~/components/course/CourseCard'
import EmptyState from '~/components/ui/EmptyState'

function ViewHistoryPage() {
  const dispatch = useDispatch()
  const viewHistory = useSelector(selectViewHistory)
  // Redux actions
  const handleCourseClick = (course) => {
    dispatch(addToViewHistory(course))
    dispatch(openCourseDetail(course))
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 12 // 4x3 grid
  const favorites = useSelector(selectFavorites)

  const handleToggleFavorite = (course) => {
    const wasFavorite = favorites.includes(course.id)
    dispatch(toggleFavorite(course.id))

    if (wasFavorite) {
      toast.warning(`Đã xóa "${course.title}" khỏi danh sách yêu thích`)
    } else {
      toast.success(`Đã thêm "${course.title}" vào danh sách yêu thích`)
    }
  }

  const _categories = [...new Set(viewHistory.map(course => course.category))]

  const filteredHistory = useMemo(() => {
    return viewHistory
      .filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !categoryFilter || course.category === categoryFilter
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return new Date(b.viewedAt) - new Date(a.viewedAt)
          case 'oldest':
            return new Date(a.viewedAt) - new Date(b.viewedAt)
          case 'rating':
            return b.rating - a.rating
          case 'title':
            return a.title.localeCompare(b.title)
          default:
            return new Date(b.viewedAt) - new Date(a.viewedAt)
        }
      })
  }, [viewHistory, searchQuery, categoryFilter, sortBy])

  const totalPages = Math.ceil(filteredHistory.length / coursesPerPage)
  const startIndex = (currentPage - 1) * coursesPerPage
  const endIndex = startIndex + coursesPerPage
  const currentCourses = filteredHistory.slice(startIndex, endIndex)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [filteredHistory.length])

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
          mb: 4,
          background: 'white',
          borderRadius: 3,
          color: '#03045e'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <History sx={{ fontSize: 40, mr: 2 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Lịch sử xem khóa học
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              {viewHistory.length} khóa học đã xem
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 600 }}>
          Theo dõi và quản lý các khóa học bạn đã xem. Dữ liệu được lưu tự động và giúp cải thiện gợi ý cho bạn.
        </Typography>
      </Paper>

      {viewHistory.length === 0 ? (
        <EmptyState
          icon={<History />}
          title="Chưa có lịch sử xem"
          description="Khi bạn xem chi tiết các khóa học, chúng sẽ được lưu lại ở đây để bạn dễ dàng truy cập lại."
          buttonText="Khám phá khóa học"
          onButtonClick={() => window.location.href = '/'}
        />
      ) : (
        <>
          {/* Filters and Controls */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Tìm kiếm khóa học..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Sắp xếp</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sắp xếp"
                    onChange={(e) => setSortBy(e.target.value)}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 300,
                          minWidth: 200,
                          '& .MuiMenuItem-root': {
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                            minHeight: 48,
                            padding: '8px 16px'
                          }
                        }
                      }
                    }}
                    sx={{
                      '& .MuiSelect-select': {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }
                    }}
                  >
                    <MenuItem value="newest">Xem gần nhất</MenuItem>
                    <MenuItem value="oldest">Xem lâu nhất</MenuItem>
                    <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
                    <MenuItem value="title">Tên A-Z</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {(searchQuery || categoryFilter) && (
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterList sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  Đang hiển thị {filteredHistory.length} kết quả
                </Typography>
                {searchQuery && (
                  <Chip
                    label={`Tìm kiếm: "${searchQuery}"`}
                    onDelete={() => setSearchQuery('')}
                    size="small"
                  />
                )}
                {categoryFilter && (
                  <Chip
                    label={`Danh mục: ${categoryFilter}`}
                    onDelete={() => setCategoryFilter('')}
                    size="small"
                  />
                )}
              </Box>
            )}
          </Paper>

          {/* Course History Grid */}
          {filteredHistory.length === 0 ? (
            <Alert severity="info" sx={{ textAlign: 'center' }}>
              Không tìm thấy khóa học nào phù hợp với bộ lọc của bạn.
            </Alert>
          ) : (
            <>
              {/* Results Info */}
              <Paper sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredHistory.length)} trong tổng số {filteredHistory.length} khóa học
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Trang {currentPage} / {totalPages}
                </Typography>
              </Paper>

              <Grid container spacing={3}>
                {currentCourses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={`${course.id}-${course.viewedAt}`}>
                    <Box sx={{
                      width: 350,
                      height: 450,
                      display: 'flex',
                      mx: 'auto'
                    }}>
                      <CourseCard
                        course={course}
                        isFavorite={favorites.includes(course.id)}
                        onViewDetails={handleCourseClick}
                        onToggleFavorite={() => handleToggleFavorite(course)}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              {filteredHistory.length > coursesPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default ViewHistoryPage
