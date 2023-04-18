import { useEffect, useState } from 'react';
import { Instance } from '../api/axios';
import { useNavigate } from 'react-router-dom';

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
        <section>
            <form>
                <label htmlFor='email'>이메일</label>
                <input
                    data-testid='email-input'
                    name='email'
                    id='email'
                    type='email'
                    value={signupData.email}
                    onChange={handleChange}
                />
                <label htmlFor='password'>비밀번호</label>
                <input
                    data-testid='password-input'
                    name='password'
                    id='password'
                    type='password'
                    value={signupData.password}
                    onChange={handleChange}
                />
                <button
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
