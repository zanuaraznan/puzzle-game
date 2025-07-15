import * as fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
    const files = (
        await fs.readdir(path.join(process.cwd(), '/public/assets/images'))
    ).map((name) => `/assets/images/${name}`);

    return NextResponse.json(files);
}
