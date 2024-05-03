import {api} from '../../utils/apiWrapper';
import { useQueryClient } from 'react-query';
import styles from './userDetail.module.css';

const UserDetail = ({ user }) => {
    const { name, email, _id: id } = user;

    const queryClient = useQueryClient();
    
    const deleteUser = () => {
        api.delete(`/users/${id}`)
        .then(res => console.log(res.data) )
        .catch(e => console.log(e))
        .finally(() => queryClient?.invalidateQueries('users'));
    }


    return (
        <div className={styles.container}>
            <h2>{name}</h2>
            <p>{email}</p>
            <button onClick={deleteUser}>Delete</button>
        </div>
    );
};

export default UserDetail;