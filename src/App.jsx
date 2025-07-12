import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Import theme
import { muiTheme } from '~/constants/theme'

// Import components
import Layout from '~/components/layout/Layout'
import ErrorBoundary from '~/components/ui/ErrorBoundary'

// Import Redux
import { loadCoursesAPI } from '~/redux/slices/coursesSlice'
import { setShowScrollTop } from '~/redux/slices/uiSlice'

// Import pages
import HomePage from '~/pages/HomePage'
import FavoritesPage from '~/pages/FavoritesPage'
import ViewHistoryPage from '~/pages/ViewHistoryPage'

// Global modals component
import GlobalModals from '~/components/modal/GlobalModals'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCoursesAPI())

    const handleScroll = () => {
      dispatch(setShowScrollTop(window.pageYOffset > 300))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dispatch])

  return (
    <ErrorBoundary>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="history" element={<ViewHistoryPage />} />
            </Route>
          </Routes>
          <GlobalModals />
        </Router>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            fontSize: '14px',
            padding: '8px 12px',
            minHeight: '48px'
          }}
        />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
