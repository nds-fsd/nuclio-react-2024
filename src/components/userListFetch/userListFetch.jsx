import { useEffect } from "react";


const UserListFetch = () => {
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const getUsers = () => {
        fetch('localhost:3001/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUsers(data);
        }).catch(e => console.log(e));

    }

    const deleteUser = (id) => {
        fetch(`localhost:3001/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {setRefresh(!refresh);})
        .catch(e => console.log(e));
    }

    useEffect(() => {
        getUsers();
    }, [refresh]);

    return (<>
        {users && users.map(user => (
            <div key={user._id}>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
            </div>
        ))}
    </>);
};

export default UserListFetch;