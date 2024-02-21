import{useEffect,useState} from 'react';
import axios from 'axios'
import { MDBDataTable } from 'mdbreact';
import { MDBDatatable, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const[users,setUsers]=useState([""]);
  const[find,setFind]=useState([""]);
  const[searchuser,setSearchuser]=useState([""]);
  // useEffect(()=>{
  //   fetchData();
  //   // axios.get('http://localhost:5000/threads')
  //   // .then(async(user)=>{
  //   // const a=await setUsers(user.data);
  //   // if(users!==find)
  //   // {
  //   //   setFind(user.data);
  //   // }
  //   // })
  //   // .catch(err=>console.log(err));
  //   // console.log(users);
  // },[find]);


  useEffect(() => {
    fetchData(); // Initial fetch

    // Fetch data every 10 seconds (adjust the interval as needed)
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [find]);

  const fetchData = () => {
    console.log("called");
    axios.get('http://localhost:5000/threads')
      .then(async(user) => {
        await setUsers(user.data);
        console.log(users===find);
        if (users !== find) {
          setFind(user.data);
        }
      })
      .catch((err) => console.log(err));
  };


//  const timer=setTimeout(()=>{
//     fetchData();
//  },10000);

  const approvalfunction=async(event)=>{
    console.log(event);
    const userData={
      email:event
    };
    axios.post("http://localhost:5000/threads/add", userData).then((response) => {
      // const message=response.data.msgg;
      alert(response.data.msgg);
      fetchData();
      console.log(response.data.msgg);
    });

   
  }

  const deletefunction=async(event)=>{
    console.log(event);
    const userData={
      email:event
    };
    axios.post("http://localhost:5000/threads/del", userData).then((response) => {
      // const message=response.data.msgg;
      alert(response.data.msgg);
      fetchData();
      console.log(response.data.msgg);
    });

   
  }

  const data = {
    columns: [
      {
        label: 'Phone',
        field: 'number',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 270
      },
      {
        label: 'College',
        field: 'selectedCollege',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 200
      },
      {
        label: 'UPI',
        field: 'UPI_id',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Events',
        field: 'selectedEvents',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Workshop',
        field: 'selectedWorkshops',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Approve',
        field: 'contact',
        width:200
      }
     
    ],
    rows:[...users].map((row) => {
      return {
        ...row,
        contact: (
          <div className="button-container"><button className="btn btn-success" onClick={() =>approvalfunction(`${row.email}`)}>Add</button>
          <button className="btn btn-danger" color='red' onClick={() =>deletefunction(`${row.email}`)}>Del</button>
         
            
          </div>
        ),
      };
    }),
     
      
    
  };

  return (
    <div>
      <br></br>
      <MDBDataTable
      striped
      bordered
      small
      btn
      data={data}
    />
    
    </div>
 
  );
}

export default App;

