import { memo } from 'react';

interface TileProps {
    index: number;
    size: number;
    image: string;
    onClick(): void;
}

export default memo(function Tile({ index, image, size, onClick }: TileProps) {
    const row = Math.floor(index / size);
    const col = index % size;

    if (index === 0) return <div className='w-24 aspect-square' />;

    return (
        <button
            onClick={onClick}
            className='w-24 aspect-square bg-cover bg-no-repeat flex items-center justify-center'
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: `${size * 100}%`,
                backgroundPosition: `${(col / (size - 1)) * 100}% ${
                    (row / (size - 1)) * 100
                }%`,
            }}
        />
    );
});
