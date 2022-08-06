import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import {toast} from 'react-toastify';
import axios from 'axios';


const Home = () => {
    const [data, setData] = useState([]);
    const loadData = async () =>{
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };
    useEffect(() =>{
        loadData();
    }, []);

    const deleteLecture = (id) => {
        if(window.confirm("Are you sure do you want to delete this record?")){
            // axios.delete("http://localhost:5000/api/remove/"+id); or use
            axios.delete(`http://localhost:5000/api/remove/${id}`);

            toast.success("Lecture Deleted Successfully.");
            setTimeout(() => loadData(), 500);
        }
    }

  return (
    <div style={{marginTop:"30px"}}>
       <h2>Customized Student Time-Table</h2>
       <Link to="/addLecture">
             <button className='btn btn-lecture'>Add Lecture</button>
       </Link>
       <table className='styled-table'>
        <thead>
            <tr>
                <th style={{textAlign: "center"}}>
                    SNo.
                </th>

                <th style={{textAlign: "center"}}>
                   Course Code
                </th>

                <th style={{textAlign: "center"}}>
                    Course Title
                </th>

                <th style={{textAlign: "center"}}>
                    Day/Time
                </th>

                <th style={{textAlign: "center"}}>
                    Venue
                </th>

                <th style={{textAlign: "center"}}>
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => {
                return (
                    <tr key={item.id}>
                        <th scope="row">{index+1}</th>
                        <td>{item.courseCode}</td>
                        <td>{item.courseTitle}</td>
                        <td>{item.dayTime}</td>
                        <td>{item.venue}</td>
                        <td>
                            <Link to={`/update/${item.id}`}>
                                <button className='btn btn-edit'>Edit</button>
                            </Link>

                            <button className='btn btn-delete' onClick={() => deleteLecture(item.id)}>Delete</button>

                            <Link to={`/view/${item.id}`}>
                                <button className='btn btn-view'>View</button>
                            </Link>
                        </td>

                    </tr>
                );
            })}
        </tbody>

       </table>
    </div>
  )
}

export default Home;