/*
 * @Author: wangqiang@feewee.cn
 * @Date: 2022-07-19 11:43:47
 * @LastEditors: wangqiang@feewee.cn
 * @LastEditTime: 2022-07-20 09:35:24
 */
import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

test('HelloWorld.vue', () => {
  // 挂载组件
  // 浅渲染
  const shallowMountWrapper = shallowMount(HelloWorld, {
    propsData: { msg: 'helloworld' }
  })
  // 深渲染
  const mountWrapper = mount(HelloWorld, {
    propsData: { msg: 'helloworld' }
  })
  // console.log(shallowMountWrapper.html())
  // console.log(mountWrapper.html())
})

test('HelloWorld.vue', async () => {
  // 挂载组件
  const wrapper = shallowMount(HelloWorld, {
    propsData: { msg: 'helloworld' }
  })
  // console.log(wrapper.element.innerHTML)
  // console.log(wrapper.html())

  const button = wrapper.find('button')
  const countText = wrapper.find('[data-testid="count-text"]')
  const btn2 = wrapper.find('[data-testid="btn2"]')

  expect(countText.text()).toBe('0')
  // 触发事件
  await button.trigger('click')

  expect(wrapper.vm.count).toBe(1)
  expect(countText.text()).toBe('1')

  await btn2.trigger('click')

  expect(wrapper.emitted().hello).toBeTruthy()
  expect(wrapper.emitted().hello[0][0]).toBe(123)
})

// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg },
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });
