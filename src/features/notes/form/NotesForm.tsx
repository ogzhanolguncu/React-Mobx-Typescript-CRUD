import React from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, isRequired } from 'revalidate';
import { Grid, Button, Form, Container, Header } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';

const NotesForm: React.FC = () => {
    const validate = combineValidators({
        title: isRequired({ message: 'Title is required.' }),
        description: isRequired({ message: 'Description is required' }),

    });


    const handlerFinalFormSubmit = async (values: any) => {
        console.log(values)
        await new Promise(r => setTimeout(r, 1000));

    };



    return (
        <Container>
            <Header as='h2' dividing size='medium'>Note Details</Header>
            <Grid>
                <Grid.Column width={11}>
                    <FinalForm
                        validate={validate}
                        onSubmit={handlerFinalFormSubmit}
                        render={({ handleSubmit, form, invalid, pristine, submitting }) => (
                            <Form
                                onSubmit={(event) => {
                                    const promise = handleSubmit(event);
                                    promise && promise.then(() => {
                                        form.reset();
                                    })
                                    console.log(promise)
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
                                <Button disabled={invalid || pristine || submitting} floated='right' primary type='submit' content='Submit' loading={submitting ? true: false}></Button>
                                <Button floated='right' type='button' content='Cancel' onClick={form.reset}></Button>
                            </Form>
                        )} />
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default NotesForm
