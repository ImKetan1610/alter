import React, { useState } from "react";
import { auth, db, storage } from "../utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PostForm = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (imageFile) => {
    const imageRef = ref(storage, `posts/${Date.now()}_${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    return getDownloadURL(imageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && images.length === 0) return alert("Please add some content!");

    setUploading(true);

    try {
      const uploadedImageUrls = await Promise.all(
        images.map((image) => handleImageUpload(image))
      );

      await addDoc(collection(db, "posts"), {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || "Anonymous",
        userPhoto: auth.currentUser.photoURL || "",
        text,
        images: uploadedImageUrls,
        timestamp: serverTimestamp(),
      });

      setText("");
      setImages([]);
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create the post. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <div className="p-4 bg-white shadow rounded mb-6">
      <h2 className="text-lg font-bold mb-2">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="What's on your mind?"
          rows="4"
        ></textarea>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
