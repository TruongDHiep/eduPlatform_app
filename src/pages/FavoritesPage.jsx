import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container, Typography, Grid, Box,
  Paper, Chip, IconButton, Fade
} from '@mui/material'
import {
  ArrowBack, Favorite, FavoriteBorder, GridView, ViewList
} from '@mui/icons-material'
import { toast } from 'react-toastify'
import CourseCard from '~/components/course/CourseCard'
import EmptyState from '~/components/ui/EmptyState'
import { useSelector, useDispatch } from 'react-redux'
import { selectFavorites, selectCourses, toggleFavorite, addToViewHistory } from '../redux/slices/coursesSlice'
import { openCourseDetail } from '../redux/slices/uiSlice'

const FavoritesPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Redux selectors
  const favorites = useSelector(selectFavorites)
  const courses = useSelector(selectCourses)

  const [viewMode, setViewMode] = useState('grid')

  // Redux actions
  const handleToggleFavorite = (course) => {
    const wasFavorite = favorites.includes(course.id)
    dispatch(toggleFavorite(course.id))

    if (wasFavorite) {
      toast.warning(`Đã xóa "${course.title}" khỏi danh sách yêu thích`)
    } else {
      toast.success(`Đã thêm "${course.title}" vào danh sách yêu thích`)
    }
  }

  const handleCourseClick = (course) => {
    dispatch(addToViewHistory(course))
    dispatch(openCourseDetail(course))
  }

  const favoriteCourses = courses.filter(course => favorites.includes(course.id))

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#03045e' }}>
            Khóa học yêu thích
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              icon={<Favorite />}
              label={`${favorites.length} khóa học`}
              variant="outlined"
              color="primary"
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setViewMode('grid')}
              color={viewMode === 'grid' ? 'primary' : 'default'}
            >
              <GridView />
            </IconButton>
            <IconButton
              onClick={() => setViewMode('list')}
              color={viewMode === 'list' ? 'primary' : 'default'}
            >
              <ViewList />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      {favoriteCourses.length === 0 ? (
        <Fade in>
          <Paper
            sx={{
              background: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)'
            }}
          >
            <EmptyState
              icon={<FavoriteBorder sx={{ opacity: 0.5 }} />}
              title="Chưa có khóa học yêu thích"
              description="Hãy khám phá và thêm những khóa học bạn yêu thích vào danh sách này"
              buttonText="Khám phá khóa học"
              onButtonClick={() => navigate('/')}
            />
          </Paper>
        </Fade>
      ) : (
        <Grid container spacing={3}>
          {favoriteCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
              <Box
                sx={{
                  width: 350,
                  height: 450,
                  display: 'flex',
                  mx: 'auto'
                }}
              >
                <CourseCard
                  course={course}
                  isFavorite={true}
                  onToggleFavorite={() => handleToggleFavorite(course)}
                  onViewDetails={() => handleCourseClick(course)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default FavoritesPage
