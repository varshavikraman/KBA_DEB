import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BorrowBook = () => {
    const [username, setUsername] = useState("");
    const [bookId, setBookId] = useState("");
    const [dateofIssue, setDateofIssue] = useState("");
    const [dateofReturn, setDateofReturn] = useState("");
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/getUser', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.username);
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

    const handleIssueDateChange = (e) => {
        const issueDate = e.target.value;
        setDateofIssue(issueDate);

        if (issueDate) {
            const issue = new Date(issueDate);
            const returnDate = new Date(issue.getTime() + 14 * 24 * 60 * 60 * 1000);
            const formattedReturnDate = returnDate.toISOString().split('T')[0];
            setDateofReturn(formattedReturnDate);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const formData = {
                BookId: bookId,
                DateofIssue: dateofIssue,
                DateofReturn: dateofReturn,
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
            setError("Something went wrong: " + err.message);
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
                            value={username}
                            readOnly
                            className="border border-gray-300 w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="bookId" className="block text-gray-700">Book Id:</label>
                        <input
                            type="text"
                            id="bookId"
                            value={bookId}
                            onChange={(e) => setBookId(e.target.value)}
                            required
                            className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="issueDate" className="block text-gray-700">Date of Issue:</label>
                        <input
                            type="date"
                            id="issueDate"
                            value={dateofIssue}
                            onChange={handleIssueDateChange}
                            required
                            className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="returnDate" className="block text-gray-700">Date of Return:</label>
                        <input
                            type="date"
                            id="returnDate"
                            value={dateofReturn}
                            readOnly
                            className="border border-gray-300 w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
                        />
                    </div>

                    {message && (
                        <div className="text-green-600 text-center mb-4">{message}</div>
                    )}
                    {error && (
                        <div className="text-red-600 text-center mb-4">{error}</div>
                    )}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-40 h-12 text-white bg-green-600 font-medium rounded-2xl hover:bg-green-700 transition">
                            Issue Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BorrowBook;