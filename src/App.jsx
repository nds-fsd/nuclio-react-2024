import './App.css'
import UserList from './components/userList/userList'
import CreateUser from './components/createUser/createUser'
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from './components/login/login';
import Register from './components/register/register';
import { getUserToken } from './utils/localStorage.utils';
import Logout from './components/logout/logout';
import { useState } from 'react';

const queryClient = new QueryClient();

function App() {

  const [forceUpdate, setForceUpdate] = useState(false);
  const token = getUserToken();
  console.log(token);
  const isLogged = !!token;
  return (
    <QueryClientProvider client={queryClient}>
      {!isLogged && <Login forceUpdate={() => {setForceUpdate(!forceUpdate)}} />}
      {!isLogged && <Register forceUpdate={() => {setForceUpdate(!forceUpdate)}}/>}
      
      {isLogged && <Logout forceUpdate={() => {setForceUpdate(!forceUpdate)}}/>}

      <UserList />
    </QueryClientProvider>
  )
}

export default App
