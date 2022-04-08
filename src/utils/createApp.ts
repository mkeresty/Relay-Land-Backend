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
        origin: ['https://www.relayland.com/'],
        credentials: true,
    }));
    console.log("cors enabled");

    // enable sessions
    app.use(session({
        secret: 'ERVHBERVIBERVWUIEVFBFWERVGBRY',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 6000 * 60 * 24 * 7,
        },
        store: store.create({mongoUrl:'mongodb+srv://mkeresty:wwXuyfLz6Dqk3ZWU@mern.yxg7v.mongodb.net/discord_dashboard?retryWrites=true&w=majority'}),
    }));

    // enable passport
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => setTimeout(() => next(), 800));

    app.use('/routes', routes);
    return app;
}