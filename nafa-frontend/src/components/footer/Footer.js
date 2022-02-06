import React from "react";
import "./footer.css";
import { BsFacebook, BsYoutube } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { HiLink } from 'react-icons/hi';

export default function Footer() {
    return (
        <div className="footer">
            <div className="content">
                <div className="text">ⓒNeville High School</div>
                <ul className="icons">
                    <li><a href="https://www.facebook.com/Neville-Alumni-and-Friends-Association-310455590523"><BsFacebook /></a></li>
                    <li><a href="https://www.youtube.com/c/NevilleHighSchool"><BsYoutube /></a></li>
                    <li><a href=""><GrMail /></a></li>
                    <li><a href="https://duckduckgo.com/?q=neville+highschool&t=brave&ia=web&iaxm=directions&end=what%3ANeville%2520High%2520School%2Cwhere%3A600%2520Forsythe%2520Ave%252C%2520Monroe%252C%2520LA%2520%252071201%252C%2520United%2520States&transport=drive"><FaMapMarkedAlt /></a></li>
                    <li><a href=""><HiLink /></a></li>
                </ul>
            </div>
        </div>
    );
}
