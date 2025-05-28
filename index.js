// index.js
console.log("Proxy gestart – commit test");
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT;

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxSal7Gp2F-I7ME5Vw16TyAfGv41jyRzXobtXMsocdEAk7R0fbEX2-jIhjlVIJTJKB4/exec';

app.use(express.json());

app.post('/save', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log('Google Response:', text); // <--- log Google response
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
