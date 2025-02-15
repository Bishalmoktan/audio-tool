import { createContext, useContext, useState } from "react";
interface AudioContextType {
  audioUrl: string;
  setAudioUrl: (url: string) => void;
  isPlaying: boolean;
  togglePlayPause: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <AudioContext.Provider
      value={{ audioUrl, setAudioUrl, isPlaying, togglePlayPause }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error(
      "useAudioContext must be used within a AudioContextProvider"
    );
  }
  return context;
};

export default AudioContext;
