import axios from "axios";
import React, { useEffect, useState } from "react";

//Component that loads youtube video

const SubjectVideo = ({ subjectName }) => {
  const [videoId, setVideoId] = useState("");

  //Get APIKEY from environment variables
  const apiKey = process.env.REACT_APP_API_KEY;

  //When page loads, get video, based of the subject name
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?q=${subjectName}-Overview&part=snippet&type=video&key=${apiKey}`
        );

        // Assuming the first result is the most relevant
        const firstVideoId = response.data.items[0]?.id.videoId;

        if (firstVideoId) {
          setVideoId(firstVideoId);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [apiKey, subjectName]);

  return (
    <div className="video">
      {videoId && (
        <iframe
          title="Subject Video"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default SubjectVideo;
