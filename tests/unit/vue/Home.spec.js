import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '../../../src/vue/pages/Home'
import store from '../../../src/vue/store'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Home.vue', () => {
  beforeEach(() => {
    store.commit('lnd/setInfo', {
      alias: 'alice'
    })
  })

  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Home, { store, localVue })
    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe('alice')
  })
})
