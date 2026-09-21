import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaVolumeUp, FaVolumeMute, FaChevronUp, FaChevronDown, FaPlay } from 'react-icons/fa';
import videosData from '../../data/videos.json';
import styles from './VideoShowcase.module.css';

const VideoShowcase = () => {
  const [videos] = useState(videosData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundBlocked, setSoundBlocked] = useState(false);

  const feedRef = useRef(null);
  const videoRefs = useRef([]);

  // Set refs array
  videoRefs.current = [];
  const addToRefs = (el) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  };

  // Play active video with sound attempt
  const playActiveVideo = useCallback((index) => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === index) {
        vid.currentTime = 0;
        vid.muted = isMuted;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setSoundBlocked(false);
            })
            .catch((err) => {
              // Browser blocked unmuted autoplay policy -> fallback to muted
              console.warn('Autoplay with sound restricted, playing muted:', err);
              vid.muted = true;
              setIsMuted(true);
              setSoundBlocked(true);
              vid.play().then(() => setIsPlaying(true)).catch(() => {});
            });
        }
      } else {
        vid.pause();
      }
    });
  }, [isMuted]);

  // Scroll to index in feed using container height
  const scrollToIndex = useCallback((index) => {
    if (!feedRef.current) return;
    const containerHeight = feedRef.current.clientHeight;
    feedRef.current.scrollTo({
      top: index * containerHeight,
      behavior: 'smooth',
    });
    setActiveIndex(index);
    setIsPlaying(true);
  }, []);

  // Handle video ended -> auto-advance to next video
  const handleVideoEnded = (index) => {
    const nextIndex = (index + 1) % videos.length;
    scrollToIndex(nextIndex);
  };

  // Track scroll position to update active index
  const handleScroll = () => {
    if (!feedRef.current) return;
    const scrollTop = feedRef.current.scrollTop;
    const containerHeight = feedRef.current.clientHeight;

    const newIndex = Math.round(scrollTop / containerHeight);
    if (newIndex >= 0 && newIndex < videos.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  // Play active video on activeIndex change
  useEffect(() => {
    playActiveVideo(activeIndex);
  }, [activeIndex, playActiveVideo]);

  // Handle Mute toggle
  const toggleMute = (e) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setSoundBlocked(false);
    const currentVid = videoRefs.current[activeIndex];
    if (currentVid) {
      currentVid.muted = newMuted;
      if (currentVid.paused) {
        currentVid.play().catch(() => {});
      }
    }
  };

  // Handle Card tap to play/pause or focus
  const handleCardClick = (idx) => {
    if (idx !== activeIndex) {
      scrollToIndex(idx);
      return;
    }
    const currentVid = videoRefs.current[idx];
    if (!currentVid) return;
    if (currentVid.paused) {
      currentVid.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      currentVid.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className={styles.showcaseSection} aria-label="Tradition & Craft Video Showcase">
      <div className={styles.sectionHeader}>
        <div className={styles.badge}>Tradition in Motion</div>
        <h2 className={styles.sectionTitle}>Crafted by Nature & Heritage</h2>
      </div>

      <div className={styles.showcaseStage}>
        {/* Centered TikTok-style Player */}
        <div className={styles.playerWrapper}>
          <div className={styles.playerContainer}>
            {/* Vertical scroll feed */}
            <div
              ref={feedRef}
              className={styles.feedScroll}
              onScroll={handleScroll}
            >
              {videos.map((item, idx) => (
                <div
                  key={item.id}
                  className={styles.videoCard}
                  onClick={() => handleCardClick(idx)}
                >
                  <video
                    ref={addToRefs}
                    src={item.src}
                    className={styles.videoElement}
                    playsInline
                    preload="metadata"
                    onEnded={() => handleVideoEnded(idx)}
                  />

                  {/* Overlays */}
                  <div className={styles.videoTopOverlay}>
                    <span className={styles.reelIndexBadge}>
                      {idx + 1} / {videos.length}
                    </span>
                  </div>

                  {/* Bottom Card Info & Audio Controls */}
                  <div className={styles.videoBottomOverlay}>
                    <div className={styles.metaInfo}>
                      <h3 className={styles.videoTitle}>{item.title}</h3>
                      <p className={styles.videoCaption}>{item.caption}</p>
                    </div>

                    {/* Mute Button on bottom right */}
                    <button
                      className={styles.muteButton}
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                  </div>

                  {/* Sound blocked notice for browser autoplay policy */}
                  {soundBlocked && isMuted && idx === activeIndex && (
                    <div className={styles.soundPrompt} onClick={toggleMute}>
                      <span>Tap for sound</span>
                    </div>
                  )}

                  {/* Play/Pause center indicator on pause */}
                  {!isPlaying && idx === activeIndex && (
                    <div className={styles.playPauseOverlay}>
                      <FaPlay className={styles.playIcon} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Vertical Navigation Buttons */}
            <div className={styles.navControls}>
              <button
                className={styles.navBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToIndex(Math.max(0, activeIndex - 1));
                }}
                disabled={activeIndex === 0}
                aria-label="Previous video"
              >
                <FaChevronUp />
              </button>
              <button
                className={styles.navBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToIndex(Math.min(videos.length - 1, activeIndex + 1));
                }}
                disabled={activeIndex === videos.length - 1}
                aria-label="Next video"
              >
                <FaChevronDown />
              </button>
            </div>

            {/* More Videos Indicator below if more exist */}
            {activeIndex < videos.length - 1 && (
              <div
                className={styles.moreIndicator}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToIndex(activeIndex + 1);
                }}
              >
                <span>Scroll for next</span>
                <FaChevronDown className={styles.bounceIcon} />
              </div>
            )}
          </div>

          {/* Bottom Pagination Dots */}
          <div className={styles.paginationDots} role="tablist" aria-label="Video selector">
            {videos.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToIndex(idx);
                }}
                aria-label={`Go to video ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
