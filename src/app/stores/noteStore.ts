import { RootStore } from "./rootStore";
import { INote } from "../models/note";
import { observable, action, toJS, runInAction, computed } from 'mobx'
import agent from "../api/agent";
export default class NoteStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }


    @observable noteRegistry = new Map();
    @observable note: INote | null = null;
    @observable submitting: boolean = false;
    @observable loadingInitial: boolean = false;
    @observable noteConunt: number = 0;
    @observable selectedItemId: string | null= null;

    getNoteFromStore = (id: string): INote => {
        return this.noteRegistry.get(id);
    }


    @computed get getNotesFromStore() {
        return Array.from(this.noteRegistry.values());
      };

    @action selectNote = (id: string) => {
        this.selectedItemId = id;
        let note = this.getNoteFromStore(this.selectedItemId!);
        return toJS(note);
    }



    @action loadNote = async (id: string) => {
        let note = this.getNoteFromStore(id);
        if (note) {
            this.note = note;
            return toJS(note);
        } else {
            this.loadingInitial = true;
            try {
                note = await agent.Notes.details(id);
                runInAction('loading note', () => {
                    this.note = note;
                    this.noteRegistry.set(note.id, note);
                    this.loadingInitial = false;
                });
                return note;
            } catch (error) {
                runInAction('loading note error', () => {
                    this.loadingInitial = false;
                });

            }

        }

    }


    @action loadNotes = async () => {
        this.loadingInitial = true;
        try {
            const notes: INote[] = await agent.Notes.list()
            runInAction('loading activities', () => {
                notes.forEach((note) => {
                    this.noteRegistry.set(note.id, note);
                });
                this.loadingInitial = false
                
            });
        } catch (error) {
            runInAction('loading activities', () => {
                this.loadingInitial = false
            })
        }
    };


    @action createNote = async (note: INote) => {
        this.submitting = true;
        console.log(1,this.submitting)
        try {
            await agent.Notes.create(note);
            runInAction('creating activity', () => {
                this.noteRegistry.set(note.id, note);
                this.submitting = false;
                console.log(2,this.submitting)
            })
        } catch (error) {
            runInAction('create activity error', () => {
                this.submitting = false;
            });
            console.log(error.response);
        }
    }


    @action editNote  = async (note: INote) => {
        this.submitting = true;
        try {
            await agent.Notes.update(note);
            runInAction('editing activity', () => {
                this.noteRegistry.set(note.id, note);
                this.note = note;
                this.submitting = false;
            })
        } catch (error) {
            runInAction('editing activity error', () => {
                this.submitting = false
            })
            console.log(error);
        }
    }


    @action deleteNote = async (
        id: string
      ) => {
        this.loadingInitial = true;
        try {
          await agent.Notes.delete(id);
          runInAction('deleting note', () => {
            this.noteRegistry.delete(id);
            this.loadingInitial = false;
          });
        } catch (error) {
          runInAction('delete activity error', () => {
            this.loadingInitial= false;
          });
          console.log(error);
        }
      };
    




    
    
}


