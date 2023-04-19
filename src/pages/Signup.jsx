import { useEffect, useState } from 'react';
import { Instance } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { ButtonStlye } from '../components/Header';

export default function Signup() {
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
        Instance.post('/auth/signup', body)
            .then((res) => {
                // console.log(res);
                navigate('/signin');
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
                    placeholder='이메일을 입력하세요.'
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
                    placeholder='비밀번호를 입력하세요.'
                    value={signupData.password}
                    onChange={handleChange}
                />
                <button
                    className={` ${
                        isValid
                            ? 'bg-red-400 p-2 rounded-lg mx-2 text-white'
                            : 'bg-slate-400 p-2 rounded-lg mx-2'
                    }`}
                    data-testid='signup-button'
                    onClick={handleClick}
                    disabled={!isValid}
                >
                    회원가입
                </button>
            </form>
        </section>
    );
}
