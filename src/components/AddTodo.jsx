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
        <form className='flex w-full p-4'>
            <input
                data-testid='new-todo-input'
                placeholder='AddTodo'
                value={todo}
                onChange={handleChange}
            />
            <button
                className='text-2xl bg-amber-300 p-2'
                data-testid='new-todo-add-button'
                onClick={handleClick}
            >
                추가
            </button>
        </form>
    );
}
