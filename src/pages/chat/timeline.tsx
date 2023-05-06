import { NextPageWithLayout } from '~/pages/_app'
import { trpc } from '~/utils/trpc'
import NextError from 'next/error'
import { useState } from 'react'
import { Input, Stack } from '@chakra-ui/react'
import { Button } from '@saas-ui/react'

const TimelineViewPage: NextPageWithLayout = () => {
  const createChatTimeline = trpc.chat.createChatTimeline.useMutation()
  const [title, setTitle] = useState('')

  if (createChatTimeline.error) {
    return (
      <NextError
        title={createChatTimeline.error.message}
        statusCode={createChatTimeline.error.data?.httpStatus ?? 500}
      />
    )
  }
  if (createChatTimeline.isLoading) {
    return <>Loading...</>
  }

  return (
    <Stack>
      <Input value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      <Button
        onClick={() =>
          createChatTimeline.mutate({
            title,
          })
        }
      >
        Create Timeline
      </Button>
    </Stack>
  )
}

export default TimelineViewPage
