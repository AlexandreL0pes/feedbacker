import Home from '../../../../src/views/Home'
import { shallowMount } from '@vue/test-utils'
import { routes } from '../../../../src/router'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

describe('<Home />', () => {
  it('should render home correctly', async () => {
    router.push('/')
    await router.isReady()
    // Creates a component with props
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})