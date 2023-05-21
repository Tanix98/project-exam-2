import { useState, useEffect } from 'react';

// Check if user prefers reduced motion. Will disable transition animations for img carousel if true
const query = '(prefers-reduced-motion: no-preference)';

const getInitialState = () => !window.matchMedia(query).matches;

function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] =
        useState(getInitialState);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);

        const listener = (event) => {
            setPrefersReducedMotion(!event.matches);
        };

        mediaQueryList.addEventListener('change', listener);

        return () => {
            mediaQueryList.removeEventListener('change', listener);
        };
    }, []);

    if (prefersReducedMotion) {
        localStorage.setItem('prefersReducedMotion', prefersReducedMotion);
    } else {
        localStorage.setItem('prefersReducedMotion', '');
    }

    return prefersReducedMotion;
}

export default usePrefersReducedMotion;
