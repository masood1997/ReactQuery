import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';

const Posts = () => {
  const apiPrivateInstance = useAxiosPrivate();
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      return await apiPrivateInstance.get('/task/myTasks');
    }
  });
  
  return (
    <>
      {postsQuery.isLoading && <p>Loading Posts...</p>}
      {postsQuery.isError && <p>{JSON.stringify(postsQuery.error.message)}</p>}
      {postsQuery.data &&
        postsQuery.data?.data?.tasks.map((post) => {
          return (
            <article key={post._id}>
              <Link to={`/post/${post._id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.description}</p>
              <Link
                to={`/edit/${post._id}`}
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-lime-400 ml-4"
              >
                ✏️
              </Link>
            </article>
          );
        })}
    </>
  );
};

export default Posts;
