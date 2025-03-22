import { Router } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
const router = Router();
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    try {
        const { cityName } = req.body;
        // console.log({cityName});
        if (!cityName) {
            return res.status(400).json({ error: 'City name is required' });
        }
        // TODO: GET weather data from city name
        const weatherData = await WeatherService.getWeatherForCity(cityName);
        console.log("returning the weather data ", weatherData);
        // TODO: save city to search history
        await HistoryService.addCity(cityName);
        res.json(weatherData);
    }
    catch (error) {
        res.status(500).json({ error: 'Error retrieving weather data' });
    }
});
// TODO: GET search history
router.get('/history', async (_req, res) => {
    try {
        const history = await HistoryService.getCities();
        res.json(history);
    }
    catch (error) {
        res.status(500).json({ error: 'Error retrieving search history' });
    }
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await HistoryService.removeCity(id);
        res.json({ message: 'City removed successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting city from history' });
    }
});
export default router;
