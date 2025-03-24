
import { useState, useEffect, useRef, useCallback } from 'react';
import { SpeechRecognitionService } from '@/utils/speechRecognition';
import { TextToSpeechService } from '@/utils/textToSpeech';
import { toast } from 'sonner';

type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

export const useVoiceInteraction = (
  voiceMode: boolean,
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>,
  handleSendMessage: (message: string) => void
) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState(true);
  
  const speechRecognitionRef = useRef<SpeechRecognitionService | null>(null);
  const textToSpeechRef = useRef<TextToSpeechService | null>(null);
  
  // Set up speech services
  useEffect(() => {
    textToSpeechRef.current = new TextToSpeechService();
    speechRecognitionRef.current = new SpeechRecognitionService(
      // onResult handler
      (text) => {
        if (text.trim()) {
          handleSendMessage(text);
        }
      },
      // onEnd handler
      () => {
        setIsListening(false);
      }
    );
    
    // Check if voice features are supported
    const isSupported = 
      speechRecognitionRef.current.isSupported() && 
      textToSpeechRef.current.isSupported();
    
    setIsVoiceSupported(isSupported);
    
    if (!isSupported) {
      toast.error('Voice mode is not supported in this browser');
    }
    
    return () => {
      // Clean up
      if (textToSpeechRef.current) {
        textToSpeechRef.current.cancel();
      }
      if (speechRecognitionRef.current && isListening) {
        speechRecognitionRef.current.stop();
      }
    };
  }, [handleSendMessage]);
  
  // Monitor new assistant messages for text-to-speech
  useEffect(() => {
    if (voiceMode && textToSpeechRef.current) {
      // To listen for new messages, we'd need to add a callback from AIChat component
      // This would be called when a new assistant message is received
    }
  }, [voiceMode]);

  const startListening = useCallback(() => {
    if (!voiceMode || !speechRecognitionRef.current || !isVoiceSupported) return;
    
    const started = speechRecognitionRef.current.start();
    if (started) {
      setIsListening(true);
      toast.info('Listening...');
    }
  }, [voiceMode, isVoiceSupported]);
  
  const stopListening = useCallback(() => {
    if (speechRecognitionRef.current && isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);
  
  // Function to speak text
  const speakText = useCallback(async (text: string) => {
    if (!voiceMode || !textToSpeechRef.current || !isVoiceSupported) return;
    
    try {
      setIsSpeaking(true);
      await textToSpeechRef.current.speak(text);
    } catch (error) {
      console.error('Speech synthesis error:', error);
      toast.error('Failed to speak the message');
    } finally {
      setIsSpeaking(false);
    }
  }, [voiceMode, isVoiceSupported]);
  
  return {
    isListening,
    isSpeaking,
    isVoiceSupported,
    startListening,
    stopListening,
    speakText
  };
};
