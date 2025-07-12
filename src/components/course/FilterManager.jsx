import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterCourses, searchCoursesAPI } from '~/redux/slices/coursesSlice'
import { selectSearchQuery, selectActiveFilters } from '~/redux/slices/filtersSlice'

export const FilterManager = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectSearchQuery)
  const activeFilters = useSelector(selectActiveFilters)

  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(searchCoursesAPI({ searchQuery, filters: activeFilters }))
    } else {
      dispatch(filterCourses({ searchQuery, filters: activeFilters }))
    }
  }, [searchQuery, activeFilters, dispatch])

  return null
}
