export default function Signin() {
    const handleClick = () => {};
    return (
        <section>
            <form>
                <input data-testid='email-input' type='email' />
                <input data-testid='password-input' type='password' />
                <button data-testid='signin-button' onClick={handleClick}>
                    로그인
                </button>
            </form>
        </section>
    );
}
