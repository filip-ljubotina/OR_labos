import express, { Request, Response } from 'express';
import path from 'path';
import { fetchDefibrillators } from './database';
import cors from 'cors';
import { transformAndEnrichDefibrillatorData } from './app-lib';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, './public')));

app.get('/fetchDefibrillators', async (req: Request, res: Response) => {
    try {
        const data = await fetchDefibrillators();
        res.json(data);
    } catch (error) {
        console.error('Error fetching defibrillators data:', error);
        res.status(500).json({ error: 'Failed to fetch defibrillators data' });
    }
});

app.get('/fetchJsonLd', async (req: Request, res: Response) => {
    try {
        const data = await fetchDefibrillators();
        const enrichedData = transformAndEnrichDefibrillatorData(data);
        res.json(enrichedData);
    } catch (error) {
        console.error('Error fetching defibrillators data:', error);
        res.status(500).json({ error: 'Failed to fetch defibrillators data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
