export interface INote {
    id: string;
    title: string;
    description: string;
}

export interface INoteFormValues extends Partial<INote> {
}


export class NoteFormValues implements INoteFormValues {
    id?: string = undefined;
    title: string = '';
    description: string = '';

    constructor(init?: INoteFormValues) {

        Object.assign(this, init);
    }
}