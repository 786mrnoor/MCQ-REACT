import './topic.css';
import { useState } from "react";
import Table from "./Table";
import AddForm from './AddForm.js';
import EditForm from './EditForm.js';

export default function Topic() {
    const [addForm, setAddForm] = useState(false);
    const [editForm, setEditForm] = useState(false);

    function tableEvent(type, payload) {
        if (type === 'ADD') {
            setAddForm(true);
        }
        if (type === 'EDIT') {
            setEditForm(payload);
        }
    }
    return (
        <div className="topic-page">
            <Table tableAction={tableEvent} />
            {addForm && <AddForm showForm={setAddForm} />}
            {editForm && <EditForm question={editForm} showForm={setEditForm} />}
        </div>
    )
};
