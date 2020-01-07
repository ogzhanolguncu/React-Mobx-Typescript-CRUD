import React from 'react'
import { List, Container, Header } from 'semantic-ui-react'

const NotesList: React.FC = () => {
    return (
        <Container>
            <Header as='h2' dividing size='medium'>Note List</Header>
                <List selection animated style={{ margin: '10px' }}>
                    <List.Item >
                        <List.Header>New York City</List.Header>
                        <List.Content >A lovely city</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Header>Chicago</List.Header>
                        Also quite a lovely city
                    </List.Item>
                    <List.Item>
                        <List.Header>Los Angeles</List.Header>
                        Sometimes can be a lovely city
                    </List.Item>
                    <List.Item>
                        <List.Header>San Francisco</List.Header>
                        What a lovely city
                    </List.Item>
                </List>
        </Container>
    )
}

export default NotesList
