import nav from "../assets/Img/Feeds/user/navigation.png";
import { HiHeart, HiPlay } from "react-icons/hi";

const Post = ({ post, index }) => {
  return (
    <div
      key={index}
      className="mt-2 w-[328px] h-[341px] bg-[#F7EBFF] rounded-[26px] flex flex-col mx-auto"
    >
      <div className="flex items-center gap-2 h-12 mx-4 mt-2">
        <div className="relative">
          <img
            src={post.user.image}
            alt={`${post.user.name}-image`}
            className="w-[40px] h-[40px]"
          />
          {post.user.isVideo && (
            <HiPlay className="absolute z-10 text-white w-[32px] h-[32px] top-[85%] left-[45%]" />
          )}
        </div>
        <div>
          <h3 className="text-[16px] font-semibold">{post.user.name}</h3>
          <p className="text-[10px] text-[#00000066]">{post.user.time}</p>
        </div>
      </div>
      <div className="mt-2 text-[12px] w-[90%] mx-auto">
        {post.desc} <span className="text-[#3C8DFF]">{post.hashtags}</span>
      </div>
      <div className="flex gap-2 mt-2 ml-3">
        {post.images.map((image, idx) => (
          <img
            key={idx}
            src={image}
            alt={`postImage${index}-${idx}`}
            className="w-[304px] h-[168px] rounded-[12px]"
          />
        ))}
      </div>
      <div className="flex items-center justify-between mx-auto w-[90%] mt-2">
        <div className="flex items-center">
          <HiHeart className="w-[20px] h-[20px] text-[#D95B7F]" />
          <p className="text-[12px] text-[#D95B7F]">{post.likes}</p>
        </div>
        <button className="bg-[#00000012] w-[92px] h-[30px] rounded-full flex items-center justify-center gap-1">
          <img className="w-[16px] h-[16px]" src={nav} alt="navigation-icon" />
          <p className="text-[14px]">Share</p>
        </button>
      </div>
    </div>
  );
};

export default Post;
