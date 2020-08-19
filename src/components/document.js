import React ,{Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import token from '../config/token.js'
var cmis = require("cmis");
var cmis = require("cmis");
var username = 'admin'
let session = new cmis.CmisSession('https://api-sdm-di.cfapps.sap.hana.ondemand.com/browser');

const Small = (props)=>{
    const {DocName} = props;
    return (
        <Row>
            <Col></Col>
            <Col><h2>{DocName}</h2></Col>
            <Col></Col>
        </Row>
    )
}

class Document extends Component{
  constructor(props) {
    super(props);
    this.state={
      existing:[],
      val:'',
      textArea:''
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange1(event) {
    this.setState({...this.state,val: event.target.value});
    console.log(this.state.val)
  }
  handleChange2(event) {
    this.setState({...this.state,textArea:event.target.value});
    console.log(this.state.textArea);
  }


  handleSubmit(event) {
    
    alert('A name was submitted: ' + this.state.val+this.state.textArea);
    session.setCredentials("", "").setToken(token).loadRepositories()
    .then(() => session.query("select * from cmis:folder"))
    .then(data => console.log("one")).then(data=>{
            session.getRepositoryInfo().then(data=>{
              console.log(data);
              const rootId = Object.values(data)[0].rootFolderId;
              console.log(rootId);
              return rootId
            })
    .then((data)=>{
      let text  = this.state.textArea;
      let val = this.state.val;  
      var aces = {};
      aces['admin'] = ['cmis:read'];
      session.createDocument(data,text,val+'.txt','text/plain', undefined, undefined, aces).then(data=>{
        console.log(data);
      })
    })
    }).catch(err=>{
        console.log(err);
    });
    event.preventDefault();
  }
  componentDidMount(){
    session.setCredentials("", "").setToken(token).loadRepositories()
    .then(() => session.query("select * from cmis:folder"))
    .then(data => console.log("one")).then(data=>{
      session.query("select * from cmis:document", false, {
        maxItems: 5
      })
        .then(data => {
          console.log(data.results);
          if(data!=null){
          this.setState({
              ...this.state,
              existing:data.results
          })
          }
    })   
    }).catch(err=>{
        console.log(err);
    });
  }
  render() {
    const {existing} = this.state;
    const show = existing.length>0?(existing.map((element) => <Small key={element['cmis:objectId']} DocName={element["cmis:name"]}/>)):(<Row><Col></Col><Col><h3>Updating</h3></Col><Col></Col></Row>)
  return  (
        <Container>
            <div>
                <Row>
                    <Col></Col>
                    <Col><h2>Existing Docs</h2></Col>
                    <Col></Col>
                </Row>
                <div>
                    {show}
                </div>
            </div>
            <div>
                <Row>
                    <Col></Col>
                    <Col><h2>Adding Docs</h2></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>DocName</Form.Label>
                                <Form.Control type="text" placeholder="Enter document name" value={this.state.val} onChange={this.handleChange1} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Doc Content</Form.Label>
                                <Form.Control type="text" placeholder="Enter document content" value={this.state.textArea} onChange={this.handleChange2} />
                                </Form.Group>
                            </Form.Row>
                            <Button variant="primary" type="submit" value="Submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    {/* <Col><form onSubmit={this.handleSubmit}>
                            <div>
                                <label>
                                DocName:
                                <input type="text" value={this.state.val} onChange={this.handleChange1} />
                                </label>
                            </div>
                            <div>
                                <label>
                                DocContent:
                                <textarea type="text" value={this.state.textArea} onChange={this.handleChange2} />
                                </label>
                            </div>
                            <div>
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                    </Col> */}
                    <Col></Col>
                </Row>
            </div>

        </Container>
    )
  }
}
export default Document;