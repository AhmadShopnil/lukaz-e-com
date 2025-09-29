import { getVideos } from "@/utils/actions";
import React from "react";

const VideoSection = async ({video}) => {
  // const videos = await getVideos();

  const videoInfo = {
    videoId: "qVzXhG1mf_8", // Demo YouTube video ID
    title: "Discover the Latest Trends",
    subtitle: "Watch our product highlights in action",
    buttonText: "Shop Now",
  };

  return (
    <section className="w-full bg-black">
      <div className="relative w-full overflow-hidden">
        {/* Video Wrapper */}
        <div className="relative w-full aspect-video">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
             src={`https://www.youtube.com/embed/${video?.video_link}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${video?.video_link}`}
            // src={`https://www.youtube.com/embed/${videos[0].video_link}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1`}
            title={video?.title}
            allow="autoplay; encrypted-media; clipboard-write; accelerometer; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Overlay Content - now bottom-left */}
        <div className="absolute inset-0 flex flex-col justify-end items-start bg-black/30 text-left p-4 md:p-12">
          <div>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-2 space-grotesk">
              {video?.title}
            </h2>
           
              <p className="text-white text-lg mb-4 space-grotesk">{video?.description}</p>
       
            {videoInfo.buttonText && (
              <button className="px-6 py-1.5  sm:px-8 sm:py-3  text-white rounded-md border border-white transition space-grotesk">
               {video?.button_text}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
