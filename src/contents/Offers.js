import React, { Component } from 'react';
import Button from "@material-ui/core/Button";

export default class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offerdata: [],
            loading: true,
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
            this.setState({ offerdata: offers, loading: false, });
            console.log(offers);
        });
    };

    onAcceptOffer = value => () => {
        const { offers,chats } = this;

        offers.update({
            ['/' + value.key + '/state'] : true,
        });
        // const chatID = value.offerer.replace(/\./g,'') + ':' + value.email.replace(/\./g,'');
        // const timestamp = Date.now();

        // chats.update({
        //     [chatID] : { [timestamp] : {
        //             mMessage: 'Thanks!',
        //             mReceiver: value.email,
        //             mSender: value.offerer,
        //             timestamp,
        //     }}
        // });
    };

    render() {
        return (
          <div className="condiv">
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
                                { !value.state && <Button variant="contained" onClick={this.onAcceptOffer(value)} style={{marginRight: 25, float: 'right'}}>Accept Help</Button> }
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