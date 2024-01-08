import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Aos from "aos"
import "aos/dist/aos.css"


const CreateTask = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        console.log(data)
        const taskInfo={
            title:data.title,
            details:data.details,
            deadline:data.deadline,
            priority:data.priority

        }

        fetch('http://localhost:5000/tasks',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(taskInfo)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Task created successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
        }) 
    }
    useEffect(()=>{
        Aos.init({duration:2000})
    },[])
    return (
        <div className='flex justify-around items-center'>
            <div>
            <form data-aos="fade-up" onSubmit={handleSubmit(onSubmit)} className="p-4">
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text text-white">Task Title</span>
                        </label>
                        <input
                        type="text"
                        placeholder="Task title"
                        name="title"
                        {...register("title", { required: true })}
                        className="input input-bordered"
                        />
                        {errors.name && (
                        <span className="text-red-500 mt-2">Task title is required</span>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label">
                        <span className="label-text text-white">Task Description</span>
                        </label>
                        <textarea 
                            placeholder="Enter the task description" 
                            className="textarea textarea-bordered textarea-lg w-full"
                            name="details"
                            {...register("details", { required: true })}
                            ></textarea>
                       
                        {errors.details && (
                        <span className="text-red-500 mt-2">
                            Task Details is required
                        </span>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label">
                        <span className="label-text text-white">Deadlines</span>
                        </label>
                        <input
                        type="date"
                        placeholder="Enter Deadline"
                        name="deadline"
                        {...register("deadline", { required: true })}
                        className="input input-bordered"
                        />
                        {errors.deadline && (
                        <span className="text-red-500 mt-2">deadline is required</span>
                        )}
                    </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Set the Priority</span>
                </label>
                <select {...register("priority")} className="select select-bordered w-full" name="priority">
                        <option  disabled selected>Set the priority</option>
                        <option>Low</option>
                        <option>Moderate</option>
                        <option>High</option>
                </select>
                {errors.priority && (
                    <span className="text-red-500 mt-2">Priority checking is required</span>
                    )}
              </div>

              <div className="form-control">
                <input className="bg-[#F92659] px-4 py-2 text-white font-semibold rounded-lg mt-10 btn-block"
                        type="submit" value="Task Submit"
                            />
              </div>
              
            </form>
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default CreateTask;