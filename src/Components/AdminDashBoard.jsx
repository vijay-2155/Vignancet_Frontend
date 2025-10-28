import { useNavigate } from "react-router-dom";
import vignansLogo from "../assets/images.png";
import mockQuestions from "../ExamPortal/data/mockData";


function AdminDashBoard() {

    const navigate = useNavigate();

    const actions = [
        {
            title: 'Add Questions',
            desc: 'Add new questions into the existing question bank by subject and topic.',
            path: '/addQuestion'
        },
        {
            title: 'Prepare Paper',
            desc: 'Prepare a full-length question paper with per-question difficulty settings.',
            path: '/setPaper'
        },
        {
            title: 'View Standings',
            desc: 'See ranks and performance of students who attempted tests.',
            path: '/getStats'
        }
    ];

    // TO DO: Fetch real data for metrics below

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <aside className="w-full md:w-64 bg-white/70 backdrop-blur-md border-r border-gray-200 h-auto md:h-screen px-6 py-8">
                    <div className="flex flex-col items-center md:items-start gap-6">
                        <img src={vignansLogo} alt="logo" className="h-12 w-auto mx-auto md:mx-0" />
                        <h2 className="text-lg font-semibold text-gray-800">Admin</h2>

                        <nav className="w-full">
                            <ul className="space-y-3">
                                {actions.map((a) => (
                                    <li key={a.title}>
                                        <button
                                            onClick={() => navigate(a.path)}
                                            className="w-full text-left px-3 py-2 rounded-md bg-transparent hover:bg-black hover:text-white transition text-sm"
                                        >
                                            {a.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="mt-auto text-xs text-gray-500">
                            Vignancet Admin Panel
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-6">
                    <div className="backdrop-blur-md bg-white/60 border border-white/30 shadow-2xl rounded-2xl p-6 w-full">
                        <h1 className="text-2xl font-extrabold text-black">Admin Dashboard</h1>
                        <p className="text-gray-700 mt-1 mb-4 text-sm">Manage exams, questions and view statistics from this panel.</p>

                        {/* compute metrics */}
                        {/* totalQuestions computed from mockQuestions; other values are demo placeholders until real data is wired */}
                        {
                            (() => {
                                const totalQuestions = Object.values(mockQuestions).reduce((s, arr) => s + (arr?.length || 0), 0);
                                const totalStudentsAttempted = 342; // demo placeholder
                                const averageScore = '72%'; // demo placeholder
                                const totalTestsConducted = 12; // demo placeholder

                                const metrics = [
                                    { id: 'q', label: 'Total Questions', value: totalQuestions },
                                    { id: 's', label: 'Students Attempted', value: totalStudentsAttempted },
                                    { id: 'a', label: 'Average Score', value: averageScore },
                                    { id: 't', label: 'Total Tests Conducted', value: totalTestsConducted }
                                ];

                                return (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        {metrics.map((m) => (
                                            <div key={m.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-sm text-gray-500">{m.label}</div>
                                                        <div className="text-2xl font-bold text-black mt-1">{m.value}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })()
                        }
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminDashBoard;