import {
  useGetListsQuery,
  useCreateListMutation,
  useUpdateListMutation,
  useCloneListMutation,
  useDeleteListMutation,
  ListType,
} from "./listsApi";
import { useState } from "react";

const Lists = () => {
  const { data: lists, error, isLoading } = useGetListsQuery(null);
  const [createList] = useCreateListMutation();
  const [updateList] = useUpdateListMutation();
  const [cloneList] = useCloneListMutation();
  const [listName, setListName] = useState("");
  const [editList, setEditList] = useState<{ id: string; name: string } | null>(
    null
  );
  const [deleteList] = useDeleteListMutation();

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (listName.trim()) {
      await createList({ name: listName });
      setListName("");
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

  const handleDeleteList = async (id: string) => {
    await deleteList(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <section className="section fixed-grid has-4-cols">
      <h1 className="title">List Manager - Lists</h1>
      <form onSubmit={handleCreateList}>
        <div className="grid mb-4">
          <div className="cell">
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="New list name"
              className="input"
            />
          </div>
          <div className="cell">
            <button type="submit" className="button is-success">
              Create List
            </button>
          </div>
        </div>
      </form>
      {lists?.map((list: ListType) => (
        <div key={list.id} className="grid">
          {editList && editList.id === list.id ? (
            <form onSubmit={handleSaveEditList} className="inline">
              <input
                type="text"
                value={editList.name}
                onChange={(e) =>
                  setEditList({ ...editList, name: e.target.value })
                }
              />
              <button type="submit" className="button">
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditList(null)}
                className="button is-danger"
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <div className="is-size-4 cell">
                <a key={list.id} href={"/clarion-app/lists/" + list.id}>
                  {list.name}
                </a>
              </div>
              <div className="cell">
                <button
                  onClick={() => handleEditList(list)}
                  className="button is-primary is-light"
                >
                  Edit
                </button>
              </div>
              <div className="cell">
                <button
                  onClick={() => handleCloneList(list.id)}
                  className="button is-primary is-light"
                >
                  Clone
                </button>
              </div>
              <div className="cell">
                <button
                  onClick={() => handleDeleteList(list.id)}
                  className="button is-danger"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default Lists;
