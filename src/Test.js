import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import AxiosWithAuth from './utils/axiosWithAuth';


const Test = () => { 
  const { authState } = useOktaAuth();
  const { accessToken } = authState;
  const [testing, setTesting] = useState(null);

//   fetch messages
  useEffect(() => {
    if (authState.isAuthenticated) {    
      AxiosWithAuth(accessToken)
        .get(`http://localhost:8080/`)
        .then(res => {
            console.log('SUCCESS TEST COMPONENT OOOOOOOOOOOOOOO', res)
            setTesting(res.data)
        })
        .catch(err => console.log('ERROR in TEST COMPONENT', err))

    }
  }, [testing]);

 
  return (
      <div>
        {testing === null ? <h1>This Hasn't Fetched Anything</h1> : <h3>{testing}</h3>}
      </div>
  )
};
export default Test;