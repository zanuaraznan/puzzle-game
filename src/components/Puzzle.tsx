'use client';
import { useCallback, useEffect, useState } from 'react';
import Tile from './Tile';
import Link from 'next/link';
import Timer from './Timer';
import { useTimerStore } from '@/app/store';
import Message from './Message';

export default function Puzzle({ size }: { size: number }) {
    const [tiles, setTiles] = useState<number[]>([...Array(size * size).keys()]);
    const [isSolved, setIsSolved] = useState(false);
    const [image, setImage] = useState('');
    const [hasStarted, setHasStarted] = useState(false);
    const phase = useTimerStore((state) => state.phase);
    const setPhase = useTimerStore((state) => state.setPhase);
    const setSeconds = useTimerStore((state) => state.setSeconds);
    const isDone = useTimerStore((state) => state.isDone);

    const countdown = size * 150;

    useEffect(() => {
        async function getImages() {
            const res = await fetch('/api/images');
            if (!res.ok) return null;
            const data = (await res.json()) as string[];
            if (data.length > 0) {
                setImage(data[Math.floor(Math.random() * data.length)]);
            }
        }
        getImages();
    }, []);

    useEffect(() => {
        const newTiles = [...Array(size * size).keys()].sort(() => Math.random() - 0.5);
        setTiles(newTiles); // Reset puzzle
        setIsSolved(false); // Reset status
        setPhase('starting');
        setSeconds(5);
    }, [size, setPhase, setSeconds]);

    const generateTiles = useCallback(() => {
        return [...Array(size * size).keys()].sort(() => Math.random() - 0.5);
    }, [size]);

    useEffect(() => {
        if (!hasStarted || phase !== 'playing' || tiles.length === 0) return;
        const solved = tiles.every((val, i) => val === i);
        setIsSolved(solved);
    }, [tiles, phase, hasStarted]);

    function moveTiles(index: number) {
        if (isSolved || isDone) return;
        const emptyIndex = tiles.indexOf(0);
        const x = index % size;
        const y = Math.floor(index / size);
        const ex = emptyIndex % size;
        const ey = Math.floor(emptyIndex / size);
        const isAdjacent = Math.abs(x - ex) + Math.abs(y - ey) === 1;

        if (isAdjacent) {
            const newTiles = [...tiles];
            [newTiles[index], newTiles[emptyIndex]] = [
                newTiles[emptyIndex],
                newTiles[index],
            ];
            setTiles(newTiles);
        }
    }

    return (
        <section className='space-y-4'>
            <div className='w-full flex items-center justify-between'>
                <Timer
                    generateTiles={generateTiles}
                    countdown={countdown}
                    setTiles={setTiles}
                    isSolved={isSolved}
                    setHasStarted={setHasStarted}
                />
                <Link href='/' className='btn'>
                    🔁 Reset
                </Link>
            </div>
            <div
                style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
                className='grid gap-0.5'>
                {tiles.map((tile, i) => (
                    <Tile
                        key={i}
                        index={tile}
                        size={size}
                        image={image ?? ''}
                        onClick={() => moveTiles(i)}
                    />
                ))}
            </div>
            {isSolved && <Message countdown={countdown} />}
            {isDone && <p className='text-center'>❌ Yah, kamu kehabisan waktu</p>}
        </section>
    );
}
