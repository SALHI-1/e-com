import React, { useState } from 'react';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: React.ReactNode;
}

export default function ImageWithLoader({ src, alt, className, style, fallback, ...props }: ImageWithLoaderProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    if (hasError && fallback) {
        return <>{fallback}</>;
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }} className={className}>
            {!isLoaded && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(246, 240, 228, 0.5)', // Match au-bg with some transparency
                    zIndex: 1
                }}>
                    <div className="animate-spin" style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: '1.5px solid rgba(194, 160, 99, 0.2)', // Very subtle gold ring
                        borderTopColor: 'var(--au-gold, #C2A063)'
                    }} />
                </div>
            )}
            <img
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                    setHasError(true);
                    setIsLoaded(true);
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    ...style
                }}
                {...props}
            />
        </div>
    );
}
