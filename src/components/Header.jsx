import { useNavigate } from 'react-router-dom';

export const ButtonStlye = 'bg-slate-400 p-2 rounded-lg mx-2';
export default function Header() {
    const navigate = useNavigate();
    return (
        <div className='flex w-full px-4 justify-between items-center mt-4'>
            <div>
                <p className='text-3xl font-semibold'>
                    원티드 프리온보딩 프론트엔드 - 선발 과제
                </p>
            </div>
            <div>
                <button
                    className={ButtonStlye}
                    onClick={() => navigate('/signup')}
                >
                    회원가입
                </button>
                <button
                    className={ButtonStlye}
                    onClick={() => navigate('/signin')}
                >
                    로그인
                </button>
                <button
                    className={ButtonStlye}
                    onClick={() => navigate('/signout')}
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
}
