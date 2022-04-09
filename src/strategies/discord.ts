import passport from 'passport';
import { Profile, Strategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';
import {User } from '../database/schemas';

passport.serializeUser((user: any, done)=> {
    console.log(`user is ${user}`);
    return done(null, user.id);
    
});

passport.deserializeUser(async (id: string, done)=> {
    try{
        const user = await User.findById(id)
        console.log(`deserialized ${user}`);
        return user ? done(null, user) : done(null, null);
    } catch (err) {
        console.log(err)
        return done(err, null)
    }

});

passport.use(new Strategy({
    clientID: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    callbackURL: process.env.DISCORD_REDIRECT_URL,
    scope: ['identify', 'email', 'guilds'],
}, 
async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback
    )=> {
    console.log(accessToken, refreshToken);
    //console.log(profile);
    const { id: discordId } = profile;
    try {
        const existingUser = await User.findOneAndUpdate(
            { discordId }, 
            { accessToken, refreshToken },
            { new: true }
        );
        if (existingUser) return done(null, existingUser);
    
        const newUser = new User({ discordId, accessToken, refreshToken });
        console.log(`new user is ${newUser}`);
        const savedUser = await newUser.save();
        console.log('saved');
        return done(null, savedUser);
    } catch(err) {
        console.log(err);
        return done(err as any, undefined)
    }
}
));
