import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
// import * as admin from 'firebase-admin';


export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      loading: true,
      redirect: false,
    };
    this.reportsRef = props.rdb.ref('reports/');
  }

  componentDidMount() {
    this.reportsRef.on('value', snapshot => {
      let reports = [];
      snapshot.forEach(function (childsnaps) {
        const item = {key: childsnaps.key, ...childsnaps.val()};
        reports.push(item);
      });
      this.setState({reports, loading: false,});
    });
  };

  onAccept = (value) => () => {
    const {reportsRef} = this;

    reportsRef.update({
      ['/' + value.key + '/status']: !value.status,
    });
  };

  onDecline = value => () => {
    const {reportsRef} = this;

    reportsRef.update({
      ['/' + value.key]: {},
    });
  };

  redirect = () => {
    this.setState({redirect: true})
  };

  render() {
    return (
      <div className="condiv">
        <table className="container">
          <thead>
          <tr>
            <th><h1>Reported Users:</h1></th>
          </tr>
          </thead>
          <tbody>
          {!this.state.loading ?
            this.state.reports.length > 0 ?
              this.state.reports.map(((value, index) =>
                  <tr key={index}>
                    <td>
                      <span>{value.reported} says "{value.message}"</span>
                      <Button
                        // disabled={value.status}
                        variant="contained"
                        onClick={this.onAccept(value)}
                        style={{marginRight: 25, float: 'right'}}
                      >
                        {value.status ? 'UNBAN' : 'BAN'}
                      </Button>
                      {!value.status &&
                      <Button
                        variant="contained"
                        onClick={this.onDecline(value)}
                        style={{marginRight: 25, float: 'right'}}
                      >
                        Decline
                      </Button>
                      }
                    </td>
                  </tr>
              ))
              :
              <tr>
                <td colSpan={4}>
                  <span>No data</span>
                </td>
              </tr>
            :
            <tr>
              <td colSpan={4}>
                <span>Loading data...</span>
              </td>
            </tr>
          }
          </tbody>
        </table>
      </div>
    )
  }
}