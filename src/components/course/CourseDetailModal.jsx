import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Chip,
  Rating, Avatar, Divider, List,
  ListItem, ListItemIcon, ListItemText, Grid, IconButton
} from '@mui/material'
import {
  Close, PlayCircleOutline, AccessTime, People,
  CheckCircle, Language, WorkspacePremium, Update,
  Favorite, FavoriteBorder, Share, ShoppingCart
} from '@mui/icons-material'

function CourseDetailModal({ course, open, onClose, onToggleFavorite, isFavorite }) {

  if (!course) {return null}

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

  const handleFavoriteClick = () => {
    onToggleFavorite(course.id)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          Chi tiết khóa học
        </Typography>
        <IconButton
          onClick={onClose}
          edge="end"
          color="error"
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Course Image */}
        <Box sx={{ position: 'relative' }}>
          <img
            src={course.image}
            alt={course.title}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover'
            }}
          />

          {/* Action buttons overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              gap: 1
            }}
          >
            <IconButton
              onClick={handleFavoriteClick}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
              }}
            >
              {isFavorite ? (
                <Favorite sx={{ color: '#f44336' }} />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
              }}
            >
              <Share />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          {/* Course Title and Basic Info */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip
                label={course.category}
                color="primary"
                size="small"
              />
              <Chip
                label={course.level}
                variant="outlined"
                size="small"
                sx={{
                  color: course.level === 'Beginner' ? '#4caf50' :
                    course.level === 'Intermediate' ? '#ff9800' : '#f44336',
                  borderColor: course.level === 'Beginner' ? '#4caf50' :
                    course.level === 'Intermediate' ? '#ff9800' : '#f44336'
                }}
              />
            </Box>

            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {course.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {course.description}
            </Typography>

            {/* Instructor */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={course.instructor.avatar}
                alt={course.instructor.name}
                sx={{ width: 48, height: 48, mr: 2 }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {course.instructor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.instructor.title}
                </Typography>
              </Box>
            </Box>

            {/* Rating and Stats */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={course.rating} precision={0.1} size="small" readOnly />
                  <Typography variant="body2">
                    {course.rating} ({course.reviews} đánh giá)
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="body2">
                      {formatDuration(course.duration)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <People fontSize="small" color="action" />
                    <Typography variant="body2">
                      {course.students.toLocaleString()} học viên
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Course Features */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Điểm nổi bật của khóa học
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <List dense>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Học trực tuyến mọi lúc, mọi nơi" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Language color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Phụ đề tiếng Việt" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <WorkspacePremium color="warning" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Cấp chứng chỉ hoàn thành" />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} sm={6}>
                <List dense>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Update color="info" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Cập nhật nội dung thường xuyên" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <People color="secondary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Cộng đồng học tập tích cực" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Hỗ trợ từ giảng viên" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Course Content Preview */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Nội dung khóa học
            </Typography>

            <Typography variant="body2" color="text.secondary" paragraph>
              {course.lessonsCount} bài học • {formatDuration(course.duration)} tổng thời lượng
            </Typography>

            <List>
              {course.lessons?.slice(0, 5).map((lesson, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <PlayCircleOutline fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={lesson.title}
                    secondary={`${lesson.duration} phút`}
                  />
                </ListItem>
              )) || (
                <>
                  <ListItem disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <PlayCircleOutline fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Giới thiệu về khóa học"
                      secondary="15 phút"
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <PlayCircleOutline fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Kiến thức cơ bản"
                      secondary="30 phút"
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <PlayCircleOutline fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Thực hành với dự án"
                      secondary="45 phút"
                    />
                  </ListItem>
                </>
              )}
            </List>

            {course.lessons && course.lessons.length > 5 && (
              <Typography variant="body2" color="primary" sx={{ mt: 1, cursor: 'pointer' }}>
                + {course.lessons.length - 5} bài học khác
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Box>
            {course.originalPrice && course.originalPrice > course.price && (
              <Typography
                variant="body1"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary'
                }}
              >
                {formatPrice(course.originalPrice)}
              </Typography>
            )}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: course.originalPrice && course.originalPrice > course.price ? '#f44336' : 'text.primary'
              }}
            >
              {course.price === 0 ? 'Miễn phí' : formatPrice(course.price)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={onClose}
              variant="outlined"
              color="error"
            >
              Đóng
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCart />}
            >
              {course.price === 0 ? 'Đăng ký miễn phí' : 'Mua ngay'}
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default CourseDetailModal
