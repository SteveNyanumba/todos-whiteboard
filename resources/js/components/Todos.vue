<template>
  <div class="container">
     <div class="todo" v-for="todo in allTodos" :key="todo.id">
          <h1>{{ todo.title }}</h1>
          <p class="subheading">{{ todo.description }}</p>
          <button class="btn btn-danger"><i class="fab fa-trash fa-lg"></i></button>
          <button class="btn btn-danger"><i class="fab fa-pencil-ruler fa-lg"></i></button>
          <button class="btn btn-danger"><i class="fab fa-check-circle fa-lg"></i></button>
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