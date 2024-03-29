import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QRCodeSVG } from 'qrcode.react';


const targetURL = process.env.REACT_APP_TARGET_URL;
console.log(targetURL);

class GetInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', person: 'here is your result', QRnumber: 0, tickets: [1, 2, 3], code: '', shouleGO: Object, targeturl: 'null' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.refreshPush = this.refreshPush.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit() {
    let regex = /^[1-9]\d*$/
    if (this.state.value.length === 11 && regex.test(this.state.value) === true) {
      // eslint-disable-next-line no-use-before-define
      console.log('format is right')
      const NewTargetURL = targetURL + this.state.value
      this.setState({ targeturl: NewTargetURL })
      console.log(NewTargetURL)
      const options = {
        headers: {
          Accept: '*/*',
          origin: 'http://localhost:3000',
        },
      }
      fetch(NewTargetURL, options)
        .then(data => { return data.json() })
        .then(datum => {
          if (datum.active !== [] && datum.name !== undefined) {
            console.log(datum.name);
            const result = JSON.stringify(datum, ['name', 'sex', 'age'], '');
            console.log(result);
            //const shoulePost = datum.active.map((str) => <QRCodeSVG key={str} value={str} />);
            this.setState({person : result});
            //this.setState({ person: "1111", tickets: datum.active, QRnumber: datum.active.length, shouleGO: shoulePost });
            console.log(this.state.person);
          }
          else if (datum.name != undefined && datum.active == []) {
            const result = JSON.stringify(datum, ['name', 'sex', 'age'], '');
            this.setState({ person: result })
          }
          else {
            this.setState({ person: 'plz check your number' })
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
        <div>
          <h1>
            {this.state.person}
          </h1>

        </div>
        <ul>{this.state.shouleGO}</ul>
      </div>
    )
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<GetInfo />)
