import { useState, useRef, useCallback } from "react";

interface UseSpeechReturn {
  transcript: string;
  isListening: boolean;
  isSupported: boolean;
  error: string;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

const ERROR_MESSAGES: Record<string, string> = {
  "not-allowed": "麦克风权限被拒绝，请在浏览器设置中允许使用麦克风",
  "network": "网络连接异常，语音识别需要联网使用",
  "no-speech": "没有检测到语音，请再试一次",
  "audio-capture": "未检测到麦克风设备，请检查麦克风连接",
  "aborted": "语音识别被中断",
  "service-not-available": "语音识别服务不可用，请稍后重试",
};

export function useSpeech(): UseSpeechReturn {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef<any>(null);

  const SpeechRecognition =
    typeof window !== "undefined"
      ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      : null;

  const isSupported = !!SpeechRecognition;

  const start = useCallback(() => {
    if (!SpeechRecognition) return;
    setError("");
    const recognition = new SpeechRecognition();
    recognition.lang = "zh-CN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
      const code = event.error as string;
      if (code !== "aborted") {
        setError(ERROR_MESSAGES[code] || `语音识别异常：${code}`);
      }
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [SpeechRecognition]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const reset = useCallback(() => {
    setTranscript("");
    setError("");
  }, []);

  return { transcript, isListening, isSupported, error, start, stop, reset };
}
