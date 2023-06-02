
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineException } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import { RiMastodonLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addtodopage = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
 
  const posttodohandler= async() => {

    const res = await fetch("/api/auth/todos",{
        method:"POST",
        body:JSON.stringify({title,status}),
        headers:{"Content-Type":"application/json"}
    })

    const data = await res.json()

    if(data.status === "success"){
        setTitle(""),
        setStatus("todo")
        toast.success("todo added")
      
    }

  }
  return (
    <div className="add-form">
      <h2>
        <AiOutlinePlusCircle />
        Add new todo
      </h2>

      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            value={title}
            type="Text"
            placeholder="please add todo"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          <div className="todo">
            <label htmlFor="todo">
              <RiMastodonLine />
              todo
            </label>
            <input
              checked={status === "todo"}
              id="todo"
              type="radio"
              value="todo"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="inProgress">
            <label htmlFor="inProgress">
              <AiFillSetting />
              in Progress
            </label>
            <input
              checked={status === "inprogress"}
              id="inProgress"
              type="radio"
              value="inprogress"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="review">
            <label htmlFor="review">
              <AiOutlineException />
              Review
            </label>
            <input
              checked={status === "review"}
              id="review"
              type="radio"
              value="review"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="done">
            <label htmlFor="done">
              <AiOutlineCheck />
              Done
            </label>
            <input
              checked={status === "done"}
              id="done"
              type="radio"
              value="done"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
        </div>
        <button onClick={posttodohandler}>Add</button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Addtodopage;
