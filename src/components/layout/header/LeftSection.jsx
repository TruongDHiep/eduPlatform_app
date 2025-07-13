import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material'
import { School, Menu as MenuIcon } from '@mui/icons-material'

function LeftSection() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Yêu thích', path: '/favorites' },
    { label: 'Lịch sử xem', path: '/history' }
  ]

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleNavigate = (path) => {
    navigate(path)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
        {/* Logo */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
          onClick={() => navigate('/')}
        >
          <School sx={{ mr: { xs: 0.5, sm: 1 }, fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>EduPlatform</Box>
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>Edu</Box>
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
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

        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={handleMobileMenuToggle}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.label} onClick={() => handleNavigate(item.path)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default LeftSection
