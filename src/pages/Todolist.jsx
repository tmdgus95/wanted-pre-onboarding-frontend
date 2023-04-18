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
    return <div>Todolist</div>;
}
