import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ScholarshipDetails = () => {

    const [scholarship, setScholarship] = useState([])

    const  {id}  = useParams();
    const navigate = useNavigate();

    const getSingleScholarship = async () => {
        const { data } = await axios.get(`http://127.0.0.1:8000/main/api/scholarships/${id}/`);
        console.log(data);
        setScholarship(data);
    }

    useEffect(() => {
        getSingleScholarship();
    }, [])

    const deleteScholarship = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/main/api/scholarships/${id}/`)
        navigate('/')
    }

    return ( 
    <div>
        <h1>Scholarship Details</h1>
        <div className='single-scholarship-info'>
            <p>Scholarship name: {scholarship.scholarship_name}</p>
            <p>Scholarship description: {scholarship.description}</p>

            <Link className="btn btn-primary m-2" to="managescholarship">Update</Link>
            <Link className="btn btn-danger m-2" to="managescholarship" onClick={() => deleteScholarship(scholarship.id)}>Delete</Link>
        </div>
    </div>
    );
}
 
export default ScholarshipDetails;