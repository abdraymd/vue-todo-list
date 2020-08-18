export default {
	state: {
		todos: []
	},
	getters: {
		allTodos(state) {
			return state.todos
		},
		todosCount(state) {
			return state.todos.length
		}
	},
	actions: {
		async fetchTodos(context) {
			const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
			const todos = await res.json()

			context.commit('updateTodos', todos)
		}
	},
	mutations: {
		updateTodos(state, todos) {
			state.todos = todos
		},
		addTodo(state, newTodo) {
			state.todos.unshift(newTodo)
		},
		deleteTodo(state, todoId) {
			state.todos = state.todos.filter(todo => todo.id !== todoId)
		}
	}
}
