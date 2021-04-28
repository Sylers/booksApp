import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import { Table, Input, FormGroup, Label, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

class App extends Component {
  state = {

    books: [],
    isLoading: false,
    newBookModal: false,
    editBookModal: false,
    newBookData: {
      title: '',
      rating: '',
      author: ''
    },

  editBookData: {
      id: '',
      title: '',
      author: '',
      rating: ''
    }

  }

  componentDidMount(){
    this._refreshBook()
  }

  toggleNewBookModal(){
    this.setState(
      { newBookModal: !this.state.newBookModal }
    );
  }
  toggleeditBookModal(){
    this.setState(
      { editBookModal: !this.state.editBookModal }
    );
  }

  addNewBook(){
    if(this.state.newBookData.title.length > 0 && this.state.newBookData.rating.length > 0 && this.state.newBookData.author.length > 0){
      axios.post("http://localhost/booksAPI/api/post/create.php", this.state.newBookData)
      .then((response) => {
        //let {books} = this.state;
        //books.push(response.data);
        this.setState({newBookModal: false, newBookData: {
          title: '',
          rating: '',
          author: ''
        }});
        this._refreshBook()
      })
    }else{
      alert("Invalid Input");
    };
  }
  updateBook(){

    let {title, rating, author } = this.state.editBookData

    if(this.state.editBookData.title.length > 0 || this.state.editBookData.rating.length > 0 || this.state.editBookData.id.length > 0 || this.state.editBookData.author.length > 0){
      axios.put("http://localhost/booksAPI/api/post/update.php" + this.state.editBookData.id, {
        title,
        rating,
        author
      },
      ).then((response) => {
        console.log(response.data)
        this._refreshBook();
        this.setState({
          editBookModal: false, editBookData: { id: '', title: '', author: '', status: ''}
        })
      })
    }else{
      alert("Invalid Input");
    };

  }
  editBook(id, title, rating, author){
    this.setState({
      editBookData: {id, title, rating, author}, editBookModal: !this.state.editBookModal
    });
  }
  deleteBook(id){
    axios.delete('http://localhost/booksAPI/api/post/delete.php' + id)
    .then((response) => {
      this._refreshBook()
    });
    
  }
  _refreshBook(){
    this.setState({isLoading: true})
    axios.get("http://localhost/booksAPI/api/post/read.php").then((response) => { 
      if(response.data){
        console.log(response.data)
          this.setState({
            books: response.data,
          })
          this._alterload()
      }
    })
  }

  _alterload(){
    this.setState(prevState => {
      return {
        isLoading: !prevState.isLoading
      }
    })
  }


  render(){
    let  books = this.state.books.map(book => {
      return (
        <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.rating}</td>
            <td>
              <Button color="success" size="lg" className="mr-1" onClick={this.editBook.bind(this, book.id, book.title, book.rating, book.author)}>Edit</Button>
              <Button color="success" size="lg" onClick={this.deleteBook.bind(this, book.id)} >Delete</Button>
            </td>
          </tr>
      )
    });
    return(
      <React.Fragment>
        <h1 className="text-center">Books App</h1>
        <div>
          <Button color="danger" onClick={this.toggleNewBookModal.bind(this)} className = "my-2 ml-2">Add New Book</Button>
          <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)} >
            <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add New Book</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input 
                  id="title" 
                  value={this.state.newBookData.title}
                  onChange = { (e) => {
                    let {newBookData} = this.state
                    newBookData.title = e.target.value
                    this.setState({
                      newBookData
                    });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="author">Author</Label>
                <Input 
                  id="author"
                  value={this.state.newBookData.author}
                  onChange = { (e) => {
                    let {newBookData} = this.state
                    newBookData.author = e.target.value
                    this.setState({
                      newBookData
                    });
                  }} 
                />
              </FormGroup>
              <FormGroup>
                <Label for="rating">Rating</Label>
                <Input 
                  id="rating"
                  value={this.state.newBookData.rating}
                  onChange = { (e) => {
                    let {newBookData} = this.state
                    newBookData.rating = e.target.value
                    this.setState({
                      newBookData
                    });
                  }} 
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addNewBook.bind(this)}>Add Book</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.editBookModal} toggle={this.toggleeditBookModal.bind(this)} >
            <ModalHeader toggle={this.toggleeditBookModal.bind(this)}>Edit Book</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input 
                  id="title" 
                  value={this.state.editBookData.title}
                  onChange = { (e) => {
                    let {editBookData} = this.state
                    editBookData.title = e.target.value
                    this.setState({
                      editBookData
                    });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="author">Author</Label>
                <Input 
                  id="author"
                  value={this.state.editBookData.author}
                  onChange = { (e) => {
                    let {editBookData} = this.state
                    editBookData.author = e.target.value
                    this.setState({
                      editBookData
                    });
                  }} 
                />
              </FormGroup>
              <FormGroup>
                <Label for="rating">Rating</Label>
                <Input 
                  id="rating"
                  value={this.state.editBookData.rating}
                  onChange = { (e) => {
                    let {editBookData} = this.state
                    editBookData.rating = e.target.value
                    this.setState({
                      editBookData
                    });
                  }} 
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
              <Button color="secondary" onClick={this.toggleeditBookModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
          <Table>
            <thead>
              <tr>
                <td>#</td>
                <td>Title</td>
                <td>Author</td>
                <td>Rating</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {books}
            </tbody>
          </Table>
          { this.state.isLoading && <div className="loader"></div> }
        </div>
      
      </React.Fragment>
    )
  }
}
export default App;
