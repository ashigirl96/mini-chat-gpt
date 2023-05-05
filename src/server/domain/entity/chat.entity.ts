export class ChatEntity {
  constructor(
    public id: string,
    public prompt: string,
    public answer: string,
    public timelineId: string,
  ) {}

  static fromPrisma({
    id,
    prompt,
    answer,
    timelineId,
  }: {
    id: string
    prompt: string
    answer: string
    timelineId: string
  }) {
    return new ChatEntity(id, prompt, answer, timelineId)
  }
}
