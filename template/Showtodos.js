import React, { useEffect, useState } from 'react';
import Onetodopage from '../module/Onetodopage';

const Showtodos = () => {
    const [todos , setTodos] = useState([])
    useEffect(() => {
        fetchtodos()
    },[])
    const fetchtodos = async() => {
        const res = await fetch("/api/auth/todos")
        const data = await res.json()
        console.log(data);
       setTodos(data.data);
      
    }
    return (
        <div className='home-page'>
            <div className='home-page--todo'>
                <p>Todo</p>
                <Onetodopage data={todos.todo} fetchtodos={fetchtodos} next="inprogress"/>
            </div>
            <div className='home-page--inProgress'>
                <p>in Progress</p>
                <Onetodopage data={todos.inprogress} fetchtodos={fetchtodos} next="review" back="todo"/>
            </div>
            <div className='home-page--review'>
                <p>Review</p>
                <Onetodopage data={todos.review} fetchtodos={fetchtodos} next="done" back="inprogress"/>
            </div>
            <div className='home-page--done'>
                <p>Done</p>
                <Onetodopage data={todos.done} fetchtodos={fetchtodos} back="review"/>
            </div>
          
        </div>
    );
};

export default Showtodos;