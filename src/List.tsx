import { useParams } from 'react-router-dom';
import { useGetListQuery } from './listsApi';

const List = () => {
  const { name } = useParams<{ name: string }>();
  const { data: list, error, isLoading } = useGetListQuery(name!);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      <h3>{list?.name}</h3>
      <ul>
        {list?.items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
