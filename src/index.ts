import { config } from 'dotenv';
import { createApp } from './utils/createApp';
import './database'
import { DISCORD_API_URL } from './utils/constants';
config();

const PORT = process.env.PORT || 3001;

async function main(){
    try{
        const app = createApp();
        app.listen(PORT, ()=> console.log(`Running on Port ${PORT}`));
        console.log(`discord token: ${DISCORD_API_URL}`)
    } catch(err){
        console.log(err)
    }
}

main();