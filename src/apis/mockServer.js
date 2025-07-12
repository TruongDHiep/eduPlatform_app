
import { getCourseSuggestionsByUserId } from './mockApi.js'

export const fetchCourseSuggestions = async (userId = 1) => {
  try {
    const response = await getCourseSuggestionsByUserId(userId)

    return {
      status: 200,
      statusText: 'OK',
      data: response.data,
      headers: {
        'content-type': 'application/json',
        'x-api-version': '1.0',
        'x-response-time': '600ms'
      }
    }
  } catch {
    return {
      status: 500,
      statusText: 'Internal Server Error',
      error: {
        message: 'Failed to fetch course suggestions',
        code: 'SUGGESTIONS_ERROR'
      }
    }
  }
}

export const buildSuggestionsUrl = (userId = 1) => {
  return `/api/suggestions?userId=${userId}`
}
