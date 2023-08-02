import React, { useState } from "react";
import "../home/Home.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CircularProgress } from '@mui/material';
import { apilink } from "../../data/fdata";
import axios from 'axios';


const Add = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [textstatus, setTextStatus] = useState(false);

  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const his = useHistory();
  const [bgclass,setBgclass]=useState('alert-warning')

  const onAdd = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data={
        title,
        description,
        status:false
    }

    const res = await axios.post(`${apilink}/api/task/addwork`, data);
    // console.log(res.data)
    if(res.data.success)
    {
      setDescription('')
      setTitle('')
      setBgclass("alert-success")
      setMsg(res.data.msg);
      setStatus(true);

      setTimeout(() => {
        setStatus(false);
        his.push('/');
      }, 1500);
    }else{
      setDescription('')
      setTitle('')
      setBgclass("alert-warning")
      setMsg(res.data.msg);
      setStatus(true);
    }
    setLoading(false)
  };
  return (
    <>
      <div className="hero">
        <div className="inn_hero">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-12 mx-auto">
              <div className="card p-3">
                <h3 className="text-center p-2">Add Item</h3>
                {status ? (
                  <>
                    <div class={`alert ${bgclass} alert-dismissible`}>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        onClick={() => setStatus(false)}
                      >
                        &times;
                      </button>
                      {msg}
                    </div>
                  </>
                ) : null}
                <form onSubmit={onAdd}>
                  <label for="comment">Enter Title:</label>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="title"
                      placeholder="Enter Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="comment">Enter Description:</label>
                    <textarea
                      class="form-control"
                      placeholder="Enter Description"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                 < div className="text-center">
                    <button
                      className={loading ? 'dis btn btn-edit pl-5 pr-5' : 'btn btn-edit pl-5 pr-5'}
                      disabled={loading}
                    >
                      Add Item
                    </button>
                  </div>
                  {loading && (
                    <div className="text-center p-2">
                      <CircularProgress size={35} />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
