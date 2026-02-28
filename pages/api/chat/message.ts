import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: message }
      ],
    });

    res.status(200).json({
      message: completion.choices[0].message.content,
      response_time: 0
    });

  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "AI failed" });
  }
}
        const startTime = Date.now();
        const completion = await groq.chat.completions.create({
            messages: chatHistory,
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 2048,
        });
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        const assistantMessage = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

        await query(
            'INSERT INTO messages (session_id, role, content, response_time) VALUES ($1, $2, $3, $4)',
            [sessionId, 'assistant', assistantMessage, responseTime]
        );

        await query(
            'UPDATE chat_sessions SET updated_at = NOW() WHERE id = $1',
            [sessionId]
        );

        // Generate a concise title using AI after the second user message
        try {
            // Count user messages (we just added one, so check if this is the second)
            const userMessagesCount = messagesResult.rows.filter((msg: any) => msg.role === 'user').length;

            // After inserting the current message, we'll have 2 user messages
            if (userMessagesCount === 1) { // This condition means the current message is the second user message
                // Get the first two user messages
                const userMessages = await query(
                    'SELECT content FROM messages WHERE session_id = $1 AND role = $2 ORDER BY created_at ASC LIMIT 2',
                    [sessionId, 'user']
                );

                const firstMessage = userMessages.rows[0]?.content || '';
                const secondMessage = message; // The current message is the second user message

                const titleCompletion = await groq.chat.completions.create({
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a title generator. Generate a very short, concise title (maximum 4-5 words) that summarizes the following conversation. Only respond with the title, nothing else.'
                        },
                        {
                            role: 'user',
                            content: `First message: ${firstMessage}\n\nSecond message: ${secondMessage}`
                        }
                    ],
                    model: 'llama-3.3-70b-versatile',
                    temperature: 0.7,
                    max_tokens: 20,
                });

                const generatedTitle = titleCompletion.choices[0]?.message?.content?.trim() || firstMessage.split(' ').slice(0, 5).join(' ');

                await query(
                    'UPDATE chat_sessions SET title = $1 WHERE id = $2',
                    [generatedTitle, sessionId]
                );
            }
        } catch (titleError) {
            console.error('Title generation error:', titleError);
            // Fallback - do nothing, the chat will keep "New Chat" as title
        }

        res.status(200).json({
            success: true,
            message: assistantMessage,
            response_time: responseTime
        });
    } catch (error) {
        console.error('Message error:', error);
        res.status(500).json({ error: 'Failed to process message' });
    }
}

