import React from 'react'
import { Box, Typography, Button } from '@mui/material'

function EmptyState({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
  buttonProps = {}
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 400,
        textAlign: 'center',
        p: 4
      }}
    >
      {icon && React.cloneElement(icon, {
        sx: { fontSize: 80, color: 'grey.400', mb: 2, ...icon.props?.sx }
      })}
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
        {description}
      </Typography>
      {buttonText && onButtonClick && (
        <Button
          variant="contained"
          onClick={onButtonClick}
          {...buttonProps}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  )
}

export default EmptyState
