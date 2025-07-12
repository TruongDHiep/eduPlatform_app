import { Box, Container, Typography, Button, Grid } from '@mui/material'
import { PlayArrow } from '@mui/icons-material'

function Banner() {

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #03045e 0%, #48cae4 100%)',
        color: 'white',
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%'
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'4\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant={'h2'}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 3,
                background: 'linear-gradient(45deg, #fff, #e3f2fd)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Học tập không giới hạn với EduPlatform
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: '#e8eaf6',
                fontWeight: 300,
                lineHeight: 1.6
              }}
            >
              Khám phá hàng nghìn khóa học từ các chuyên gia hàng đầu.
              Nâng cao kỹ năng và thay đổi cuộc sống của bạn ngay hôm nay!
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrow />}
                sx={{
                  backgroundColor: '#36af1dff',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(60, 175, 37, 0.5)',
                  '&:hover': {
                    backgroundColor: '#329603ff',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(60, 175, 37, 0.86)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Bắt đầu học ngay
              </Button>

              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#ffd60a',
                  color: '#ffd60a',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: '#ffb700',
                    backgroundColor: 'rgba(255, 214, 10, 0.1)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Khám phá khóa học
              </Button>
            </Box>

            {/* Stats */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ffd60a' }}>
                    50K+
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    Học viên
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff6b35' }}>
                    1000+
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    Khóa học
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#00f5ff' }}>
                    4.8
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    Đánh giá
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Container>

    </Box>
  )
}

export default Banner
