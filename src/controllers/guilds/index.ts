import { Request, Response } from "express";
import { User } from "../../database/schemas/User";
import { 
    bigtest3,
    getBotGuildsService, 
    getGuildService, 
    getMutualGuildsService, 
    getUserGuildsService, 
} from "../../services/guilds";
import { PartialGuild } from "../../utils/types";

export async function getGuildsController( req: Request, res: Response){
    const user = req.user as User;
    try {
        const guilds = await getMutualGuildsService(user.id);
        console.log('USER');
        console.log(user.id);
        // const { data: botGuilds } = await getBotGuildsService();
        // const { data: userGuilds } = await getUserGuildsService(user.id);
        res.send(guilds);
        //res.send(user.discordId);

    } catch (err){
        console.log(err);
        res.status(400).send('Error');

    }

}


export async function getGuildPermissionsController(req: Request, res: Response) {
    const user = req.user as User;
    const { id } = req.params;
    try {
        const guilds = await getMutualGuildsService(user.id);
        const valid = guilds.some((guild) => guild.id === id)
        return valid ? res.sendStatus(200) : res.sendStatus(403);
    } catch (err){
        console.log(err);
        res.status(400).send('Error');

    }

}


export async function getGuildController(req: Request, res: Response) {
    const user = req.user as User;
    const userid = user.discordId;
    console.log("ERMM");
    //console.log(user);
    const { id } = req.params;
    try {
        const { data: guild } = await getGuildService(id);
        Object.assign(guild, {duserid: userid});
        //guild.duserid = userid;
        res.send(guild);
        console.log(guild);
        return(guild);
    } catch (err) {
        console.log(err);
        res.status(400).send({msg: 'Error'});
        
    }
}

export async function getIdController( req: Request, res: Response){
    const user = req.user as User;
    //console.log(req);
    const { id } = req.params;
    console.log('getting id controller');
    console.log({ id });

    try {
        const x: any = await getGuildController(req, res)
        console.log(x['duserid']);
        //await bigtest3(x);
        //const guilds = await getId(user.id);
        //console.log('USER');
        //console.log(user.discordId);
        // const { data: botGuilds } = await getBotGuildsService();
        // const { data: userGuilds } = await getUserGuildsService(user.id);
        res.send(200);

    } catch (err){
        console.log(err);
        res.status(400).send('Error');

    }

}

export async function getUserController(req: Request, res: Response) {
    const user = req.user as User;
    const { id } = req.params;
    console.log(user)
    console.log(id)
    try {
        const { data } = await getGuildService(id);
        res.send(200);
    } catch (err) {
        console.log(err);
        res.status(400).send({msg: 'Error'});
        
    }
}

