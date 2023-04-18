import { useState } from 'react';
import { Instance } from '../api/axios';

const TodoBt = 'text-2xl bg-amber-300 p-2';
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
                <li className='flex justify-between items-center p-3 my-1'>
                    <label htmlFor=''>
                        <input
                            className='w-5 h-5'
                            type='checkbox'
                            checked={checked}
                            onChange={() => setChecked((prev) => !prev)}
                        />
                        <span className='text-2xl'>{todo}</span>
                    </label>
                    <button
                        data-testid='modify-button'
                        className={TodoBt}
                        onClick={() => setEditMode(!editMode)}
                    >
                        수정
                    </button>
                    <button
                        data-testid='delete-button'
                        className={TodoBt}
                        onClick={handleDelete}
                    >
                        삭제
                    </button>
                </li>
            )}
            {editMode && (
                <li className='flex justify-between items-center p-3 my-1'>
                    <label htmlFor=''>
                        <input
                            className='w-5 h-5 text-2xl'
                            type='checkbox'
                            checked={checked}
                            onChange={() => setChecked((prev) => !prev)}
                        />
                        <input
                            className='h-5 text-2xl'
                            data-testid='modify-input'
                            type='text'
                            defaultValue={todo}
                            onChange={(e) => setEditTodo(e.target.value)}
                        />
                    </label>
                    <button
                        className={TodoBt}
                        data-testid='submit-button'
                        onClick={handleUpdate}
                    >
                        제출
                    </button>
                    <button
                        className={TodoBt}
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
