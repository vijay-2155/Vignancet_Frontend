import Navbar from "./Navbar";

function Instructions() {
    return (
        <>
            <Navbar />
            <div className="instructions-container">
                <h1 className="instructions-title">Instructions for Students and Admins</h1>
                <div className="instructions-content">
                    <h2 className="instructions-subtitle">For Students:</h2>
                    <ol className="instructions-list">
                        <li>Ensure you have your hall ticket ready before logging in.</li>
                        <li>Use the 'Student' login option to access your dashboard.</li>
                        <li>Keep your password confidential and do not share it with others.</li>
                        <li>If you forget your password, use the 'Forgot Password' link to reset it.</li>
                    </ol>
                    <h2 className="instructions-subtitle">For Admins:</h2>
                    <ol className="instructions-list">
                        <li>Use the 'Admin' login option to access administrative features.</li>
                        <li>Ensure that you have the necessary permissions to perform admin tasks.</li>
                        <li>Regularly update your password to maintain account security.</li>
                        <li>Log out after completing your tasks to prevent unauthorized access.</li>
                    </ol>
                </div>
            </div>

        </>
    )

}

export default Instructions;