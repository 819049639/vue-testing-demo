<!--
 * @Author: wangqiang@feewee.cn
 * @Date: 2022-07-19 14:35:25
 * @LastEditors: wangqiang@feewee.cn
 * @LastEditTime: 2022-07-19 18:01:41
-->
<template>
  <section class="todoapp">
    <Header @new-todo="handleNewTodo" />
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input
        data-testid="toggle-all"
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="toggleAll"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <!-- <li class="completed">
          <div class="view">
            <input class="toggle" type="checkbox" checked />
            <label>Taste JavaScript</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="Create a TodoMVC template" />
        </li> -->
        <Item
          v-for="todo in filterTodos"
          :key="todo.id"
          :todo="todo"
          @change_done="changeDone"
          @delete-todo="deleteTodo"
          @edit-todo="editTodo"
        />
      </ul>
    </section>
    <!-- This footer should be hidden by default and shown when there are todos -->
    <Footer :todos="todos" @clear-completed="clearCompleted" />
  </section>
</template>
<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import Item from './Item.vue'

export default {
  name: 'TodoApp',
  components: {
    Header,
    Footer,
    Item
  },
  data () {
    return {
      todos: [
        { id: 1, text: 'eat', done: false },
        { id: 2, text: 'play', done: true },
        { id: 3, text: 'sleep', done: false }
      ]
    }
  },
  computed: {
    toggleAll: {
      get () {
        // 设置 toggleAll 的选中状态
        return this.todos.length && this.todos.every((todo) => todo.done)
      },
      set (checked) {
        this.todos.forEach((todo) => {
          todo.done = checked
        })
      }
    },
    filterTodos () {
      // 获取路由路径
      const path = this.$route.path
      // 根据路由路径过滤数据
      // / 返回所有数据
      // /active 所有未完成任务
      // /completed 所有完成任务
      switch (path) {
        case '/':
          return this.todos
        case '/active':
          return this.todos.filter((t) => !t.done)
        case '/completed':
          return this.todos.filter((t) => t.done)
        default:
          return this.todos
      }
    }
  },
  methods: {
    handleNewTodo (text) {
      const lastTodo = this.todos[this.todos.length - 1]
      this.todos.push({
        id: lastTodo ? lastTodo.id + 1 : 1,
        text,
        done: false
      })
    },
    changeDone (data) {
      this.todos = this.todos.map((todo) => ({
        ...todo,
        done: data.id === todo.id ? data.done : todo.done
      }))
    },
    deleteTodo (id) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    },
    editTodo (data) {
      if (!data.text) {
        const index = this.todos.findIndex((todo) => todo.id === data.id)
        if (index !== -1) {
          this.todos.splice(index, 1)
        }
      } else {
        this.todos = this.todos.map((todo) => ({
          ...todo,
          text: data.id === todo.id ? data.text : todo.text
        }))
      }
    },
    clearCompleted () {
      this.todos = this.todos.filter((todo) => !todo.done)
    }
  }
}
</script>
