import { useGetListsQuery, useCreateListMutation, useUpdateListMutation, useCloneListMutation, ListType } from './listsApi';
import { useState } from 'react';

const Lists = () => {
  const { data: lists, error, isLoading } = useGetListsQuery(null);
  const [createList] = useCreateListMutation();
  const [updateList] = useUpdateListMutation();
  const [cloneList] = useCloneListMutation();
  const [listName, setListName] = useState('');
  const [editList, setEditList] = useState<{ id: string; name: string } | null>(null);

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (listName.trim()) {
      await createList({ name: listName });
      setListName('');
    }
  };

  const handleEditList = (list: { id: string; name: string }) => {
    setEditList(list);
  };

  const handleSaveEditList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editList && editList.name.trim()) {
      await updateList({ id: editList.id, list: { name: editList.name } });
      setEditList(null);
    }
  };

  const handleCloneList = async (id: string) => {
    await cloneList(id);
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
      <ul>
        {lists?.map((list: ListType) => (
          <li key={list.id} className="mb-2">
            {editList && editList.id === list.id ? (
              <form onSubmit={handleSaveEditList} className="inline">
                <input
                  type="text"
                  value={editList.name}
                  onChange={(e) => setEditList({ ...editList, name: e.target.value })}
                  className="border p-2 mr-2"
                />
                <button type="submit" className="bg-green-500 text-white p-2">Save</button>
                <button
                  type="button"
                  onClick={() => setEditList(null)}
                  className="bg-red-500 text-white p-2 ml-2"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span>{list.name}</span>
                <button
                  onClick={() => handleEditList(list)}
                  className="bg-yellow-500 text-white p-2 ml-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCloneList(list.id)}
                  className="bg-purple-500 text-white p-2 ml-2"
                >
                  Clone
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
        {lists?.map((list: ListType) => (
          <a key={list.id} href={"/clarion-app/lists/" + list.id}>{list.name}</a>
        ))}
    </div>
  );
};

export default Lists;
