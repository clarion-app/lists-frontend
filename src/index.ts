import { BackendType } from "@clarion-app/types";
import { listsApi } from "./listsApi";
import Lists from "./Lists";
import List from "./List";

export const backend: BackendType = { url: "http://localhost:8000", token: "" };

const initializeFrontend = (setBackendUrl: string) => {
    backend.url = setBackendUrl;
};

const setFrontendToken = (token: string) => {
    backend.token = token;
};

export { initializeFrontend, listsApi, setFrontendToken, Lists, List };
