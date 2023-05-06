import { NextPageWithLayout } from '~/pages/_app'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { Input, Stack, Text } from '@chakra-ui/react'
import { trpc } from '~/utils/trpc'
import NextError from 'next/error'
import { Button } from '@saas-ui/react'

const TimelineViewPage: NextPageWithLayout = () => {
  const router = useRouter()
  const timelineId = useMemo<string>(
    () => (typeof router.query.id === 'string' ? router.query.id : ''),
    [router.query.id],
  )
  const query = trpc.chat.fetchChatTimeline.useQuery({
    id: timelineId,
  })
  const mutate = trpc.chat.createChatCompletion.useMutation()
  const [prompt, setPrompt] = useState('')

  const upload = useCallback(async () => {
    await mutate.mutateAsync({
      timelineId,
      prompt,
    })
    await query.refetch()
  }, [mutate, prompt, query, timelineId])

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

  if (query.error) {
    return (
      <NextError
        title={query.error.message}
        statusCode={query.error.data?.httpStatus ?? 500}
      />
    )
  }
  if (query.isLoading) {
    return <>Loading...</>
  }

  return (
    <Stack>
      <Text>{timelineId}</Text>
      {query.data?.chats.map((chat) => (
        <Stack key={chat.id}>
          <Text>{chat.prompt}</Text>
          <Text>{chat.response}</Text>
        </Stack>
      ))}

      <Stack>
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.currentTarget.value)}
        />

        <Button onClick={upload}>作成</Button>
      </Stack>
    </Stack>
  )
}

export default TimelineViewPage
