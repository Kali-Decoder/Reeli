import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';

export async function POST(request: Request) {
  const { name, email, password, walletAddress } = await request.json();

  if (!name || !email || !password || !walletAddress) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    await dbConnect(); 

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    
    const user = await User.create({ name, email, password, walletAddress });
    
    
    const token = jwt.sign({ id: user._id }, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: '1h' });

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
  }
}
