import React, { useContext, Fragment } from 'react'
import { List, Container, Header, Icon, Divider } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'
import { observer } from 'mobx-react-lite'
import LoadingComponent from '../../../app/layout/LoadingComponent'

const NotesList: React.FC = () => {
    const rootStore = useContext(RootStoreContext)
    const { getNotesFromStore, loadingInitial, submitting, selectNote, deleteNote } = rootStore.noteStore;


    if (loadingInitial || submitting) return <LoadingComponent content={"Loading notes..."} />
    return (
        <Container>
            <Header as='h2' dividing size='medium'>Note List</Header>
                <List selection animated style={{ margin: '10px' }}>
                    {getNotesFromStore.map((note, index) => {
                        return (
                            <Fragment key={index}>
                                <List.Item  onClick={() => selectNote(note.id)} >
                                <List.Header >{note.title}  <Icon name='trash' onClick={() => deleteNote(note.id)}/></List.Header>
                                <List.Content >{note.description}</List.Content>
                               
                            </List.Item>
                            </Fragment>
                        )
                    })}
                </List>
                
        </Container>
    )
}

export default observer(NotesList)
