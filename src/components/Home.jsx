import React, { useState, useEffect } from "react";
import '../css/Home.css';
import { MdDelete, MdEdit } from 'react-icons/md'
import { GetNotes, CreateNote, DeleteNote, UpdateNote } from "./Backend";


const Home = () => {
    const [notes, Setnotes] = useState([]);
    async function get() {
        const data = await GetNotes();
        // console.log("DATA", data);
        Setnotes(data);
    }
    useEffect(() => {
        get();
    }, []);

    const [title, Settitle] = useState("");
    const [descript, Setdescript] = useState("");
    const [ctitle, Setctitle] = useState("");
    const [cdescript, Setcdescript] = useState("");

    const handlechange = (event) => {
        console.log("fun1");
        Settitle(event.target.value);
    }
    const handlechange1 = (event) => {
        console.log("fun2");
        Setdescript(event.target.value);
    }
    const edit = (event) => {
        console.log("fun5");
        Setctitle(event.target.value);
    }
    const edit1 = (event) => {
        console.log("fun6");
        Setcdescript(event.target.value);
    }

    const additem = async() => {
        console.log("fun3");
        let id;
        if (notes.length == null) {
            id = 0;
        }
        else {
            id = notes.length + 1;
        }
        const newitem = {
            "id": id,
            "title": title,
            "content": descript,
            "color": generateColor(),
            "edit": "false",
        };
        const res = await CreateNote(newitem);
        console.log(res);
        get();
        Setdescript("");
        Settitle("");
    }

    const editchanges = (index) =>{
        let newarr = notes;
        newarr[index].title = ctitle;
        newarr[index].content = cdescript;
        newarr[index].edit = "false";
        UpdateNote(newarr[index]);
        get();
    }

    const removeitem = async(element) => {
        const res = await DeleteNote(element);
        get();
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
                    notes.map((elem, index) => {
                        return (
                            <div>
                                <div className={`${elem.edit === "false" ? "note" : "note ab"}`} style={{ backgroundColor: `${elem.color}` }}>
                                    <div>
                                        <h2>{elem.id}</h2>
                                        <h2>{elem.title}</h2>
                                        <p>{elem.content}</p>
                                    </div>
                                    <div className="row">
                                        <MdDelete className="btn" onClick={() => removeitem(elem._id)} size={25} style={{ color: "red" }} />
                                        <MdEdit className="btn" onClick={() => { let newarr = notes; Setctitle(elem.title); Setcdescript(elem.descript); newarr[index].edit = "true"; UpdateNote(newarr[index]); get(); }} size={25} style={{ color: "orange" }} />
                                    </div>
                                </div>
                                <div className={`${elem.edit === "true" ? "add-button" : "add-button ab"}`}>
                                    <label>Title</label>
                                    <input className="title" value={ctitle} onChange={edit} />
                                    <label for="content">Description</label>
                                    <textarea className="textarea1" value={cdescript} onChange={edit1} />
                                    <div className="row">
                                        <input type="button" id="submit" className="submit" value={"Save changes"} onClick={()=> editchanges(index)} />
                                    </div>
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