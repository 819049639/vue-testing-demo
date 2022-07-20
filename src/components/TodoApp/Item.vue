<!--
 * @Author: wangqiang@feewee.cn
 * @Date: 2022-07-19 14:47:45
 * @LastEditors: wangqiang@feewee.cn
 * @LastEditTime: 2022-07-19 16:53:32
-->
<template>
  <li
    data-testid="todo-item"
    :class="{ completed: todo.done, editing: isEditing }"
  >
    <div class="view">
      <input
        :checked="todo.done"
        @click="
          $emit('change_done', {
            id: todo.id,
            done: $event.target.checked,
          })
        "
        data-testid="todo-done"
        class="toggle"
        type="checkbox"
      />
      <label data-testid="todo-text" @dblclick="isEditing = true">{{
        todo.text
      }}</label>
      <button
        data-testid="todo-delete"
        class="destroy"
        @click="$emit('delete-todo', todo.id)"
      ></button>
    </div>
    <input
      v-focus="isEditing"
      data-testid="todo-edit"
      class="edit"
      :value="todo.text"
      @blur="isEditing = false"
      @keyup.enter="editTodo"
      @keyup.esc="isEditing = false"
    />
  </li>
</template>
<script>
export default {
  name: 'TodoAppItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  directives: {
    focus (element, binding) {
      if (binding.value) {
        element.focus()
      }
    }
  },
  data () {
    return {
      isEditing: false
    }
  },
  methods: {
    editTodo (e) {
      this.$emit('edit-todo', { id: this.todo.id, text: e.target.value.trim() })
      this.isEditing = false
    }
  }
}
</script>
