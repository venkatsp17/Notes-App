import React, { useState } from "react";
import '../css/Home.css';
import { MdDelete, MdEdit } from 'react-icons/md'


const Home = () => {

    const [title, Settitle] = useState("");
    const [descript, Setdescript] = useState("");
    const [note, Setnote] = useState([]);

    const handlechange = (event) => {
        console.log("fun1");
        Settitle(event.target.value);
    }
    const handlechange1 = (event) => {
        console.log("fun2");
        Setdescript(event.target.value);
    }

    const additem = () => {
        console.log("fun3");
        let id;
        if(note.length==null){
            id = 1;
        }
        else{
            id = note.length + 1;
        }
        const newitem = {
            "id": id,
            "title": title,
            "content": descript,
            "color": generateColor()
        };
        Setnote([...note, newitem]);
    }

    const removeitem = (element) => {
        const newarr = note.filter(function (e) {
            return e.id !== element;
        });
        console.log(newarr);
        Setnote(newarr);
    }

    const generateColor = () => {
        const colors = ["lightblue", "#C3FDB8", "#FFFFCC", "#FFDAB9"]
        let color = "";
        color = colors[Math.floor(Math.random() * (4))];
        return color;
    };

    return (
        <div className="main">
            <h1>Notes</h1>
            <div className="notes">
                {
                    note.map((elem) => {
                        return (
                            <div className="note" style={{ backgroundColor: `${elem.color}` }}>
                                <div>
                                    <h2>{elem.id}</h2>
                                    <h2>{elem.title}</h2>
                                    <p>{elem.content}</p>
                                </div>
                                <div className="row">
                                    <MdDelete className="btn" onClick={() => removeitem(elem.id)} size={25} style={{ color: "red" }} />
                                    <MdEdit className="btn" size={25} style={{ color: "orange" }} />
                                </div>
                            </div>
                        )
                    }
                    )
                }
                <div className="add-button">
                    <label>Title</label>
                    <input className="title" value={title} onChange={handlechange} />
                    <label for="content">Description</label>
                    <textarea className="textarea1" value={descript} onChange={handlechange1} />
                    <div className="row">
                        <input type="button" id="submit" className="submit" value={"Add"} onClick={additem} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home