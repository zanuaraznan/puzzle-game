import Link from 'next/link';

export default function NotFound() {
    return (
        <>
            <div>404, Halaman tidak ditemukan</div>
            <Link href='/' className='btn'>
                🏠 Kembali ke beranda
            </Link>
        </>
    );
}
