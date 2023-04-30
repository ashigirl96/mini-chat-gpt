import { Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai';

export interface ChatResponse {
  text?: string;
  messageId?: string;
}

class ChatGPTClient {
  private openAI: OpenAIApi;

  constructor() {
    console.log('AAAA', process.env.OPEN_AI_API_KEY);
    const config = new Configuration({
      apiKey: process.env.OPEN_AI_API_KEY,
    });
    this.openAI = new OpenAIApi(config);
  }

  async respond(request: CreateChatCompletionRequest): Promise<ChatResponse> {
    try {
      const res = await this.openAI.createChatCompletion(request);
      if (!res.data || !res.data.choices) {
        return { text: 'Please try again later.' };
      }
      return {
        text: res.data.choices[0]?.message?.content ?? '',
        messageId: res.data.id,
      };
    } catch (e) {
      throw e;
    }
  }
}

export const chatGPTClient = new ChatGPTClient();
