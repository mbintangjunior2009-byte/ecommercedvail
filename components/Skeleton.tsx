import React from 'react';

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    circle?: boolean;
}

const Skeleton = ({ className = '', width, height, circle = false }: SkeletonProps) => {
    return (
        <div
            className={`relative overflow-hidden bg-stone-200 ${circle ? 'rounded-full' : 'rounded-lg'} ${className}`}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
            }}
        >
            <div className="absolute inset-0 animate-shimmer" />
        </div>
    );
};

export default Skeleton;
