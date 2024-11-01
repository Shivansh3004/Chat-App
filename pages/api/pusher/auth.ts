import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOptions  from "@/app/utils/authOptions";
import { pusherServer } from "@/app/libs/pusher";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    
    const { socket_id, channel_name } = req.body;
    const data = {user_id : session.user.email};
    const authRes = pusherServer.authorizeChannel(socket_id, channel_name, data);
    return res.send(authRes);
    }