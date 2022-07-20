/*
 * @Author: wangqiang@feewee.cn
 * @Date: 2022-07-19 14:50:17
 * @LastEditors: wangqiang@feewee.cn
 * @LastEditTime: 2022-07-20 09:25:11
 */
import { shallowMount } from '@vue/test-utils'
import Header from '../Header.vue'

describe('Header.vue', () => {
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null

  beforeEach(async () => {
    wrapper = shallowMount(Header)
  })

  test('New Todo', async () => {
    const input = wrapper.find('input[data-testid="new-todo"]')

    const text = 'play'
    await input.setValue(text)

    await input.trigger('keyup.enter')
    expect(wrapper.emitted()['new-todo']).toBeTruthy()
    expect(wrapper.emitted()['new-todo'][0][0]).toBe(text)
    expect(input.element.value).toBe('')
  })

  test('snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
