import React, { Component } from 'react';
import NeedMap from "../Components/NeedMap";

class Home extends Component {
  constructor( props ){
    super( props );
    this.state={
      needs: [],
    }

    this.needs = props.rdb.ref('needs/');
  }

  componentDidMount() {
    this.needs.on('value', snapshot => {
      let temp = [];
      snapshot.forEach(function (childsnaps) {
        let item = childsnaps.val();
        // TODO: user self check
        item.key = childsnaps.key;
        temp.push(item);
      });
      this.setState({needs: temp});
    });
  }

  render() {
    const { needs } = this.state;
    const { isLogin, rdb } = this.props;

    return (
        <div className="condiv home">
        <NeedMap rdb={rdb} needs={needs} isLogin={isLogin}/>
        </div>
        )
  }
}

export default Home
