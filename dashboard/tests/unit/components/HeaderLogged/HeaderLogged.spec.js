import { shallowMount } from '@vue/test-utils'

import HeaderLogged from '../../../../src/components/HeaderLogged'
import { routes } from '../../../../src/router'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const mockStore = {
  currentUser: {}
}

jest.mock('../../../../src/hooks/userStore', () => {
  return () => {
    return mockStore
  }
})

describe('<HeaderLogged />', () => {
  it('should render header logged correctly', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render 3 dots when there\'s not user logged', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const buttonLogout = wrapper.find('#logout-button')

    expect(buttonLogout.text()).toBe('...')
  })

  it.skip('should render user name when user is logged', async () => {
    router.push('/')
    await router.isReady()
    mockStore.currentUser.name = 'Alexandre'
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const buttonLogout = wrapper.find('#logout-button')

    expect(buttonLogout.text()).toBe('Alexandre ()')
  })
})