import React, {Component} from 'react'; 
  
// Bootstrap for react 
import Container from 'react-bootstrap/Container'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import Button from 'react-bootstrap/Button'; 
import InputGroup from 'react-bootstrap/InputGroup'; 
import FormControl from 'react-bootstrap/FormControl'; 
import ListGroup from 'react-bootstrap/ListGroup'; 
import Card from 'react-bootstrap/Card'; 
import Navbar from 'react-bootstrap/Navbar'; 
  
class App extends Component  { 
    constructor(props) {
        super(props);
        this.state = {
            bucketList: [
                {   
                    id:1,
                    name:"Morning Task",
                    todoList:[
                            {
                                id:1,
                                text:"Wake up at 8",
                                isChecked: false
                            },
                            {
                                id:2,
                                text:"Brush",
                                isChecked: false
                            },
                            {
                                id:3,
                                text:"Coffee",
                                isChecked: false
                            }
                        ]
                }
            ],
            lastBucketId:1,
            bucketName:""
        }
    }


    handleChange(value){
        this.setState({bucketName:value})
    }
    
    addBucket() {
        if(this.state.bucketName !== '' ){ 
            
            const tempLastBucketId = this.state.lastBucketId
            const tempBucketName = this.state.bucketName
            const tempList = {
                id:tempLastBucketId+1,
                name:tempBucketName,
                todoList:[],
            }
            
            this.setState({lastBucketId:tempLastBucketId+1})
            this.setState({bucketList:[...this.state.bucketList, tempList]})
        }else{
            alert("Bucket Name is mandatory")
        }

    }

    deleteToDoItem(bucketId,itemId){
        console.log("Remove Item from Bucket")
    }

    deleteBucket(bucketId){
        console.log("Remove Bucket")
    }

    render(){ 
      return(
       
        <Container>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Todo List</Navbar.Brand>
            </Navbar>
            <br></br>
            <Row>
                <Col>
                    <InputGroup className="mb-3">

                        <FormControl
                            placeholder="Bucket Name"
                            id="add-bucket-textbox"
                            onChange={item=>this.handleChange(item.target.value)}
                        />

                        <InputGroup.Append>
                            <Button variant="primary" onClick={()=>this.addBucket()}>Add Bucket</Button>
                        </InputGroup.Append>

                    </InputGroup>
                </Col>
            </Row>
            <Row>
                {this.state.bucketList.map(bucket => (
                
                    <Col>
                            <Card style={{ width: '18rem' }}>
                        
                            <Card.Body>
                                <Card.Title>
                                    <Row>
                                        <Col>
                                            {bucket.name}
                                        </Col> 
                                        <Col>
                                            <Button variant="primary" size="sm">+</Button> 
                                            <Button variant="danger" size="sm" onClick={()=>this.deleteBucket(bucket.id)}>X</Button> 
                                        </Col>

                                    </Row>
                                </Card.Title>
                                <Card.Text>
                                    <ListGroup>
                                        {bucket.todoList.map(todo => (
                                            <ListGroup.Item>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Checkbox/>
                                                    </InputGroup.Prepend>
                                                    <FormControl value={todo.text} />
                                                    <InputGroup.Append>
                                                        <Button variant="danger" size="sm" onClick={()=>this.deleteToDoItem(bucket.id,todo.id)}>X</Button> 
                                                    </InputGroup.Append>
                                                </InputGroup>
                                                
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Text>
                                
                                <Button variant="primary" size="lg" block>Edit</Button>
                            </Card.Body>

                            </Card>
                    </Col>

                ))}
            </Row>
            
        </Container>
      ); 
    } 
  } 
    
  export default App; 