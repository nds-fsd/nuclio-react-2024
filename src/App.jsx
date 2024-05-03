import './App.css'
import UserList from './components/userList/userList'
import CreateUser from './components/createUser/createUser'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
      <CreateUser />


      
    </QueryClientProvider>
  )
}

export default App
