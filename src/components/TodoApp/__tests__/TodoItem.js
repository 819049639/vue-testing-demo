/*
 * @Author: wangqiang@feewee.cn
 * @Date: 2022-07-19 15:04:01
 * @LastEditors: wangqiang@feewee.cn
 * @LastEditTime: 2022-07-20 09:36:01
 */
import { shallowMount } from '@vue/test-utils'
import Item from '../Item.vue'

describe('TodoItem.vue', () => {
  const todo = {
    id: 1,
    text: 'play',
    done: true
  }
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null

  beforeEach(() => {
    wrapper = shallowMount(Item, { propsData: { todo } })
  })

  test('text', async () => {
    expect(wrapper.find('[data-testid="todo-text"]').text()).toBe(todo.text)
  })

  test('done', async () => {
    const done = wrapper.find('[data-testid="todo-done"]')
    const todoItem = wrapper.find('[data-testid="todo-item"]')
    expect(done.element.checked).toBeTruthy()
    expect(todoItem.classes()).toContain('completed')

    await done.setChecked(false)
    // expect(todoItem.classes('completed')).toBeFalsy()
  })

  test('delete', async () => {
    const deleteBtn = wrapper.find('button[data-testid="todo-delete"]')
    await deleteBtn.trigger('click')
    expect(wrapper.emitted()['delete-todo']).toBeTruthy()
    expect(wrapper.emitted()['delete-todo'][0][0]).toBe(wrapper.vm.todo.id)
  })

  test('edit style', async () => {
    const label = wrapper.find('[data-testid="todo-text"]')
    const todoItem = wrapper.find('[data-testid="todo-item"]')
    await label.trigger('dbclick')
    // expect(todoItem.classes('editing')).toBeTruthy()

    await label.trigger('blur')
    expect(todoItem.classes('editing')).toBeFalsy()
  })

  test('edit save', async () => {
    const label = wrapper.find('[data-testid="todo-text"]')
    // const todoItem = wrapper.find('[data-testid="todo-item"]')
    const todoEdit = wrapper.find('[data-testid="todo-edit"]')
    await label.trigger('dbclick')

    const text = 'hello'

    // 编辑文本框中的内容展示
    expect(todoEdit.element.value).toBe(wrapper.vm.todo.text)

    // 修改文本框的值
    await todoEdit.setValue(text)

    // 处罚回车保存事件
    await todoEdit.trigger('keyup.enter')

    // 断言数据被修改了
    // expect(wrapper.vm.todo.text).toBe(text)
    expect(wrapper.emitted()['edit-todo']).toBeTruthy()
    expect(wrapper.emitted()['edit-todo'][0][0]).toEqual({
      id: wrapper.vm.todo.id,
      text
    })
    expect(wrapper.vm.isEditing).toBeFalsy()
  })

  test('edit cancel', async () => {
    const label = wrapper.find('[data-testid="todo-text"]')
    const todoEdit = wrapper.find('[data-testid="todo-edit"]')

    await label.trigger('dbclick')

    const text = wrapper.vm.todo.text
    await todoEdit.setValue('xfs')
    // 触发取消事件
    await todoEdit.trigger('keyup.esc')

    // 验证字段没有被修改
    expect(wrapper.vm.todo.text).toBe(text)
    // 验证编辑状态被取消
    expect(wrapper.vm.isEditing).toBeFalsy()
  })

  test('edit delete', async () => {})

  test('snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
