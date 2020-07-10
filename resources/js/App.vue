<template>
  <div id="app">
    <div class="container">
      <AddTodo/>
      <todos/>
    </div>
  </div>
</template>

<script>
import Todos from './components/Todos.vue'
import AddTodo from './components/addTodo'

export default {
  name: 'App',
  components: {
    Todos,
    AddTodo
  }
}
</script>
