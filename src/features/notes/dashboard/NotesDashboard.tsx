import React, { Fragment, useContext, useEffect } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import NotesForm from '../form/NotesForm';
import NotesList from './NotesList';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

const Dashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        loadNotes,
        loadingInitial,
    } = rootStore.noteStore;

    useEffect(() => {
        loadNotes();
      }, [loadNotes]);


    return (
        <Fragment>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 1100 }}>
                    <Container style={{ border: '2px solid #CFDEF3', height: 'auto', }}>
                        <Grid columns={2} padded='vertically'  >
                            <Grid.Row stretched>
                                <Grid.Column>
                                    <NotesList />
                                </Grid.Column>
                                <Grid.Column>
                                    <Container>
                                        <NotesForm />
                                    </Container>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Grid.Column>
            </Grid>
        </Fragment>

    )
}

export default observer(Dashboard);
