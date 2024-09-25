import { useState } from "react";
import axios from 'axios';
import {Slide} from '../Styles/slide'

export function Film() {

       
    const [emoji, setEmoji] = useState('');
    const [film, setFilm] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        
        if (!emoji || !film) {
            setMessage('Please fill in all fields.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const result = await axios.post("http://localhost:3000/create", { emoji, film });
            console.log(result);
            setMessage('Film added successfully!');
        } catch (err) {
            console.log(err);
            setMessage('Error adding film. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex">
            <Slide/>
            <form onSubmit={submit} className="align-center justify-center flex">
                <h2 className="align-center flex justify-center ml-6">Add Film</h2>
                <div className="mb-2">
                    <br />
                    <label htmlFor="emoji">Emoji</label>
                    <input
                        type="text"
                        id="emoji"
                        placeholder="Enter film emoji"
                        className="form-control"
                        onChange={(e) => setEmoji(e.target.value)}
                    />
                </div>

                <div className="mb-2">
                    <br />
                    <label htmlFor="film">Film</label>
                    <input
                        type="text"
                        id="film"
                        placeholder="Enter film name"
                        className="form-control"
                        onChange={(e) => setFilm(e.target.value)}
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
