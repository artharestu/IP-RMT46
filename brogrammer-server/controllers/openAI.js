const OpenAI = require('openai');
const apiKey = process.env.OPENAI_API_KEY;

const chatAI = async (req, res, next) => {
  const openai = new OpenAI({ apiKey });
  const { message } = req.body
  try {
    if (!message) throw { name: 'InvalidDataInput' }
    const getResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Kamu adalah seorang chatbot yang membantu dalam belajar pemrograman komputer. Nama kamu adalah Brogrammer.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const completionText = getResponse.choices[0].message.content;
    res.status(200).json({ message: completionText });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  chatAI
};