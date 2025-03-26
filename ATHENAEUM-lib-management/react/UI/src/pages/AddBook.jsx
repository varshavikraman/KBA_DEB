import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Component/Navbar'
import DashBar from '../Component/DashBar'

const AddBook = () => {
    const navigate = useNavigate();

    const [bookImage, setBookImage] = useState(null);
    const [bookTitle, setBookTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [publisher, setPublisher] = useState("");
    const [bookID, setBookID] = useState("");
    const [yearOfPublication, setYearOfPublication] = useState("");
    const [noOfCopies, setNoOfCopies] = useState("");
    
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setBookImage(file);
      }
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("bookImage", bookImage);  
            formData.append("BookTitle", bookTitle);
            formData.append("Author", author);  
            formData.append("Description", description);
            formData.append("Publisher", publisher);
            formData.append("BookId", bookID);
            formData.append("YearOfPublication", yearOfPublication);
            formData.append("NumberOfCopies", noOfCopies);
          
            const res = await fetch("/api/addBook", {
                method: "POST",
                credentials: "include",
                body: formData,  
            });
      
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.msg || "Error adding book");  
            }
      
            alert("Book added successfully!");
            navigate('/dashboard');
      
        } catch (err) {
            console.error(err);
            alert("Something went wrong: " + err.message);
        }
      };

  return (
    <div className="bg-lime-100">
       <Navbar/>
       <div className="flex">
          <DashBar/>
    <div className="h-[1000px] w-[490px] bg-white mx-auto my-10 rounded-2xl shadow-lg shadow-green-500">
    <h2 className="text-lime-500 text-2xl font-medium text-center pt-14">Add New Book</h2>

    <form onSubmit={handleSubmit} className="px-10 py-5">

        <div className="pt-4">
            <label htmlFor="image" className="text-green-700 text-lg font-medium block">Book Image:</label>
            <input 
                type="file" 
                id="image" 
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                accept="image/*"
                onChange={handleImageUpload}
            />
        </div>

        <div className="pt-4">
            <label htmlFor="title" className="text-green-700 text-lg font-medium block">Book Title:</label>
            <input
                type="text"
                name="title"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
          required
          className="border border-gray-300 w-full px-3 py-2 rounded-md"
        />
      </div>

        <div className="pt-4">
            <label htmlFor="author" className="text-green-700 text-lg font-medium block">Author:</label>
            <input
                type="text"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
            />
        </div>

      <div className="pt-4">
        <label htmlFor="description" className="text-green-700 text-lg font-medium block">Description:</label>
        <textarea 
            rows="5" 
            className="border border-gray-300 w-full px-3 py-2 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="pt-4">
        <label htmlFor="publisher" className="text-green-700 text-lg font-medium block">Publisher:</label>
        <input
          type="text"
          name="publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          required
          className="border border-gray-300 w-full px-3 py-2 rounded-md"
        />
      </div>

      <div className="pt-4">
        <label htmlFor="bookId" className="text-green-700 text-lg font-medium block">Book ID:</label>
        <input
          type="text"
          name="bookId"
          value={bookID}
          onChange={(e) => setBookID(e.target.value)}
          required
          className="border border-gray-300 w-full px-3 py-2 rounded-md"
        />
      </div>

      <div className="pt-4">
        <label htmlFor="publicationYear" className="text-green-700 text-lg font-medium block">Year of Publication:</label>
        <input
          type="date"
          name="publicationYear"
          value={yearOfPublication}
          onChange={(e) => setYearOfPublication(e.target.value)}
          required
          className="border border-gray-300 w-full px-3 py-2 rounded-md"
        />
      </div>

      <div className="pt-4">
        <label htmlFor="copies" className="text-green-700 text-lg font-medium block">Number of Copies:</label>
        <input
          type="number"
          name="copies"
          min={0}
          value={noOfCopies}
          onChange={(e) => setNoOfCopies(e.target.value)}
          required
          className="border border-gray-300 w-full px-3 py-2 rounded-md"
        />
      </div>

      <div className="pt-6 text-center">
        <button
          type="submit"
          className="w-40 h-10 text-white bg-green-800 font-medium rounded-2xl hover:bg-lime-600 transition"
        >
          Add Book
        </button>
      </div>
    </form>
  </div>
  </div>
  </div>
  )
}

export default AddBook