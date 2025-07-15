import { useTimerStore } from '@/app/store';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface TimerProps {
    generateTiles(): number[];
    setTiles: Dispatch<SetStateAction<number[]>>;
    countdown: number;
    isSolved: boolean;
    setHasStarted: (v: boolean) => void;
}

export default function Timer({
    generateTiles,
    setTiles,
    countdown,
    isSolved,
    setHasStarted,
}: TimerProps) {
    const phase = useTimerStore((state) => state.phase);
    const seconds = useTimerStore((state) => state.seconds);
    const setPhase = useTimerStore((state) => state.setPhase);
    const setSeconds = useTimerStore((state) => state.setSeconds);
    const setDone = useTimerStore((state) => state.setDone);

    useEffect(() => {
        if (isSolved) return;

        if (seconds <= 0) {
            if (phase === 'starting') {
                setPhase('playing');
                setSeconds(countdown);
                setTiles(generateTiles()); // ini harus regenerate ulang
                setHasStarted(true);
            } else if (phase === 'playing') {
                setDone(true);
            }
            return;
        }

        const interval = setInterval(() => {
            setSeconds(seconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [
        seconds,
        phase,
        countdown,
        generateTiles,
        isSolved,
        setPhase,
        setSeconds,
        setTiles,
        setHasStarted,
        setDone,
    ]);

    return (
        <div className='text-sm'>
            {phase === 'starting' ? (
                <>🕛 Bersiap dalam {seconds}...</>
            ) : (
                <>
                    🕛 {Math.floor(seconds / 60).toString()}.
                    {(seconds % 60).toString().padStart(2, '0')}
                </>
            )}
        </div>
    );
}
