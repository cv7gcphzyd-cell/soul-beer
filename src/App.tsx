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

  const resultData = {
    budweiser: { name: "Budweiser", tag: "The King of Beers", video: "/assets/budweiser.mp4" },
    corona: { name: "Corona", tag: "Find Your Beach", video: "/assets/corona.mp4" },
    kingfisher: { name: "Kingfisher", tag: "The True Taste of India", video: "/assets/kingfisher.mp4" }
  };

  return (
    <div className="min-h-screen bg-[#1a0f08] text-white overflow-hidden relative">
      <div className="fixed inset-0 bg-[url('/assets/main-background.png')] bg-cover bg-center opacity-80" />

      <AnimatePresence mode="wait">
        {step === 'splash' && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center z-50 bg-black">
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2 }} className="text-center">
              <div className="text-9xl mb-6">🍺</div>
              <h1 className="text-8xl font-black text-beer">POUR</h1>
            </motion.div>
          </motion.div>
        )}

        {step === 'hero' && (
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative z-10">
            <h1 className="text-6xl md:text-8xl font-black leading-none mb-10">
              WHAT’S YOUR<br />
              <span className="text-beer">POUR</span> PERSONALITY?
            </h1>
            <motion.button 
              onClick={startQuiz}
              whileHover={{ scale: 1.1 }}
              className="px-16 py-8 bg-beer text-darkbeer font-bold text-3xl rounded-3xl"
            >
              START THE QUIZ 🍺
            </motion.button>
          </div>
        )}

        {step === 'quiz' && (
          <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
            <div className="text-center max-w-md">
              <h2 className="text-4xl font-bold mb-12">What's your ideal weekend?</h2>
              <div className="space-y-4">
                {["Party with friends", "Beach day", "Cricket match", "Chill at home"].map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => finishQuiz(i === 0 ? 'budweiser' : i === 1 ? 'corona' : 'kingfisher')}
                    className="w-full p-8 bg-white/10 hover:bg-white/20 rounded-3xl text-xl"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'result' && result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
            <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover opacity-70">
              <source src={resultData[result].video} type="video/mp4" />
            </video>
            <div className="relative z-10 text-center px-6">
              <h1 className="text-8xl font-black text-beer mb-6">{resultData[result].name}</h1>
              <p className="text-4xl mb-12">{resultData[result].tag}</p>
              <motion.button whileHover={{ scale: 1.1 }} onClick={restart} className="px-16 py-7 bg-beer text-darkbeer font-bold text-2xl rounded-full">
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
