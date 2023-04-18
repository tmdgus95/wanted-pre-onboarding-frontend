import { useState } from 'react';

export default function Todo({ todo: { todo, isCompleted } }) {
    const [checked, setChecked] = useState(isCompleted);
    return (
        <li>
            <label htmlFor=''>
                <input
                    type='checkbox'
                    checked={checked}
                    onChange={() => setChecked((prev) => !prev)}
                />
                {todo}
            </label>
        </li>
    );
}
