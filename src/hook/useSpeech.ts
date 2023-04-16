import { useState, useEffect } from "react";

interface Options {
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
}

const useSpeech = () => {
  const [speaking, setSpeaking] = useState(false);
  const [options, setOptions] = useState<Options>({});

  const synthesis = window.speechSynthesis;

  const handleEnd = () => {
    setSpeaking(false);
  };

  useEffect(() => {
    window.speechSynthesis.addEventListener("end", handleEnd);

    return () => {
      window.speechSynthesis.removeEventListener("end", handleEnd);
    };
  }, []);

  function speakText(text: string, opts?: Options) {
    setOptions(opts || {});

    const voices = synthesis.getVoices();
    const femaleVoice = voices.find((voice) => voice.voiceURI === "Google português do Brasil");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = options.voice || femaleVoice || voices[0];
    utterance.rate = options.rate || 1.2;
    utterance.pitch = options.pitch || 1;

    synthesis.speak(utterance);
    setSpeaking(true);
  }

  const stopSpeaking = () => {
    synthesis.cancel();
    setSpeaking(false);
  };

  return {
    speakText,
    stopSpeaking,
    speaking,
  };
};

export default useSpeech;
