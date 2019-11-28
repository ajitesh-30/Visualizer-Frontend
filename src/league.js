import React from "react";
import { Row, Col, Card, Button,Container,Jumbotron } from "react-bootstrap";
import FileUploadProgress from "react-fileupload-progress";
import Player from './player';
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

export class League extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlyrs:false,
      teamName: null
    };
    this.displayPlayers = this.displayPlayers.bind(this);
  }
  displayPlayers(event){
    event.preventDefault();
    this.setState({
      showPlyrs: true,
      teamName: event.target.value
    });
  }
  sortBy(key, data) {
      return data.sort((a, b) => {
        var x = parseInt(a[key]); 
        var y = parseInt(b[key]);
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      });
  }

  getPlayerByPosition(position,data){
    var results=[];
    for(var i=0;i<data.length;i++)
    {
       if(data[i].position===position){
        results.push(data[i]);
       } 
    }
    return results;
  }


  getAllTeams(data){
      var uniqueNames = [];
      for(var i = 0; i< data.length; i++){    
        if(uniqueNames.indexOf(data[i]['Current Club']) === -1){
            uniqueNames.push(data[i]['Current Club']);        
          }        
      }
      return uniqueNames;
  }

  render() {
    const players = this.props.players;
    return (
      <Jumbotron className='mt-5'>
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <BarChart
              width={500}
              height={350}
              data={this.sortBy('clean_sheets_overall',this.getPlayerByPosition('Goalkeeper',players)).slice(0,5)}
              margin={{
                top: 5,
                right: 40,
                left: 10,
                bottom: 10
              }}
            >
              <CartesianGrid strokeDasharray="7 7" />
              <XAxis dataKey="full_name" width={1} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clean_sheets_overall" fill="#8884d8" minPointSize={5}>
                <LabelList  />
              </Bar>
              <Bar
                dataKey="appearances_overall"
                fill="#82ca9d"
                minPointSize={2}
              />
            </BarChart>
          </Col>
          <Col xs lg="6">
            <BarChart
              width={500}
              height={350}
              data={this.sortBy('goals_overall',players).slice(0,5)}
              margin={{
                top: 5,
                right: 30,
                left: 5,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="full_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appearances_overall" fill="#8884d8" minPointSize={5}>
                <LabelList />
              </Bar>
              <Bar
                dataKey="goals_overall"
                fill="#82ca9d"
                minPointSize={3}
              />
            </BarChart>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <BarChart
              width={500}
              height={350}
              data={this.sortBy('assists_overall',players).slice(0,5)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="full_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="assists_overall" fill="#8884d8" minPointSize={2}>
                <LabelList />
              </Bar>
              <Bar
                dataKey="appearances_overall"
                fill="#82ca9d"
                minPointSize={4}
              />
            </BarChart>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <BarChart
                width={500}
                height={300}
                data={this.sortBy('minutes_played_overall',players).slice(0,5)}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="full_name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="minutes_played_overall" barSize={20} fill="#8884d8" />
          </BarChart>
          </Col>
          <Col xs lg="6">
            <BarChart
              width={500}
              height={350}
              data={this.sortBy('yellow_cards_overall',players).slice(0,5)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="full_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="yellow_cards_overall" fill="#8884d8" minPointSize={5}>
                <LabelList />
              </Bar>
              <Bar
                dataKey="appearances_overall"
                fill="#82ca9d"
                minPointSize={3}
              />
            </BarChart>
          </Col>
        </Row>
        <div>
        <Jumbotron>
          <center><h1>Team List</h1></center>
          <Row>
          {this.getAllTeams(this.props.players).map((player) => {
            return(
              <Col xs lg="3"><Button onClick={e => this.displayPlayers(e, "value")} value={player} variant="outline-dark">{player}</Button></Col>
              )
          })}
          </Row>
        {this.state.showPlyrs ? <Player teamData={players} teamName={this.state.teamName}/> : undefined}
        </Jumbotron>

        </div>
        </Jumbotron>
    );
  }
}
export default League;
