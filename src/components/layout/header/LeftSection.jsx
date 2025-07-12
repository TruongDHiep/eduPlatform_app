import { useNavigate } from 'react-router-dom'
import { Typography, Button, Box } from '@mui/material'
import { School } from '@mui/icons-material'

function LeftSection() {
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Yêu thích', path: '/favorites' },
    { label: 'Lịch sử xem', path: '/history' }
  ]

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {/* Logo */}
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <School sx={{ mr: 1 }} />
        EduPlatform
      </Typography>

      {/* Navigation */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {menuItems.map((item) => (
          <Button
            key={item.label}
            color="inherit"
            size="large"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </Box>
  )
}

export default LeftSection
