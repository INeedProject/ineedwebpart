import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router-dom";

export default class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerdata: [],
      loading: true,
      redirect: false,
    }
    this.offers = props.rdb.ref('offers/');
    this.chats = props.rdb.ref('Chats/');
  }

  componentDidMount() {
    this.offers.on('value', snapshot => {
      let offers = [];
      snapshot.forEach(function (childsnaps) {
        let item = childsnaps.val();
        item.key = childsnaps.key;
        if (item.email === localStorage.getItem("email"))
          offers.push(item);
      });
      this.setState({offerdata: offers, loading: false,});
});
  };

  onAccept = value => () => {
    const {offers, chats} = this;

    offers.update({
      ['/' + value.key + '/state']: true,
    });
  };

  onDecline = value => () => {
    const {offers, chats} = this;


    offers.update({
      ['/' + value.key]: {},
    });
  };

  redirect = () => {
    this.setState({redirect: true})
  };

  render() {
    return (
      <div className="condiv">
        {this.state.redirect && <Redirect to={'/chats'}/>}
        <table className="container">
          <thead>
          <tr>
            <th><h1>Help Offerer </h1></th>
          </tr>
          </thead>
          <tbody>
          {!this.state.loading ?
            this.state.offerdata.length > 0 ?
              this.state.offerdata.map(((value, index) =>
                  <tr key={index}>
                    <td>
                      <span>{value.offerer}</span>
                      {!value.state ?
                        <>
                            <Button variant="contained"
                                    onClick={this.onDecline(value)}
                                    style={{marginRight: 25, float: 'right'}}
                            >
                                Decline
                            </Button>
                            <Button variant="contained"
                                    onClick={this.onAccept(value)}
                                    style={{marginRight: 25, float: 'right'}}
                            >
                                Accept
                            </Button>
                        </>
                        :
                        <Button
                          variant="contained"
                          onClick={this.redirect}
                          style={{marginRight: 25, float: 'right'}}
                        >
                          Go to Chat
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