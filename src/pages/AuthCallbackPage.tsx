


import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useAuth();

  useEffect(() => {
   
    const handleAuthCallback = async () => {
      try {
        const token = searchParams.get('token');
        console.log(token,'AuthContext.tsx')


           if (token) {
          // Store token temporarily
          localStorage.setItem('temp_token', token);
          
          // Redirect to home/dashboard
          navigate('/');
        } 

        // if (token) {
        //   // Store token temporarily
        //   localStorage.setItem('temp_token', token);
          
        //   // Redirect to home/dashboard
        //   navigate('/');
        // } else {
        //   navigate('/login');
        // }
        
        if (!token) {
          navigate('/login?error=no_token');
          return;
        }
    
        // 1. First verify the token
        const verifyResponse = await fetch(
          `http://localhost:3000/auth/verify-token?token=${token}`,
          {
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );

        console.log(verifyResponse,'verifyResponse')
    
        // Check if response is JSON
        const contentType = verifyResponse.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new Error('Server returned non-JSON response');
        }
    
        const verification = await verifyResponse.json();

        console.log(verification.user,'verification')
        
        if (!verification.valid) {
          throw new Error('Token verification failed');
        }
    
        // 2. Then get full user data


        // const userResponse = await fetch('http://localhost:3000/auth/current', {
        //   credentials: 'include',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        // });
        
        
        // const userData = await userResponse.json();
        // console.log(userData,'userDatacurrent')
       
        setUser(verification.user);

        
        // Redirect
        // const returnTo = localStorage.getItem('returnTo') || '/';
        // navigate(returnTo);
        
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login?error=auth_failed');
      }
    };
  

    handleAuthCallback();
  }, [navigate, searchParams, setUser]);


  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <LoadingSpinner size="lg" />
      <h2 className="mt-4 text-xl font-semibold text-gray-900">
        Completing sign in...
      </h2>
    </div>
  );
};

export default AuthCallbackPage;




