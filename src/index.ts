import { BackendType } from "@clarion-app/types";
import { listsApi } from "./listsApi";
import Lists from "./Lists";
import List from "./List";

export const backend: BackendType = { url: "http://localhost:8000", user: { id: "", name: "", email: ""} };

export const updateFrontend = (config: BackendType) => {
    backend.url = config.url;
    backend.user = config.user;
};

export { listsApi, Lists, List };
