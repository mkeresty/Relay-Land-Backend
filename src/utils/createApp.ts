import { config } from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import routes from '../routes';
const path = require('path');
import store from 'connect-mongo';

config();
require('../strategies/discord');

export function createApp(): Express {
    const app = express();

    //app.use(express.static(path.join(__dirname, 'client/build')));

    // enable parsing middleware for requests
    app.use(express.json());
    app.use(express.urlencoded());

    // enable cors
    app.use(cors({
        origin: 'https://client-relay-mern.herokuapp.com/',
        credentials: true,
    }));
    console.log("cors enabled");

    // enable sessions
    app.use(session({
        secret: 'ERVHBERVIBERVWUIEVFBFWERVGBRY',
        resave: true,
        saveUninitialized: false,
        proxy: true,
        cookie: {
            sameSite: 'none',
            secure: true,
            httpOnly: false,
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


    app.use((req, res, next) => setTimeout(() => next(), 800));

    app.use('/api', routes);
    return app;
}