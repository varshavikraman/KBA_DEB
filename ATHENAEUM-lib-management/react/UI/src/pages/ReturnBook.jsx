import React from 'react';


const ReturnBook = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-lg shadow-green-500">
        <h2 className="text-lime-500 text-3xl font-medium text-center mb-8">Return of Book</h2>

        <form className="grid gap-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700">Username:</label>
            <input 
              id="username" 
              type="text" 
              required 
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>

          <div>
            <label htmlFor="bookId" className="block text-gray-700">Book ID:</label>
            <input 
              id="bookId" 
              type="text" 
              required 
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>

          <div>
            <label htmlFor="dateOfIssue" className="block text-gray-700">Date of Issue:</label>
            <input 
              id="dateOfIssue" 
              type="date" 
              required 
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>

          <div>
            <label htmlFor="dateOfExpire" className="block text-gray-700">Date of Expire:</label>
            <input 
              id="dateOfExpire" 
              type="date" 
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>

          <div>
            <label htmlFor="returnOn" className="block text-gray-700">Return On:</label>
            <input 
              id="returnOn" 
              type="date" 
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="w-full">
              <label htmlFor="fine" className="block text-gray-700">Fine:</label>
              <input 
                id="fine" 
                type="text" 
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
              />
            </div>
            <button 
              type="button" 
              className="ml-4 px-5 py-2 bg-green-800 text-green-200 font-medium rounded-2xl hover:bg-emerald-600 hover:text-white transition"
            >
              Pay Now
            </button>
          </div>

          <div className="flex justify-center">
            <button 
              type="submit" 
              className="w-full max-w-[200px] px-4 py-2 bg-green-800 text-green-200 font-medium rounded-2xl hover:bg-emerald-600 hover:text-white transition"
            >
              Return Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnBook;
