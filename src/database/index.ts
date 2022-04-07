import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://mkeresty:wwXuyfLz6Dqk3ZWU@mern.yxg7v.mongodb.net/discord_dashboard?retryWrites=true&w=majority')
.then(()=> console.log('connected to mongoose'))
.catch((err)=>console.log(err));