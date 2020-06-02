import React, { useEffect } from "react";
import { connect } from "react-redux";
import { registerAction, loginAction } from "../../store/actions";
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from "react-router-dom";




const AuthCheck = (props) => {
    const history = useHistory();
    const { authState, authService } = useOktaAuth();
    
    useEffect(() => {    
        authService.getUser()
        .then((info) => {
            props.loginAction(authState.accessToken, info.sub, history);
            console.log("checking authentication")  
        })
        .catch(err => console.log("Error fetching User info in UseEffect", err))
    }, );

    return(
        <div>
             <h1>LOADEDING</h1>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
      registerSuccess: state.register.success,
      userid: state.login.userid,
      errorStatus: state.register.error,
    };
  };
  
  export default connect(mapStateToProps, { registerAction, loginAction })(
    AuthCheck
  );
  