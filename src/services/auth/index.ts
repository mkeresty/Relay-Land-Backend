import { User } from "../../database/schemas";

export async function getUser(id: string){
    const user = await User.findById(id);
    console.log('getUser user');
    console.log(user);
    if (!user) throw new Error('No user found');
        console.log(user)
}
