<template>
  <div id="add">
      <form action="post"  @submit.prevent="newList()">
          <input type="text" name="title" v-model="title" placeholder="Title">
          <input type="text" name="description" v-model="description" placeholder="Title">
          <select type="text" name="priority" v-model="priority" placeholder="Title">
              <option value="high">High</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
          </select>
          <input type="date" name="dueDate" v-model="dueDate" placeholder="Title">
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
        title:'',
        description:'',
        completed:false,
        priority:'',
        dueDate:''

    }
},
methods: {
    ...mapActions(['addTodo']),
    newList(){
        this.addTodo(this.title)
        this.addTodo(this.description)
        this.addTodo(this.priority)
        this.addTodo(this.dueDate)
    }
}
}
</script>

<style>

</style>