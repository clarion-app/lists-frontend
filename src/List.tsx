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
    <div className="fixed-grid has-2-cols">
      <h1 className="title">List Manager - {list?.name}</h1>
      <form onSubmit={handleAddItem} className="mb-4">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New item name"
          className="p-2 mr-2 is-3"
        />
        <button type="submit" className="button p-2">Add Item</button>
      </form>
        {list?.items.map((item) => (
        <div key={item.id} className="mb-2">
            {editItem && editItem.id === item.id ? (
              <div className="grid">
              <form onSubmit={handleSaveEditItem}>
                <div className="cell">
                <input
                  type="text"
                  value={editItem.name}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                  className="p-2 mr-2"
                />
                </div>
                <div className="cell">
                <button type="submit" className="p-2">Save</button>
                </div>
                <div className="cell">
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="p-2 ml-2"
                >
                  Cancel
                </button>
                </div>
              </form>
              </div>
            ) : (
              <div key={item.id} className="grid">
                <div className="cell is-size-4 is-half">{item.name}</div>
                <div className="cell">
                <button
                  onClick={() => handleEditItem(item)}
                  className="button is-primary is-light is-small mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="button is-danger is-small"
                >
                  Delete
                </button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default List;
