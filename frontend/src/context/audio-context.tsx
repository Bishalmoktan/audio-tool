import { createContext, useContext, useEffect, useState } from "react";
interface AudioContextType {
  originalAudioUrl: string;
  setOriginalAudioUrl: (url: string) => void;
  processedAudioUrl: string;
  setProcessedAudioUrl: (url: string) => void;
  currentAudioUrl: string;
  setCurrentAudioUrl: (url: string) => void;
  isPlaying: boolean;
  togglePlayPause: () => void;
  isOriginalAudio: boolean;
  setIsOriginalAudio: (isOriginal: boolean) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [originalAudioUrl, setOriginalAudioUrl] = useState<string>("");
  const [processedAudioUrl, setProcessedAudioUrl] = useState<string>("");
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isOriginalAudio, setIsOriginalAudio] = useState<boolean>(true);

  console.log(originalAudioUrl);

  useEffect(() => {
    if (isOriginalAudio) {
      setCurrentAudioUrl(originalAudioUrl);
    } else {
      setCurrentAudioUrl(processedAudioUrl);
    }
  }, [isOriginalAudio, originalAudioUrl, processedAudioUrl]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <AudioContext.Provider
      value={{
        originalAudioUrl,
        setOriginalAudioUrl,
        processedAudioUrl,
        setProcessedAudioUrl,
        currentAudioUrl,
        setCurrentAudioUrl,
        isPlaying,
        togglePlayPause,
        isOriginalAudio,
        setIsOriginalAudio,
      }}
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
