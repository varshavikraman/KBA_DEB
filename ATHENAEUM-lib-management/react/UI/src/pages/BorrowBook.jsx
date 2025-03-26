import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BorrowBook = () => {
    const [username, setUsername] = useState("");
    const [dateofIssue, setDateofIssue] = useState("");
    const [dueDate, setDueDate] = useState(""); // Changed from dateofReturn to dueDate
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { bookId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Set dates with proper timezone handling
        const now = new Date();
        const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];
        setDateofIssue(today);
        
        // Set default due date (14 days from now)
        const defaultDueDate = new Date(now);
        defaultDueDate.setDate(defaultDueDate.getDate() + 14);
        const formattedDueDate = new Date(defaultDueDate.getTime() - defaultDueDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
        setDueDate(formattedDueDate);

        const fetchUser = async () => {
            try {
                const res = await fetch('/api/getUser', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.userName || "");
                } else {
                    throw new Error('Failed to fetch user');
                }
            } catch (error) {
                console.error(error);
                setError('Failed to load user data');
            }
        };

        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            // Create new Date objects to ensure proper formatting
            const issueDateObj = new Date(dateofIssue);
            const dueDateObj = new Date(dueDate); // Changed from returnDateObj to dueDateObj

            const formData = {
                BookId: bookId,
                DateofIssue: issueDateObj.toISOString(),
                DateofReturn: dueDateObj.toISOString(),  // Changed from DueDate to DateofReturn
            };

            const res = await fetch("/api/issueBook", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.msg || "Error Borrowing Book");
            }

            setMessage("Book Borrowed successfully!");
            setTimeout(() => {
                navigate('/home');
            }, 2000);

        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg shadow-green-500 p-10">
                <h2 className="text-lime-500 text-2xl font-medium text-center">Borrow Book</h2>

                <form className="mt-7" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="username" className="block text-gray-700">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username || ""}
                            readOnly
                            className="border border-gray-300 w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="bookId" className="block text-gray-700">Book ID:</label>
                        <input
                            type="text"
                            id="bookId"
                            value={bookId || ""}
                            readOnly
                            className="border border-gray-300 w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="issueDate" className="block text-gray-700">Date of Issue:</label>
                        <input
                            type="date"
                            id="issueDate"
                            value={dateofIssue || ""}
                            readOnly
                            className="border border-gray-300 w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="dueDate" className="block text-gray-700">Due Date:</label> {/* Changed label */}
                        <input
                            type="date"
                            id="dueDate"
                            value={dueDate || ""}
                            onChange={(e) => setDueDate(e.target.value)} // Allow admin to modify due date
                            className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none"
                        />
                    </div>

                    {message && <div className="text-green-600 text-center mb-4">{message}</div>}
                    {error && <div className="text-red-600 text-center mb-4">{error}</div>}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-40 h-12 text-white bg-green-600 font-medium rounded-2xl hover:bg-green-700 transition">
                            Borrow Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BorrowBook;