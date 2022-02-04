import React from 'react'
import './about.css'
import Header from '../../../components/header/Header'
import Navbar from '../../../components/navbar/NavBar'


export default function About() {
    return (
        <>
            <Header/>
            <Navbar/>
                <div className="about-us-container">
                    <h1>About Us</h1>
                    <hr/>
                    <p className="mission-statement">
                    Mission Statement<br/><br/>
                    
                    It is the mission of NAFA to provide supplemental funding for programs or projects to enhance the quality of instructional delivery and student life, and to promote excellence in higher education at NHS.
                    If you have any information or event that needs to be featured on this site, please contact Dana Jefferson, NAFA Executive Director.<br/><br/>
                    
                    President's Message:<br/><br/>
                    
                    Alumni and Friends are the backbone of the Neville Nation! The Neville Alumni and Friends Association support scholarships for our students, beautification projects for our school and outreach programs with many civic and community organizations. We need you to make all of this happen. The cost to join is minimal with a diversity of membership options available – student, individual, couple, lifetime, etc. Come join us in keeping Neville High School strong!<br/><br/>
                    Jay Traylor, Class of 1980<br/>
                    NAFA President 2017-2019
                    </p>
                </div>
        </>
    )
}