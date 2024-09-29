import { useState } from "react";
import axios from 'axios';
export function Create() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        
        if (!name || !email) {
            setMessage('Please fill in all fields.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const result = await axios.post("http://localhost:8000/create", { name, email });
            console.log(result);
            setMessage('User created successfully!');
        } catch (err) {
            console.log(err);
            setMessage('Error creating user. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={submit} className="align-center justify-center flex">
                <h2 className="align-center flex justify-center ml-6">Add User</h2>
                <div className="mb-2">
                    <br />
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter user name"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-2">
                    <br />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter user email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className="btn bg-green-600" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}
