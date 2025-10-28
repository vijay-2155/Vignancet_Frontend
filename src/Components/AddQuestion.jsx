import Navbar from "./Navbar";
import { useState } from "react";
function AddQuestion() {
    const[subject,SetSubject] = new useState("");
    return (
        <>
            {/* <Navbar /> */}
            <div className="pt-300 pb-200 px-40">
                <form onSubmit={() => console.log(subject)}>
                    <label htmlFor="subject">Subject:</label>
                    <select 
                        id="subject"
                        value={subject}
                        onChange = {(e) => {SetSubject(e.target.value)}}>
                        <option value="" disabled>Select Subject</option>
                        <option value="maths">Mathematics</option>
                        <option value="physics">Physics</option>
                        <option value="chemistry">Chemistry</option>
                    </select>
                    {
                        subject === "maths" && 
                        (
                            <div>
                                <h2>Mathematics Question Form</h2>
                                {/* Add your mathematics question form fields here */}
                            </div>
                        )
                    }
                    {
                        subject === "physics" && 
                        (
                            <div>
                                <h2>Physics Question Form</h2>
                                {/* Add your physics question form fields here */}
                            </div>
                        )
                    }
                    {
                        subject === "chemistry" && 
                        (
                            <div>
                                <h2>Chemistry Question Form</h2>
                                {/* Add your chemistry question form fields here */}
                            </div>
                        )
                    }
                </form>
            </div>
        </>
    );
}
export default AddQuestion;