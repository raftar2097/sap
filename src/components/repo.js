import React ,{Component} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import token from '../config/token.js'
var cmis = require("cmis");
var username = 'admin'
let session = new cmis.CmisSession('https://api-sdm-di.cfapps.sap.hana.ondemand.com/browser');


class Repo extends Component{
  constructor(props) {
    super(props);
    this.state={
      info:null,
    }
  }
  componentDidMount(){
    session.setCredentials("", "").setToken(token).loadRepositories()
    .then(() => session.query("select * from cmis:document"))
    .then(data => console.log(data.results))
    .then(data=>{
            session.getRepositoryInfo()
            .then(data=>{console.log(data);
              if(data!=null){
                Object.values(data);
                const temp = Object.values(data)[0];
                this.setState({
                  info:temp
                })
              }})
    }).catch(err=>{
        console.log(err);
    });
  }
  render() {
    const {info} = this.state;
  return  (
      info==null?<Container>
      <Row>
        <Col></Col>
        <Col>Updating</Col>
        <Col></Col>
      </Row>
    </Container>:
    <Container fluid="md">
      <Row>
        <Col></Col>
        <Col> <h1>{info.repositoryId}</h1></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col> <h1>{info.repositoryName}</h1></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col> <h1>{info.repositoryDescription}</h1></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col><h1>{info.vendorName}</h1></Col>
        <Col></Col>
      </Row>
  </Container>
    )
  }
}
export default Repo;