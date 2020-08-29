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
            bucketList: [],
            lastBucketId:0,
            bucketName:'',
            itemText:'',
        }
    }

    handleBucketChange(value){
        this.setState({bucketName:value})
    }

    
    addBucket() {
        if(this.state.bucketName !== '' ){ 
            
            let tempLastBucketId = this.state.lastBucketId
            let tempBucketName = this.state.bucketName
            let tempList = {
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

    addItemToBucket(bucketId){
        let bucketList = []
        let tempBucketList = this.state.bucketList
        for (let i = 0; i < tempBucketList.length; i++) {
            if(tempBucketList[i].id === bucketId){
                let tempTodo = {
                    id:tempBucketList[i].todoList.length+1,
                    text:'',
                    is_checked:false
                }
                tempBucketList[i].todoList = [...tempBucketList[i].todoList,tempTodo]
            }
            bucketList = [...bucketList, tempBucketList[i]]
        } 
        this.setState({bucketList:bucketList})
    }

    

    deleteToDoItem(bucketId,itemId){
        
        let bucketList = []
        let tempBucketList = this.state.bucketList
        for (let i = 0; i < tempBucketList.length; i++) {
            if(tempBucketList[i].id === bucketId){
                tempBucketList[i].todoList = tempBucketList[i].todoList.filter(function(todo) { 
                    return todo.id !== itemId
                });
            }
            bucketList = [...bucketList, tempBucketList[i]] 
        }
        this.setState({bucketList:bucketList})
    }

    deleteBucket(bucketId){
        this.setState({bucketList: this.state.bucketList.filter(function(bucket) { 
            return bucket.id !== bucketId
        })});
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
                            onChange={item=>this.handleBucketChange(item.target.value)}
                        />

                        <InputGroup.Append>
                            <Button variant="primary" onClick={()=>this.addBucket()}>Add Bucket</Button>
                        </InputGroup.Append>

                    </InputGroup>
                </Col>
            </Row>
            <Row>
                {this.state.bucketList.map(bucket => (
                
                    <Col key={bucket.id}>
                            <Card style={{ width: '18rem' }}>
                        
                            <Card.Body>
                                <Card.Title>
                                    <Row>
                                        <Col>
                                            {bucket.name}
                                        </Col> 
                                        <Col>
                                            <Button variant="primary" size="sm" onClick={()=>this.addItemToBucket(bucket.id)}>+</Button> 
                                            <Button variant="danger" size="sm" onClick={()=>this.deleteBucket(bucket.id)}>X</Button> 
                                        </Col>

                                    </Row>
                                </Card.Title>
                                <Card.Text>
                                    <ListGroup key={'TODO_LIST_'+bucket.id} >
                                        {bucket.todoList.map(todo => (
                                            <ListGroup.Item>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Checkbox/>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        defaultValue={todo.text} 
                                                        placeholder="ToDo Item"
                                                    />
                                                    <InputGroup.Append>
                                                        <Button variant="danger" size="sm" onClick={()=>this.deleteToDoItem(bucket.id,todo.id)}>X</Button> 
                                                    </InputGroup.Append>
                                                </InputGroup>
                                                
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Text>
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