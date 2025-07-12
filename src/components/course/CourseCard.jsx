import { useState } from 'react'
import {
  Card, CardContent, CardMedia, Typography,
  Box, Chip, IconButton, Rating,
  Avatar, Button
} from '@mui/material'
import { FavoriteBorder, Favorite, AccessTime, People } from '@mui/icons-material'

function CourseCard({ course, onToggleFavorite, isFavorite, onViewDetails }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    onToggleFavorite(course.id)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 12px 40px rgba(0,0,0,0.15)'
          : '0 4px 20px rgba(0,0,0,0.08)',
        '&:hover': {
          '& .MuiCardMedia-img': {
            transform: 'scale(1.05)'
          }
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(course)}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="200"
          image={course.image}
          alt={course.title}
          sx={{
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />

        {/* Favorite button */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            }
          }}
          onClick={handleFavoriteClick}
          size="small"
        >
          {isFavorite ? (
            <Favorite sx={{ color: '#f44336' }} />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>

        {/* Category chip */}
        <Chip
          label={course.category}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 'bold'
          }}
        />

        {/* Level indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            backgroundColor: course.level === 'Beginner' ? '#4caf50' :
              course.level === 'Intermediate' ? '#ff9800' : '#f44336',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}
        >
          {course.level}
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '3.2em'
          }}
        >
          {course.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.4em'
          }}
        >
          {course.description}
        </Typography>

        {/* Instructor */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={course.instructor.avatar}
            alt={course.instructor.name}
            sx={{ width: 32, height: 32, mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {course.instructor.name}
          </Typography>
        </Box>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating
            value={course.rating}
            precision={0.1}
            size="small"
            readOnly
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {course.rating} ({course.reviews} đánh giá)
          </Typography>
        </Box>

        {/* Course stats */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {formatDuration(course.duration)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <People sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {course.students.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Price and action */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Box>
            {course.originalPrice && course.originalPrice > course.price && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  fontSize: '0.875rem'
                }}
              >
                {formatPrice(course.originalPrice)}
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: course.originalPrice && course.originalPrice > course.price ? '#f44336' : 'text.primary'
              }}
            >
              {course.price === 0 ? 'Miễn phí' : formatPrice(course.price)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              minWidth: 'auto',
              px: 2
            }}
            onClick={(e) => {
              e.stopPropagation()
              onViewDetails(course)
            }}
          >
            Xem chi tiết
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CourseCard
