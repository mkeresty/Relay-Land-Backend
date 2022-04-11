import { config } from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import session, { Cookie } from 'express-session';
import passport from 'passport';
import routes from '../routes';
const path = require('path');
import store from 'connect-mongo';
import { NONAME } from 'dns';

config();
require('../strategies/discord');

export function createApp(): Express {
    const app = express();

    //app.use(express.static(path.join(__dirname, 'client/build')));

    // enable parsing middleware for requests
    app.use(express.json());
    app.use(express.urlencoded());

    app.disable("X-Powered-By");

    app.set("trust proxy", 1);

    // enable cors
    app.use(cors({
        
        origin: ['https://frontend.relayalpha.com','http://localhost:3000', '*'],
        credentials: true,
        methods: "GET, POST, PUT, DELETE"
    }));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Credentials", 'true');
        res.header("Access-Control-Allow-Origin", "https://frontend.relayalpha.com");
        res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        next();  
     });



    // enable sessions
    app.use(session({
        name: "connect.sid",
        secret: 'ERVHBERVIBERVWUIEVFBFWERVGBRY',
        resave: false,
        saveUninitialized: false,
        cookie: {
            domain: ".relayalpha.com",
            sameSite: "none",
            secure: true,
            httpOnly: true,
            maxAge: 6000 * 60 * 24 * 7,
        },
        
        store: store.create({mongoUrl:'mongodb+srv://mkeresty:wwXuyfLz6Dqk3ZWU@mern.yxg7v.mongodb.net/discord_dashboard?retryWrites=true&w=majority'}),
    }));

    

    // enable passport
    app.use(passport.initialize());
    console.log('initialized');
    app.use(passport.session());
    console.log('session');

    // const authRoutes = require('../routes/auth/index.ts');
    // app.use('/auth', authRoutes);

    // const guildsRoutes = require('../routes/guilds/index.ts');
    // app.use('/guilds', guildsRoutes);

    // app.get("/", (req, res) => {
    //     res.send("responded")
    // });


    app.use((req, res, next) => setTimeout(() => next(), 1500));

    app.use('/api', routes);
    app.get('/', (req, res) => {
        res.send('API running with CORS enabled');
      });
    return app;
}