import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetListQuery, useUpdateListMutation } from './listsApi';

const List = () => {
  const { id } = useParams<{ id: string }>();
  const { data: list, error, isLoading } = useGetListQuery(id!);
  const [updateList] = useUpdateListMutation();
  const [newItemName, setNewItemName] = useState('');
  const [editItem, setEditItem] = useState<{ id: string; name: string } | null>(null);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (list && newItemName.trim()) {
      const updatedItems = [...list.items, { id: Date.now().toString(), name: newItemName }];
      await updateList({ id: list.id, list: { ...list, items: updatedItems } });
      setNewItemName('');
    }
  };

  const handleEditItem = (item: { id: string; name: string }) => {
    setEditItem(item);
  };

  const handleSaveEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (list && editItem && editItem.name.trim()) {
      const updatedItems = list.items.map((item) =>
        item.id === editItem.id ? { ...item, name: editItem.name } : item
      );
      await updateList({ id: list.id, list: { ...list, items: updatedItems } });
      setEditItem(null);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (list) {
      const updatedItems = list.items.filter((item) => item.id !== itemId);
      await updateList({ id: list.id, list: { ...list, items: updatedItems } });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      <h3>{list?.name}</h3>
      <form onSubmit={handleAddItem} className="mb-4">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New item name"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Item</button>
      </form>
      <ul>
        {list?.items.map((item) => (
          <li key={item.id} className="mb-2">
            {editItem && editItem.id === item.id ? (
              <form onSubmit={handleSaveEditItem}>
                <input
                  type="text"
                  value={editItem.name}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                  className="border p-2 mr-2"
                />
                <button type="submit" className="bg-green-500 text-white p-2">Save</button>
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="bg-red-500 text-white p-2 ml-2"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span>{item.name}</span>
                <button
                  onClick={() => handleEditItem(item)}
                  className="bg-yellow-500 text-white p-2 ml-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 text-white p-2 ml-2"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
