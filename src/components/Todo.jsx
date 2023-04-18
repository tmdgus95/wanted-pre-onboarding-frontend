import { useState } from 'react';
import { Instance } from '../api/axios';

export default function Todo({ todo: { todo, isCompleted, id }, setTodos }) {
    const [checked, setChecked] = useState(isCompleted);
    const [editTodo, setEditTodo] = useState('');
    const [editMode, setEditMode] = useState(false);
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
    const handleUpdate = () => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const body = {
            todo: editTodo,
            isCompleted: checked,
        };
        Instance.put(`/todos/${id}`, body, header).then((res) => {
            Instance.get('todos', header).then((res) => {
                setTodos(res.data);
            });
            setEditMode(false);
        });
    };
    return (
        <>
            {!editMode && (
                <li>
                    <label htmlFor=''>
                        <input
                            type='checkbox'
                            checked={checked}
                            onChange={() => setChecked((prev) => !prev)}
                        />
                        {todo}
                    </label>
                    <button
                        data-testid='modify-button'
                        onClick={() => setEditMode(!editMode)}
                    >
                        수정
                    </button>
                    <button data-testid='delete-button' onClick={handleDelete}>
                        삭제
                    </button>
                </li>
            )}
            {editMode && (
                <li>
                    <label htmlFor=''>
                        <input
                            type='checkbox'
                            checked={checked}
                            onChange={() => setChecked((prev) => !prev)}
                        />
                        <input
                            data-testid='modify-input'
                            type='text'
                            defaultValue={todo}
                            onChange={(e) => setEditTodo(e.target.value)}
                        />
                    </label>
                    <button data-testid='submit-button' onClick={handleUpdate}>
                        제출
                    </button>
                    <button
                        data-testid='cancel-button'
                        onClick={() => setEditMode(!editMode)}
                    >
                        취소
                    </button>
                </li>
            )}
        </>
    );
}
