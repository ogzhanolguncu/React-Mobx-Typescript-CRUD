import React, { useContext } from 'react'
import { List, Container, Header } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'

const NotesList: React.FC = () => {
    const rootStore = useContext(RootStoreContext)
    const { getNotesFromStore } = rootStore.noteStore;
    return (
        <Container>
            <Header as='h2' dividing size='medium'>Note List</Header>
            <List selection animated style={{ margin: '10px' }}>
                {getNotesFromStore.map((note, index) => {
                    return (
                        <List.Item key={index}>
                            <List.Header>{note.title}</List.Header>
                            <List.Content >{note.description}</List.Content>
                        </List.Item>
                    )
                })}
            </List>
        </Container>
    )
}

export default NotesList
