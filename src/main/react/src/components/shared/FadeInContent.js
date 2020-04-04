import React, {useRef, useState, useEffect} from "react";

export const FadeInContent = ({children, direction}) => {

    const [isVisible, setVisible] = useState(false);
    const [fadedOnce, setFadeOnce] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        if(!fadedOnce) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    setVisible(entry.isIntersecting);
                    if (entry.isIntersecting) {
                        setFadeOnce(true);
                    }
                });
            });
            observer.observe(domRef.current);
            return () => observer.unobserve(domRef.current);
        }
    }, []);

    return (
        <div
            className={`fade-in-section-${direction} ${isVisible || fadedOnce ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {children}
        </div>
    );
};