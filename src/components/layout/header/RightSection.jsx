import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton, Badge, Menu, MenuItem, Box, Dialog, DialogContent } from '@mui/material'
import { FavoriteBorder, Person, Notifications, History, School, Search as SearchIcon } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { selectFavorites } from '~/redux/slices/coursesSlice'
import { openFavorites } from '~/redux/slices/uiSlice'
import SearchBar from '../SearchBar'

function RightSection() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const favorites = useSelector(selectFavorites)

  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1, md: 2 } }}>
        {/* Search Bar */}
        <Box sx={{
          width: { xs: 200, sm: 280, md: 350 },
          display: { xs: 'none', sm: 'block' }
        }}>
          <SearchBar />
        </Box>

        {/* Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Mobile Search Button */}
          <IconButton
            color="inherit"
            onClick={() => setMobileSearchOpen(true)}
            sx={{
              mr: { xs: 0.5, sm: 1 },
              display: { xs: 'block', sm: 'none' }
            }}
            title="Tìm kiếm"
            size="small"
          >
            <SearchIcon />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => navigate('/history')}
            sx={{ mr: { xs: 0.5, sm: 1 } }}
            title="Lịch sử xem"
            size={window.innerWidth < 600 ? 'small' : 'medium'}
          >
            <History />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleOpenFavorites}
            sx={{ mr: { xs: 0.5, sm: 1 } }}
            title="Khóa học yêu thích"
            size={window.innerWidth < 600 ? 'small' : 'medium'}
          >
            <Badge badgeContent={favorites.length} color="error">
              <FavoriteBorder />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            sx={{ mr: { xs: 0.5, sm: 1 } }}
            size={window.innerWidth < 600 ? 'small' : 'medium'}
          >
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
            size={window.innerWidth < 600 ? 'small' : 'medium'}
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

      {/* Mobile Search Dialog */}
      <Dialog
        open={mobileSearchOpen}
        onClose={() => setMobileSearchOpen(false)}
        fullWidth
        maxWidth="sm"
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <DialogContent sx={{ p: 2 }}>
          <SearchBar placeholder="Tìm kiếm khóa học..." />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RightSection
