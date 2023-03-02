import React, { useState } from "react";
import '../css/Home.css';
import notes from "../data/data.js";


const Home = () => {

    const[title, Settitle] = useState("");
    const [descript, Setdescript] = useState("");

    const handlechange = (event) =>{
        console.log("fun1");
        Settitle(event.target.value);
    } 
    const handlechange1 = (event) => {
        console.log("fun2");
        Setdescript(event.target.value);
    }

    function additem() {
        console.log("fun3");
        notes.push(
            {
                "title": title,
                "content": descript,
                "color": generateColor()
            }
        );
        console.log(notes[notes.length-1]);
    }

    const generateColor = () => {
        const colors = ["lightblue", "#C3FDB8", "#FFFFCC", "#FFDAB9"]
        let color = "";
        color = colors[Math.random() * (5)];
        return color;
    };

    return (
        <div className="main">
            <h1>Notes</h1>
            <div className="notes">
                {
                    notes.map((elem) => {
                        return (
                            <div className="note" style={{ backgroundColor: `${elem.color}` }}>
                                <h2>{elem.title}</h2>
                                <p>{elem.content}</p>
                                <div>

                                </div>
                            </div>
                        )
                    }
                    )
                }
                <div className="add-button" onClick={() => additem()}>
                    <label>Title</label>
                    <input className="title" value={title} onChange={handlechange} />
                    <label for="content">Description</label>
                    <textarea className="textarea1" value={descript} onChange={handlechange1} />
                    <div className="row">
                        <input type="button" id="submit" className="submit" value={"Add"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home