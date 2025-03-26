import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditBook = () => {
  const { bookTitle } = useParams(); // Get bookTitle from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [copies, setCopies] = useState(0);
  const [currentBook, setCurrentBook] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`/api/getBook?bookTitle=${encodeURIComponent(bookTitle)}`);
        if (!response.ok) throw new Error('Failed to fetch book data');
        
        const data = await response.json();
        if (!data) throw new Error(`Book "${decodeURIComponent(bookTitle)}" not found`);
        
        setCurrentBook(data);
        setCopies(data.numberOfCopies);
      } catch (error) {
        toast.error(error.message);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [bookTitle, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/updateBookCopies', {
        method: 'PATCH',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          BookTitle: decodeURIComponent(bookTitle),
          NumberOfCopies: parseInt(copies, 10)
        })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.msg || 'Update failed');
      
      toast.success(result.msg);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Update Copies for: <span className="text-green-600">{decodeURIComponent(bookTitle)}</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="copies" className="block text-sm font-medium text-gray-700">
              Current Copies: {currentBook?.numberOfCopies}
            </label>
            <input
              type="number"
              id="copies"
              min="0"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/books')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {loading ? 'Updating...' : 'Update Copies'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;