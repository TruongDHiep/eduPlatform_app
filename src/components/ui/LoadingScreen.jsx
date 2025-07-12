import { Box, CircularProgress, Typography, Fade } from '@mui/material'

const LoadingScreen = ({ message = 'Đang tải...', open = true }) => {
  if (!open) {return null}

  return (
    <Fade in={open}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999
        }}
      >
        {/* Logo hoặc brand */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              background: '#03045e',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center'
            }}
          >
            EduPlatform
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
              mt: 1
            }}
          >
            Nền tảng học trực tuyến hàng đầu
          </Typography>
        </Box>

        {/* Loading spinner */}
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: 'primary.main',
            mb: 3
          }}
        />

        {/* Loading message */}
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            textAlign: 'center'
          }}
        >
          {message}
        </Typography>

        {/* Loading dots animation */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                animation: `loadingDot 1.5s infinite ${index * 0.2}s`,
                '@keyframes loadingDot': {
                  '0%, 80%, 100%': {
                    opacity: 0.3,
                    transform: 'scale(0.8)'
                  },
                  '40%': {
                    opacity: 1,
                    transform: 'scale(1)'
                  }
                }
              }}
            />
          ))}
        </Box>
      </Box>
    </Fade>
  )
}

export default LoadingScreen
