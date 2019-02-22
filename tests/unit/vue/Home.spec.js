import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '../../../src/vue/Home'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Home.vue', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      info: () => ({ alias: 'alice' })
    }

    store = new Vuex.Store({
      getters
    })
  })

  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Home, { store, localVue })
    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe(getters.info().alias)
  })
})
