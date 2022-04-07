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
        origin: ['http://localhost:3000'],
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
        store: store.create({ mongoUrl: 'mongodb://localhost/discord_dashboard'}),
    }));

    // enable passport
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => setTimeout(() => next(), 800));

    app.use('/api', routes);
    return app;
}