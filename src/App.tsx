import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [step, setStep] = useState('splash');
  const [result, setResult] = useState(null);

  const startQuiz = () => setStep('quiz');
  const finishQuiz = (beer) => {
    setResult(beer);
    setStep('result');
  };
  const restart = () => {
    setResult(null);
    setStep('hero');
  };

  return (
    <div className="min-h-screen bg-[#1a0f08] text-white overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 bg-[url('/assets/main-background.png')] bg-cover opacity-80" />

      <AnimatePresence mode="wait">
        {/* Splash */}
        {step === 'splash' && (
          <motion.div 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black"
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} className="text-center">
              <div className="text-9xl mb-6">🍺</div>
              <h1 className="text-8xl font-black text-yellow-400 tracking-widest">POUR</h1>
              <p className="text-xl mt-4 text-white/70">Finding your perfect beer...</p>
            </motion.div>
          </motion.div>
        )}

        {/* Hero */}
        {step === 'hero' && (
          <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10">
            <h1 className="text-6xl md:text-8xl font-black leading-none mb-10">
              WHAT’S YOUR<br />
              <span className="text-yellow-400">POUR</span> PERSONALITY?
            </h1>
            <motion.button 
              onClick={startQuiz}
              whileHover={{ scale: 1.1 }}
              className="px-16 py-8 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-3xl rounded-3xl shadow-2xl"
            >
              START THE QUIZ 🍺
            </motion.button>
          </div>
        )}

        {/* Simple Quiz */}
        {step === 'quiz' && (
          <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
            <div className="max-w-lg w-full text-center">
              <h2 className="text-4xl font-bold mb-12">What's your ideal weekend?</h2>
              <div className="space-y-4">
                {["Party with friends", "Beach day", "Cricket match", "Chill at home"].map((text, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => finishQuiz(i === 0 ? 'budweiser' : i === 1 ? 'corona' : 'kingfisher')}
                    className="w-full p-8 bg-white/10 hover:bg-white/20 rounded-3xl text-2xl transition-all"
                  >
                    {text}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {step === 'result' && result && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover opacity-70">
              <source src={`/assets/${result}.mp4`} type="video/mp4" />
            </video>
            <div className="relative z-10 text-center px-6">
              <h1 className="text-8xl font-black text-yellow-400 mb-6">
                {result === 'budweiser' ? 'Budweiser' : result === 'corona' ? 'Corona' : 'Kingfisher'}
              </h1>
              <p className="text-4xl mb-12">Your Soul Brew</p>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                onClick={restart}
                className="px-16 py-7 bg-yellow-400 text-black font-bold text-2xl rounded-full"
              >
                POUR AGAIN 🍺
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
