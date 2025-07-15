import { useTimerStore } from '@/app/store';

export default function Message({ countdown }: { countdown: number }) {
    const seconds = useTimerStore((state) => state.seconds);

    const remaining = countdown - seconds;
    const minutes = Math.floor(remaining / 60).toString();

    const secondsLeft = (remaining % 60).toString().padStart(2, '0');

    return (
        <div className='text-center'>
            <p className='text-emerald-400'>🎉 Horee!!, kamu berhasil!</p>
            <p className='text-sm'>
                {minutes}.{secondsLeft} kamu sangat gila
            </p>
        </div>
    );
}
