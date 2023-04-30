import NextError from 'next/error';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '~/pages/_app';
import { RouterOutput, trpc } from '~/utils/trpc';
import { useEffect, useState } from 'react';

// type PostByIdOutput = RouterOutput['post']['byId'];

// function PostItem(props: { post: PostByIdOutput }) {
//   const { post } = props;
//   return (
//     <>
//       <h1>{post.title}</h1>
//       <em>Created {post.createdAt.toLocaleDateString('en-us')}</em>
//
//       <p>{post.text}</p>
//
//       <h2>Raw data:</h2>
//       <pre>{JSON.stringify(post, null, 4)}</pre>
//     </>
//   );
// }

const PostViewPage: NextPageWithLayout = () => {
  const mutate = trpc.chat.createChatCompletion.useMutation();
  const [text, setText] = useState('');

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

  return (
    <>
      <input value={text} onChange={(e) => setText(e.currentTarget.value)} />
      <div>{text}</div>
      <button onClick={() => mutate.mutate(text)}>Submit</button>
      <div>{mutate.data?.text || ''}</div>
    </>
  );
};

export default PostViewPage;
