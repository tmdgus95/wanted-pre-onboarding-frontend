import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instance } from '../api/axios';
import { ButtonStlye } from '../components/Header';

export default function Signin() {
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({ email: '', password: '' });
    const [isValid, setIsvalid] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/todo');
        }
    }, []);

    useEffect(() => {
        setIsvalid(
            signupData.email.includes('@') && signupData.password.length >= 8
        );
    }, [signupData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData((signupData) => ({ ...signupData, [name]: value }));
    };

    const handleClick = (e) => {
        e.preventDefault();
        const body = {
            email: signupData.email,
            password: signupData.password,
        };
        Instance.post('/auth/signin', body)
            .then((res) => {
                console.log(res.data.access_token);
                localStorage.setItem('token', res.data.access_token);
                navigate('/todo');
            })
            .catch(console.log);
    };
    return (
        <section className='flex justify-center mt-10'>
            <form className='flex flex-col items-center'>
                <label className='mb-2' htmlFor='email'>
                    이메일
                </label>
                <input
                    className='mb-2'
                    data-testid='email-input'
                    name='email'
                    id='email'
                    type='email'
                    value={signupData.email}
                    onChange={handleChange}
                />
                <label className='mb-2' htmlFor='password'>
                    비밀번호
                </label>
                <input
                    className='mb-2'
                    data-testid='password-input'
                    name='password'
                    id='password'
                    type='password'
                    value={signupData.password}
                    onChange={handleChange}
                />
                <button
                    className={`${ButtonStlye} ${isValid && 'bg-red-400'}`}
                    data-testid='signin-button'
                    onClick={handleClick}
                    disabled={!isValid}
                >
                    로그인
                </button>
            </form>
        </section>
    );
}
