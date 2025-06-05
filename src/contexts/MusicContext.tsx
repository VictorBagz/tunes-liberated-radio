
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  image: string;
  url: string;
}

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  currentTime: number;
  duration: number;
  volume: number;
  isShuffled: boolean;
  isRepeating: 'none' | 'all' | 'one';
  playTrack: (track: Track) => void;
  playPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setQueue: (tracks: Track[]) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(70);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState<'none' | 'all' | 'one'>('none');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume / 100;
    
    const audio = audioRef.current;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeating === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeating]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    if (queue.length === 0 || !currentTrack) return;
    
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    let nextIndex = currentIndex + 1;
    
    if (nextIndex >= queue.length) {
      if (isRepeating === 'all') {
        nextIndex = 0;
      } else {
        return;
      }
    }
    
    playTrack(queue[nextIndex]);
  };

  const previousTrack = () => {
    if (queue.length === 0 || !currentTrack) return;
    
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    let prevIndex = currentIndex - 1;
    
    if (prevIndex < 0) {
      if (isRepeating === 'all') {
        prevIndex = queue.length - 1;
      } else {
        return;
      }
    }
    
    playTrack(queue[prevIndex]);
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const addToQueue = (track: Track) => {
    setQueue(prev => [...prev, track]);
  };

  const removeFromQueue = (trackId: string) => {
    setQueue(prev => prev.filter(track => track.id !== trackId));
  };

  const toggleShuffle = () => {
    setIsShuffled(prev => !prev);
  };

  const toggleRepeat = () => {
    setIsRepeating(prev => {
      if (prev === 'none') return 'all';
      if (prev === 'all') return 'one';
      return 'none';
    });
  };

  return (
    <MusicContext.Provider value={{
      currentTrack,
      isPlaying,
      queue,
      currentTime,
      duration,
      volume,
      isShuffled,
      isRepeating,
      playTrack,
      playPause,
      nextTrack,
      previousTrack,
      seekTo,
      setVolume,
      addToQueue,
      removeFromQueue,
      toggleShuffle,
      toggleRepeat,
      setQueue
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
