<!--
 * @Author: wangqiang@feewee.cn
 * @Date: 2022-07-19 14:44:04
 * @LastEditors: wangqiang@feewee.cn
 * @LastEditTime: 2022-07-19 14:59:21
-->
<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      data-testid="new-todo"
      placeholder="What needs to be done?"
      autofocus
      @keyup.enter="handleNewTodo"
    />
  </header>
</template>
<script>
export default {
  name: 'TodoAppHeader',
  methods: {
    handleNewTodo (e) {
      const value = e.target.value.trim()
      if (!value) {
        return
      }
      this.$emit('new-todo', value)
      e.target.value = ''
    }
  }
}
</script>
