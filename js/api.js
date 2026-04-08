const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=22.7196&longitude=75.8577&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index&timezone=Asia%2FKolkata';

async function fetchWeatherWithCache() {
  const cacheKey = 'cropsense_weather';
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const data = JSON.parse(cached);
    if (Date.now() - data.timestamp < 30 * 60 * 1000) {
      return data.payload;
    }
  }
  try {
    const res = await fetch(WEATHER_URL);
    const d = await res.json();
    const c = d.current;
    const payload = {temp:Math.round(c.temperature_2m),humidity:c.relative_humidity_2m,wind:Math.round(c.wind_speed_10m),feels:Math.round(c.apparent_temperature),code:c.weather_code,uv:Math.round(c.uv_index||0)};
    localStorage.setItem(cacheKey, JSON.stringify({timestamp: Date.now(), payload}));
    return payload;
  } catch(e) {
    return {temp:28,humidity:72,wind:14,feels:30,code:2,uv:7};
  }
}

async function requestAiDiagnosis(fileType, base64Data, systemPrompt, fallbackFn) {
  try {
    const res = await fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 800,
        system: systemPrompt,
        messages: [{
          role: 'user', content: [
            { type: 'image', source: { type: 'base64', media_type: fileType, data: base64Data } },
            { type: 'text', text: 'Analyse this crop image for diseases or deficiencies. Return JSON diagnosis.' }
          ]
        }]
      })
    });
    const data = await res.json();
    const txt = data.content.map(b => b.type === 'text' ? b.text : '').join('');
    const m = txt.replace(/```json|```/g, '').trim().match(/\{[\s\S]*\}/);
    return JSON.parse(m ? m[0] : txt);
  } catch(e) {
    return fallbackFn();
  }
}

async function requestAiChat(chatHistory, systemPrompt) {
  const res = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 500,
      system: systemPrompt,
      messages: chatHistory
    })
  });
  const data = await res.json();
  return data.content.map(b => b.type === 'text' ? b.text : '').join('').trim();
}

async function fetchDynamicAlertsCache(weatherData, prompt, fallback) {
  const cacheKey = 'cropsense_alerts';
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const data = JSON.parse(cached);
    if (Date.now() - data.timestamp < 12 * 60 * 60 * 1000) {
      return data.payload;
    }
  }
  try {
    const res = await fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 800,
        system: 'You generate crop disease alerts for Indian farmers. Respond ONLY with a valid JSON array, no markdown.',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    const txt = data.content.map(b => b.type === 'text' ? b.text : '').join('');
    const m = txt.replace(/```json|```/g, '').trim().match(/\[[\s\S]*\]/);
    const alerts = JSON.parse(m ? m[0] : txt);
    localStorage.setItem(cacheKey, JSON.stringify({timestamp: Date.now(), payload: alerts}));
    return alerts;
  } catch(e) {
    return fallback;
  }
}
