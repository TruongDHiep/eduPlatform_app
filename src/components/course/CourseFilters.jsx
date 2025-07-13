import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import {
  Box, FormControl, InputLabel, Select,
  MenuItem, Chip, Typography, Slider,
  Button, Collapse, Paper
} from '@mui/material'
import { ExpandMore, ExpandLess, Clear } from '@mui/icons-material'

const PRICE_RANGE = [0, 5000000]
const DEBOUNCE_DELAY = 300
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

function CourseFilters({ filters, onFiltersChange, resultsCount = 0 }) {
  const [openSections, setOpenSections] = useState({
    level: true,
    price: true,
    rating: true
  })
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange || PRICE_RANGE)
  const [localRating, setLocalRating] = useState(filters.minRating || 0)

  const priceTimeoutRef = useRef(null)
  const ratingTimeoutRef = useRef(null)

  useEffect(() => {
    if (!priceTimeoutRef.current) {
      setLocalPriceRange(filters.priceRange || PRICE_RANGE)
    }
  }, [filters.priceRange])

  useEffect(() => {
    if (!ratingTimeoutRef.current) {
      setLocalRating(filters.minRating || 0)
    }
  }, [filters.minRating])

  const handleFilterChange = useCallback((filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    })
  }, [filters, onFiltersChange])

  const createDebouncedHandler = useCallback((timeoutRef, filterType, setValue) => {
    return {
      onChange: (event, newValue) => {
        setValue(newValue)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          handleFilterChange(filterType, newValue)
          timeoutRef.current = null
        }, DEBOUNCE_DELAY)
      },
      onChangeCommitted: (event, newValue) => {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
        handleFilterChange(filterType, newValue)
      }
    }
  }, [handleFilterChange])

  const priceHandlers = createDebouncedHandler(priceTimeoutRef, 'priceRange', setLocalPriceRange)
  const ratingHandlers = createDebouncedHandler(ratingTimeoutRef, 'minRating', setLocalRating)

  const toggleSection = useCallback((section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }, [])

  const clearAllFilters = useCallback(() => {
    const defaultFilters = {
      level: '',
      priceRange: PRICE_RANGE,
      minRating: 0,
      sortBy: 'newest'
    }
    setLocalPriceRange(PRICE_RANGE)
    setLocalRating(0)
    onFiltersChange(defaultFilters)
  }, [onFiltersChange])

  const hasActiveFilters = useMemo(() => {
    return filters.level ||
      (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < PRICE_RANGE[1])) ||
      (filters.minRating && filters.minRating > 0)
  }, [filters])

  const formatPrice = useCallback((price) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`
    }
    if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`
    }
    return price.toString()
  }, [])

  const FilterContent = () => (
    <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
      {/* Filter Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: { xs: 1.5, sm: 2 },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1, sm: 0 }
      }}>
        <Typography variant="h6" sx={{
          fontWeight: 'bold',
          fontSize: { xs: '1.1rem', sm: '1.25rem' }
        }}>
          Bộ lọc
        </Typography>
        {hasActiveFilters && (
          <Button
            size="small"
            onClick={clearAllFilters}
            startIcon={<Clear />}
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            Xóa tất cả
          </Button>
        )}
      </Box>

      {/* Results Count */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: '0.8rem', sm: '0.875rem' },
          textAlign: { xs: 'center', sm: 'left' }
        }}
      >
        {resultsCount} khóa học được tìm thấy
      </Typography>

      {/* Sort By */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <FormControl fullWidth size="small">
          <InputLabel sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Sắp xếp theo</InputLabel>
          <Select
            value={filters.sortBy || 'newest'}
            label="Sắp xếp theo"
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.875rem' }
            }}
          >
            <MenuItem value="newest">Mới nhất</MenuItem>
            <MenuItem value="popular">Phổ biến nhất</MenuItem>
            <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
            <MenuItem value="price-low">Giá thấp đến cao</MenuItem>
            <MenuItem value="price-high">Giá cao đến thấp</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Level Filter */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            py: { xs: 1, sm: 0 }
          }}
          onClick={() => toggleSection('level')}
        >
          <Typography variant="subtitle1" sx={{
            fontWeight: 'bold',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}>
            Cấp độ
          </Typography>
          {openSections.level ? <ExpandLess /> : <ExpandMore />}
        </Box>

        <Collapse in={openSections.level}>
          <Box sx={{ mt: { xs: 1.5, sm: 2 } }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Chọn cấp độ</InputLabel>
              <Select
                value={filters.level || ''}
                label="Chọn cấp độ"
                onChange={(e) => handleFilterChange('level', e.target.value)}
                sx={{
                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                }}
              >
                <MenuItem value="">Tất cả cấp độ</MenuItem>
                {LEVELS.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Collapse>
      </Box>

      {/* Price Range Filter */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            py: { xs: 1, sm: 0 }
          }}
          onClick={() => toggleSection('price')}
        >
          <Typography variant="subtitle1" sx={{
            fontWeight: 'bold',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}>
            Khoảng giá
          </Typography>
          {openSections.price ? <ExpandLess /> : <ExpandMore />}
        </Box>

        <Collapse in={openSections.price}>
          <Box sx={{ mt: { xs: 1.5, sm: 2 }, px: { xs: 0.5, sm: 1 } }}>
            <Slider
              value={localPriceRange}
              onChange={priceHandlers.onChange}
              onChangeCommitted={priceHandlers.onChangeCommitted}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPrice}
              min={0}
              max={PRICE_RANGE[1]}
              step={100000}
              marks={[
                { value: 0, label: '0' },
                { value: 1000000, label: '1M' },
                { value: 3000000, label: '3M' },
                { value: PRICE_RANGE[1], label: '5M+' }
              ]}
              sx={{
                '& .MuiSlider-markLabel': {
                  fontSize: { xs: '0.7rem', sm: '0.75rem' }
                }
              }}
            />
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Chip
                label={`${formatPrice(localPriceRange[0])} VND`}
                size="small"
                variant="outlined"
                sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
              />
              <Chip
                label={`${formatPrice(localPriceRange[1])} VND`}
                size="small"
                variant="outlined"
                sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
              />
            </Box>
          </Box>
        </Collapse>
      </Box>

      {/* Rating Filter */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            py: { xs: 1, sm: 0 }
          }}
          onClick={() => toggleSection('rating')}
        >
          <Typography variant="subtitle1" sx={{
            fontWeight: 'bold',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}>
            Đánh giá tối thiểu
          </Typography>
          {openSections.rating ? <ExpandLess /> : <ExpandMore />}
        </Box>

        <Collapse in={openSections.rating}>
          <Box sx={{ mt: { xs: 1.5, sm: 2 }, px: { xs: 0.5, sm: 1 } }}>
            <Slider
              value={localRating}
              onChange={ratingHandlers.onChange}
              onChangeCommitted={ratingHandlers.onChangeCommitted}
              valueLabelDisplay="auto"
              min={0}
              max={5}
              step={0.5}
              marks={[
                { value: 0, label: '0★' },
                { value: 2.5, label: '2.5★' },
                { value: 4, label: '4★' },
                { value: 5, label: '5★' }
              ]}
              sx={{
                color: '#FAAF00',
                '& .MuiSlider-markLabel': {
                  fontSize: { xs: '0.7rem', sm: '0.75rem' }
                }
              }}
            />
          </Box>
        </Collapse>
      </Box>

      {/* Quick Filters */}
      <Box sx={{ mb: { xs: 1, sm: 2 } }}>
        <Typography variant="subtitle1" sx={{
          fontWeight: 'bold',
          mb: { xs: 1.5, sm: 2 },
          fontSize: { xs: '0.9rem', sm: '1rem' }
        }}>
          Bộ lọc nhanh
        </Typography>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 0.5, sm: 1 },
          justifyContent: { xs: 'center', sm: 'flex-start' }
        }}>
          <Chip
            label="Dưới 1 triệu"
            variant={filters.priceRange?.[1] <= 1000000 && filters.priceRange?.[0] === 0 ? 'filled' : 'outlined'}
            color="primary"
            size="small"
            onClick={() => handleFilterChange('priceRange', [0, 1000000])}
            clickable
            sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
          />
          <Chip
            label="4★ trở lên"
            variant={filters.minRating >= 4 ? 'filled' : 'outlined'}
            color="secondary"
            size="small"
            onClick={() => handleFilterChange('minRating', 4)}
            clickable
            sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
          />
          <Chip
            label="Phổ biến"
            variant={filters.sortBy === 'popular' ? 'filled' : 'outlined'}
            color="success"
            size="small"
            onClick={() => handleFilterChange('sortBy', 'popular')}
            clickable
            sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
          />
        </Box>
      </Box>
    </Box>
  )

  return (
    <Paper
      elevation={1}
      sx={{
        position: { xs: 'static', md: 'sticky' },
        top: { xs: 0, md: 16 },
        backgroundColor: 'transparent',
        maxHeight: { xs: 'auto', md: 'calc(100vh - 120px)' },
        overflowY: { xs: 'visible', md: 'auto' }
      }}
    >
      <FilterContent />
    </Paper>
  )
}

export default CourseFilters
