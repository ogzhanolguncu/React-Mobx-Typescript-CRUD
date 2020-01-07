import React from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, isRequired } from 'revalidate';
import { Grid, Button, Form, Container, Header } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';

const NotesForm: React.FC = () => {
    const formRef: any = React.useRef<HTMLFormElement>(null);
    const validate = combineValidators({
        title: isRequired({ message: 'Title is required.' }),
        description: isRequired({ message: 'Description is required' }),

    });


    const handlerFinalFormSubmit = (values: any) => {
        console.log(values);
        console.log(formRef.handleSubmit.Scopes[3])
    };



    return (
        <Container>
            <Header as='h2' dividing size='medium'>Note Details</Header>
            <Grid>
                <Grid.Column width={11}>
                        <FinalForm
                            validate={validate}
                            onSubmit={handlerFinalFormSubmit}
                            render={({ handleSubmit, invalid, pristine, submitting}) => (
                                <Form onSubmit={handleSubmit}>
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
                                    <Button disabled={invalid || pristine ||submitting} floated='right' primary type='submit' content='Submit'></Button>
                                    <Button floated='right' type='button' content='Cancel'></Button>
                                </Form>
                            )} />
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default NotesForm
