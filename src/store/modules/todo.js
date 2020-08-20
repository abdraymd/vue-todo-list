import { db } from '../../firebase'
import router from '../../router'

export default {
	state: {
		todos: JSON.parse(sessionStorage.getItem('todos')) || [],
		loading: false
	},
	getters: {
		getAllTodos(state) {
			return state.todos
		},
		getTodoById(state) {
			return todoId => {
				return state.todos.find(todo => todo.id === todoId)
			}
		},
		isLoading(state) {
			return state.loading
		}
	},
	actions: {
		fetchTodos(context) {
			return new Promise((resolve, reject) => {
				context.commit('setLoading', true)

				db.collection('todos')
					.orderBy('createdAt', 'desc')
					.get()
					.then(snapshot => {
						let todos = []
						snapshot.forEach(doc => {
							let todo = {
								id: doc.id,
								title: doc.data().title,
								completed: doc.data().completed,
								createdAt: doc.data().createdAt.toDate()
							}

							todos.push(todo)
						})

						context.commit('updateTodos', todos)
						context.commit('setLoading', false)

						resolve()
					})
			})
		},
		createTodoInDb(context, title) {
			return new Promise((resolve, reject) => {
				const newTodo = {
					title: title,
					completed: false,
					createdAt: new Date()
				}

				db.collection('todos')
					.add(newTodo)
					.then(function(ref) {
						context.commit('addTodo', {
							id: ref.id,
							...newTodo
						})

						resolve()
					})
			})
		},
		deleteTodoFromDb(context, todoId) {
			db.collection('todos')
				.doc(todoId)
				.delete()
				.then(function() {
					context.commit('deleteTodo', todoId)
				})
		},
		updateCompletedInDb(context, todo) {
			db.collection('todos')
				.doc(todo.id)
				.update({
					title: todo.title,
					completed: !todo.completed,
					createdAt: new Date(todo.createdAt)
				})
				.then(function() {
					context.commit('updateCompleted', todo.id)
				})
		},
		updateTodoInDb(context, todo) {
			db.collection('todos')
				.doc(todo.id)
				.update({
					title: todo.title,
					completed: todo.completed,
					createdAt: new Date(todo.createdAt)
				})
				.then(function() {
					context.commit('updateTodo', todo)
					router.push('/todos')
				})
		}
	},
	mutations: {
		updateTodos(state, todos) {
			state.todos = todos
			sessionStorage.setItem('todos', JSON.stringify(state.todos))
		},
		addTodo(state, newTodo) {
			state.todos.unshift(newTodo)
			sessionStorage.setItem('todos', JSON.stringify(state.todos))
		},
		deleteTodo(state, todoId) {
			state.todos = state.todos.filter(todo => todo.id !== todoId)
			sessionStorage.setItem('todos', JSON.stringify(state.todos))
		},
		updateCompleted(state, todoId) {
			for (let i in state.todos) {
				if (state.todos[i].id === todoId) {
					state.todos[i].completed = !state.todos[i].completed
					break
				}
			}

			sessionStorage.setItem('todos', JSON.stringify(state.todos))
		},
		updateTodo(state, todo) {
			for (let i in state.todos) {
				if (state.todos[i].id === todo.id) {
					state.todos.splice(i, 1, todo)
					break
				}
			}

			sessionStorage.setItem('todos', JSON.stringify(state.todos))
		},
		setLoading(state, val) {
			state.loading = val
		}
	}
}
