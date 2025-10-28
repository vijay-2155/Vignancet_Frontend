import Navbar from "./Navbar";
import vignansLogo from '../assets/images.png';

function Instructions() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="backdrop-blur-md bg-white/50 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
                <div className="flex justify-center mb-4">
                    <img src={vignansLogo} alt="logo" className="h-16" />
                </div>

                <h1 className="text-2xl font-bold text-center mb-4">Instructions</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                    <div>
                        <h2 className="font-semibold mb-2">For Students</h2>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Have your hall ticket ready.</li>
                            <li>Use the 'Student' login option to access your dashboard.</li>
                            <li>Keep your password confidential.</li>
                            <li>Use 'Forgot Password' if needed.</li>
                        </ol>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-2">For Admins</h2>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Use the 'Admin' login for administrative features.</li>
                            <li>Ensure you have required permissions.</li>
                            <li>Regularly update your password.</li>
                            <li>Log out after tasks to prevent unauthorized access.</li>
                        </ol>
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => {
                            const features = `width=${screen.width},height=${screen.height},fullscreen=yes`;
                            const win = window.open('/exam', 'examWindow', features);
                            if (!win) {
                                alert('Please allow popups for this site to start the exam.');
                            } else {
                                try { win.focus(); } catch (e) {}
                            }
                        }}
                        className="w-full md:w-auto bg-black text-white px-6 py-2 rounded-lg font-semibold"
                    >
                        Start Exam
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Instructions;