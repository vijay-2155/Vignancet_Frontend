import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";


function AdminDashBoard() {

    const navigate = useNavigate();

    // add questions component!

    // set questions componet!

    // recent statndings componet!

    // prepared papers?

    return (
        <div>
            <Navbar /> 

            <div className="p-8 mt-20">
                <h1 className="text-3xl font-bold text-center mt-20">Admin Dashboard</h1>
                <p className="text-center mt-4">Welcome to the Admin Dashboard. Here you can manage exams, view statistics, and prepare question papers.</p>    
            </div>

            <div>
                <p>Add new questions into the existing questions based on subject & topic</p>
                <button onClick={() => navigate("/addQuestion")} >Add Questions</button>
            </div>

            <div>
                <p>Prepare a full length question paper with independent difficulty for each question</p>
                <button onClick={() => navigate("/setPaper")} >Prepare Paper</button>
            </div>

            <div>
                <p>Know the ranks of the students who attempted the test</p>
                <button onClick={() => navigate("/getStats")} >View Standings</button>
            </div>
        </div>
    );
}

export default AdminDashBoard;