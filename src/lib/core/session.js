import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";

export const getServerSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })

    return session?.user || null;
}

export const getUserToken = async () => {
    const {token} = await auth.api.getToken({
        headers: await headers()
    })

    return token || null;
}

export const verifyRole = async (role) => {
    const user = await getServerSession()
    if (!user) {
        redirect('/login')
    }
    if (user?.role !== role) {
        redirect('/unauthorized')
    }
    return user;
}