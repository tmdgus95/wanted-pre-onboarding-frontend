import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTodo from '../components/AddTodo';
import { Instance } from '../api/axios';
import Todo from '../components/Todo';

export default function Todolist() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
        }
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        Instance.get('todos', header).then((res) => {
            // console.log(res);
            setTodos(res.data);
        });
    }, []);
    console.log(todos);
    return (
        <section>
            <ul>
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} setTodos={setTodos} />
                ))}
            </ul>
            <AddTodo setTodos={setTodos} />
        </section>
    );
}
