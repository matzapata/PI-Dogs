import { useEffect, useRef } from "react";


export default function useClickOutside(callback) {
    const ref = useRef(null);

    useEffect(() => {
        const clickOutside = (e) => { if (!ref.current.contains(e.target)) callback(); };

        document.addEventListener('mousedown', clickOutside);
        return () => { document.removeEventListener('mousedown', clickOutside); };
    }, [callback]);

    return ref;
}
