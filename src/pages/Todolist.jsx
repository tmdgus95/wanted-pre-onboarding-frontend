import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Todolist() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
        }
    }, []);
    return (
        <section>
            <li>
                <label>
                    <input type='checkbox' />
                    <span>TODO 1</span>
                </label>
            </li>
            <li>
                <label>
                    <input type='checkbox' />
                    <span>TODO 2</span>
                </label>
            </li>
        </section>
    );
}
