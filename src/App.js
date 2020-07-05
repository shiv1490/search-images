import React from 'react';
import { Navbar, Form, Button, Card, Alert, Container, Row } from 'react-bootstrap';
import axios from 'axios'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      imgData: [],
      error: null,
      searchedData: false
    }
  }

  getPhotos = (event) => {
    event.preventDefault();
    var url = `https://api.unsplash.com/search/photos?client_id=5Lim7BT-fAdvbK6IwTmnIe4sO_o19f-W167xBLPm6t8&&page=1&query=${this.state.keyword}`;
    axios.get(url).then(res => {
      this.setState({ imgData: res.data.results, error: null, searchedData: true })
    }).catch(err => {
      this.setState({ error: err })
    })
  }

  onChange = (event) => {
    this.setState({ keyword: event.target.value })
  }
  render() {
    return (
      <Container fluid>
        <Navbar className="justify-content-center" bg="light">
          <Navbar.Brand>Search Photo   </Navbar.Brand>
        </Navbar>
        <Form onSubmit={(e) => this.getPhotos(e)}>
          <Form.Group>
            <Form.Label>Enter keyword to search related photos</Form.Label>
            <Form.Control onChange={(e) => this.onChange(e)} type="text" placeholder="Enter keyword" />
          </Form.Group>
          <Button variant="primary" type="submit">Search </Button>
        </Form>

        <Row className="justify-content-center">
          {this.state.imgData.length > 0 && this.state.imgData.map(img => {
            return (
              <Card style={{ width: '18rem', margin: '2rem' }}>
                <Card.Img variant="top" src={img.urls.small} alt={img.alt_description} style={{ height: '150px' }} />
                <Card.Body>
                  <Card.Text>{img.description || `No Description`}</Card.Text>
                  <Card.Link href={img.links.download} target="_blank">Download</Card.Link>
                </Card.Body>
              </Card>
            )
          })}
        </Row>
        {this.state.imgData.length == 0 && this.state.searchedData && (
          <Alert variant="warning" style={{ margin: '1rem' }}>
            No related images found. Please try a different search keyword
          </Alert>
        )
        }
      </Container>
    );
  }
}

export default App;
