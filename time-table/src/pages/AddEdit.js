import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import './AddEdit.css';
import axios from 'axios';
import {toast} from 'react-toastify';

const initialState = {
  courseCode: "",
  courseTitle: "",
  dayTime: "",
  venue: "",
}


const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const {courseCode, courseTitle, dayTime, venue} = state;
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() =>{
    axios.get(`http://localhost:5000/api/get/${id}`)
    .then((res) => setState({...res.data[0]}));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(!courseCode || !courseTitle || !dayTime || !venue){
      toast.error("Please All Fields Are Required!");
    }else{
      if(!id){
        axios
        .post("http://localhost:5000/api/post", {
          courseCode,
          courseTitle,
          dayTime,
          venue,
        })
        .then(() =>{
          setState({courseCode:"", courseTitle:"", dayTime:"", venue:""});
        }).catch((err) => toast.error(err.response.data));
        toast.success("Lecture Added Successfully.");
      }else{
        axios
      .put(`http://localhost:5000/api/update/${id}`, {
        courseCode,
        courseTitle,
        dayTime,
        venue,
      })
      .then(() =>{
        setState({courseCode:"", courseTitle:"", dayTime:"", venue:""});
      }).catch((err) => toast.error(err.response.data));
      toast.success("Lecture Updated Successfully.");
      }
      
      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setState({...state, [name]: value});
  }
  return (
    <div style={{marginTop: '100px'}}>
        <h2>Add/Edit</h2>
        <form style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center'
        }}
        onSubmit={handleSubmit}
        >
          <label htmlfor="Course Code">Course Code</label>
          <input 
          type="text" 
          id="courseCode" 
          name="courseCode" 
          placeholder="Course Code" 
          value={courseCode || ""}
           onChange={handleInputChange} />


          <label htmlfor="Course Title">Course Title</label>
          <input 
          type="text" 
          id="courseTitle" 
          name="courseTitle" 
          placeholder="Course Title" 
          value={courseTitle || ""}
           onChange={handleInputChange} />


          <label htmlfor="dayTime">Day/Time</label>
          <input 
          type="text" 
          id="dayTime" 
          name="dayTime" 
          placeholder="Day:Time" 
          value={dayTime || ""}
           onChange={handleInputChange} />



          <label htmlfor="Course Code">Venue</label>
          <input 
          type="text" 
          id="venue" 
          name="venue" 
          placeholder="Lecture Venue" 
          value={venue || ""}
           onChange={handleInputChange} />

          <input 
          type="submit" 
          id="submit" 
          value={id ? "Update" : "Save"}
            />

          <Link to="/">
            <input type="button" value="Go Back" />
          </Link>

        </form>
    </div>
  )
}

export default AddEdit