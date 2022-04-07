import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/discord_dashboard')
.then(()=> console.log('connected to mongoose'))
.catch((err)=>console.log(err));