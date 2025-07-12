import { useState } from 'react'
import {
  Box, Typography, Grid, Paper, Skeleton, Button, Chip
} from '@mui/material'
import { Lightbulb, TrendingUp, Person } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

// Import components
import CourseCard from './CourseCard'
import CourseCardSkeleton from './CourseCardSkeleton'

// Import APIs
import { fetchCourseSuggestions, buildSuggestionsUrl } from '~/apis/mockServer'

// Import Redux
import {
  selectFavorites,
  toggleFavorite,
  addToViewHistory
} from '~/redux/slices/coursesSlice'
import { openCourseDetail } from '~/redux/slices/uiSlice'

function CourseSuggestions() {
  const dispatch = useDispatch()
  const favorites = useSelector(selectFavorites)

  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [basedOn, setBasedOn] = useState('popularity')
  const [topCategories, setTopCategories] = useState([])
  const [lastUpdated, setLastUpdated] = useState(null)

  const userId = 1

  const loadSuggestions = async () => {
    try {
      setLoading(true)
      const apiUrl = buildSuggestionsUrl(userId)
      const response = await fetchCourseSuggestions(userId)

      if (response.status === 200) {
        setSuggestions(response.data.suggestions)
        setBasedOn(response.data.basedOn)
        setTopCategories(response.data.topCategories || [])
        setLastUpdated(new Date().toLocaleTimeString())
        toast.success(`Đã tải đề xuất từ ${apiUrl}`)
      } else {
        throw new Error(`API Error: ${response.statusText}`)
      }
    } catch {
      toast.error('Không thể tải đề xuất khóa học từ API')
    } finally {
      setLoading(false)
    }
  }

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

  const getSuggestionTitle = () => {
    if (basedOn === 'preferences') {
      return 'Đề xuất dành cho bạn'
    }
    return 'Khóa học phổ biến'
  }

  const getSuggestionIcon = () => {
    if (basedOn === 'preferences') {
      return <Lightbulb sx={{ color: '#ffc107' }} />
    }
    return <TrendingUp sx={{ color: '#28a745' }} />
  }

  const getSuggestionDescription = () => {
    if (basedOn === 'preferences') {
      if (topCategories.length > 0) {
        return `Dựa trên sở thích của bạn về ${topCategories.join(', ')}`
      }
      return 'Dựa trên khóa học yêu thích và lịch sử xem của bạn'
    }
    return 'Những khóa học được nhiều học viên lựa chọn nhất'
  }

  if (loading) {
    return (
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
          <Skeleton variant="text" width={200} height={32} />
        </Box>
        <CourseCardSkeleton count={3} />
      </Paper>
    )
  }

  if (suggestions.length === 0 && !loading) {
    return (
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#03045e' }}>
          Khám phá khóa học được đề xuất
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Nhận đề xuất khóa học phù hợp dựa trên sở thích của bạn (User ID: {userId})
        </Typography>
        <Button
          variant="contained"
          onClick={loadSuggestions}
          disabled={loading}
          sx={{ borderRadius: 2, px: 4 }}
        >
          Lấy đề xuất cho tôi
        </Button>
      </Paper>
    )
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        border: '1px solid #e2e8f0'
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {getSuggestionIcon()}
          <Typography
            variant="h5"
            sx={{
              ml: 1,
              fontWeight: 700,
              color: '#03045e',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            {getSuggestionTitle()}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {getSuggestionDescription()}
            </Typography>
            {basedOn === 'preferences' && topCategories.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {topCategories.map((category) => (
                  <Chip
                    key={category}
                    size="small"
                    label={category}
                    variant="outlined"
                    color="primary"
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
              </Box>
            )}
          </Box>

          <Chip
            size="small"
            icon={basedOn === 'preferences' ? <Person /> : <TrendingUp />}
            label={basedOn === 'preferences' ? 'Cá nhân hóa' : 'Phổ biến'}
            color={basedOn === 'preferences' ? 'primary' : 'success'}
            variant="filled"
          />
        </Box>
      </Box>

      {/* Courses Grid */}
      <Grid container spacing={3} justifyContent="center">
        {suggestions.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{
              width: 350,
              height: 450,
              display: 'flex'
            }}>
              <CourseCard
                course={course}
                isFavorite={favorites.includes(course.id)}
                onToggleFavorite={() => handleToggleFavorite(course)}
                onViewDetails={() => handleCourseClick(course)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Refresh Button */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, gap: 1 }}>
        <Button
          variant="outlined"
          onClick={loadSuggestions}
          disabled={loading}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Tải đề xuất mới
        </Button>
        {lastUpdated && (
          <Typography variant="caption" color="text.secondary">
            Cập nhật lần cuối: {lastUpdated}
          </Typography>
        )}
      </Box>
    </Paper>
  )
}

export default CourseSuggestions
