import React,{Component}from 'react';
import './App.css';
import { observable } from 'mobx';

const emailRegex = RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)

const formValid =  ({formErrors , ...rest }) => {
  let valid = true;

  // Validate form errors being empty
  Object.values(formErrors).forEach(val => {
    
    val.length > 0 && (valid=false);
  });

  //  validate form was filled out
  Object.values(rest).forEach(val => {
    val === null  && (valid  = false)
  });

  return valid;
};


class App extends Component{
  constructor(props)
  {
    super(props);
    
    this.state = {
      firstName : null,
      lastName  : null,
      email  : null,
      password : null,
      formErrors: {
        firstName : "",
        lastName :"",
        email : "",
        password : ""

      }

    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if(formValid(this.state )) {
      console.log(`
      --- Submitting ---
      First Name : ${this.state.firstName}
      Last Name : ${this.state.lastName}
      Email  : ${this.state.email}
      Password  : ***
      `)
      alert("Account Created Successfully !")

    } else {
      alert("Form in invalid")
      console.error('Form INVALID - Display Error Message')
    }
  }

  handleChange =e => {
    e.preventDefault();
    const {name , value} = e.target;
    let formErrors = this.state.formErrors;
    // console.log("name :" , name);
    // console.log("value :" , value);

    switch(name) {
      case 'firstName' : 
      formErrors.firstName = value.length < 3  ? "minimum 3 characters required" : "";
      break;

      case 'lastName' : 
      formErrors.lastName = value.length < 3  ? "minimum 3 characters required" : "";
      break;
      
      case 'email' : 
      formErrors.email = emailRegex.test(value)  ? "" : "Invalid Email Address";
      break;

      case 'password' : 
      formErrors.password = value.length < 6 ? "minimum 6 characters required" : "";
      break;

      default:
        break;
    }

    this.setState({formErrors , [name]: value}, () => console.log(this.state));
  }
  render() {
     const  {formErrors} = this.state;
    return(
      <div className ="wrapper">
        <div className = "form-wrapper">
          <h1> Create account</h1>
          <form onSubmit = {this.handleSubmit} noValidate>
            <div className ="firstName">
              <label htmlFor = "firstName">First Name:</label>
              <input type = "text" className ={formErrors.firstName.length > 0 ? "error" : null} placeholder = "First Name" name="firstName" 
              noValidate
              onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
              <span className="errorMessage">{formErrors.firstName}</span>
            )}
            </div>
            
            <br/>
            <div className ="lastName">
              <label htmlFor = "lastName">Last Name</label>
              <input type = "text" className ={formErrors.lastName.length > 0 ? "error" : null} placeholder = "Last Name" name="lastName" 
              onChange={this.handleChange}
              noValidate/>
              {formErrors.lastName.length > 0 && (
              <span className="errorMessage">{formErrors.lastName}</span>
            )}
            </div>
            <br/>
            <div className ="email">
              <label htmlFor = "email">Email</label>
              <input type = "email" className ={formErrors.email.length > 0 ? "error" : null} placeholder = "Email" name="email" 
              onChange={this.handleChange}
              noValidate/>
              {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>
            )}
            </div>
            <br/>
            <div className ="password">
              <label htmlFor = "password">Password</label>
              <input type = "password" className ={formErrors.password.length > 0 ? "error" : null} placeholder = "Password" name="password" 
              onChange={this.handleChange}
              noValidate/>
              {formErrors.password.length > 0 && (
              <span className="errorMessage">{formErrors.password}</span>
            )}
            </div>
            <div className="createAccount">
              <button type = "submit"> Create Account </button>
              <small>Already have an account ?</small>
           </div>

          </form>
        </div>
      </div>
    );
}
    
}

export default App;
