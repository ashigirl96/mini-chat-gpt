import { NextPageWithLayout } from '~/pages/_app'
import { useState } from 'react'
import { trpc } from '~/utils/trpc'
import NextError from 'next/error'
import { Input } from '@chakra-ui/react'
import { Button } from '@saas-ui/react'

function Chat({
  mutate,
}: {
  mutate: ReturnType<typeof trpc.chat.createChatCompletion.useMutation> // TODO: もっと良い書き方ない？
}) {
  const [text, setText] = useState('')

  return (
    <>
      <Input value={text} onChange={(e) => setText(e.currentTarget.value)} />
      <div>{text}</div>
      <Button
        onClick={() =>
          mutate.mutate({
            prompt: text,
            chatTimelineId: null,
          })
        }
      >
        Submit
      </Button>
      <div>{mutate.data?.text || ''}</div>
    </>
  )
}

const ChatViewPage: NextPageWithLayout = () => {
  const mutate = trpc.chat.createChatCompletion.useMutation()

  if (mutate.error) {
    return (
      <NextError
        title={mutate.error.message}
        statusCode={mutate.error.data?.httpStatus ?? 500}
      />
    )
  }

  if (mutate.isLoading) {
    return <>Loading...</>
  }
  return <Chat mutate={mutate} />
}

export default ChatViewPage
