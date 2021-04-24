import mockAxios from 'axios'
import FeedbacksService from '../../../src/services/feedbacks'
const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhYjc1OWY4LWYyMzgtNGZmOS1hZTkxLWVlMTU1ODk4MjMyOSIsImVtYWlsIjoiZmxvcGVzLmFsZXhhbmRyZUBnbWFpbC5jb20iLCJuYW1lIjoiQWxleGFuZHJlIExvcGVzIiwiaWF0IjoxNjE5Mjk0MzQxfQ.hJAWhJlRYUi3IZSmWSpdq6QZ8tVHcFu3qXyFucleG50'
const INVALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhYjc1OWY4LWYyMzgtNGZmOS1hZTkxLWVlMTU1ODk4MjMyOSIsImVtYWlsIjoiZmxvcGVzLmFsZXhhbmRyZUBnbWFpbC5jb20iLCJuYW1lIjoiQWxleGFuZHJlIExvcGVzIiwiaWF0IjoxNjE5Mjk0MzQxfQ.hJAWhJlRYUi3IZSmWSpdq6QZ8tVHcFu3qXyFucleG52'

function mockToken (token) {
  mockAxios.interceptors.request.use(config => {
    config.headers.common.Authorization = `Bearer ${token}`
    return config
  })
}

jest.mock('axios')

describe('FeedbacksService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all feedbacks from an user', async () => {
    const feedbacks = {
      results: [
        {
          text: 'Podia ter um botão de solicitar demo 1',
          fingerprint: '490135491',
          id: 'eab759f8-f238-4ff9-ae91-ee1558982329',
          apiKey: 'fcd5015c-10d3-4e9c-b395-ec7ed8850165',
          type: 'IDEA',
          device: 'Chrome 85.0, macOS 10.14',
          page: 'https://feedbacker.com/pricing',
          createdAt: 1608681600000
        },
        {
          text: 'Muito bom!',
          fingerprint: '490135491',
          id: 'eab759f8-f238-4ff9-ae91-ee1558982329',
          apiKey: 'fcd5015c-10d3-4e9c-b395-ec7ed8850165',
          type: 'OTHER',
          device: 'Chrome 85.0, macOS 10.14',
          page: 'https://feedbacker.com/pricing',
          createdAt: 1605225600000
        },
      ],
      pagination: {
        offset: 0,
        limit: 5,
        total: 7
      }
    }

    mockToken(VALID_TOKEN)

    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: feedbacks })
    })

    const response = await FeedbacksService(mockAxios).getAll()
    expect(response.data).toHaveProperty('results')
    expect(response.data).toHaveProperty('pagination')
    expect(response.data.results.length).toBe(2)
  })

  it('should returns all categories summary', async () => {
    mockToken(VALID_TOKEN)

    const summary = {
      all: 7,
      issue: 3,
      idea: 3,
      other: 1
    }
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: summary })
    })

    const response = await FeedbacksService(mockAxios).getSummary()

    expect(response.data).toHaveProperty('all')
    expect(response.data).toHaveProperty('issue')
    expect(response.data).toHaveProperty('idea')
    expect(response.data).toHaveProperty('other')
  })
})