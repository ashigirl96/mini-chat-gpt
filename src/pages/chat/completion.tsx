import { NextPageWithLayout } from '~/pages/_app';
import { useState } from 'react';
import { trpc } from '~/utils/trpc';
import NextError from 'next/error';

function Chat({
  mutate,
}: {
  mutate: ReturnType<typeof trpc.chat.createChatCompletion.useMutation>; // TODO: もっと良い書き方ない？
}) {
  const [text, setText] = useState('');

  return (
    <>
      <input value={text} onChange={(e) => setText(e.currentTarget.value)} />
      <div>{text}</div>
      <button onClick={() => mutate.mutate(text)}>Submit</button>
      <div>{mutate.data?.text || ''}</div>
    </>
  );
}

const ChatViewPage: NextPageWithLayout = () => {
  const mutate = trpc.chat.createChatCompletion.useMutation();

  if (mutate.error) {
    return (
      <NextError
        title={mutate.error.message}
        statusCode={mutate.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (mutate.isLoading) {
    return <>Loading...</>;
  }
  return <Chat mutate={mutate} />;
};

export default ChatViewPage;
