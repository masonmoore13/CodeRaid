import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Scholarship = () => {

    const [scholarships, updateScholarships] = useState([])

    const getScholarships = async () => {
        const response = await axios.get('http://127.0.0.1:8000/main/api/scholarships/')
        updateScholarships(response.data)
        console.log(response.data)
    }

    useEffect(() => {
        getScholarships()
    }, [])

    return (
        <div>
            {scholarships.map((scholarship, index) => (
                <div>
                    Scholarship_Name: {scholarship.scholarship_name} 
                    <br/><br/>
                    Scholarship_Description: {scholarship.description}
                    <br/><Link className="btn btn-primary m-2" to={`${scholarship.id}`}>details</Link><br/>
                </div>
            )
            )
            }
            <br/><Link className="btn btn-primary m-2" to="addscholarship">Click here to add a Scholarship.</Link><br/>
        </div>
    )
}

export default Scholarship