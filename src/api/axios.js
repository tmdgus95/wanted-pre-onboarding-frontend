import axios from 'axios';

export const Instance = axios.create({
    baseURL: 'https://www.pre-onboarding-selection-task.shop',
    headers: {
        'Content-Type': 'application/json',
    },
});
