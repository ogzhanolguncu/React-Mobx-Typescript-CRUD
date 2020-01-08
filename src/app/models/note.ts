export interface INote {
    id: string;
    title: string;
    description: string;
    date: Date;
}

export interface INoteFormValues extends Partial<INote> {
}


export class NoteFormValues implements INoteFormValues {
    id?: string = undefined;
    title: string = '';
    description: string = '';
    date?: Date = undefined;

    constructor(init?: NoteFormValues) {

        Object.assign(this, init);
    }
}