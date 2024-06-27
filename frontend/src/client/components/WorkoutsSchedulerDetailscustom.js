import { useState, useEffect } from 'react';
import { WorkoutForm } from './WorkoutSchedulerForm';
import '../../public/css/workoutScheduler.css'
const WorkoutDetailsCustom = ({ workout }) => {
  const [editMode, setEditMode] = useState(false);
  const [wName, setWName] = useState([]);
  const [wLoad, setLoad] = useState([]);
  const [wRep, setRep] = useState([]);


  useEffect(() => {
    if (workout) {
      setWName(workout.workoutsArray || []);
      setLoad(workout.workOutSetArray || []);
      setRep(workout.workOutRepArray || []);
    }
  }, [workout]);

  console.log('Workout ishere' + workout)
  console.log('wName:', wName);
  console.log('wLoad:', wLoad);
  console.log('wRep:', wRep);

  const handlePrint = async () => {
    //Implement the report generation here
  };

  const handleUpdate = async () => {
    const response = await fetch('/api/updateWorkoutSchedule', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: wName,
        load: wLoad,
        reps: wRep,
      }),
    });
    if (!response.ok) {
      throw new Error('Error updating workout');
    }
    // Refresh the list of workouts after updating the selected workout
    window.location.reload();
  };

  return (
    <div>
      <table>
        <thead></thead>
        <tbody>
          {editMode ? (
            wName.map((name, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setWName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={wLoad[index]}
                    onChange={(e) => setLoad(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={wRep[index]}
                    onChange={(e) => setRep(e.target.value)}
                  />
                </td>

                
              </tr>
               
            ))
          ) : (
            wName.map((name, index) => (
              <tr className="workouts" key={index}>
                <td>{name}</td>
                <td>
                  <strong>Load (Kg):</strong> {wLoad[index]}
                </td>
                <td>
                  <strong>Reps:</strong> {wRep[index]}
                </td>

              </tr>
            ))

          )}
        </tbody>
      </table><br />
      
      {editMode?(
        <div>
          <button onClick={handleUpdate}>Save</button>
           <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
        
      ):(
        <div>
          <button className='delbtn' onClick={handlePrint}>Print</button>
        </div>
      )}
    </div>

  );
}

export default WorkoutDetailsCustom;