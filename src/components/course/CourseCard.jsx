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
        transform: { xs: 'none', md: isHovered ? 'translateY(-8px)' : 'translateY(0)' },
        boxShadow: {
          xs: '0 2px 8px rgba(0,0,0,0.1)',
          md: isHovered ? '0 12px 40px rgba(0,0,0,0.15)' : '0 4px 20px rgba(0,0,0,0.08)'
        },
        '&:hover': {
          '& .MuiCardMedia-img': {
            transform: { xs: 'none', md: 'scale(1.05)' }
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
          height={{ xs: 180, sm: 200 }}
          image={course.image}
          alt={course.title}
          sx={{
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: { xs: 'none', md: 'scale(1.05)' }
            }
          }}
        />

        {/* Favorite button */}
        <IconButton
          sx={{
            position: 'absolute',
            top: { xs: 6, sm: 8 },
            right: { xs: 6, sm: 8 },
            backgroundColor: 'white',
            width: { xs: 32, sm: 40 },
            height: { xs: 32, sm: 40 },
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
            top: { xs: 6, sm: 8 },
            left: { xs: 6, sm: 8 },
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 'bold',
            fontSize: { xs: '0.7rem', sm: '0.75rem' }
          }}
        />

        {/* Level indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 6, sm: 8 },
            left: { xs: 6, sm: 8 },
            backgroundColor: course.level === 'Beginner' ? '#4caf50' :
              course.level === 'Intermediate' ? '#ff9800' : '#f44336',
            color: 'white',
            px: { xs: 0.5, sm: 1 },
            py: 0.5,
            borderRadius: 1,
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
            fontWeight: 'bold'
          }}
        >
          {course.level}
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
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
            minHeight: '3.2em',
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
        >
          {course.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: { xs: 1.5, sm: 2 },
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.4em',
            fontSize: { xs: '0.8rem', sm: '0.875rem' }
          }}
        >
          {course.description}
        </Typography>

        {/* Instructor */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1.5, sm: 2 } }}>
          <Avatar
            src={course.instructor.avatar}
            alt={course.instructor.name}
            sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 }, mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
            {course.instructor.name}
          </Typography>
        </Box>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1.5, sm: 2 } }}>
          <Rating
            value={course.rating}
            precision={0.1}
            size="small"
            readOnly
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            {course.rating} ({course.reviews} đánh giá)
          </Typography>
        </Box>

        {/* Course stats */}
        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, mb: { xs: 1.5, sm: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTime sx={{ fontSize: { xs: 14, sm: 16 }, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              {formatDuration(course.duration)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <People sx={{ fontSize: { xs: 14, sm: 16 }, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              {course.students.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Price and action */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 'auto',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            {course.originalPrice && course.originalPrice > course.price && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                {formatPrice(course.originalPrice)}
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: course.originalPrice && course.originalPrice > course.price ? '#f44336' : 'text.primary',
                fontSize: { xs: '1rem', sm: '1.25rem' }
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
              px: { xs: 1.5, sm: 2 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              width: { xs: '100%', sm: 'auto' }
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
