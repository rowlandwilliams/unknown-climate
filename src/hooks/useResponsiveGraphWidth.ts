import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';

export const useResponsiveGraphWidth = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [graphWidth, setGraphWidth] = useState(0);

    const setGraphDims = debounce((current: HTMLDivElement) => {
        setGraphWidth(current.clientWidth);
    }, 50);

    // on resize, update chart
    useEffect(() => {
        const { current } = ref;

        if (current) {
            setGraphDims(current);
            const setResize = () => setGraphDims(current);
            window.addEventListener('resize', setResize);
            return () => window.removeEventListener('resize', setResize);
        }

        return () => {};
    }, [setGraphDims]);

    return { ref, graphWidth };
};
