import userFetchData from "../../hooks/userFetchData"
import { BASE_URL } from "../../config"
import Doctorcard from "../../components/Doctors/DoctorCard"
import Loading from "../../components/Loader/Loading"
import Error from "../../components/Error/Error"

const MyBookings = () => {
  const {data:appointments,loading,error}=userFetchData(`${BASE_URL}/users/appointments/my-appointments`)

  return (
    <div>
       {loading && !error && <Loading/>}

        {error && !loading && <Error errMessage={error}/>}  
        
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {appointments.map(doctor => (
            <Doctorcard doctor={doctor} key={doctor._id}/>
          ))}
          </div>
          )}

          {!loading && !error && appointments.length === 0 && <h2 className="mt-5 leading-7 text-center text-primaryColor text-[20px] font-semibold">You did not book any doctor yet!</h2>}
          
          </div>
  );
  
}

export default MyBookings
