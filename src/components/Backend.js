export async function GetNotes () {
    const data = await (await fetch("http://localhost:8000/notes")).json();
    console.log(data);
    if(data.length != 0) return(data);
}

export async function CreateNote (data) {
    const res = (await fetch("http://localhost:8000/addnote", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }));
    return res.body;
}


export async function DeleteNote (id){
    const res = await fetch(`http://localhost:8000/deletenote/${id}`, { method: 'DELETE' });
    return res;
}


export async function UpdateNote (data) {
    const res = (await fetch(`http://localhost:8000/updatenote/${data._id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }));
    return res.body;
}