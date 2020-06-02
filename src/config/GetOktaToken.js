import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const GetOktaToken = () => {

    const { authState, authService } = useOktaAuth();
    const { accessToken } = authState;

    return [ accessToken, authService ]
}

export default GetOktaToken;