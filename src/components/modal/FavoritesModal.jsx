import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Grid,
  IconButton, Tooltip
} from '@mui/material'
import { Close, FavoriteBorder, Favorite, School, Share } from '@mui/icons-material'
import { toast } from 'react-toastify'

// Import components
import CourseCard from '~/components/course/CourseCard'
import EmptyState from '~/components/ui/EmptyState'

// Import Redux actions
import { useDispatch } from 'react-redux'
import { toggleFavorite } from '~/redux/slices/coursesSlice'

function FavoritesModal({ open, onClose, favorites, onViewDetails }) {
  const dispatch = useDispatch()

  const handleToggleFavorite = (course) => {
    const wasFavorite = favorites.some(fav => fav.id === course.id)
    dispatch(toggleFavorite(course.id))

    if (wasFavorite) {
      toast.warning(`Đã xóa "${course.title}" khỏi danh sách yêu thích`)
    } else {
      toast.success(`Đã thêm "${course.title}" vào danh sách yêu thích`)
    }
  }

  const EmptyFavoritesState = () => (
    <EmptyState
      icon={<FavoriteBorder />}
      title="Chưa có khóa học yêu thích"
      description="Khám phá và thêm các khóa học bạn quan tâm vào danh sách yêu thích để dễ dàng truy cập sau này."
      buttonText="Khám phá khóa học"
      onButtonClick={onClose}
      buttonProps={{ startIcon: <School /> }}
    />
  )

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: '90vh',
            minHeight: '60vh',
            width: '100%'
          }
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Favorite sx={{ color: '#f44336', mr: 1 }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#03045e' }}>
              Khóa học yêu thích ({favorites.length})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {favorites.length > 0 && (
              <Tooltip title="Chia sẻ danh sách">
                <IconButton
                  sx={{ color: 'primary.main' }}
                >
                  <Share />
                </IconButton>
              </Tooltip>
            )}
            <IconButton
              onClick={onClose}
              color="error"
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 0, minHeight: '300px', maxHeight: '70vh', overflowY: 'auto' }}>
          {favorites.length === 0 ? (
            <EmptyFavoritesState />
          ) : (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {favorites.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <Box sx={{
                      width: 350,
                      height: 450,
                      display: 'flex',
                      mx: 'auto'
                    }}>
                      <CourseCard
                        course={course}
                        isFavorite={true}
                        onToggleFavorite={() => handleToggleFavorite(course)}
                        onViewDetails={(course) => {
                          onViewDetails(course)
                          onClose()
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </DialogContent>

        {favorites.length > 0 && (
          <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Typography variant="body2" color="text.secondary">
                Tổng cộng {favorites.length} khóa học yêu thích
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" onClick={onClose} color="error">
                  Đóng
                </Button>
                <Button variant="contained" onClick={onClose} color="primary">
                  Tiếp tục khám phá
                </Button>
              </Box>
            </Box>
          </DialogActions>
        )}
      </Dialog>
    </>
  )
}

export default FavoritesModal
