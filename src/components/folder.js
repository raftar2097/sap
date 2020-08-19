import React ,{Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import token from '../config/token.js'
var cmis = require("cmis");
var username = 'admin'
let session = new cmis.CmisSession('https://api-sdm-di.cfapps.sap.hana.ondemand.com/browser');

const Small = (props)=>{
    const {folderName} = props;
    return (
        <Row>
            <Col></Col>
            <Col><h2>{folderName}</h2></Col>
            <Col></Col>
        </Row>
    )
}

class Folder extends Component{
  constructor(props) {
    super(props);
    this.state={
      existing:[],
      val:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({...this.state,val: event.target.value});
    console.log(this.state.val)
  }

  handleSubmit(event) {
    
    alert('A name was submitted: ' + this.state.val);
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
      session.createFolder(data,this.state.val).then(data=>{
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
            session.getRepositoryInfo().then(data=>{
              Object.values(data);
              session.getFolderTree((Object.values(data)[0].rootFolderId))
              .then((data)=>{
                if(data!=null){
                this.setState({
                    ...this.state,
                    existing:data
                })
                }
                data.forEach(function(element) { 
                console.log(element.object.object.succinctProperties);
                });})});
    }).catch(err=>{
        console.log(err);
    });
  }
  render() {
    const {existing} = this.state;
    const show = existing.length>0?(existing.map((element) => <Small key={element.object.object.succinctProperties["cmis:objectId"]} folderName={element.object.object.succinctProperties["cmis:name"]}/>)):(<Row><Col></Col><Col><h3>Updating</h3></Col><Col></Col></Row>)
  return  (
      <Container>

        <div>
            <div>
                <Row>
                    <Col></Col>
                    <Col><h2>Existing Folders</h2></Col>
                    <Col></Col>
                </Row>
                <div>
                    {show}
                </div>
            </div>
            <div>
                <Row>
                    <Col></Col>
                    <Col><h2>Adding Folders</h2></Col>
                    <Col></Col>
                </Row>
                <Row></Row>
                <Row></Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Name:
                                <input type="text" value={this.state.val} onChange={this.handleChange} />
                                </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        </div>
        </Container>
    )
  }
}
export default Folder;