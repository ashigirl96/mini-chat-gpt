import { ChatResponseStatus } from '@prisma/client'

export class ChatEntity {
  constructor(
    public id: string,
    public prompt: string,
    public response: string | null,
    public timelineId: string,
    public status: ChatResponseStatus,
  ) {}

  static fromPrisma({
    id,
    prompt,
    response,
    timelineId,
    status,
  }: {
    id: string
    prompt: string
    response: string | null
    timelineId: string
    status: ChatResponseStatus
  }) {
    return new ChatEntity(id, prompt, response, timelineId, status)
  }
}
