import { useEffect, useState } from 'react';

export default function Signup() {
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
    console.log(signupData);
    const handleClick = () => {};
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
