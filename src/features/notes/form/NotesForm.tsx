import React, { useContext, useState, useEffect } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, isRequired } from 'revalidate';
import { Grid, Button, Form, Container, Header } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { INote } from '../../../app/models/note';
import { observer } from 'mobx-react-lite';




const NotesForm: React.FC = () => {
    const rootStore = useContext(RootStoreContext)
    const { createNote, submitting, editNote, selectNote, selectedItemId } = rootStore.noteStore;

    const [note , setNote] = useState();

    useEffect(() => {
        if(!selectedItemId){}
        let note = selectNote(selectedItemId!);
        setNote(note);
        console.log(note);
      }, [selectedItemId,selectNote]);

      
    const validate = combineValidators({
        title: isRequired({ message: 'Title is required.' }),
        description: isRequired({ message: 'Description is required' }),

    });


    const handlerFinalFormSubmit = async (values: INote) => {
        if(!values.id) {
            createNote(values)
        }
        else {
            editNote(values)
        }
    };

    

    


    return (
        <Container>
            <Header as='h2' dividing size='medium'>Note Details</Header>
            <Grid>
                <Grid.Column width={11}>
                    <FinalForm
                        validate={validate}
                        initialValues={note}
                        onSubmit={handlerFinalFormSubmit}
                        render={({ handleSubmit, form, invalid, pristine }) => (
                            <Form
                                onSubmit={(event) => {
                                    const promise = handleSubmit(event);
                                    promise && promise.then(() => {
                                        form.reset();
                                    })
                                    return promise;
                                }}>
                                <Field
                                    name='title'
                                    placeholder='Title'
                                    component={TextInput}
                                />
                                <Field
                                    placeholder='Description'
                                    name='description'
                                    rows={3}
                                    component={TextAreaInput} />
                                <Button loading={submitting} disabled={invalid || pristine || submitting} floated='right' primary type='submit' content='Submit' ></Button>
                                <Button floated='right' type='button' content='Cancel' onClick={form.reset}></Button>
                            </Form>
                        )} />
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default observer(NotesForm)
