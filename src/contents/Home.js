import React, { Component } from 'react';
import NeedMap from "../Components/NeedMap";


class Home extends Component {
  constructor( props ){
    super( props );
    this.state={
      needs: [],
    }
  }

  componentDidMount() {
    const comp = this;
    this.props.fetch.on('value', snapshot => {
      let temp = [];
      snapshot.forEach(function (childsnaps) {
        let item = childsnaps.val();
        item.key = childsnaps.key;
        temp.push(item);
      });
      comp.setState({needs: temp});
    });
  }

  render() {
    const { needs } = this.state;
    const { isLogin } = this.props;

    return (
        <div className="condiv home">
        <NeedMap fetch={needs} isLogin={isLogin}/>
        </div>
        )
  }
}

export default Home
