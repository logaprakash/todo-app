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
            bucketName:'',
            itemText:'',
        }  
    }

    componentDidMount(){
        this.reloadBuckets(0)
    }

    reloadBuckets(){
        fetch('http://localhost:8000/api/get_buckets')
            .then(response => response.json())
            .then(data => {
                    this.setState({bucketList:data})
                }
        );
    }

    handleBucketChange(value){
        this.setState({bucketName:value})
    }

    
    addBucket() {
        if(this.state.bucketName !== '' ){ 
            
            let tempBucketName = this.state.bucketName
            let tempList = {
                bucket_id:tempLastBucketId+1,
                bucket_name:tempBucketName,
                todoList:[],
            }

            fetch('https://mywebsite.com/endpoint/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bucket_name: tempBucketName,
                })
            })
            
            this.reloadBuckets()
        }else{
            alert("Bucket Name is mandatory")
        }

    }

    addItemToBucket(bucketId){
        let bucketList = []
        let tempBucketList = this.state.bucketList
        for (let i = 0; i < tempBucketList.length; i++) {
            if(tempBucketList[i].bucket_id === bucketId){
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
            if(tempBucketList[i].bucket_id === bucketId){
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
            return bucket.bucket_id !== bucketId
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
                
                    <Col key={bucket.bucket_id}>
                            <Card style={{ width: '18rem' }}>
                        
                            <Card.Body>
                                <Card.Title>
                                    <Row>
                                        <Col>
                                            {bucket.bucket_name}
                                        </Col> 
                                        <Col>
                                            <Button variant="primary" size="sm" onClick={()=>this.addItemToBucket(bucket.bucket_id)}>+</Button> 
                                            <Button variant="danger" size="sm" onClick={()=>this.deleteBucket(bucket.bucket_id)}>X</Button> 
                                        </Col>

                                    </Row>
                                </Card.Title>
                                <Card.Text>
                                    <ListGroup key={'TODO_LIST_'+bucket.bucket_id} >
                                        {bucket.todo_list.map(todo => (
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
                                                        <Button variant="danger" size="sm" onClick={()=>this.deleteToDoItem(bucket.bucket_id,todo.id)}>X</Button> 
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