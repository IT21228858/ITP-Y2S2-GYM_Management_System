//import { useState } from "react";
import React, { useState, useEffect } from "react";
import "../../public/css/feedback.css";
import FeedbackDetailsz from "./FeedbackDetails copy";
import "../../public/css/FeedbackForm.css";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

const FeedbackForm = () => {
  const [feedbackID, setfeedbackID] = useState("");
  const [userID, setuserID] = useState("");
  const [description, setdescription] = useState("");
  const [rating, setrating] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);

  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
  };
  
  
useEffect(() => {
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/allfeedback');
      const json = await response.json();
      if (response.ok) {
        setFeedbacks(json);
      } else {
        setError(json.error);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch feedbacks');
    }
  };

  fetchFeedbacks();
}, []);


const handleSearch = (event) => {
  setSearchQuery(event.target.value.trim());
};

const filteredFeedbacks = feedbacks.filter((feedback) => {
  const ratingString = feedback.rating.toString();
  return ratingString.toLowerCase().includes(searchQuery.toLowerCase());
});
      

  const handleSubmit = async (e) => {
    const feedback = { feedbackID, userID, description, rating, image, video, audio };

    // the fetch request to post the new data
    const response = await fetch("/api/feedbacks", {
      method: "POST",
      body: JSON.stringify(feedback),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setfeedbackID("");
      setuserID("");
      setdescription("");
      setrating("");
      //setlikeCount('')
      //setdisLikeCount('')
      setImage(null);
      setVideo(null);
      setAudio(null);
      setError(null);
      console.log("new feedback added", json);
    }
  };

  // const Review = require('../backend/models/FeedbackModel')// import the Mongoose model

  // const generateReport = async () => {
  //   // Fetch the reviews data from MongoDB
  //   const reviews = await Review.find({}, { rating: 1, createdAt: 1 })
  //     .sort({ createdAt: 1 })
  //     .lean(); // Use lean() for faster performance
  
  //   // Calculate the average rating for each month
  //   const monthlyAverages = {};
  //   for (const review of reviews) {
  //     const month = review.createdAt.getMonth();
  //     const rating = review.rating;
  //     if (!monthlyAverages[month]) {
  //       monthlyAverages[month] = { count: 0, total: 0 };
  //     }
  //     monthlyAverages[month].count++;
  //     monthlyAverages[month].total += rating;
  //   }
  //   const averageRatings = Object.entries(monthlyAverages).map(([month, { count, total }]) => ({
  //     month: new Date(0, month).toLocaleString('default', { month: 'long' }), // Format the month name
  //     rating: (total / count).toFixed(1), // Calculate the average rating
  //   }));
  
  //   // Define the document definition for the PDF report
  //   const docDefinition = {
  //     content: [
  //       { text: "Monthly Average Ratings Report", style: "header" },
  //       { text: " " },
  //       { text: " " },
  //       {
  //         table: {
  //           headerRows: 1,
  //           widths: ["*", "*"],
  //           body: [
  //             ["Month", "Average Rating"],
  //             ...averageRatings.map(({ month, rating }) => [month, rating]),
  //           ],
  //         },
  //       },
  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 18,
  //         bold: true,
  //         alignment: "center",
  //         margin: [0, 0, 0, 10],
  //       },
  //     },
  //   };
  
  //   // Generate the PDF report
  //   pdfMake.createPdf(docDefinition).download("MonthlyAverageRatingsReport.pdf");
  // };

    return (
        <div>
           
            {/* <button  className="genrep" onClick={generateReport}>Generate Report</button> */}

      <div className="searchbar">
          <input type="text" placeholder="Search by Rating" onChange={handleSearch} />
      </div>

    <div className="cont">
      {filteredFeedbacks.map((feedback) => (
        <FeedbackDetailsz key={feedback._id} feedback={feedback} />
      ))}
    </div>
  
            

        </div>
    )
}

export default FeedbackForm
