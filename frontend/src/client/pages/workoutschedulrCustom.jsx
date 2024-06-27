import Cookies from 'js-cookie'
import '../../public/css/workoutScheduler.css'
import { useEffect, useState } from "react";
import WorkoutDetailsCustom from '../components/WorkoutsSchedulerDetailscustom';

const WorkoutSchedulerCustom = () => {
    const [workouts, setWorkouts] = useState('');
    const [UserName] = useState(Cookies.get('sessionName'));

    useEffect(() => {
        console.log('Passing alpha');
        const fetchWorkouts = async () => {
            const response = await fetch('/api/myWorkoutSchedule');
            const json = await response.json();
            console.log('Passing Bravo');
            if (response.ok) {
                setWorkouts(json);
                console.log('Passing Charlie');
               
            }
        };
        console.log('Passing Delta');
        fetchWorkouts();
       
    }, []);

    return (
        <div>
            <h1 className='Nameone'>WORKOUT SCHEDULE</h1>
            <div className='cus'>
                <h1 className='cusname2'>{UserName}</h1>
                <h2 className='cusname'>Level - 6 Months</h2>
            </div>
            <div >
                <WorkoutDetailsCustom workout={workouts}/>
            </div>
            <div className='container'></div>
        </div>
    );
};

export default WorkoutSchedulerCustom;
