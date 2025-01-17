import express, { Request, Response } from 'express';
import path from 'path';

import { auth, requiresAuth } from 'express-openid-connect';
import { updateFiles } from './lib/app-lib';

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: proccess.env.SECRET,
    baseURL: 'http://localhost:3000',
    clientID: procces.env.CLIENT_ID,
    issuerBaseURL: proccess.env.ISSUER_BASE_URL,
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(auth(config));

app.use(express.static(path.join(__dirname, './public')));

app.get('/AVD_RH.csv', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './public/AVD_RH.csv'));
});

app.get('/AVD_RH.json', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './public/AVD_RH.json'));
});

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../src/views/index.html'));
});

app.get('/datatable', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../src/views/datatable.html'));
});

app.get('/login', (req: Request, res: Response) => {
    res.oidc.login();
});

app.get('/logout', (req: Request, res: Response) => {
    res.oidc.logout();
});

app.get('/auth-status', (req: Request, res: Response) => {
    res.json({ isAuthenticated: req.oidc?.isAuthenticated() });
});

app.get('/profile', requiresAuth(), (req: Request, res: Response) => {
    res.send(`
    <h1>Korisnički profil</h1>
    <pre>${JSON.stringify(req.oidc.user, null, 2)}</pre>
    <p><a href="/logout">Odjava</a></p>
  `);
});

app.get('/refresh', requiresAuth(), async (req: Request, res: Response) => {
    try {
        const response = await fetch('http://localhost:3001/fetchDefibrillators');
        if (!response.ok) {
            throw new Error('Failed to fetch data from external API');
        }
        const data = await response.json();
        updateFiles(data,);
    } catch (error) {
        console.error("Error fetching data and updating files:", error);
        res.status(500).send({ error: "Failed to fetch and update files." });
    }
    res.send('Preslike su osvježene! <a href="/">Natrag na home</a>');
});

app.listen(PORT, () => {
    console.log(`Server radi na http://localhost:${PORT}`);
});
