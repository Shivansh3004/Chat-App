import bcrypt from 'bcrypt';
import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    try {
        const {name, email, password} = await req.json();
        if (!email || !name || !password) {
            return  new NextResponse("Missing credentials",{status: 400, });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            }
        });
        return NextResponse.json(user);
    } catch(error :any) {
        console.log(error.data, "REGISTER ERROR");
        return new NextResponse("Internal Error", { status: 500 });
    }
}