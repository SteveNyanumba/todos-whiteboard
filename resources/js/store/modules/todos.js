import axios from 'axios'

const state ={
    todos:[]
}

const getters = {
    allTodos: (state)=>state.todos
}

const actions = {
    async fetchTodos({commit}){
        const response = await axios.get('api/v1/todos')
        commit('setTodos', response.data)
        console.log(response.data)
    },
    async addTodo({commit},title){
        const response = await axios.post('api/v1/todos',{title,description,priority,dueDate,completed: false})

        commit('newTodo', response.data)
    },
    async deleteTodo({commit}, id){
        await axios.delete(`api/v1/todos/delete/${id}`)

        commit('removeTodo', id)
    },
    async markCompleted({commit}, id){
        await axios.post(`https://jsonplaceholder.typicode.com/todos/${id}`,{completed:true})

        commit('completeTask',id)
    }

}

const mutations = {
    setTodos:(state,todos)=>{
        state.todos = todos
    },
    newTodo: (state,todo)=>{
        state.todos.unshift(todo)
    },
    removeTodo:(state,id)=>{
        state.todos = state.todos.filter(todo =>todo.id !==id)
    },
    completeTask:(state,id)=>{
        if(state.todo.id === id){
            state.todos.completed = true
        }
    }

}


export default{
    state,
    getters,
    actions,
    mutations
}