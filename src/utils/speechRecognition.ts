
export class SpeechRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private isListening = false;

  constructor(private onResult: (text: string) => void, private onEnd: () => void) {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // Initialize the SpeechRecognition object
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionAPI();
      
      // Configure the recognition service
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      
      // Set up event handlers
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.onResult(transcript);
      };
      
      this.recognition.onend = () => {
        this.isListening = false;
        this.onEnd();
      };
      
      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.isListening = false;
        this.onEnd();
      };
    }
  }

  start() {
    if (!this.recognition) {
      console.error('Speech recognition not supported in this browser');
      return false;
    }
    
    if (!this.isListening) {
      try {
        this.recognition.start();
        this.isListening = true;
        return true;
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        return false;
      }
    }
    return false;
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      return true;
    }
    return false;
  }

  isSupported() {
    return !!this.recognition;
  }
}
