import { useState, useEffect } from 'react';

const sanitizeValue = (val) => {
    if (typeof val === 'string') {
        return val
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }
    return val;
};

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(sanitizeValue(value));

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(sanitizeValue(value));
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}