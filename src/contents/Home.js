import React, {Component} from 'react';
import NeedMap from "../Components/NeedMap";
import './styles/home.scss';
import cogoToast from "cogo-toast";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: [],
    }

    this.needs = props.rdb.ref('/needs');
    this.reports = props.rdb.ref('/reports');
  }

  componentDidMount() {
    this.reports.on('value', snapshot => {
      let bannedEmails = [];
      snapshot.forEach(function (childsnaps) {
        const item = childsnaps.val();
        if (item.status) {
          bannedEmails.push(item.reported);
        }
      });

      console.log(bannedEmails);

      this.needs.on('value', snapshot => {
        let temp = [];
        snapshot.forEach(function (childsnaps) {
          let item = childsnaps.val();
          item.key = childsnaps.key;
          if (localStorage.getItem("email") !== item.email && !item.status && bannedEmails.indexOf(item.email) === -1) {
            temp.push(item);
          }
        });
        this.setState({needs: temp});
      })
    });

;
  }

  render() {
    const {needs} = this.state;
    const {isLogin, rdb} = this.props;

    return (
      <div className="condiv home">
        <NeedMap rdb={rdb} needs={needs} isLogin={isLogin}/>
      </div>
    )
  }
}

export default Home
