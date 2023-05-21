
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../helper';
import './Options.css';

function Options() {

  let buttonText1 = "", buttonText2 = "", path1="", path2="";

  if(isAutheticated() && isAutheticated().user.role===1){
    buttonText1 = 'User Requests';
    buttonText2 = 'Add Hall';
    path1 = '/adminDashboard';
    path2 = '/addHall';
  }

  else{
    buttonText1 = 'My Requests';
    buttonText2 = 'Request Booking';
    path1 = '/myRequests';
    path2 = '/request';
  }

  return (    
    <div className="buttons">
      <div><button onClick={()=> window.location.href=`${path1}`}>{buttonText1}</button></div>
      <div><button onClick={()=> window.location.href=`${path2}`}>{buttonText2}</button></div>
    </div>
  );
}

export default Options;
