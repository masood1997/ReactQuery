import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import apiPrivateInstance from '../../api/todoPrivateApi';
import usePostQuery from '../../hooks/usePostQuery';
import { useState } from 'react';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const individualPost = usePostQuery(id);
  const [title, setTitle] = useState(individualPost.data?.data?.task?.title || '');
  const [description, setDescription] = useState(individualPost.data?.data?.task?.description || '');

  const updatePost = useMutation({
    mutationFn: async (data) => {
      const response = await apiPrivateInstance.put(`/task/${id}`, { ...data });
      return response.data;
    },
    onSuccess: (data, variable, context) => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true,
        refetchType: 'all'
        //If you want inactive queries to refetch as well, use the refetchType: 'all' option
      });
      queryClient.setQueryData(['post', data.task._id], data);
      setDescription('');
      setTitle('');
      navigate(`/post/${id}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost.mutate({ title, description });
  };

  return (
    <>
      {individualPost.isLoading && <p>Loading...</p>}
      {individualPost.isError && <p>{JSON.stringify(individualPost.error)}</p>}

      <input id="title" type="text" value={title} required onChange={(e) => setTitle(e.target.value)} />
      <label htmlFor="title">Title</label>
      <input
        id="description"
        type="text"
        value={description}
        required
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="title">Description</label>

      <button disabled={updatePost.isPending} onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default EditPost;
