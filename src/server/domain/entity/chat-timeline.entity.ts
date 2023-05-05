import { ChatCompletionRequestMessageRoleEnum } from 'openai'
import { ChatEntity } from '~/server/domain/entity/chat.entity'

interface ChatGptMessage {
  role: ChatCompletionRequestMessageRoleEnum
  content: string
}

export class ChatTimelineEntity {
  constructor(
    public id: string,
    public title: string,
    public chats: ChatEntity[],
  ) {}

  static fromPrisma({
    id,
    title,
    chats,
  }: {
    id: string
    title: string
    chats: ChatEntity[]
  }) {
    return new ChatTimelineEntity(id, title, chats)
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
          content: chat.response ?? '',
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
