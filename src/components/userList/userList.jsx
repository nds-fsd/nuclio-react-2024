import { useQuery } from "react-query";
import { api } from "../../utils/apiWrapper";
import UserDetail from "../../components/userDetail/userDetail";
import styles from './userList.module.css';

const UserList = () => {

    
    const getUsers = () => {
        return api.get('/users')
            .then(res => {
                return res.data
            })
            .catch(e => console.log(e));
    }

    // const getUsersFetch = () => {
    //     fetch('localhost:3001/users', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         return data;
    //     }).catch(e => console.log(e));

    // }

    const {data, isLoading} = useQuery('users', getUsers);

    if (isLoading) return <div>Loading...</div>;


    return (
        <>
            <h1>Users</h1>
            <div className={styles.container}>
                
                {data?.length === 0 && <div>No users found</div>}
                {data?.map(user => (
                    <UserDetail key={user._id} user={user} />
                ))}
            </div>
        </>
    );
};

export default UserList;