import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import Post from "./Post";
import Header from "./Header";
import aarav from "../assets/Img/Feeds/Aarav.png";
import post1 from "../assets/Img/Feeds/user/postImg1.png";
import postImg2 from "../assets/Img/Feeds/user/postImg2.png";
import sneha from "../assets/Img/Feeds/Sneha.png";
import postImg3 from "../assets/Img/Feeds/user/postImg3.png";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      user: { name: "Aarav", image: aarav, time: "2 hours ago" },
      desc: "Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽",
      hashtags: "#NYC #Travel",
      images: [post1, postImg2],
      likes: 67,
    },
    {
      user: { name: "Sneha", image: sneha, time: "1 Day ago", isVideo: true },
      desc: "Taking a moment to slow down, breathe, and focus on myself. 🌿✨ Self-care isn’t selfish – it’s necessary. 💕",
      hashtags: "#SelfCare #MeTime #Wellness",
      images: [postImg3],
      likes: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const q = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      limit(20)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (data.length != 0) {
      setPosts(data);
    }
  };
  
  useEffect(() => {
    fetchPosts();
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      <div className="p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          posts.map((post, i) => <Post key={post.id} index={i} post={post} />)
        )}
      </div>
    </>
  );
};

export default Feed;
