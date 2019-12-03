import React from "react";
import { Row, Col, Card, Button,Container,Jumbotron } from "react-bootstrap";
import FileUploadProgress from "react-fileupload-progress";
import Player from './player';
import League from './league';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  PieChart, 
  Pie, 
  Sector, 
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";

export class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }


  render() {
    const players = this.state.players;
    return (
      <div>
     <center><h3>Football Data Visualizer</h3></center>
      <Row className="justify-content-md-center">
          <Jumbotron>
            <FileUploadProgress            
              key="file"
              method="POST"
              url="https://football-visualizer.herokuapp.com/upload/"
              onProgress={(e, request, progress) => {
                console.log("progress", e, request, progress);
              }}
              onLoad={(e, request) => {
                //   console.log("load", e.currentTarget.response, e, request);
                this.setState({ players: JSON.parse(e.currentTarget.response) });

              }}
              onError={(e, request) => {
                console.log("error", e, request);
              }}
              onAbort={(e, request) => {
                console.log("abort", e, request);
              }}
            />
          </Jumbotron>
          <Col xs lg="12">
             {players.length>0 ? <League players={this.state.players}/> : undefined}
          </Col>
      </Row>
      </div>
    );
  }
}

export default FileUpload;