import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(req : Request){
    try {
        const currentUser = await getCurrentUser();
        const {userId, isGroup, name, members} = await req.json();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse("Invalid Data", {status: 400});
        }

        if (isGroup){
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup, 
                    users:{
                        connect: [
                            ...members.map((member : {value: string}) => ({id : member.value})),
                        {
                            id : currentUser.id
                        }
                    ]
                    }
                },
                include: {
                    users: true
                }
            });
            newConversation.users.forEach((user:any)=>{
                if (user.email) {
                    pusherServer.trigger(user.email, "conversation:new", newConversation);
                }
            });
            return NextResponse.json(newConversation);
        }
        const existsngConversation = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds : {
                            equals : [currentUser.id, userId]
                        }
                    },
                    {
                        userIds : {
                            equals : [userId, currentUser.id]
                        }
                    }
                ]
            }
        });
        const singleConversation = existsngConversation[0];
        if (singleConversation) return NextResponse.json(singleConversation);

        const newConversation = await prisma.conversation.create({
            data: {
                isGroup: false,
                users: {
                    connect: [
                        {id: userId},
                        {id: currentUser.id}
                    ]
                }
            },
            include: {
                users: true
            }
        });

        newConversation.users.map((user:any)=>{
            if (user.email) {
                pusherServer.trigger(user.email, "conversation:new", newConversation)
            }
        }) 

        return NextResponse.json(newConversation);
    } catch (error) {
        return new NextResponse("Internal Server Error", {status: 500});
    }
}