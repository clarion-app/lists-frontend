import { useGetListsQuery, ListType } from './listsApi';

const Lists = () => {
  const { data: lists, error, isLoading } = useGetListsQuery(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      <h1>Lists</h1>
      <ul>
        {lists?.map((list: ListType) => (
          <li key={list.id}>{list.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Lists;
