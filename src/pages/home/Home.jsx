import React, { useEffect, useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { apilink } from "../../data/fdata";
import axios from "axios";
import { useAlert } from "react-alert";
const Home = () => {
  const alert = useAlert();
  const [showpopup,setShowPopUp]=useState(false)
  const [allData,setAllData]=useState([])
  const [currentData,setCurrentData]=useState({})



  useEffect(()=>{
    getalldata()
  },[])
const getalldata=async()=>{
  const res = await axios.get(`${apilink}/api/task/getAllTask`);
  // console.log(res.data)
  if(res.data.success)
  { 
    setAllData(res.data.video)

  }else{
    alert.error(res.data.msg)
  }
}


const deleteTask=async(id)=>{
  const res = await axios.get(`${apilink}/api/task/deleteTask/${id}`);
  console.log(res.data)
  if(res.data.success)
  {

    let arr=allData.filter((v)=>v._id!=id)
    setAllData(arr)
    alert.success(res.data.msg)

  }else{
    alert.error(res.data.msg)
  }

}

const showItem=(id)=>{
const data=allData.filter((v)=>v._id==id)
setCurrentData(...data)
}

const updateWork=async(id)=>{
  const res=await axios.get(`${apilink}/api/task/updateTaskById/${id}`)
  console.log(res.data)
  if(res.data.success)
  {
    getalldata()
    alert.success(res.data.msg)
  }else{
    alert.error(res.data.msg)
  }
}
// console.log(currentData)

  return (
    <>
      <div className="hero">
        <div className="inn_hero">
          <h3>All Items</h3>


          
          <div className=" mt-4">
            {
              allData.length >0 ?<>
              <div className="item_flex mt-4">
              {allData?.map((val, ind) => {
              return (
                <>
                  <div className="card_item " key={ind}>
                    {!val.status && <p className="cur m-0 checkitem" onClick={()=>updateWork(val._id)} title="if you done , click it"><i className="fa fa-check"></i></p>}
                    <h4 className="pt-3">{val.title}</h4>
                    <p className="m-0">
                      
                      {val.description}
                    </p>
                    {
                      val.status ? <span class="badge badge-success pt-1 pb-1 pl-2 pr-2">
                      Done
                    </span> : <span class="badge badge-warning pt-1 pb-1 pl-2 pr-2">
                      Pending
                    </span>
                    }

                    <div className="text-center mt-4">
                      {
                        !val.status ?(
                          <>
                          
                          <NavLink to={`/edit/${val._id}`} className="btn btn-edit m-1">
                        Edit <i className="fa fa-edit"></i>
                      </NavLink>
                          </>
                        ):(
                          <>
                          <button className="btn btn-edit m-1 dis" disabled={true}>
                        Edit <i className="fa fa-edit"></i>
                      </button>
                          
                          </>
                        )
                      }
                      
                      <button className="btn btn-outline-view m-1" onClick={()=>{
                        document.querySelector('#root').classList.add('disable-scroll');
                        setShowPopUp(true)
                        showItem(val._id)
                      }}>
                        View <i className="fa fa-eye"></i>
                      </button>
                      
                    </div>

                    <div className="icon_box" onClick={()=>deleteTask(val._id)}>&times;</div>


                 

                  </div>
                </>
              );
            })}

              </div>
              
              </> :(
                <>
                <div className="text-center">
                  <h5>No Items Found</h5>
                </div>
                
                </>
              )
            }
            
          </div>
        </div>
      </div>
      {
        showpopup &&  <div className="model_box">
        <div className="inner_model">
              <div className="cross" onClick={()=>{
            document.querySelector('#root').classList.remove('disable-scroll');
            setShowPopUp(false)}}>
                &times;
              </div>
              <div>
              <p className="home_p"><b>Title</b>:  {currentData?.title}</p>
               <p><b>Description</b> : {currentData?.description}</p>
              </div>
        </div>
      </div>
      }

     
    </>
  );
};

export default Home;