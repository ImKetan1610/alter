import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Post from "./Post";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserPosts(currentUser.uid);
      } else {
        setUser(null);
        setPosts([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserPosts = async (userId) => {
    setLoading(true);
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const userPosts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(userPosts);
    setLoading(false);
  };

  const handleAddPost = () => {
    navigate("/create-post");
  };

  return (
    <div className="p-4 relative">
      {user ? (
        <div className="flex flex-col items-center">
          <img
            src={user.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <h1 className="text-xl font-bold mt-2">
            {user.displayName || "User"}
          </h1>
          <p className="text-gray-500">{user.email}</p>
          <p className="mt-4 text-center">
            {user.bio || "This user hasn't added a bio yet."}
          </p>

          <div className="mt-6 w-full">
            <h2 className="text-lg font-bold mb-4">My Posts</h2>
            {loading ? (
              <p>Loading posts...</p>
            ) : posts.length > 0 ? (
              posts.map((post) => <Post key={post.id} data={post} />)
            ) : (
              <p>No posts to display.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center">You need to log in to view your profile.</p>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleAddPost}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg text-3xl flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
};

export default Profile;
