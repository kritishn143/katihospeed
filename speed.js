const express = require('express');
const cors = require('cors');
const FastSpeedtest = require('fast-speedtest-api');

const app = express();
const port = 3000;

const speedtest = new FastSpeedtest({
    token: "",
    verbose: false,
    timeout: 5000,
    https: true,
    urlCount: 5,
    bufferSize: 8,
    unit: FastSpeedtest.UNITS.Mbps,
    proxy: 'http://optional:auth@my-proxy:123'
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Speed test server is running.');
});

app.get('/run-speed-test', async (req, res) => {
    try {
        const downloadSpeed = await speedtest.getSpeed();
        const uploadSpeed = await speedtest.getSpeed('upload');
        res.json({ downloadSpeed, uploadSpeed });
    } catch (error) {
        res.status(500).json({ error: `Speed test failed: ${error.message}` });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
