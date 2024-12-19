import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { db, addDoc, collection, storage } from "../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CreatePost = ({ user }) => {
  const [caption, setCaption] = useState("");
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = () => {
    document.getElementById("photoInput").click();
  };

  const handleVideoUpload = () => {
    document.getElementById("videoInput").click();
  };

  const handleCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      videoElement.play();

      // Create a canvas to capture the photo
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      videoElement.onloadeddata = () => {
        // Set the canvas size to match video
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Convert canvas to image and set state
        setCameraImage(canvas.toDataURL("image/png"));

        // Stop the camera stream
        stream.getTracks().forEach((track) => track.stop());
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Failed to access camera.");
    }
  };

  const handleCreatePost = async () => {
    setUploading(true);
    try {
      const photoURLs = [];

      // Upload photos to Firebase Storage
      if (photos.length > 0) {
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          const storageRef = ref(storage, `photos/${Date.now()}_${photo.name}`);
          const uploadTask = uploadBytesResumable(storageRef, photo);

          const photoURL = await new Promise((resolve, reject) => {
            uploadTask.on("state_changed", null, reject, async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(url);
            });
          });

          photoURLs.push(photoURL);
        }
      }

      // Upload video to Firebase Storage
      let videoURL = null;
      if (video) {
        const storageRef = ref(storage, `videos/${Date.now()}_${video.name}`);
        const uploadTask = uploadBytesResumable(storageRef, video);

        videoURL = await new Promise((resolve, reject) => {
          uploadTask.on("state_changed", null, reject, async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          });
        });
      }

      // Create the post object with the URLs
      const newPost = {
        caption,
        photos: photoURLs, // Store array of photo URLs
        video: videoURL, // Store video URL
        userEmail: localStorage.getItem("email"),
        createdAt: new Date(),
      };

      // Add the post to Firestore in the "posts" collection
      await addDoc(collection(db, "posts"), newPost);
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error adding post: ", error);
      alert("Failed to create post.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Link to="/profile" className="mr-4">
          <FaArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">New Post</h1>
      </div>

      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        rows="4"
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      ></textarea>

      <div className="flex justify-between mb-4">
        <button
          onClick={handlePhotoUpload}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
        >
          Photos
        </button>
        <button
          onClick={handleVideoUpload}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
        >
          Videos
        </button>
        <button
          onClick={handleCamera}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
        >
          Camera
        </button>
      </div>

      {/* Display preview of selected photos */}
      {photos.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={URL.createObjectURL(photo)}
              alt={`Photo Preview ${index}`}
              className="w-32 h-32 object-cover"
            />
          ))}
        </div>
      )}

      {/* Display preview of selected video */}
      {video && (
        <video controls className="w-full h-auto mb-4">
          <source src={URL.createObjectURL(video)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Display preview of camera capture */}
      {cameraImage && (
        <img
          src={cameraImage}
          alt="Camera Capture"
          className="w-full h-auto mb-4"
        />
      )}

      {/* Hidden Inputs for Photos and Videos */}
      <input
        type="file"
        id="photoInput"
        accept="image/*"
        className="hidden"
        multiple
        onChange={(e) => setPhotos([...e.target.files])}
      />
      <input
        type="file"
        id="videoInput"
        accept="video/*"
        className="hidden"
        onChange={(e) => setVideo(e.target.files[0])}
      />

      <button
        onClick={handleCreatePost}
        className={`w-full bg-blue-500 text-white py-2 rounded mt-4 ${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Create Post"}
      </button>
    </div>
  );
};

export default CreatePost;
