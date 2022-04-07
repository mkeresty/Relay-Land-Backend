export async function loguser( req: Request, res: Response){
    const user = req.user as User;
    //console.log(req);
    const { id } = req.params;
    console.log('getting id controller');
    console.log({ id });

    try {
        //const x: any = await getGuildController(req, res)
        //console.log(x['duserid']);
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