/*
 * @Author: wangqiang@feewee.cn
 * @Date: 2022-07-19 15:04:01
 * @LastEditors: wangqiang@feewee.cn
 * @LastEditTime: 2022-07-20 09:29:27
 */
import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import TodoApp from '../index.vue'
import Item from '../Item.vue'

describe('TodoApp.vue', () => {
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null

  beforeEach(async () => {
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: true },
      { id: 3, text: 'sleep', done: false }
    ]
    const $route = {
      path: '/'
    }
    wrapper = shallowMount(TodoApp, {
      mocks: {
        $route
      }
    })
    await wrapper.setData({
      todos
    })
  })
  test('New Todo', async () => {
    const text = 'play'
    wrapper.vm.handleNewTodo(text)
    const todo = wrapper.vm.todos.find((t) => t.text === text)
    expect(todo).toBeTruthy()
  })

  test('Todo List', async () => {
    expect(wrapper.findAllComponents(Item).length).toBe(
      wrapper.vm.todos.length
    )
  })

  test('Todo Delete', async () => {
    await wrapper.vm.deleteTodo(1)
    expect(wrapper.vm.todos.length).toBe(2)
    expect(wrapper.findAllComponents(Item).length).toBe(2)
  })

  test('Todo Delete', async () => {
    await wrapper.vm.deleteTodo(13)
    expect(wrapper.vm.todos.length).toBe(3)
    expect(wrapper.findAllComponents(Item).length).toBe(3)
  })

  test('Todo Edit', async () => {
    const todo = { id: 1, text: 'hello' }
    await wrapper.vm.editTodo(todo)
    expect(wrapper.vm.todos[0].text).toBe(todo.text)

    todo.text = ''
    await wrapper.vm.editTodo(todo)
    expect(wrapper.vm.todos.find((t) => t.id === todo.id)).toBeFalsy()
  })

  test('toggle all', async () => {
    const toggleAll = wrapper.find('input[data-testid="toggle-all"]')
    await toggleAll.setChecked(true)
    // 断言所有的子任务都被选中
    wrapper.vm.todos.forEach((todo) => {
      expect(todo.done).toBeTruthy()
    })

    // 取消全选状态
    await toggleAll.setChecked(false)
    // 断言所有的子任务都未被选中
    wrapper.vm.todos.forEach((todo) => {
      expect(todo.done).toBeFalsy()
    })
  })

  test('toggle all state', async () => {
    const toggleAll = wrapper.find('input[data-testid="toggle-all"]')
    // 让所有任务都变成完成状态
    wrapper.vm.todos.forEach((todo) => {
      todo.done = true
    })
    await Vue.nextTick()
    // 断言 toggleAll 也被选中了
    expect(toggleAll.element.checked).toBeTruthy()

    // 取消某个任务未完成，断言 toggleAll 未选中
    wrapper.vm.todos[0].done = false
    await Vue.nextTick()
    expect(toggleAll.element.checked).toBeFalsy()
  })

  test('clear all completed', async () => {
    wrapper.vm.clearCompleted()
    await Vue.nextTick()
    expect(wrapper.vm.todos).toEqual([
      { id: 1, text: 'eat', done: false },
      { id: 3, text: 'sleep', done: false }
    ])
  })

  test('Filter Todos', async () => {
    // 将路由导航到 /
    wrapper.vm.$route.path = '/'
    await Vue.nextTick()
    // 断言 filterTodos 是全部任务列表
    expect(wrapper.vm.filterTodos).toEqual([
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: true },
      { id: 3, text: 'sleep', done: false }
    ])

    // 将路由导航到 /active
    wrapper.vm.$route.path = '/active'
    await Vue.nextTick()
    // 断言 filterTodos 是未完成列表
    expect(wrapper.vm.filterTodos).toEqual([
      { id: 1, text: 'eat', done: false },
      { id: 3, text: 'sleep', done: false }
    ])

    // 将路由导航到 /completed
    wrapper.vm.$route.path = '/completed'
    await Vue.nextTick()
    // 断言 filterTodos 是已完成列表
    expect(wrapper.vm.filterTodos).toEqual([
      { id: 2, text: 'play', done: true }
    ])
  })

  test('snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
