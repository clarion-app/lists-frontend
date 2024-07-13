import { BackendType } from "@clarion-app/types";
import { listsApi as listsFrontendApi } from "./listsApi";
import Lists from "./Lists";
import List from "./List";

export const backend: BackendType = { url: "http://localhost:8000" };

const initializeWizlightFrontend = (setBackendUrl: string) => {
    backend.url = setBackendUrl;
};

export { initializeWizlightFrontend, listsFrontendApi, Lists, List };