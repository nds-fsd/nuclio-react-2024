import styles from './createUser.module.css';
import { useForm } from "react-hook-form"
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../utils/apiWrapper';

const CreateUser = (props) => {
    const queryClient = useQueryClient();

    const [error, setError] = useState();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: 'Pepe',
            email: 'pepe@gmail.com',
            password: '123456aaA',
            age: '30',
            fruit: 'apple'
        }
    });

    const addUser = (data) => {
        api.post('/users', data);
    };

    const mutation = useMutation(addUser, {
        onSuccess: () => {
          // Invalidate and refetch
            setError(undefined);
            setTimeout(() => {
                queryClient.invalidateQueries('users');
            }, 100);
        
        },
        onError: (error) => {
            console.log(error);
            setError(error.message);
        }
    });

    const onSubmit = (data) => {
        console.log(watch('name'));
        mutation.mutate(data);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create user</h2>
            {error && <div className={styles.error}>{error}</div>}
            <label for="name">
                Name*:
            </label>
            <input {...register('name', { required: "Name is required" })} placeholder="Name" />
            {errors.name && <p>{errors.name.message}</p>}<br/>
            

            <label for="name">
                Email*:
            </label>
            <input {...register('email', { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })} placeholder="Email" />
            {errors.email && <p>{errors.email.message}</p>}<br/>

            <label for="name">
                Password*:
            </label>
            <input {...register('password', { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })} placeholder="Password" type="password" />
            {errors.password && <p>{errors.password.message}</p>}<br/>

    
            <input type="submit" />
    
        </form>
    );

};

export default CreateUser;