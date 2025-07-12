import { Box, Grid, Skeleton } from '@mui/material'

function CourseCardSkeleton({ count = 3 }) {
  return (
    <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
      {[...Array(count)].map((_, index) => (
        <Grid item key={index}>
          <Box sx={{ width: 350, height: 450 }}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 2 }} />
            <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton variant="text" width={80} height={25} />
              <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default CourseCardSkeleton
