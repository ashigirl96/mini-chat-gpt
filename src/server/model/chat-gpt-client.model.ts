import { Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai'
import type { AxiosRequestConfig } from 'axios'

export interface ChatResponse {
  text?: string
  messageId?: string
}

class ChatGPTClient {
  private openAI: OpenAIApi

  constructor() {
    const config = new Configuration({
      apiKey: process.env.OPEN_AI_API_KEY,
    })
    this.openAI = new OpenAIApi(config)
  }

  async respond(
    request: CreateChatCompletionRequest,
    options?: AxiosRequestConfig,
  ): Promise<ChatResponse> {
    try {
      const res = await this.openAI.createChatCompletion(
        request,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        options,
      )
      if (!res.data || !res.data.choices) {
        return { text: 'Please try again later.' }
      }
      return {
        text: res.data.choices[0]?.message?.content ?? '',
        messageId: res.data.id,
      }
    } catch (e) {
      throw e
    }
  }
}

export const chatGPTClient = new ChatGPTClient()
