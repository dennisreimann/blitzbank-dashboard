import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '../../../src/vue/pages/Home'
import createStore from '../../../src/store'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Home.vue', () => {
  let store

  beforeEach(() => {
    store = createStore({
      lnd: {
        state: {
          info: {
            alias: 'alice'
          }
        }
      }
    })
  })

  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Home, { store, localVue })
    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe('alice')
  })
})
