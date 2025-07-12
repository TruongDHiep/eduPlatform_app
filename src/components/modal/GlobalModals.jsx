import { Fab, Zoom } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import CourseDetailModal from '~/components/course/CourseDetailModal'
import FavoritesModal from './FavoritesModal'
import LoadingScreen from '~/components/ui/LoadingScreen'

// Import Redux selectors and actions
import {
  selectCourses,
  selectFavorites,
  selectCoursesLoading,
  toggleFavorite,
  addToViewHistory
} from '~/redux/slices/coursesSlice'

import {
  selectSelectedCourse,
  selectCourseDetailOpen,
  selectFavoritesOpen,
  selectShowScrollTop,
  closeCourseDetail,
  closeFavorites,
  openCourseDetail
} from '~/redux/slices/uiSlice'

function GlobalModals() {
  const dispatch = useDispatch()

  // Redux selectors
  const courses = useSelector(selectCourses)
  const favorites = useSelector(selectFavorites)
  const loading = useSelector(selectCoursesLoading)
  const selectedCourse = useSelector(selectSelectedCourse)
  const courseDetailOpen = useSelector(selectCourseDetailOpen)
  const favoritesOpen = useSelector(selectFavoritesOpen)
  const showScrollTop = useSelector(selectShowScrollTop)

  // Redux actions
  const handleCourseClick = (course) => {
    dispatch(addToViewHistory(course))
    dispatch(openCourseDetail(course))
  }

  const handleToggleFavorite = (course) => {
    const wasFavorite = favorites.includes(course.id)
    dispatch(toggleFavorite(course.id))

    if (wasFavorite) {
      toast.warning(`Đã xóa "${course.title}" khỏi danh sách yêu thích`)
    } else {
      toast.success(`Đã thêm "${course.title}" vào danh sách yêu thích`)
    }
  }

  const handleCloseCourseDetail = () => {
    dispatch(closeCourseDetail())
  }

  const handleCloseFavorites = () => {
    dispatch(closeFavorites())
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen open={loading} message="Đang tải khóa học..." />

      {/* Scroll to Top Button */}
      <Zoom in={showScrollTop}>
        <Fab
          size="medium"
          onClick={scrollToTop}
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          open={courseDetailOpen}
          onClose={handleCloseCourseDetail}
          isFavorite={favorites.includes(selectedCourse.id)}
          onToggleFavorite={() => handleToggleFavorite(selectedCourse)}
        />
      )}

      {/* Favorites Modal */}
      <FavoritesModal
        open={favoritesOpen}
        onClose={handleCloseFavorites}
        favorites={courses.filter(course => favorites.includes(course.id))}
        onToggleFavorite={handleToggleFavorite}
        onViewDetails={handleCourseClick}
      />

    </>
  )
}

export default GlobalModals
