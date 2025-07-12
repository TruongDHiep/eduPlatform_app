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
    <Box sx={{ p: 2 }}>
      {/* Filter Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Bộ lọc
        </Typography>
        {hasActiveFilters && (
          <Button
            size="small"
            onClick={clearAllFilters}
            startIcon={<Clear />}
            sx={{ color: 'text.secondary' }}
          >
            Xóa tất cả
          </Button>
        )}
      </Box>

      {/* Results Count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {resultsCount} khóa học được tìm thấy
      </Typography>

      {/* Sort By */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Sắp xếp theo</InputLabel>
          <Select
            value={filters.sortBy || 'newest'}
            label="Sắp xếp theo"
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
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
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => toggleSection('level')}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Cấp độ
          </Typography>
          {openSections.level ? <ExpandLess /> : <ExpandMore />}
        </Box>

        <Collapse in={openSections.level}>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Chọn cấp độ</InputLabel>
              <Select
                value={filters.level || ''}
                label="Chọn cấp độ"
                onChange={(e) => handleFilterChange('level', e.target.value)}
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
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => toggleSection('price')}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Khoảng giá
          </Typography>
          {openSections.price ? <ExpandLess /> : <ExpandMore />}
        </Box>

        <Collapse in={openSections.price}>
          <Box sx={{ mt: 2, px: 1 }}>
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
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Chip
                label={`${formatPrice(localPriceRange[0])} VND`}
                size="small"
                variant="outlined"
              />
              <Chip
                label={`${formatPrice(localPriceRange[1])} VND`}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </Collapse>
      </Box>

      {/* Rating Filter */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => toggleSection('rating')}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Đánh giá tối thiểu
          </Typography>
          {openSections.rating ? <ExpandLess /> : <ExpandMore />}
        </Box>

        <Collapse in={openSections.rating}>
          <Box sx={{ mt: 2, px: 1 }}>
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
                color: '#FAAF00'
              }}
            />
          </Box>
        </Collapse>
      </Box>

      {/* Quick Filters */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Bộ lọc nhanh
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label="0"
            variant={filters.priceRange?.[0] === 0 && filters.priceRange?.[1] === 0 ? 'filled' : 'outlined'}
            color="primary"
            size="small"
            onClick={() => handleFilterChange('priceRange', [0, 0])}
            clickable
          />
          <Chip
            label="Dưới 1 triệu"
            variant={filters.priceRange?.[1] <= 1000000 && filters.priceRange?.[0] === 0 ? 'filled' : 'outlined'}
            color="primary"
            size="small"
            onClick={() => handleFilterChange('priceRange', [0, 1000000])}
            clickable
          />
          <Chip
            label="4★ trở lên"
            variant={filters.minRating >= 4 ? 'filled' : 'outlined'}
            color="secondary"
            size="small"
            onClick={() => handleFilterChange('minRating', 4)}
            clickable
          />
          <Chip
            label="Phổ biến"
            variant={filters.sortBy === 'popular' ? 'filled' : 'outlined'}
            color="success"
            size="small"
            onClick={() => handleFilterChange('sortBy', 'popular')}
            clickable
          />
        </Box>
      </Box>
    </Box>
  )

  return (
    <Paper elevation={1} sx={{ position: 'sticky', top: 16, backgroundColor: 'transparent' }}>
      <FilterContent />
    </Paper>
  )
}

export default CourseFilters
