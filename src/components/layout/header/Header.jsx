import { AppBar, Toolbar } from '@mui/material'
import LeftSection from './LeftSection'
import RightSection from './RightSection'

function Header() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#f8f9fa', color: '#03045e' }}>
      <Toolbar sx={{
        justifyContent: 'space-between',
        px: { xs: 1, sm: 2, md: 3 },
        minHeight: { xs: 56, sm: 64 }
      }}>
        <LeftSection />
        <RightSection />
      </Toolbar>
    </AppBar>
  )
}

export default Header
