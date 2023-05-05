import { ChatCompletionRequestMessageRoleEnum } from 'openai'
import { ChatEntity } from '~/server/domain/entity/chat.entity'

interface ChatGptMessage {
  role: ChatCompletionRequestMessageRoleEnum
  content: string
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
]

export class ChatTimelineEntity {
  constructor(public id: string, public chats: ChatEntity[]) {}

  static fromPrisma({ id, chats }: { id: string; chats: ChatEntity[] }) {
    return new ChatTimelineEntity(id, chats)
  }

  public messages(prompt: string): ChatGptMessage[] {
    const messages = this.chats.reduce<ChatGptMessage[]>((acc, chat) => {
      return [
        ...acc,
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: chat.prompt,
        },
        {
          role: ChatCompletionRequestMessageRoleEnum.Assistant,
          content: chat.response,
        },
      ]
    }, [])
    messages.push({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: prompt,
    })
    return messages
  }
}
