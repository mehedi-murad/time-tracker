import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Aos from "aos"
import "aos/dist/aos.css"
import Lottie from 'lottie-react';
import animateImage from '../../../../public/animate.json'


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
            notes:data.note

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
        <div className='flex justify-around items-center p-20'>
            <div className='flex-1'>
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
                  <span className="label-text text-white">Notes</span>
                </label>
                <textarea 
                            placeholder="Notes (if any)" 
                            className="textarea textarea-bordered textarea-lg w-full"
                            name="note"
                            {...register("note", { required: true })}
                            ></textarea>
              </div>

              <div className="form-control">
                <input className="bg-[#F92659] px-4 py-2 text-white font-semibold rounded-lg mt-10 btn-block"
                        type="submit" value="Create Task"
                            />
              </div>
              
            </form>
            </div>
            <div data-aos="fade-left" className='flex-1'>
                <Lottie animationData={animateImage}></Lottie>
            </div>
        </div>
    );
};

export default CreateTask;