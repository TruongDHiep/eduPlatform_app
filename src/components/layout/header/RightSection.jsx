import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton, Badge, Menu, MenuItem, Box } from '@mui/material'
import { FavoriteBorder, Person, Notifications, History, School } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { selectFavorites } from '~/redux/slices/coursesSlice'
import { openFavorites } from '~/redux/slices/uiSlice'
import SearchBar from '../SearchBar'

function RightSection() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const favorites = useSelector(selectFavorites)

  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      if (anchorEl) {
        setAnchorEl(null)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [anchorEl])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleOpenFavorites = () => {
    dispatch(openFavorites())
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Search Bar */}
        <Box sx={{ width: 350 }}>
          <SearchBar />
        </Box>

        {/* Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            onClick={() => navigate('/history')}
            sx={{ mr: 1 }}
            title="Lịch sử xem"
          >
            <History />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleOpenFavorites}
            sx={{ mr: 1 }}
            title="Khóa học yêu thích"
          >
            <Badge badgeContent={favorites.length} color="error">
              <FavoriteBorder />
            </Badge>
          </IconButton>

          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Person />
          </IconButton>
        </Box>
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            minWidth: 180,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0'
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Person sx={{ mr: 1, color: '#03045e' }} />
          Hồ sơ của tôi
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <School sx={{ mr: 1, color: '#03045e' }} />
          Khóa học của tôi
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <History sx={{ mr: 1, color: '#03045e' }} />
          Lịch sử học tập
        </MenuItem>
      </Menu>
    </>
  )
}

export default RightSection
