import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaEdit, FaPause, FaPlay, FaStop, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useTimer } from 'react-timer-hook';



const AllTasks = ({ expiryTimestamp }) => {
    
    const axiosSecure = UseAxiosSecure()

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
          const res = await axiosSecure.get("/tasks");
          return res.data;
        },
      });
      const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

      const handleDelete = id =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tasks/${id}`)
                .then(res => {
                    if(res.data.deletedCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your tasks has been deleted.",
                            icon: "success"
                          });
                          refetch()
                    }
                })
            
            }
          });
        }

    
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
            {
                tasks.map(task =>
                    <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{task.title}</h2>
                        <p>{task.details}</p>
                        <div>
                        <div role="tablist" className="tabs tabs-lifted">
                            <a role="tab" className="tab">Notes</a>
                            <p>{task.notes}</p>
                        </div>
                        </div>
                        <div className="divider"></div>

                        <div className="flex justify-between items-center p-5">
                            <div className="flex gap-6">
                                <Link to={`/dashboard/updateTask/${task._id}`}>
                                    <FaEdit></FaEdit>
                                </Link>
                                <Link onClick={()=> handleDelete(task._id)} className="text-red-800">
                                    <FaTrash></FaTrash>
                                </Link>
                            </div>
                            <div className="flex justify-evenly items-center gap-4">
                                <FaPlay></FaPlay>
                                <FaPause></FaPause>
                                <FaStop></FaStop>
                            </div>
                        </div>
                        <div>
                        <div style={{textAlign: 'center'}}>
                                <div style={{fontSize: '100px'}}>
                                    <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                                </div>
                                <p>{isRunning ? 'Running' : 'Not running'}</p>
                                <div>
                                <button onClick={start}>Start</button>
                                <button onClick={pause}>Pause</button>
                                <button onClick={resume}>Resume</button>
                                <button onClick={() => {
                                    const time = new Date();
                                    time.setSeconds(time.getSeconds() + 300);
                                    restart(time)
                                }}>Restart</button>
                                </div>
                                </div>
                        </div>
                    </div>
                    </div>
                    )
            }
            </div>

        </div>
    );
};

export default AllTasks;