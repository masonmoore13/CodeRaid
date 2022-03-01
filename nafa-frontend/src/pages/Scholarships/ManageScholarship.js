import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ManageScholarship = () => {

    const [scholarship_name, setScholarship_name] = useState([])
    const [description, setDescription] = useState([])
    const [image, setImage] = useState([])
    const [team_organization, setTeam_organization] = useState([])
    const [amount, setAmount] = useState([])

    const navigate = useNavigate()
    const { id } = useParams()

    const loadScholarships = async () => {
        const { data } = await axios.get(`http://127.0.0.1:8000/main/api/scholarships/${id}/`)
        console.log(data)
        setScholarship_name(data.scholarship_name)
        setDescription(data.description)
        setImage(data.image)
        setTeam_organization(data.team_organization)
        setAmount(data.amount)
    }

    useEffect(() => {
        loadScholarships()
    }, [])

    const updateScholarshipsInfo = async () => {
        await axios.put(`http://127.0.0.1:8000/main/api/scholarships/${id}/`, {
            scholarship_name: scholarship_name,
            description: description,
            image: image,
            team_organization: team_organization,
            amount: amount,
        })
        .then(response => {
           console.log(response.data) 
           navigate('/')
        })
    }

    return (
        <form onSubmit={updateScholarshipsInfo}>
            <label>
                Scholarship Name:<br />
                <input type="text" name="scholarshipName" value={scholarship_name} onChange={(e) => setScholarship_name(e.target.value)} />
                <br />
                <br />Description:<br />
                <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <br />
                <img src={image} height="300" width="150"/>
                <br />Image:<br />
                <input type="file" name="image" value={image} onChange={(e) => setImage(e.target.value)} />
                <br />
                <br />Team Organization:<br />
                <input type="text" name="team_organization" value={team_organization} onChange={(e) => setTeam_organization(e.target.value)} />
                <br />
                <br />Amount:<br />
                <input type="number" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <br />
            </label>
            <br /><br /><button type="submit">update</button>
        </form>
    );
}

export default ManageScholarship;