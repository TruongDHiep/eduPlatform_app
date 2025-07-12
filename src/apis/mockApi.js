// Mock data for courses
export const mockCourses = [
  {
    id: 1,
    title: 'React và Redux Complete Guide 2024',
    description: 'Học React từ cơ bản đến nâng cao với Redux, React Router và các best practices mới nhất',
    category: 'Lập trình',
    level: 'Intermediate',
    price: 1299000,
    originalPrice: 1999000,
    rating: 4.8,
    reviews: 2543,
    students: 15420,
    duration: 2400, // minutes
    lessonsCount: 45,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop',
    instructor: {
      id: 1,
      name: 'Nguyễn Văn Anh',
      title: 'Senior Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    lessons: [
      { title: 'Giới thiệu về React', duration: 15 },
      { title: 'JSX và Components', duration: 30 },
      { title: 'State và Props', duration: 45 },
      { title: 'Event Handling', duration: 25 },
      { title: 'Conditional Rendering', duration: 20 }
    ]
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    description: 'Thiết kế giao diện người dùng chuyên nghiệp với Figma và Adobe XD',
    category: 'Thiết kế',
    level: 'Beginner',
    price: 899000,
    originalPrice: 1299000,
    rating: 4.6,
    reviews: 1834,
    students: 8750,
    duration: 1800,
    lessonsCount: 32,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    instructor: {
      id: 2,
      name: 'Trần Thị Bình',
      title: 'Senior UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1d0?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: 3,
    title: 'Digital Marketing Strategy 2024',
    description: 'Chiến lược marketing số toàn diện từ SEO, SEM đến Social Media Marketing',
    category: 'Marketing',
    level: 'Intermediate',
    price: 1599000,
    originalPrice: 2299000,
    rating: 4.9,
    reviews: 3421,
    students: 12890,
    duration: 3200,
    lessonsCount: 58,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
    instructor: {
      id: 3,
      name: 'Lê Văn Cường',
      title: 'Digital Marketing Manager',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: 4,
    title: 'Python cho Khoa học Dữ liệu',
    description: 'Học Python từ cơ bản và ứng dụng vào Data Science với Pandas, NumPy, Matplotlib',
    category: 'Lập trình',
    level: 'Beginner',
    price: 0,
    originalPrice: 0,
    rating: 4.7,
    reviews: 5672,
    students: 23450,
    duration: 2800,
    lessonsCount: 42,
    image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=500&h=300&fit=crop',
    instructor: {
      id: 4,
      name: 'Phạm Minh Tuấn',
      title: 'Data Scientist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: 5,
    title: 'Khởi nghiệp và Quản lý Startup',
    description: 'Hướng dẫn từ A-Z về khởi nghiệp, từ ý tưởng đến xây dựng sản phẩm và tìm kiếm đầu tư',
    category: 'Kinh doanh',
    level: 'Advanced',
    price: 2499000,
    originalPrice: 3499000,
    rating: 4.8,
    reviews: 1298,
    students: 5670,
    duration: 4200,
    lessonsCount: 67,
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop',
    instructor: {
      id: 5,
      name: 'Hoàng Thị Mai',
      title: 'Startup Founder & Business Coach',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: 6,
    title: 'Nhiếp ảnh Chân dung Chuyên nghiệp',
    description: 'Kỹ thuật chụp ảnh chân dung, sử dụng ánh sáng và hậu kỳ với Lightroom',
    category: 'Nhiếp ảnh',
    level: 'Intermediate',
    price: 1199000,
    originalPrice: 1799000,
    rating: 4.9,
    reviews: 892,
    students: 4320,
    duration: 2200,
    lessonsCount: 35,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=300&fit=crop',
    instructor: {
      id: 6,
      name: 'Vũ Đình Hòa',
      title: 'Professional Photographer',
      avatar: 'https://images.unsplash.com/photo-1507038732509-8b95585e3e0b?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: 7,
    title: 'Node.js và Express Backend Development',
    description: 'Xây dựng API và backend applications với Node.js, Express và MongoDB',
    category: 'Lập trình',
    level: 'Advanced',
    price: 1799000,
    originalPrice: 2499000,
    rating: 4.7,
    reviews: 2156,
    students: 9870,
    duration: 3600,
    lessonsCount: 52,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&h=300&fit=crop',
    instructor: {
      id: 7,
      name: 'Đỗ Văn Hùng',
      title: 'Full Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: 8,
    title: 'Adobe After Effects Motion Graphics',
    description: 'Tạo hiệu ứng motion graphics và animation chuyên nghiệp với After Effects',
    category: 'Thiết kế',
    level: 'Advanced',
    price: 1999000,
    originalPrice: 2899000,
    rating: 4.8,
    reviews: 1654,
    students: 6540,
    duration: 3800,
    lessonsCount: 48,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
    instructor: {
      id: 8,
      name: 'Ngô Thị Lan',
      title: 'Motion Graphics Designer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: 9,
    title: 'Content Marketing và Copywriting',
    description: 'Viết content hiệu quả, thu hút khách hàng và tăng conversion rate',
    category: 'Marketing',
    level: 'Beginner',
    price: 799000,
    originalPrice: 1199000,
    rating: 4.6,
    reviews: 2890,
    students: 11200,
    duration: 2000,
    lessonsCount: 38,
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=500&h=300&fit=crop',
    instructor: {
      id: 9,
      name: 'Bùi Minh Châu',
      title: 'Content Marketing Specialist',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: 10,
    title: 'Quản lý Tài chính Cá nhân',
    description: 'Học cách quản lý tiền bạc, đầu tư thông minh và lập kế hoạch tài chính dài hạn',
    category: 'Kinh doanh',
    level: 'Beginner',
    price: 0,
    originalPrice: 0,
    rating: 4.5,
    reviews: 4521,
    students: 18930,
    duration: 1600,
    lessonsCount: 28,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop',
    instructor: {
      id: 10,
      name: 'Nguyễn Thành Đạt',
      title: 'Financial Advisor',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: 11,
    title: 'Flutter Mobile App Development',
    description: 'Phát triển ứng dụng mobile đa nền tảng với Flutter và Dart',
    category: 'Lập trình',
    level: 'Intermediate',
    price: 1699000,
    originalPrice: 2199000,
    rating: 4.7,
    reviews: 1876,
    students: 7890,
    duration: 3400,
    lessonsCount: 55,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop',
    instructor: {
      id: 11,
      name: 'Trần Văn Dũng',
      title: 'Mobile App Developer',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: 12,
    title: 'Wedding Photography Masterclass',
    description: 'Kỹ thuật chụp ảnh cưới chuyên nghiệp, từ lập kế hoạch đến thực hiện',
    category: 'Nhiếp ảnh',
    level: 'Advanced',
    price: 2199000,
    originalPrice: 2999000,
    rating: 4.9,
    reviews: 654,
    students: 2340,
    duration: 2600,
    lessonsCount: 41,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=300&fit=crop',
    instructor: {
      id: 12,
      name: 'Lý Thị Hương',
      title: 'Wedding Photographer',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face'
    }
  }
]

// Mock API functions
export const getCourses = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredCourses = [...mockCourses]

      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filteredCourses = filteredCourses.filter(course =>
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          course.category.toLowerCase().includes(searchLower) ||
          course.instructor.name.toLowerCase().includes(searchLower)
        )
      }

      if (filters.category) {
        filteredCourses = filteredCourses.filter(course =>
          course.category === filters.category
        )
      }

      if (filters.level) {
        filteredCourses = filteredCourses.filter(course =>
          course.level === filters.level
        )
      }

      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange
        filteredCourses = filteredCourses.filter(course =>
          course.price >= minPrice && course.price <= maxPrice
        )
      }

      if (filters.minRating) {
        filteredCourses = filteredCourses.filter(course =>
          course.rating >= filters.minRating
        )
      }

      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'newest':
            filteredCourses.sort((a, b) => b.id - a.id)
            break
          case 'popular':
            filteredCourses.sort((a, b) => b.students - a.students)
            break
          case 'rating':
            filteredCourses.sort((a, b) => b.rating - a.rating)
            break
          case 'price-low':
            filteredCourses.sort((a, b) => a.price - b.price)
            break
          case 'price-high':
            filteredCourses.sort((a, b) => b.price - a.price)
            break
          default:
            break
        }
      }

      resolve({
        data: filteredCourses,
        total: filteredCourses.length
      })
    }, 500)
  })
}

export const getCourse = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const course = mockCourses.find(c => c.id === parseInt(id))
      if (course) {
        resolve({ data: course })
      } else {
        reject(new Error('Course not found'))
      }
    }, 300)
  })
}

