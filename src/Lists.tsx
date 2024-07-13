import { useGetListsQuery, useCreateListMutation, ListType } from './listsApi';
import { useState } from 'react';

const Lists = () => {
  const { data: lists, error, isLoading } = useGetListsQuery(null);
  const [createList] = useCreateListMutation();
  const [listName, setListName] = useState('');

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (listName.trim()) {
      await createList({ name: listName });
      setListName('');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      <h1>Lists</h1>
      <form onSubmit={handleCreateList} className="mb-4">
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="New list name"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Create List</button>
      </form>
        {lists?.map((list: ListType) => (
          <a key={list.id} href={"/clarion-app/lists/" + list.id}>{list.name}</a>
        ))}
    </div>
  );
};

export default Lists;
