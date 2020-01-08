import { createContext } from "react";
import NoteStore from "./noteStore";

export class RootStore {
    noteStore: NoteStore;


    constructor() {
        this.noteStore = new NoteStore(this);
    }
}


export const RootStoreContext = createContext(new RootStore());