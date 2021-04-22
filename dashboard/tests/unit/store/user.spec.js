import userStore from '../../../src/hooks/userStore'
import {
  cleanCurrentUser,
  setApiKey,
  setCurrentUser
} from '../../../src/store/user'

jest.mock('axios')

describe('UserStore', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set current user', async () => {
    const store = userStore()
    setCurrentUser({ name: 'Ale' })
    expect(store.User.currentUser.name).toBe('Ale')
  })

  it('should set api_key on current user', async () => {
    const store = userStore()
    setApiKey('123')
    expect(store.User.currentUser.apiKey).toBe('123')
  })

  it('should clean current user', async () => {
    const store = userStore()
    setCurrentUser({ name: 'Ale' })
    expect(store.User.currentUser.name).toBe('Ale')

    cleanCurrentUser()
    expect(store.User.currentUser.name).toBeFalsy()
  })
})