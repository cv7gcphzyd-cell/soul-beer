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
  const restart = () => setStep('hero');

  return (
    <div className="min-h-screen bg-[#1a0f08] text-white overflow-hidden">
      <div className="fixed inset-0 bg-[url('/assets/main-background.png')] bg-cover opacity-80" />

      <AnimatePresence mode="wait">
        {step === 'splash' && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <div className="text-center">
              <div className="text-9xl mb-6">🍺</div>
              <h1 className="text-8xl font-black text-yellow-400">POUR</h1>
            </div>
          </motion.div>
        )}

        {step === 'hero' && (
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-6xl md:text-8xl font-black leading-none mb-10">
              WHAT’S YOUR<br />
              <span className="text-yellow-400">POUR</span> PERSONALITY?
            </h1>
            <motion.button onClick={startQuiz} className="px-16 py-8 bg-yellow-400 text-black font-bold text-3xl rounded-3xl">
              START THE QUIZ 🍺
            </motion.button>
          </div>
        )}

        {step === 'quiz' && (
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
              <h2 className="text-4xl mb-10">Choose one:</h2>
              <div className="space-y-4 max-w-md mx-auto">
                {["Party", "Beach", "Cricket", "Chill"].map((opt, i) => (
                  <button key={i} onClick={() => finishQuiz(['budweiser','corona','kingfisher','budweiser'][i])} className="block w-full p-6 bg-white/10 hover:bg-white/20 rounded-2xl text-xl">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'result' && result && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
            <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover opacity-70">
              <source src={`/assets/${result}.mp4`} type="video/mp4" />
            </video>
            <div className="relative z-10 text-center">
              <h1 className="text-8xl font-black text-yellow-400">Your Beer</h1>
              <motion.button onClick={restart} className="mt-10 px-12 py-6 bg-yellow-400 text-black font-bold text-2xl rounded-full">
                PLAY AGAIN 🍺
              </motion.button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
