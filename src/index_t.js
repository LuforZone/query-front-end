import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

class getInfo extends React.Component{
/*   constructor(props){
    super(props);
    this.state={value:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    this.setState({value:event.target.value});
  }
  handleSubmit(event){
    let targetURL="localhost:7001/request/"+this.state.value
    fetch(targetURL).then(res=>res.json)
    .then((result)=>{
      this.setState({
        body:result.body
      });
    },
    (error)=>{
      this.setState({
        error
      });
    }
    
    
    
    )
  } */
  render(){
    return(
      <div>
        <h1>11111</h1>
         <form onSubmit={this.handleSubmit}>
        <label>input your phone
          <input type="search" value={this.state.value} onChange = {this.handleChange}/>
        </label>
        <input type="submit" value = "conform"/>
      </form>
      {/* <h1>{}</h1> */}
      </div>
     
    )
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<getInfo/>)