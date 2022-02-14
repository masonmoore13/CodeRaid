import React, { useState } from "react";
import axios from "axios";

const AddScholarship = () => {

    const [scholarship_name, setScholarship_name] = useState([])
    const [description, setDescription] = useState([])
    const [image, setImage] = useState([])
    const [team_organization, setTeam_organization] = useState([])
    const [amount, setAmount] = useState([])

    const AddScholarship = async (event) => {
        event.preventDefault()
        await axios.post('http://127.0.0.1:8000/main/api/scholarships/', {
            scholarship_name: scholarship_name,
            description: description,
            image: image,
            team_organization: team_organization,
            amount: amount,
            
        })

            .then(res => {
                console.log(res.data)
            })
    }

    return (
        <form onSubmit={AddScholarship}>
            <label>
                Scholarship Name:<br />
                <input type="text" name="scholarshipName" value={scholarship_name} onChange={(e) => setScholarship_name(e.target.value)} />
                <br/>
                <br/>Description:<br />
                <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <br />
                <br/>Image:<br />
                <input type="file" name="image" value={image} onChange={(e) => setImage(e.target.value)} />
                <br />
                <br/>Team Organization:<br />
                <input type="text" name="team_organization" value={team_organization} onChange={(e) => setTeam_organization(e.target.value)} />
                <br />
                <br/>Amount:<br />
                <input type="number" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <br />
            </label>
            <br/><br/><button type="submit">add</button>
        </form>
    )
}

export default AddScholarship