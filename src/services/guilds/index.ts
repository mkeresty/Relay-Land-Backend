import axios from 'axios';
import { Message } from 'discord.js';
import { User } from '../../database/schemas';
import router from '../../routes';
import { DISCORD_API_URL } from '../../utils/constants';
import { PartialGuild } from '../../utils/types';

const {
    Client,
    Intents
} = require('discord.js');

const DISCORD_BOT_TOKEN = "OTYxMDM2NjU4NTA4MTgxNjE0.YkzJIg.csDTT1_ZIpkRdRFjadtLlp7Sg0E";

const dClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
dClient.login(DISCORD_BOT_TOKEN);
// When the client is ready, run this code (only once)
dClient.once('ready', () => {
	console.log('Ready!');
    //bigtest();
    
});

dClient.on('messageReactionAdd', async (reaction:any, user: { id: any; }) => {
    //console.log('reacted');
    let guild = reaction.message.guild;
    let member = await guild.members.cache.find((member: { id: any; }) => member.id === user.id);
    //console.log(member);

    let role = await guild.roles.cache.find((role: { name: string; }) => role.name === "Member");
    console.log(reaction['_emoji']['name']);
    //console.log(role);
    if(reaction.message.channel.name === 'welcome'){
        //console.log(reaction.message._emoji.name);


        if (reaction['_emoji']['name'] === "🎉"){
            console.log("ding ding");
            await member.roles.add(role);
        }
        //Do whatever you like with it
        //console.log(reaction.name)
    }
});

export async function sendowner(id: string){
    let guild = await dClient.guilds.cache.get('895749336938463295');
    //let channel = await guild.channels.cache.get('895749337370488924');
    //let duser = await dClient.users.fetch('699837589259288576');
    //let dmember = await guild.member(duser);

    console.log('id');
    console.log(id);
    console.log('guild');
    console.log(guild)

    const member = await guild.members.fetch(id);
    console.log(member);


    let role = await guild.roles.cache.find((role: { name: string; }) => role.name === "RELAY Owner");

    console.log(role);

    await member.roles.add(role);
    //console.log(duser);
    
    //channel.send(id);
    console.log("yayyy");
    //console.log(User);
}

export async function sendminnow(id: string){
    let guild = await dClient.guilds.cache.get('895749336938463295');
    //let channel = await guild.channels.cache.get('895749337370488924');
    //let duser = await dClient.users.fetch('699837589259288576');
    //let dmember = await guild.member(duser);



    const member = await guild.members.fetch(id);
    console.log(member);


    let role = await guild.roles.cache.find((role: { name: string; }) => role.name === "RELAY Minnow");

    console.log(role);

    await member.roles.add(role);
    //console.log(duser);
    
    //channel.send(id);
    console.log("yayyy");
    //console.log(User);
}

export async function sendwhale(id: string){
    let guild = await dClient.guilds.cache.get('895749336938463295');
    //let channel = await guild.channels.cache.get('895749337370488924');
    //let duser = await dClient.users.fetch('699837589259288576');
    //let dmember = await guild.member(duser);
    console.log(id);
    console.log(guild);


    const member = await guild.members.fetch(id);
    console.log(member);


    let role = await guild.roles.cache.find((role: { name: string; }) => role.name === "RELAY Whale");

    console.log(role);

    await member.roles.add(role);
    //console.log(duser);
    
    //channel.send(id);
    console.log("yayyy");
    //console.log(User);
}


export async function getUser(id: string){
    const user = await User.findById(id);
    if (!user) throw new Error('No user found');
        console.log(user)
}

export async function bigtest3(info: string){
    let guild = await dClient.guilds.cache.get('895749336938463295');
    let channel = await guild.channels.cache.get('895749337370488924');
    
    //channel.send(info);
    //channel.send(User.toString);
    console.log("info");
}

export async function bigtest(){
    let guild = await dClient.guilds.cache.get('895749336938463295');
    let channel = await guild.channels.cache.get('895749337370488924');
    
    channel.send('less gooo');
    //channel.send(User.toString);
    console.log("yayyy");
}
export async function bigtest4(id: string){
    let guild = await dClient.guilds.cache.get('895749336938463295');
    //let channel = await guild.channels.cache.get('895749337370488924');
    //let duser = await dClient.users.fetch('699837589259288576');
    //let dmember = await guild.member(duser);



    const member = await guild.members.fetch(id);
    console.log(member);


    let role = await guild.roles.cache.find((role: { name: string; }) => role.name === "CoinHolder");

    console.log(role);

    await member.roles.add(role);
    //console.log(duser);
    
    //channel.send(id);
    console.log("yayyy");
    //console.log(User);
}

export async function bigtest2(id: string){
    let guild = await dClient.guilds.cache.get('895749336938463295');
    //let channel = await guild.channels.cache.get('895749337370488924');
    //let duser = await dClient.users.fetch('699837589259288576');
    //let dmember = await guild.member(duser);



    const member = await guild.members.fetch(id);
    console.log(member);


    let role = await guild.roles.cache.find((role: { name: string; }) => role.name === "owner");

    console.log(role);

    await member.roles.add(role);
    //console.log(duser);
    
    //channel.send(id);
    console.log("yayyy");
    //console.log(User);
}

export async function assignRole(){
    let guild = await dClient.guilds.cache.get('895749336938463295');
    //let channel = await guild.channels.cache.get('895749337370488924');
    //channel.send('otherone');

    console.log("got id");
}


// Login to Discord with your client's token


export function getBotGuildsService(){
    delay(1000);
    const TOKEN=process.env.DISCORD_BOT_TOKEN;
    //console.log(TOKEN)
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${TOKEN}` },
    });
}

export async function getUserGuildsService(id: string){
    
    const user = await User.findById(id);
    if (!user) throw new Error('No user found');
    console.log(`ID IS ${user.discordId}`);
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
    });   
}


export async function getMutualGuildsService(id: string){
    const { data: botGuilds } = await getBotGuildsService();
    const { data: userGuilds } = await getUserGuildsService(id);
    const adminUserGuilds = userGuilds.filter(
        ({ permissions })=> (parseInt(permissions) & 0x40) === 0x40
    );
    
    return adminUserGuilds.filter((guild) =>
    botGuilds.some((botGuild) => botGuild.id === guild.id)
  );

}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


export function getGuildService(id: string) {
    delay(1000);
    const TOKEN=process.env.DISCORD_BOT_TOKEN;
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/guilds/${id}`, {
        headers: { Authorization: `Bot ${TOKEN}` }
    });
}