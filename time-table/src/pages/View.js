import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import "./View.css";

const View = () => {
    const [user, setUser] = useState({});

    const {id} = useParams();

    useEffect(() =>{
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((res) => setUser({...res.data[0]}));
      }, [id]);
  return (
    <div style={{marginTop: "150px"}}>
        <div className="card">
            <div className='card-header'>
                <p>Lecture Details</p>
            </div>
                <div className='container'>
                    <strong>Lecture ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />

                    <strong>Course Code:</strong>
                    <span>{user.courseCode}</span>
                    <br />
                    <br />

                    <strong>Course Title:</strong>
                    <span>{user.courseTitle}</span>
                    <br />
                    <br />

                    <strong>Day/Time:</strong>
                    <span>{user.dayTime}</span>
                    <br />
                    <br />

                    <strong>Venue:</strong>
                    <span>{user.venue}</span>
                    <br />
                    <br />

                    <Link to="/">
                        <button className='btn btn-edit'>Go Back</button>
                    </Link>
                </div>

        </div>
    </div>
  )
}

export default View