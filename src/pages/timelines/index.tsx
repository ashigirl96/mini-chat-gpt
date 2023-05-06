import { NextPageWithLayout } from '~/pages/_app'
import { trpc } from '~/utils/trpc'
import NextError from 'next/error'
import { Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'

const TimelineIndexPage: NextPageWithLayout = () => {
  const query = trpc.chat.fetchChatTimelines.useQuery()
  if (query.error) {
    return (
      <NextError
        title={query.error.message}
        statusCode={query.error.data?.httpStatus ?? 500}
      />
    )
  }
  if (query.isFetching) {
    return <>Loading...</>
  }
  return (
    <Stack>
      {query.data?.map((timeline) => (
        <>
          <Stack key={timeline.id}>
            <Link href={`/timelines/${timeline.id}`}>
              <Text>{timeline.title}</Text>
            </Link>
            {timeline.chats.map((chat) => (
              <Stack key={chat.id}>
                <Text>Prompt: {chat.prompt}</Text>
                <Text>Answer: {chat.response}</Text>
              </Stack>
            ))}
          </Stack>
        </>
      ))}
    </Stack>
  )
}

export default TimelineIndexPage
