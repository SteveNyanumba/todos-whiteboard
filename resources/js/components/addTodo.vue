<template>
  <div id="add">
      <form action="post"  @submit.prevent="newList()">
          <input type="text" name="title" v-model="title" placeholder="Title">
          <button type="submit">Add Todo</button>
      </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
name:"AddTodo",
data(){
    return{
        title:''
    }
},
methods: {
    ...mapActions(['addTodo']),
    newList(){
        this.addTodo(this.title)
    }
}
}
</script>

<style>

</style>