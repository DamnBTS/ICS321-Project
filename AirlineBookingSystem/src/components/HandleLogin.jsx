// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function HandleLogin({ user }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       navigate(user.role === 'admin' ? "/admin" : "/passenger");
//     }
//   }, [user, navigate]);

//   return null;
// }

// export default HandleLogin;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HandleLogin({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? "/admin" : "/passenger");
    }
  }, [user, navigate]);

  return null;
}

export default HandleLogin;
