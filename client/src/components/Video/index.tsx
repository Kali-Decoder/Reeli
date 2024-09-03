"use client";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { VideoType } from "../../types/Video";
import { RiShareForwardFill } from "react-icons/ri";
import { FaHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { MdInsertComment } from "react-icons/md";

import {
  IoMdClose,
  IoMdPause,
  IoMdPlay,
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from "react-icons/io";
import { toast } from "react-hot-toast";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useDataContext } from "@/context/DataContext";

interface VideoStyledProps {
  isOpen: boolean;
}

const VideoStyled = styled.div<VideoStyledProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  gap: 1rem;
  height: calc(100vh - 2rem);
  .video {
    height: 100%;
    aspect-ratio: 9 / 16;
    position: relative;
    border-radius: 1rem;
    max-width: calc(100vw - 2.5rem);
    overflow: hidden;
    video {
      height: 100%;
      object-fit: cover;
    }
    .video-actions {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      button {
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--light-color));
        transition: 0.15s;
        &:hover {
          background: rgb(var(--light-color) / 0.25);
        }
        svg {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
    .video-details {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 3rem 1rem 1rem;
      background: linear-gradient(
        0deg,
        rgba(var(--dark-color) / 0.8) 0%,
        rgba(var(--dark-color) / 0) 100%
      );
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 0.75rem;
      p {
        font-size: 0.9rem;
        color: rgb(var(--light-color));
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .creator-details {
        display: flex;
        align-items: center;
        gap: 1rem;
        img {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          object-fit: cover;
        }
        button {
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.8rem;
        }
      }
    }
    .buttons {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 2rem 0.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      & > div {
        & span {
          display: block;
          font-size: 0.75rem;
          color: rgb(var(--light-color));
          text-align: center;
        }
        &.like {
          & button.liked {
            color: #877eff;
          }
        }
        &.dislike {
          & button.disliked {
            color: rgb(var(--primary-color));
          }
        }
      }
      button {
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--light-color));
        transition: 0.15s;
        &:hover {
          background: rgb(var(--light-color) / 0.25);
        }
        svg {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }
  .modal {
    position: fixed;
    top: 25%;
    border-radius: 1rem !important;
    right: 8rem;
    width: 400px;
    height: 50%;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
    transition: transform 0.3s ease-in-out;
    z-index: 1000;

    .modal-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 100%;
      justify-content: center;

      input {
        padding: 0.75rem;
        border-radius: 0.25rem;
        border: none;
        background: rgba(255, 255, 255, 0.2);
        color: white;
      }

      .confirm-button {
        background-color: #5d5fef;
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;

        &:hover {
          background-color: #4a4ec8;
        }
      }

      .close-button {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        align-self: flex-end;
        transition: color 0.3s;

        &:hover {
          color: #ddd;
        }
      }
    }
  }
`;

const Video = ({
  video,
  mute,
  setMute,
  playingVideo,
  setPlayingVideo,
}: {
  video: VideoType;
  mute: boolean;
  setMute: React.Dispatch<React.SetStateAction<boolean>>;
  playingVideo: string | null;
  setPlayingVideo: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(video.postId === playingVideo);
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [totalBid, setTotalBid] = useState<number>(0);
  const [incrementValue, setIncrementValue] = useState<number>(0); // New state for increment value
  const {  mintTokens,depositFunds } = useDataContext();
  useEffect(() => {
    // Retrieve total bid for the current video post ID
    const storedBids = JSON.parse(localStorage.getItem(`bids_${video.postId}`) || "[]");
    const sumOfBids = storedBids.reduce((total: number, bid: number) => total + bid, 0);
    setTotalBid(sumOfBids);

    // Reset modal state if video changes
    if (video.postId !== playingVideo) {
      setIsModalOpen(false);
      setBidAmount("");
      setTenure("");
    }
  }, [playingVideo, video.postId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIncrementValue((prevValue) => prevValue + 2);
    }, 5000); // Increment value every 5 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  const handleBidAmount = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    const newBid = parseFloat(bidAmount);
    if (isNaN(newBid) || newBid <= 0) {
      toast.error("Invalid bid amount.");
      return;
    }

    const storedBids = JSON.parse(localStorage.getItem(`bids_${video.postId}`) || "[]");
    storedBids.push(newBid);
    localStorage.setItem(`bids_${video.postId}`, JSON.stringify(storedBids));

    const sumOfBids = storedBids.reduce((total: number, bid: number) => total + bid, 0);
    setTotalBid(sumOfBids);
    // await mintTokens("0x25e6d86a5a7083d9d61e40381e5238ab6d2e785825eba0183cebb6009483dab4",newBid*(10**6));
    await depositFunds(120,1);
    setIsModalOpen(false);
    setBidAmount("");
    setTenure("");
  };

  const handleLike = () => {
    setDisliked(false);
    setLiked((prevLiked) => !prevLiked);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(video.submission.mediaUrl);
    toast.success("Video link copied to clipboard!");
  };

  const handleComment = () => {
    toast.success("Comment feature coming soon!");
  };

  useEffect(() => {
    const currentVideoRef = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.target.id !== playingVideo &&
            (entry.target as HTMLVideoElement)?.paused
          ) {
            setPlay(true);
            setPlayingVideo(entry.target.id);
            return;
          }
          if (!entry.isIntersecting) {
            setPlay(false);
            return;
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }
    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
    };
  }, [playingVideo, setPlayingVideo]);

  useEffect(() => {
    if (play) {
      videoRef.current?.play();
      return;
    }
    videoRef.current?.pause();
  }, [play]);

  return (
    <VideoStyled isOpen={isModalOpen}>
      <div className="video selected">
        <video
          ref={videoRef}
          src={video.submission.mediaUrl}
          poster={video.submission.thumbnail}
          id={video.postId}
          autoFocus
          autoPlay={play}
          loop={video.postId === playingVideo}
          onClick={(event) => {
            event.stopPropagation();
            setPlay(!play);
          }}
          muted={mute}
        />
        <div className="video-actions">
          <div className="play-pause">
            {play ? (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setPlay(false);
                }}
              >
                <IoMdPause />
              </button>
            ) : (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setPlay(true);
                }}
              >
                <IoMdPlay />
              </button>
            )}
          </div>
          <div className="volume">
            {mute ? (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setMute(false);
                }}
              >
                <IoMdVolumeOff />
              </button>
            ) : (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setMute(true);
                }}
              >
                <IoMdVolumeHigh />
              </button>
            )}
          </div>
        </div>
        <div className="video-details">
          <div className="creator-details">
            <img src={video.creator.pic} alt={video.creator.name} />
            <p>{video.creator.name}</p>
            <button className="bg-dark-4 text-white">Subscribe</button>
          </div>
          <p>{video.submission.title}</p>
          <p>{video.submission.description}</p>
        </div>
        <div className="buttons">
          <div className="like">
            <button
              title="I like this"
              onClick={handleLike}
              aria-label="I like this"
              className={`like-button ${liked ? "liked" : ""}`}
            >
              <FaHeart/>
            </button>
            <span>
              {video.reaction.count > 0
                ? liked
                  ? video.reaction.count + 1
                  : video.reaction.count
                : "Like"}
            </span>
          </div>
          <div className="bid-amount">
            <button
              title="Bidding Money"
              onClick={handleBidAmount}
              aria-label="Bidding Money"
            >
              <RiMoneyDollarCircleFill />
            </button>
            <span>{totalBid > 0 ? `Total: $${totalBid}` : "Bid Amount"}</span>
          </div>
          <div className="comment">
            <button
              title="Comment"
              aria-label="Comment"
              onClick={handleComment}
            >
              <MdInsertComment />
            </button>
            <span>0</span>
          </div>
          <div className="share">
            <button title="Share" onClick={handleShare} aria-label="Share">
              <RiShareForwardFill />
            </button>
            <span>Share</span>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <button
            className="close-button"
            onClick={() => setIsModalOpen(false)}
          >
            <IoMdClose />
          </button>
          <div className="modal-content">
            <input
              type="number"
              placeholder="Bid Amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tenure"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
            />
            <button className="confirm-button" onClick={handleConfirm}>Invest Amount</button>
          </div>
        </div>
      )}
      <div className="increment-value">
        <p>Increment Value: {incrementValue}</p>
      </div>
    </VideoStyled>
  );
};

export default Video;
