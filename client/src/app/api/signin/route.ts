import { NextResponse } from 'next/server';
import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email, password,walletAddress } = await request.json();

  if (!email || !password || !walletAddress) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    await dbConnect(); 

    const user = await User.findOne({ walletAddress});
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id }, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: '1h' });
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: 'Sign-in failed' }, { status: 500 });
  }
}