export const searchCourses = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const searchLower = query.toLowerCase()
      const results = mockCourses.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower)
      )

      resolve(results)
    }, 300)
  })
}

export const getCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categories = [...new Set(mockCourses.map(course => course.category))]
      const categoriesWithCounts = categories.map(category => ({
        name: category,
        count: mockCourses.filter(course => course.category === category).length
      }))

      resolve(categoriesWithCounts)
    }, 200)
  })
}

export const getCourseSuggestionsByUserId = (userId = 1) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`) || localStorage.getItem('favorites') || '[]')
      const viewHistory = JSON.parse(localStorage.getItem(`viewHistory_${userId}`) || localStorage.getItem('viewHistory') || '[]')

      let suggestedCourses = []
      const categoryCount = {}

      if (favorites.length > 0 || viewHistory.length > 0) {
        const favoriteCourses = mockCourses.filter(course => favorites.includes(course.id))
        const historyCategories = viewHistory.map(item => item.category)
        const favoriteCategories = favoriteCourses.map(course => course.category)

        ;[...historyCategories, ...favoriteCategories].forEach(category => {
          categoryCount[category] = (categoryCount[category] || 0) + 1
        })

        const prioritizedCategories = Object.keys(categoryCount)
          .sort((a, b) => categoryCount[b] - categoryCount[a])

        const historyLevels = viewHistory.map(item => item.level)
        const favoriteLevels = favoriteCourses.map(course => course.level)
        const allLevels = [...new Set([...historyLevels, ...favoriteLevels])]

        const categorySuggestions = []

        const favoriteIds = favorites.map(id => parseInt(id))
        const historyIds = viewHistory.map(item => parseInt(item.id))

        for (const category of prioritizedCategories) {
          const categoryCoursesWithScore = mockCourses
            .filter(course => {
              const isAlreadyFavorite = favoriteIds.includes(course.id)
              const isInHistory = historyIds.includes(course.id)
              const isAlreadySuggested = categorySuggestions.some(suggested => suggested.id === course.id)

              return !isAlreadyFavorite && !isInHistory && !isAlreadySuggested && course.category === category
            })
            .map(course => ({
              ...course,
              score: course.rating * 0.7 + (course.students / 1000) * 0.3
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 2)

          categorySuggestions.push(...categoryCoursesWithScore)
        }

        if (categorySuggestions.length < 3) {
          const levelSuggestions = mockCourses
            .filter(course => {
              const isAlreadyFavorite = favoriteIds.includes(course.id)
              const isInHistory = historyIds.includes(course.id)
              const isAlreadySuggested = categorySuggestions.some(suggested => suggested.id === course.id)
              const matchesLevel = allLevels.includes(course.level)

              return !isAlreadyFavorite && !isInHistory && !isAlreadySuggested && matchesLevel
            })
            .map(course => ({
              ...course,
              score: course.rating * 0.6 + (course.students / 1000) * 0.4
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3 - categorySuggestions.length)

          categorySuggestions.push(...levelSuggestions)
        }

        if (categorySuggestions.length < 3) {
          const remainingSuggestions = mockCourses
            .filter(course => {
              const isAlreadyFavorite = favoriteIds.includes(course.id)
              const isInHistory = historyIds.includes(course.id)
              const isAlreadySuggested = categorySuggestions.some(suggested => suggested.id === course.id)

              return !isAlreadyFavorite && !isInHistory && !isAlreadySuggested
            })
            .map(course => ({
              ...course,
              score: course.rating * 0.5 + (course.students / 1000) * 0.5
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3 - categorySuggestions.length)

          categorySuggestions.push(...remainingSuggestions)
        }

        suggestedCourses = categorySuggestions.slice(0, 3)
      } else {
        suggestedCourses = [...mockCourses]
          .sort((a, b) => b.students - a.students)
          .slice(0, 3)
      }

      resolve({
        status: 'success',
        data: {
          userId: userId,
          suggestions: suggestedCourses,
          total: suggestedCourses.length,
          basedOn: favorites.length > 0 || viewHistory.length > 0 ? 'preferences' : 'popularity',
          topCategories: favorites.length > 0 || viewHistory.length > 0 ?
            Object.keys(categoryCount).slice(0, 2) : [],
          timestamp: new Date().toISOString()
        }
      })
    }, 600)
  })
}
