'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle } from 'lucide-react';

interface VoiceWidgetProps {
  agentId?: string;
  apiKey?: string;
}

const VoiceWidget: React.FC<VoiceWidgetProps> = ({
  agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID,
  apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        handleUserMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleUserMessage = async (message: string) => {
    // Add user message to chat
    setMessages(prev => [...prev, { text: message, isUser: true }]);

    // Simulate AI response (replace with actual ElevenLabs integration)
    setIsSpeaking(true);

    // Mock response - in real implementation, this would call ElevenLabs API
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that. Can you tell me more about your specific needs?",
        "That's an interesting question. Based on your requirements, I recommend exploring our AI agents service.",
        "Thank you for your question. Our team specializes in automation solutions that can streamline your workflow.",
        "I understand you're looking for IT consulting services. We can help modernize your infrastructure.",
        "Let me connect you with one of our specialists who can provide more detailed information."
      ];

      const response = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: response, isUser: false }]);

      // Simulate text-to-speech (would use ElevenLabs TTS API)
      speakResponse(response);

      setIsSpeaking(false);
    }, 1000);
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMute = () => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-500 rounded-full shadow-lg flex items-center justify-center z-50 transition-colors"
      >
        <MessageCircle size={24} className="text-white" />
      </motion.button>

      {/* Voice Widget Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-secondary-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Header */}
              <div className="bg-primary-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      🎤
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Forge Assistant</h3>
                      <p className="text-primary-100 text-sm">AI-Powered Voice Support</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleMute}
                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {isSpeaking ? <Volume2 size={20} /> : <VolumeX size={20} />}
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center text-secondary-400 py-8">
                    <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                    <p>Start a conversation by clicking the microphone</p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl ${
                          message.isUser
                            ? 'bg-primary-600 text-white'
                            : 'bg-secondary-700 text-secondary-100'
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))
                )}

                {isSpeaking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-secondary-700 text-secondary-100 px-4 py-2 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm">Forge is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Voice Controls */}
              <div className="p-4 border-t border-secondary-700">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isListening
                        ? 'bg-red-600 hover:bg-red-500 animate-pulse'
                        : 'bg-primary-600 hover:bg-primary-500'
                    }`}
                  >
                    {isListening ? (
                      <MicOff size={20} className="text-white" />
                    ) : (
                      <Mic size={20} className="text-white" />
                    )}
                  </button>

                  {transcript && (
                    <div className="flex-1 text-center">
                      <p className="text-secondary-300 text-sm">{transcript}</p>
                    </div>
                  )}
                </div>

                <div className="text-center mt-3">
                  <p className="text-secondary-500 text-xs">
                    {isListening ? 'Listening...' : 'Click microphone to start'}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-secondary-900 px-4 py-3 text-center">
                <p className="text-secondary-500 text-xs">
                  Powered by ElevenLabs • Privacy-first AI
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceWidget;
