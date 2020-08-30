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
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this); 
    }
    forceUpdateHandler(){
        this.forceUpdate();
    };
      

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
            const body = new FormData
            body.append("bucket_name", this.state.bucketName)

            fetch("http://localhost:8000/api/insert_bucket", {
                body,
                headers: {
                   
                },
                method: "POST"
            }).then(response => response.json())
            .then(data => {
                    console.log(data)
                }
            );

            this.reloadBuckets()
            this.forceUpdateHandler()
            
        }else{
            alert("Bucket Name is mandatory")
        }

    }

    addItemToBucket(bucketId){
        const body = new FormData
        body.append("bucket_id", bucketId)
        body.append("todo_text", '')

        fetch("http://localhost:8000/api/insert_todo_to_bucket", {
            body,
            headers: {},
            method: "POST"
        }).then(response => response.json())
        .then(data => {
                console.log(data)
            }
        );

        this.reloadBuckets()
        this.forceUpdateHandler()
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

        const body = new FormData
        body.append("bucket_id", bucketId)

        fetch("http://localhost:8000/api/delete_bucket", {
            body,
            headers: {},
            method: "DELETE"
        }).then(response => response.json())
        .then(data => {
                console.log(data)
            }
        );

        
        this.reloadBuckets()
        this.forceUpdateHandler()
        
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
                                <Button variant="primary">Save Bucket</Button>
                            </Card>
                    </Col>

                ))}
            </Row>
            
        </Container>
      ); 
    } 
  } 
    
  export default App; 