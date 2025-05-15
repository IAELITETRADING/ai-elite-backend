const axios = require('axios');

exports.callChatGPT = async (prompt, temperature = 0.7) => {
  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.data.choices[0].message.content;
  } catch (err) {
    console.error('❌ Erreur OpenAI:', err.response?.data || err.message);
    throw new Error('Erreur lors de l’appel à OpenAI');
  }
};
