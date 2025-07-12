import { useState, useEffect, useRef } from 'react'
import {
  Box, InputBase, IconButton, Paper,
  List, ListItem, Typography, Avatar, Chip
} from '@mui/material'
import { Search as SearchIcon, Clear as ClearIcon, Star } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchQuery } from '~/redux/slices/filtersSlice'
import { selectCourses, addToViewHistory } from '~/redux/slices/coursesSlice'
import { openCourseDetail } from '~/redux/slices/uiSlice'

function SearchBar({ placeholder = 'Tìm kiếm khóa học...', sx = {} }) {
  const dispatch = useDispatch()
  const courses = useSelector(selectCourses)
  const searchRef = useRef(null)

  const [inputValue, setInputValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const filteredCourses = courses.filter(course => {
    const searchTerm = inputValue.toLowerCase()
    const title = course.title?.toLowerCase() || ''
    const description = course.description?.toLowerCase() || ''
    const instructorName = course.instructor?.name?.toLowerCase() || ''
    const category = course.category?.toLowerCase() || ''
    const level = course.level?.toLowerCase() || ''

    return title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      instructorName.includes(searchTerm) ||
      category.includes(searchTerm) ||
      level.includes(searchTerm)
  }).slice(0, 6)

  const handleInputChange = (event) => {
    const value = event.target.value
    setInputValue(value)
    setShowDropdown(value.length > 1 && filteredCourses.length > 0)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(setSearchQuery(inputValue))
      setShowDropdown(false)
    } else if (event.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  const handleClearSearch = () => {
    setInputValue('')
    dispatch(setSearchQuery(''))
    setShowDropdown(false)
  }

  const handleCourseClick = (course) => {
    dispatch(addToViewHistory(course))
    dispatch(openCourseDetail(course))
    setShowDropdown(false)
    setInputValue('')
  }

  const formatPrice = (price) => {
    if (!price || price === 0) { return 'Miễn phí' }
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <Box ref={searchRef} sx={{ position: 'relative', ...sx }}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'grey.100',
          borderRadius: 2,
          border: '1px solid',
          borderColor: showDropdown ? 'primary.main' : 'transparent',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'grey.50',
            borderColor: 'grey.300'
          },
          '&:focus-within': {
            backgroundColor: 'background.paper',
            borderColor: 'primary.main',
            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
          }
        }}
      >
        <SearchIcon
          sx={{
            color: 'text.secondary',
            ml: 2,
            transition: 'color 0.2s ease'
          }}
        />

        <InputBase
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          sx={{
            ml: 1,
            flex: 1,
            '& input': {
              padding: '12px 8px',
              fontSize: '0.95rem',
              '&::placeholder': {
                color: 'text.secondary',
                opacity: 0.7
              }
            }
          }}
        />

        {inputValue && (
          <IconButton
            size="small"
            onClick={handleClearSearch}
            sx={{
              mr: 1,
              color: 'text.secondary',
              '&:hover': {
                color: 'error.main',
                backgroundColor: 'error.light'
              }
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
      </Paper>

      {/* Dropdown Results */}
      {showDropdown && (
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 0.5,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            maxHeight: 400,
            overflow: 'auto',
            zIndex: 1300,
            backgroundColor: 'background.paper'
          }}
        >
          <Box sx={{ p: 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ px: 2, py: 1, display: 'block' }}
            >
              Tìm thấy {filteredCourses.length} khóa học
            </Typography>

            <List dense>
              {filteredCourses.map((course) => (
                <ListItem
                  key={course.id}
                  button
                  onClick={() => handleCourseClick(course)}
                  sx={{
                    borderRadius: 1,
                    mx: 1,
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <Avatar
                    src={course.image || ''}
                    alt={course.title || 'Course'}
                    sx={{
                      width: 40,
                      height: 40,
                      mr: 2,
                      borderRadius: 1
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {course.title || 'Khóa học chưa có tên'}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block' }}
                    >
                      {course.instructor?.name || 'Chưa có thông tin giảng viên'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Chip
                        label={formatPrice(course.price || 0)}
                        size="small"
                        color={(course.price || 0) === 0 ? 'success' : 'primary'}
                        variant="outlined"
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star sx={{ fontSize: 14, color: 'warning.main' }} />
                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                          {course.rating || '0.0'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>

            <Box sx={{ px: 2, py: 1, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="caption" color="text.secondary">
                Nhấn <strong>Enter</strong> để tìm kiếm &ldquo;{inputValue}&rdquo;
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  )
}

export default SearchBar
