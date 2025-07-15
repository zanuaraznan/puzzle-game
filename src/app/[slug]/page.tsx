import Puzzle from '@/components/Puzzle';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ slug: string }>;
};

const allowedSlugs = ['3x3', '4x4', '5x5'];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: slug,
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    if (!allowedSlugs.includes(slug)) notFound();
    return <Puzzle size={parseInt(slug[0])} />;
}
