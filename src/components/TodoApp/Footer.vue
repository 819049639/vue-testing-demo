<!--
 * @Author: wangqiang@feewee.cn
 * @Date: 2022-07-19 14:46:43
 * @LastEditors: wangqiang@feewee.cn
 * @LastEditTime: 2022-07-20 09:14:14
-->
<template>
  <footer class="footer">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"
      ><strong data-testid="done-todos-count">{{ doneTodosCount }}</strong> item
      left</span
    >
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <!-- <a :class="{ selected: $route.path === '/' }" href="#/">All</a> -->
        <router-link exact to="/" >All</router-link>
      </li>
      <li>
        <!-- <a :class="{ selected: $route.path === '/active' }" href="#/active">Active</a> -->
        <router-link to="/active" >Active</router-link>
      </li>
      <li>
        <!-- <a
          :class="{ selected: $route.path === '/completed' }"
          href="#/completed"
          >Completed</a
        > -->
        <router-link to="/completed" >Completed</router-link>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button
      v-if="isClearCompletedShow"
      data-testid="clear-completed"
      class="clear-completed"
      @click="$emit('clear-completed')"
    >
      Clear completed
    </button>
  </footer>
</template>
<script>
export default {
  name: 'TodoAppFooter',
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  computed: {
    doneTodosCount () {
      return this.todos.filter((t) => !t.done).length
    },
    isClearCompletedShow () {
      return this.todos.find((t) => t.done)
    }
  }
}
</script>
