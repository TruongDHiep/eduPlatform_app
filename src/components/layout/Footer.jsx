import {
  Box, Container, Grid, Typography, Link,
  IconButton, Divider
} from '@mui/material'
import {
  Facebook, Twitter, Instagram, YouTube, LinkedIn,
  School, Email, Phone, LocationOn
} from '@mui/icons-material'

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#222831',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <School sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h5" component="div">
                EduPlatform
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: '#bdc3c7', maxWidth: 600 }}>
              Nền tảng học trực tuyến hàng đầu với hàng nghìn khóa học chất lượng cao.
              Học mọi lúc, mọi nơi với các chuyên gia hàng đầu trong ngành.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: '#3b5998' }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: '#1da1f2' }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: '#e4405f' }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: '#ff0000' }}>
                <YouTube />
              </IconButton>
              <IconButton sx={{ color: '#0077b5' }}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ justifyContent: 'space-between' }}>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Danh mục
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Lập trình
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Thiết kế
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Marketing
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Kinh doanh
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Nhiếp ảnh
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Hỗ trợ
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Trung tâm trợ giúp
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Liên hệ
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                FAQ
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Điều khoản
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Chính sách
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Về chúng tôi
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Giới thiệu
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Tuyển dụng
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Đối tác
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Blog
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
                Tin tức
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Liên hệ
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email fontSize="small" />
                <Typography variant="body2">
                  info@eduplatform.vn
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone fontSize="small" />
                <Typography variant="body2">
                  +84 123 456 789
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn fontSize="small" />
                <Typography variant="body2">
                  Hà Nội, Việt Nam
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Vị trí của chúng tôi
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 200,
                borderRadius: 2,
                overflow: 'hidden',
                border: '2px solid #34495e'
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0967739935055!2d105.78121961540757!3d21.02880999383314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab86cece8e49%3A0xf780b59c79f8b5a7!2zSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1641234567890!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí EduPlatform"
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: '#34495e' }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2
          }}
        >
          <Typography variant="body2" sx={{ color: '#bdc3c7' }}>
            © 2024 EduPlatform. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
              Chính sách bảo mật
            </Link>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#3498db' } }}>
              Điều khoản sử dụng
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
