import React ,{ Component }from 'react'
import { Row, Col, Card, Button,Container } from "react-bootstrap";
import {
   AreaChart, Area,
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

class Player extends Component {
   constructor(props) {
    super(props);
    this.state = {};
  }

  getPlayerbyTeam(data,team){
    var results=[];
    for(var i=0;i<data.length;i++)
    {
       if(data[i]['Current Club']===team){
          results.push(data[i]);
       } 
    }
    return results;
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

  render() {
    return (
        <div className='mt-5'><Row className="justify-content-md-center">
          <Col xs lg="6">
            <BarChart
              width={500}
              height={350}
              data={this.sortBy('goals_overall',this.getPlayerbyTeam(this.props.teamData,this.props.teamName)).slice(0,5)}
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 15
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="full_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appearances_overall" fill="#8884d8" minPointSize={5}>
                <LabelList dataKey="full_name" />
              </Bar>
              <Bar
                dataKey="goals_overall"
                fill="#82ca9d"
                minPointSize={10}
              />
            </BarChart>
          </Col>
          <Col xs lg="6">
            <AreaChart
              width={500}
              height={350}
              data={this.sortBy('assists_overall',this.getPlayerbyTeam(this.props.teamData,this.props.teamName)).slice(0,5)}
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 15
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="full_name" width={2}/>
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="assists_overall" stroke="#8884d8" fill="#8884d8" />
                // <LabelList dataKey="full_name" />
            </AreaChart>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <BarChart
                width={500}
                height={300}
                data={this.sortBy('minutes_played_overall',this.getPlayerbyTeam(this.props.teamData,this.props.teamName)).slice(0,5)}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 15,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="full_name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="minutes_played_overall" barSize={20} fill="#8884d8" label=""/>
          </BarChart>
          </Col>
          <Col xs lg="6">
            <BarChart
              width={500}
              height={350}
              data={this.sortBy('yellow_cards_overall',this.getPlayerbyTeam(this.props.teamData,this.props.teamName)).slice(0,5)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 15
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
        </div>
      )
  }
}
export default Player;