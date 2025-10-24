import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening'},
  {id: 2, title: 'Rent the movie for tomorrow movie night'},
  {id: 3, title: 'Confirm the slot for the yoga session tomorrow morning'},
  {id: 4, title: 'Drop the parcel at Bloomingdale'},
  {id: 5, title: 'Order fruits on Big Basket'},
  {id: 6, title: 'Fix the production issue'},
  {id: 7, title: 'Confirm my slot for Saturday Night'},
  {id: 8, title: 'Get essentials for Sunday car wash'},
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    inputValue: '',
    nextId: initialTodosList.length + 1, // incremental ID counter
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }))
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    }))
  }

  editTodo = (id, newTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title: newTitle} : todo,
      ),
    }))
  }

  handleInputChange = e => {
    this.setState({inputValue: e.target.value})
  }

  addTodo = () => {
    const {inputValue, nextId} = this.state
    if (inputValue.trim() === '') return

    const match = inputValue.trim().match(/^(.*?)(?:\s+(\d+))?$/)
    const title = match[1]
    const count = match[2] ? parseInt(match[2], 10) : 1

    const newTodos = Array.from({length: count}, (_, index) => ({
      id: nextId + index, // use incremental IDs
      title,
      completed: false,
    }))

    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      inputValue: '',
      nextId: prevState.nextId + count, // increment counter
    }))
  }

  render() {
    const {todosList, inputValue} = this.state
    return (
      <div className="app-container">
        <div className="todos-container">
          <h1 className="heading">Simple Todos</h1>

          <div className="add-todo-container">
            <input
              type="text"
              placeholder="Enter todo and optional count (e.g. Task 3)"
              value={inputValue}
              onChange={this.handleInputChange}
              className="todo-input"
            />
            <button type="button" className="add-button" onClick={this.addTodo}>
              Add
            </button>
          </div>

          <ul className="todo-items-list">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                todoDetails={todo}
                deleteTodo={this.deleteTodo}
                toggleComplete={this.toggleComplete}
                editTodo={this.editTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
