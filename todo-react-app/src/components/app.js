import React, {Component} from 'react'; 
  
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import Button from 'react-bootstrap/Button'; 
import InputGroup from 'react-bootstrap/InputGroup'; 
import FormControl from 'react-bootstrap/FormControl'; 
import ListGroup from 'react-bootstrap/ListGroup'; 
import Card from 'react-bootstrap/Card'; 
import Navbar from 'react-bootstrap/Navbar'; 
import Tooltip from 'react-bootstrap/Tooltip'; 
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'; 
  
class App extends Component  { 
    constructor(props) {
        super(props);
        this.state = {
            bucketList: [],
            bucketName:'',
            itemText:''
        } 
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this); 

    }
    forceUpdateHandler(){
        this.forceUpdate();
    };
      

    componentDidMount(){
        this.reloadBuckets()
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

    handleTodoTextChange(bucket_id,todo_id,text){
        let tempBucketList = []
        for(let bucket_index=0;bucket_index<this.state.bucketList.length;bucket_index++){
            let bucket = this.state.bucketList[bucket_index]
            let todo_list = []
            if(bucket.bucket_id === bucket_id){
                
                for(let todo_index=0;todo_index<bucket.todo_list.length;todo_index++){
                    let todo = bucket.todo_list[todo_index]
                    if(todo.todo_id === todo_id){
                        todo.todo_text = text
                    }
                    todo_list = [...todo_list,todo]
                }
            }
            bucket.todo_list = todo_list
            tempBucketList = [...tempBucketList,bucket]
        }

        this.setState({bucketList:tempBucketList})
    }

    handleTodoCheckedChange(bucket_id,todo_id,is_checked){
        let tempBucketList = []
        for(let bucket_index=0;bucket_index<this.state.bucketList.length;bucket_index++){
            let bucket = this.state.bucketList[bucket_index]
            let todo_list = []
            if(bucket.bucket_id === bucket_id){
                
                for(let todo_index=0;todo_index<bucket.todo_list.length;todo_index++){
                    let todo = bucket.todo_list[todo_index]
                    if(todo.todo_id === todo_id){
                        todo.is_checked = is_checked
                    }
                    todo_list = [...todo_list,todo]
                }
            }
            bucket.todo_list = todo_list
            tempBucketList = [...tempBucketList,bucket]
        }

        this.setState({bucketList:tempBucketList})
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

            window.location.reload(false);
            
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

        window.location.reload(false);
    }

    

    deleteToDoItem(todo_id){
        
        
        const body = new FormData
        body.append("todo_id", todo_id)

        fetch("http://localhost:8000/api/delete_todo_from_bucket", {
            body,
            headers: {},
            method: "DELETE"
        }).then(response => response.json())
        .then(data => {
                console.log(data)
            }
        );

        
        window.location.reload(false);

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

        
        window.location.reload(false);
        
    }

    saveBucket(bucket_id){
        const body = new FormData
        let bucket = {}
        for(let bucket_index=0;bucket_index<this.state.bucketList.length;bucket_index++){
            if(this.state.bucketList[bucket_index].bucket_id === bucket_id){
                bucket = this.state.bucketList[bucket_index]
                break
            }
        }
        body.append("bucket_id", bucket.bucket_id)
        body.append("todo_list", JSON.stringify(bucket.todo_list))

        fetch("http://localhost:8000/api/save_bucket", {
            body,
            headers: {},
            method: "POST"
        }).then(response => response.json())
        .then(data => {
                console.log(data)
            }
        );

        window.location.reload(false);    
    }

    render(){ 
        const addBucketTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
              Add Bucket to list
            </Tooltip>
          );
        
        const addItemTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Add Item to bucket
            </Tooltip>
        );

        const RemoveItemTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Remove Todo From Bucket
            </Tooltip>
        );

        const RemoveBucketTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Delete Bucket
            </Tooltip>
        );

        const SaveBucketTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Save Bucket to server
            </Tooltip>
        );
      return(
       
        <div style={{ background: '#03c6fc',top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}} >
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Todo List</Navbar.Brand>
            </Navbar>
            

            <div style={{ padding: '2rem' }}>
                
                <Row>
                    <Col>
                        <InputGroup className="mb-3">

                            <FormControl
                                placeholder="Bucket Name"
                                id="add-bucket-textbox"
                                type="text"
                                maxLength={60}
                                onChange={item=>this.handleBucketChange(item.target.value)}
                            />

                            <InputGroup.Append>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={addBucketTooltip}
                            >
                                <Button variant="primary" onClick={()=>this.addBucket()}>Add Bucket</Button>
                            </OverlayTrigger>
                            </InputGroup.Append>
                            

                        </InputGroup>
                    </Col>
                </Row>
                
                <Row style={{ padding: '2rem' }} >
                    {this.state.bucketList.map(bucket => (
                    
                        <Col key={bucket.bucket_id} md="auto" style={{ padding: '1rem' }}>
                                <Card style={{ width: '18rem' }}>
                            
                                <Card.Body>
                                    <Card.Title>
                                        <Row>
                                            <Col >
                                                {bucket.bucket_name}
                                            </Col> 
                                            <Col xs lg="4">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={addItemTooltip}
                                                >
                                                    <Button variant="primary" size="sm" onClick={()=>this.addItemToBucket(bucket.bucket_id)}>+</Button> 
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={RemoveBucketTooltip}
                                                >
                                                    <Button variant="danger" size="sm" onClick={()=>this.deleteBucket(bucket.bucket_id)}>X</Button> 
                                                </OverlayTrigger>
                                            </Col>

                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        <ListGroup key={'TODO_LIST_'+bucket.bucket_id} >
                                            {bucket.todo_list.map(todo => (
                                                <ListGroup.Item key={'TODO_ITEM_'+todo.todo_id}>
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Checkbox
                                                                checked={todo.is_checked}
                                                                onChange={item=>this.handleTodoCheckedChange(bucket.bucket_id,todo.todo_id,item.target.checked)}
                                                            />
                                                        </InputGroup.Prepend>
                                                        <FormControl
                                                            defaultValue={todo.todo_text} 
                                                            placeholder="ToDo Item"
                                                            type="text"
                                                            maxLength={512}
                                                            onChange={item=>this.handleTodoTextChange(bucket.bucket_id,todo.todo_id,item.target.value)}
                                                        />
                                                        <InputGroup.Append>
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                delay={{ show: 250, hide: 400 }}
                                                                overlay={RemoveItemTooltip}
                                                            >
                                                                <Button variant="danger" size="sm" onClick={()=>this.deleteToDoItem(todo.todo_id)}>X</Button> 
                                                            </OverlayTrigger>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                    
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card.Text>
                                </Card.Body>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={SaveBucketTooltip}
                                    >
                                        <Button variant="primary" onClick={()=>this.saveBucket(bucket.bucket_id)}>Save Bucket</Button>
                                    </OverlayTrigger>
                                </Card>
                        </Col>

                    ))}
                </Row>

            </div>
            
        </div>

      ); 
    } 
  } 
    
  export default App; 