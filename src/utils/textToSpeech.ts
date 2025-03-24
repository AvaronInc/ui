
export class TextToSpeechService {
  private speechSynthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private preferredVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.loadVoices();
    
    // Some browsers need to wait for the voices to load
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
    }
  }

  private loadVoices() {
    this.voices = this.speechSynthesis.getVoices();
    
    // Try to find a good English voice
    this.preferredVoice = this.voices.find(
      voice => voice.lang.includes('en-US') && voice.name.includes('Google')
    ) || 
    this.voices.find(voice => voice.lang.includes('en-US')) || 
    this.voices[0] || 
    null;
  }

  speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.speechSynthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Cancel any current speech
      this.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (this.preferredVoice) {
        utterance.voice = this.preferredVoice;
      }
      
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onend = () => {
        resolve();
      };
      
      utterance.onerror = (event) => {
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };
      
      this.speechSynthesis.speak(utterance);
    });
  }

  isSupported() {
    return 'speechSynthesis' in window;
  }

  cancel() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }
}
