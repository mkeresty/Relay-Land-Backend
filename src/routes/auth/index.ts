//import { User } from "discord.js";
import { Router } from "express";
import passport from 'passport';
import { User } from "../../database/schemas";
import { bigtest2, bigtest3, bigtest4, getUser, sendminnow, sendowner, sendwhale } from "../../services/guilds";



const router = Router();

router.get('/discord', passport.authenticate('discord'), (req,res)=>{
    
    res.send(200);

}
);

router.get('/discord/redirect', passport.authenticate('discord'), async (req,res)=>{
    //res.redirect('http://localhost:3000/menu');
    res.redirect('https://joyful-pastelito-d4f9a3.netlify.app/menu');
}
);

router.post('/tester', async (req,res)=>{
    //const id = req.params;
    console.log('tester');
    console.log(req.user);
    const id = req.body.params;
    bigtest2(id);
    res.send(200);

}
);

router.get('/owner', async (req,res)=>{
    //const id = req.params;
    console.log('owner');
    console.log(req.user);
    const id = req.body.params;
    const id2 = req.user;
    const user = await User.findById(id2);
    console.log('paramidid');
    console.log(id);

    console.log(user?.discordId);

    if(user?.discordId != null){

    sendowner(user.discordId!);
    }
    res.send(200);

}
);

router.get('/minnow', async (req,res)=>{
    //const id = req.params;
    console.log('minnow');
    console.log(req.user);
    const id = req.body.params;
    const id2 = req.user;
    const user = await User.findById(id2);


    if(user?.discordId != null){

    sendminnow(user.discordId!);
    }
    res.send(200);

}
);

router.get('/whale', async (req,res)=>{
    //const id = req.params;
    console.log('whale');
    console.log(req.user);
    const id = req.body.params;
    const id2 = req.user;
    const user = await User.findById(id2);

    if(user?.discordId != null){

    sendwhale(user.discordId!);
    }
    res.send(200);


}
);


router.post('/testercoin', async (req,res)=>{
    //const id = req.params;
    console.log('testercoin');
    console.log(req.user);
    const id = req.body.params;
    console.log(id);
    bigtest4(id);
    //console.log(req.body.params);
    //const user = await User.findById(id);
    //console.log(`THIS USER222222222 ${user}`);
    //console.log(req.user);
    //const user = req.user;
    //const user = await User.findById(id);
    //giveUserRoleService(req.user);
    res.send(200);
    //res.redirect('http://localhost:3000/menu')
    //return(user);
}
);




router.get('/status', async (req, res)=> {

    //const user2 = req.user;

    //const user = req.user as typeof User;
    console.log('normalid');
    const id = req.user;
    const user = await User.findById(id);
    console.log(id);

    console.log('founduser');
    console.log(user);




    if (!req.user) throw new Error('No user found');
        //console.log(user)

    return req.user ? res.send(req.user) : res.status(401).send({
        msg: 'Unauthorized',
    });
});


router.get('/getdd', (req, res)=> {
    console.log(req)
    return req.user ? res.send(req.user) : res.status(401).send({
        msg: 'Unauthorized',
    });
});


export default router;