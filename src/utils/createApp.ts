import { config } from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import routes from '../routes';
import store from 'connect-mongo';

config();
require('../strategies/discord');

export function createApp(): Express {
    const app = express();
    // enable parsing middleware for requests
    app.use(express.json());
    app.use(express.urlencoded());

    // enable cors
    app.use(cors({
        origin: ['https://joyful-pastelito-d4f9a3.netlify.app/'],
        credentials: true,
    }));

    // enable sessions
    app.use(session({
        secret: 'ERVHBERVIBERVWUIEVFBFWERVGBRY',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 6000 * 60 * 24 * 7,
        },
        store: store.create({ mongoUrl: 'mongodb+srv://mkeresty:wwXuyfLz6Dqk3ZWU@mern.yxg7v.mongodb.net/discord_dashboard?retryWrites=true&w=majority+srv://mkeresty:wwXuyfLz6Dqk3ZWU@mern.yxg7v.mongodb.net/discord_dashboard?retryWrites=true&w=majority'}),
    }));

    // enable passport
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => setTimeout(() => next(), 800));

    app.use('/api', routes);
    return app;
}