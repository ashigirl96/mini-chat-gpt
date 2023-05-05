export class ChatEntity {
  constructor(
    public id: string,
    public prompt: string,
    public response: string,
    public timelineId: string,
  ) {}

  static fromPrisma({
    id,
    prompt,
    response,
    timelineId,
  }: {
    id: string
    prompt: string
    response: string
    timelineId: string
  }) {
    return new ChatEntity(id, prompt, response, timelineId)
  }
}
