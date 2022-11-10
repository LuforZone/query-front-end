import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import QRCode, { QRCodeSVG } from 'qrcode.react';

class GetInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', person: 'here is your result', QRnumber: 0, tickets: [1, 2, 3], code: '', shouleGO: Object };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.refreshPush = this.refreshPush.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit() {
    if (this.state.value.length == 11 ) {
      let targetURL = "http://localhost:7001/request/" + this.state.value
      fetch(targetURL)
        .then(data => { return data.json() })
        .then(datum => {
          if (datum.active != undefined) {
            if (datum.active.length >= 1) {
              console.log(datum.active);
              const result = JSON.stringify(datum,['name','sex','age'],'');
              const shoulePost = datum.active.map((str) => <QRCodeSVG key={str} value={str} />);
              this.setState({ person: result, tickets: datum.active, QRnumber: datum.active.length, shouleGO: shoulePost });
            }/*  */
          }
          else {
            this.setState({ person: 'cannot get data connect to this phone number,please check it' })
          }
        }
        );
    }
    else {
      this.setState({ person: "that's not a phone number,please check it again" })
    }

  }
  refreshPush() {
    this.setState({ shouleGO: '', person: '' });
  }

  render() {
    return (
      <div className='divII'>
        <h1>11111</h1>
        <label>input your phone
          <input type="search" value={this.state.value} onChange={this.handleChange} />
        </label>
        <button onClick={() => {
          this.setState({ value: "13022221111" })
        }}>
          set number
        </button>
        <button onClick={this.handleSubmit}>
          Submit
        </button>
        <button onClick={this.refreshPush}>
          refresh
        </button>
        <div>
          {this.state.person}
        </div>
        <ul>{this.state.shouleGO}</ul>
      </div>
    )
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<GetInfo/>)