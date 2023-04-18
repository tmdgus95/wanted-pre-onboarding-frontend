import { useEffect, useState } from 'react';
import { Instance } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { ButtonStlye } from '../components/Header';

export default function Signup() {
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({ email: '', password: '' });
    const [isValid, setIsvalid] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData((signupData) => ({ ...signupData, [name]: value }));
    };
    useEffect(() => {
        setIsvalid(
            signupData.email.includes('@') && signupData.password.length >= 8
        );
    }, [signupData]);

    const handleClick = (e) => {
        e.preventDefault();
        const body = {
            email: signupData.email,
            password: signupData.password,
        };
        Instance.post('/auth/signup', body)
            .then((res) => {
                console.log(res);
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
