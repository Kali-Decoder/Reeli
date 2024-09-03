import Reel from '@/models/Reel';
import { verifyToken } from '@/utils/auth';
import dbConnect from '@/utils/dbConnect';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  const { reelId } = await request.json();
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token || !reelId) {
    return NextResponse.json({ error: 'Token and reelId are required' }, { status: 400 });
  }

  try {
    await dbConnect(); 

    const decoded = verifyToken(token);
    await Reel.findByIdAndUpdate(reelId, { $inc: { likes: 1 } });
    return NextResponse.json({ message: 'Reel liked' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to like reel' }, { status: 500 });
  }
}
