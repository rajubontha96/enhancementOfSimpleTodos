import {useState} from 'react'
import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo, toggleComplete, editTodo} = props
  const {id, title, completed} = todoDetails

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(title)

  const handleEditClick = () => {
    if (isEditing) {
      editTodo(id, editValue)
    }
    setIsEditing(prev => !prev)
  }

  const handleCheckboxChange = () => {
    toggleComplete(id)
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={completed || false}
        onChange={handleCheckboxChange}
      />
      {isEditing ? (
        <input
          type="text"
          className="edit-input"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
        />
      ) : (
        <p className={`todo-title ${completed ? 'completed' : ''}`}>{title}</p>
      )}
      <div className="button-group">
        <button className="edit-button" type="button" onClick={handleEditClick}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          className="delete-button"
          type="button"
          onClick={() => deleteTodo(id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
