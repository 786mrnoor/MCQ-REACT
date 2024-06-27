import './Home.css';
import {useState} from 'react';
import Table from './Table.js';
import AddForm from './AddForm.js';
import EditForm from './EditForm.js';

export default function Home() {
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

function tableEvent(type, payload){
  if(type === 'ADD'){
    setAddForm(true);
  }
  if(type === 'EDIT'){
    setEditForm(payload);
  }
}
  return (
      <div className="Home">
        <Table tableAction={tableEvent} />
        {addForm && <AddForm showForm={setAddForm} />}
        {editForm && <EditForm topic={editForm} showForm={setEditForm}  />}
      </div>
  )
};
