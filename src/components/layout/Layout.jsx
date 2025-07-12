import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Header from './header/Header'
import Footer from './Footer'

function Layout() {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
