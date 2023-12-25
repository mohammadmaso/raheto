// Import necessary libraries
import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter,usePathname } from 'next/navigation';

const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      avatar
    }
  }
`;

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loading, error, data } = useQuery(ME_QUERY);
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('jwtToken'); // Replace with your token key
      if (token) {
        // Token is set, you can set the user as logged in
        setIsLoggedIn(true);
      } else {
        // Token is not set or expired, user is not logged in
        setIsLoggedIn(false);
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    // If the user is logged in, you can check the result of the Me query
    if (!loading && data && data.me) {
      // User is logged in and Me query returned data
      console.log('User is logged in:', data.me);
    } else {
      // User is not logged in or Me query is still loading
      console.log('User is not logged in');
    }
  }, [loading, data]);

  // Use the router's events to listen for route changes
  useEffect(() => {
    const handleRouteChange = () => {
      // Trigger the logic to check authentication when the route changes
      checkToken();
    };

    // Attach the event listener

    // Remove the event listener when the component is unmounted
    return () => {
    };
  }, [pathname]); // Only re-run the effect if the pathname changes

  return { isLoggedIn, loading, error, user: data ? data.me : null };
};

export default useAuth;
