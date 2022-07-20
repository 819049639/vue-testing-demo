/*
 * @Author: wangqiang@feewee.cn
 * @Date: 2022-07-19 15:04:01
 * @LastEditors: wangqiang@feewee.cn
 * @LastEditTime: 2022-07-20 09:29:19
 */
import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Footer from '../Footer.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({
  linkActiveClass: 'selected'
})

describe('Footer.vue', () => {
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null

  beforeEach(async () => {
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: true },
      { id: 3, text: 'sleep', done: false }
    ]
    wrapper = mount(Footer, { propsData: { todos }, localVue, router })
  })

  test('Done todos count', async () => {
    const count = wrapper.vm.todos.filter((t) => !t.done).length
    const countEl = wrapper.find('[data-testid="done-todos-count"]')
    expect(Number.parseInt(countEl.text())).toBe(count)
  })

  test('clear completed show', async () => {
    const btn = wrapper.find('[data-testid="clear-completed"]')
    expect(btn.exists()).toBeTruthy()

    // 此处修改的是传入 Footer 的 props 数据，不允许修改，所有这样修改不会生效
    wrapper.vm.todos.forEach((t) => {
      t.done = false
    })

    // 清除所有完成的任务，判断 button 不存在
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: false },
      { id: 3, text: 'sleep', done: false }
    ]
    wrapper = mount(Footer, { propsData: { todos }, localVue, router })

    await Vue.nextTick()

    expect(
      wrapper.find('[data-testid="clear-completed"]').exists()
    ).toBeFalsy()
  })

  test('clear completed', async () => {
    const btn = wrapper.find('[data-testid="clear-completed"]')
    await btn.trigger('click')
    expect(wrapper.emitted()['clear-completed']).toBeTruthy()
  })

  test('Router Linke Active Class', async () => {
    const links = wrapper.findAllComponents({ name: 'RouterLink' })
    router.push('/active')
    await localVue.nextTick()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link.vm.to === '/active') {
        expect(link.classes('selected')).toBeTruthy()
      } else {
        expect(link.classes('selected')).toBeFalsy()
      }
    }
    router.push('/')
    await localVue.nextTick()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link.vm.to === '/') {
        expect(link.classes('selected')).toBeTruthy()
      } else {
        expect(link.classes('selected')).toBeFalsy()
      }
    }
    router.push('/completed')
    await localVue.nextTick()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link.vm.to === '/completed') {
        expect(link.classes('selected')).toBeTruthy()
      } else {
        expect(link.classes('selected')).toBeFalsy()
      }
    }
  })

  test('snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
