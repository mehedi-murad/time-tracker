import React from 'react';
import { useLoaderData } from 'react-router-dom';
import updateImg from "../../../assets/json/update.json"
import Lottie from 'lottie-react';

const UpdateTask = () => {
    const task = useLoaderData()
    const {_id} = task;

    const handleUpdateTask= e =>{
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const details = form.details.value;
        const notes = form.note.value;
        const updateTask ={
            title, details, notes
        }

        fetch(`http://localhost:5000/tasks/${_id}`, {
            method: 'PUT',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(updateTask)  
        })
        .then(res => res.json())
            .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                form.reset()
                Swal.fire({
                    title: 'Congratulations!',
                    text: 'You have successfully Updated To DO task',
                })
            }
        })
    }
    return (
        <div className='flex justify-around items-center gap-6 p-20'>
                <div className='flex-1'>
                        <Lottie animationData={updateImg}></Lottie>
                </div>
            <div className='flex-1'>
            <form onSubmit={handleUpdateTask} className="p-4">
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text text-white">Task Title</span>
                        </label>
                        <input
                        type="text"
                        defaultValue={task.title}
                        placeholder="Enter Task title"
                        name="title"
                        className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                            <label className="label">
                            <span className="label-text text-white">Task Description</span>
                            </label>
                            <textarea 
                            placeholder="Enter the task description" 
                            className="textarea textarea-bordered textarea-lg w-full"
                            name="details"
                            defaultValue={task.details}
                            ></textarea>
                            
                        </div>
                   
                    <div className="form-control w-full">
                            <label className="label">
                            <span className="label-text text-white">Notes</span>
                            </label>
                            <textarea 
                            placeholder="Notes (if any)" 
                            className="textarea textarea-bordered textarea-lg w-full"
                            defaultValue={task.notes}
                            name="note"
                            ></textarea>
                        </div>
                    <div>
                        <input type="submit" value="Update task" className="bg-[#F92659] px-4 py-2 text-white font-semibold rounded-lg mt-10 btn-block" />
                    </div>
                </form>
        </div>
        </div>
    );
};

export default UpdateTask;