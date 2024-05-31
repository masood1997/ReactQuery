import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import usePostQuery from '../../hooks/usePostQuery';

const PostPage = () => {
  const { id } = useParams();
  const apiPrivateInstance = useAxiosPrivate();

  const individualPost = usePostQuery(id);

  // note we have to mention the individual posts's unique attribute to make the enabled key work as expected.
  // as we want the user detail to be fetched after the individual post is fetched
  // if we mention only userDetail then it will be cached and in all calls the value will be displayed from cache
  // that is user info will show but the individual post will be in loading
  // Also if we mention user._id as 2nd attribute then all individual posts created by the user the user will be fetched from cache
  // Hence here mentioning post._id is the correct choice for 2nd attribute in the queryKey array.
  const userQuery = useQuery({
    enabled: individualPost.data?.data?.task?.description !== null,
    queryKey: ['userDetail', individualPost?.data?.data?.task?._id],
    queryFn: async () => {
      return await apiPrivateInstance.get('/user/myDetails');
    }
  });

  return (
    <>
      {individualPost.isLoading && <p>Loading Post...</p>}
      {individualPost.error && <p>{JSON.stringify(individualPost.error.message)}</p>}
      {individualPost.data && (
        <section>
          <h1>{individualPost.data?.data?.task?.title}</h1>
          <h1>{individualPost.data?.data?.task?.description}</h1>
        </section>
      )}
      {userQuery.isLoading && <p>Loading User Detail...</p>}
      {userQuery.isError && <p>{JSON.stringify(userQuery.error.message)}</p>}
      {userQuery.data && (
        <section>
          <h1>{userQuery.data?.data?.message?.user?.name}</h1>
        </section>
      )}

      <Link to={'/'}>Go To Home</Link>
    </>
  );
};

export default PostPage;
