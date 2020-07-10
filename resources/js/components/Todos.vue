<template>
  <div class="container">
     <div class="todo" v-for="todo in allTodos" :key="todo.id">
          <h1>{{ todo.title }}</h1>
          <p><a href="#" @click="markCompleted(todo.id)">Mark as Complete</a></p>
          <p><a href="#" @click="deleteTodo(todo.id)">delete</a></p>
     </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
name:'Todos',
methods:{
    ...mapActions(['fetchTodos','deleteTodo', 'markCompleted'])
},
computed: mapGetters(['allTodos']), 
created(){
    this.fetchTodos()
}
}
</script>

<style>

</style>