import { useState } from 'react';
import { Instance } from '../api/axios';

export default function Todo({ todo: { todo, isCompleted, id }, setTodos }) {
    const [checked, setChecked] = useState(isCompleted);
    const token = localStorage.getItem('token');
    const handleDelete = () => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        Instance.delete(`/todos/${id}`, header).then((res) => {
            Instance.get('todos', header).then((res) => {
                setTodos(res.data);
            });
        });
    };
    return (
        <li>
            <label htmlFor=''>
                <input
                    type='checkbox'
                    checked={checked}
                    onChange={() => setChecked((prev) => !prev)}
                />
                {todo}
            </label>
            <button data-testid='modify-button'>수정</button>
            <button data-testid='delete-button' onClick={handleDelete}>
                삭제
            </button>
        </li>
    );
}
