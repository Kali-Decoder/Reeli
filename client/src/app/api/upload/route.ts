import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/auth';
import Reel from '@/models/Reel';
import dbConnect from '@/utils/dbConnect';
import { JwtPayload } from 'jsonwebtoken';


export async function POST(request: Request) {
    const { url } = await request.json();
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token || !url) {
        return NextResponse.json({ error: 'Token and URL are required' }, { status: 400 });
    }

    try {
        await dbConnect();

        const decoded = verifyToken(token);
        if (typeof decoded === 'string' || !('id' in decoded)) {
            return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 });
        }

        const userId = (decoded as JwtPayload & { id: string }).id;

        const reel = await Reel.create({ userId, url });
        return NextResponse.json(reel, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to upload reel' }, { status: 500 });
    }
}
