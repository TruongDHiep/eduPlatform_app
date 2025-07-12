import { AppBar, Toolbar } from '@mui/material'
import LeftSection from './LeftSection'
import RightSection from './RightSection'

function Header() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#f8f9fa', color: '#03045e' }}>
      <Toolbar sx={{ justifyContent: 'space-around', px: 3 }}>
        <LeftSection />
        <RightSection />
      </Toolbar>
    </AppBar>
  )
}

export default Header
