// index.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxN-cvpGSRsHvWwlXsUaRU1ZnvsD1xHhtCVaD-hvyJ3zseJpJNxJjee0Aw_-b3_dx1M/exec';

app.use(express.json());

app.post('/save', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const text = await response.text();
    res.send({ result: text });
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
});

app.get('/get', async (req, res) => {
  try {
    const url = `${GOOGLE_SCRIPT_URL}?prompt_name=${encodeURIComponent(req.query.prompt_name)}`;
    const response = await fetch(url);
    const text = await response.text();
    res.send({ prompt_text: text });
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
});

app.listen(PORT, () => console.log(`Proxy server listening on port ${PORT}`));
