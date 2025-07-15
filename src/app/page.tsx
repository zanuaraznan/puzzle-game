import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <Image
                priority
                src='/assets/sawako.png'
                width={150}
                height={150}
                alt='Sawako'
                className='saturate-0'
            />
            <h1 className='text-2xl font-semibold'>Puzzle Gambar</h1>
            <div className='space-x-4'>
                {Array.from(['3x3', '4x4', '5x5']).map((level) => (
                    <Link key={level} href={`/${level}`} className='btn'>
                        Level {level}
                    </Link>
                ))}
            </div>
            <div className='text-center'>
                <h2 className='text-sm font-medium'>Dibuat oleh Zanuarrasyidin</h2>
                <p className='text-xs'>
                    Insp{' '}
                    <a
                        href='https://nextarz.github.io/Puzzel-game/'
                        rel='noopener noreferrer'
                        referrerPolicy='no-referrer'
                        className='underline'>
                        Abu Kentucky
                    </a>
                </p>
            </div>
        </>
    );
}
