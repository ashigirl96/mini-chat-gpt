import {
  chatGPTClient,
  ChatResponse,
} from '~/server/model/chat-gpt-client.model';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';

interface ChatGptMessage {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
}

const chatGptMessages = (message: string): ChatGptMessage[] => [
  // TODO: ここらへんよくわからんから調べる
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: 'You are a helpful assistant.',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: message,
  },
];

export class CreateChatCompletionUsecase {
  execute(message: string): Promise<ChatResponse> {
    const messages = chatGptMessages(message);
    return chatGPTClient.respond({
      messages,
      model: 'gpt-3.5-turbo',
      stream: false,
    });
  }
}
