import { useState } from 'react';
import { Instance } from '../api/axios';

export default function AddTodo({ setTodos }) {
    const [todo, setTodo] = useState('');
    const handleChange = (e) => {
        setTodo(e.target.value);
    };
    const token = localStorage.getItem('token');
    const handleClick = (e) => {
        e.preventDefault();
        const body = {
            todo,
        };
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        Instance.post('todos', body, header).then((res) => {
            Instance.get('todos', header).then((res) => {
                setTodos(res.data);
            });
        });
        setTodo('');
    };
    return (
        <form>
            <input
                data-testid='new-todo-input'
                value={todo}
                onChange={handleChange}
            />
            <button data-testid='new-todo-add-button' onClick={handleClick}>
                추가
            </button>
        </form>
    );
}
