import React from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import { Refresh, Home } from '@mui/icons-material'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {

    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  handleRefresh = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            backgroundColor: 'background.default'
          }}
        >
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              maxWidth: 600,
              width: '100%'
            }}
          >
            {/* Error Icon */}
            <Box sx={{ fontSize: '4rem', mb: 3 }}>😵</Box>

            {/* Error Message */}
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'error.main' }}>
              Oops! Có lỗi xảy ra
            </Typography>

            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Đã có lỗi không mong muốn xảy ra. Vui lòng thử lại sau hoặc liên hệ với chúng tôi nếu vấn đề vẫn tiếp tục.
            </Typography>

            {/* Error Details (in development) */}
            {import.meta.env.DEV && this.state.error && (
              <Box
                sx={{
                  mb: 4,
                  p: 2,
                  backgroundColor: 'grey.100',
                  borderRadius: 1,
                  textAlign: 'left',
                  maxHeight: 200,
                  overflow: 'auto'
                }}
              >
                <Typography variant="caption" color="error">
                  <strong>Error:</strong> {this.state.error.toString()}
                </Typography>
                <br />
                <Typography variant="caption" color="error">
                  <strong>Stack:</strong>
                  <pre style={{ fontSize: '0.7rem', whiteSpace: 'pre-wrap' }}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                </Typography>
              </Box>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={this.handleRefresh}
                size="large"
              >
                Tải lại trang
              </Button>

              <Button
                variant="outlined"
                startIcon={<Home />}
                onClick={this.handleGoHome}
                size="large"
              >
                Về trang chủ
              </Button>
            </Box>

            {/* Contact Info */}
            <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
              Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ: support@eduPlatform.com
            </Typography>
          </Paper>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
