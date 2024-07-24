import { BackendType } from "@clarion-app/types";
import { listsApi as listsFrontendApi } from "./listsApi";
import Lists from "./Lists";
import List from "./List";

export const backend: BackendType = { url: "http://localhost:8000", token: "" };

const initializeListsFrontend = (setBackendUrl: string) => {
    backend.url = setBackendUrl;
};

const setListsFrontendToken = (token: string) => {
    backend.token = token;
};

export { initializeListsFrontend, listsFrontendApi, setListsFrontendToken, Lists, List };
