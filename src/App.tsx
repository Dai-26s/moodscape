import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepIndicator from './components/StepIndicator';
import Background from './components/Background';
import { useLang } from './i18n/LanguageContext';
import { type HumanState, type Weather, type Place, type Mood, type BodyState, type SocialEnergy, type MatchResult } from './types';
import { matchMovies } from './engine/matcher';
import './App.css';

function getTimeString(): string {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let timeOfDay = '';
  if (hour >= 5 && hour < 12) timeOfDay = 'Morning';
  else if (hour >= 12 && hour < 17) timeOfDay = 'Afternoon';
  else if (hour >= 17 && hour < 21) timeOfDay = 'Evening';
  else timeOfDay = 'Night';
  return `${dayNames[day]} ${timeOfDay}`;
}

const weatherOptions: { key: Weather; icon: string }[] = [
  { key: 'sunny', icon: '☀️' }, { key: 'rainy', icon: '🌧️' }, { key: 'snow', icon: '❄️' },
  { key: 'cloudy', icon: '☁️' }, { key: 'windy', icon: '💨' },
];

const placeOptions: { key: Place; icon: string; literary?: string }[] = [
  { key: 'home', icon: '🏠' }, { key: 'office', icon: '💼' }, { key: 'hotel', icon: '🏨' },
  { key: 'airport', icon: '✈️' }, { key: 'train', icon: '🚂' }, { key: 'cafe', icon: '☕' },
  { key: 'hospital', icon: '🏥' }, { key: 'unknown_city', icon: '🗺️' },
  { key: 'hometown', icon: '🏡', literary: 'literary' },
  { key: 'dont_belong', icon: '🫥', literary: 'literary' },
];

const moodOptions: { key: Mood; icon: string }[] = [
  { key: 'peaceful', icon: '😌' }, { key: 'lonely', icon: '🥺' }, { key: 'excited', icon: '🤩' },
  { key: 'nostalgic', icon: '📷' }, { key: 'heartbroken', icon: '💔' }, { key: 'burned_out', icon: '🔋' },
  { key: 'anxious', icon: '😰' }, { key: 'cant_sleep', icon: '🦉' }, { key: 'missing_someone', icon: '📝' },
  { key: 'want_to_disappear', icon: '🌫️' }, { key: 'need_motivation', icon: '🔥' }, { key: 'just_want_silence', icon: '🤫' },
];

const bodyOptions: { key: BodyState; icon: string }[] = [
  { key: 'havent_slept_well', icon: '😴' }, { key: 'headache', icon: '🤕' },
  { key: 'too_much_coffee', icon: '☕' }, { key: 'ate_too_much', icon: '🍔' },
  { key: 'havent_eaten', icon: '🍽️' }, { key: 'a_little_drunk', icon: '🍷' },
  { key: 'sick', icon: '🤒' }, { key: 'long_day_at_work', icon: '💻' },
  { key: 'havent_pooped', icon: '🚫' }, { key: 'just_cleaned_room', icon: '🧹' },
  { key: 'going_through_breakup', icon: '💔' }, { key: 'about_to_quit_job', icon: '✉️' },
];

const socialOptions: { key: SocialEnergy; icon: string }[] = [
  { key: 'alone', icon: '🧘' }, { key: 'one_close_friend', icon: '👤' },
  { key: 'family', icon: '👨‍👩‍👧‍👦' }, { key: 'crowded_city', icon: '🌃' }, { key: 'nobody_talks', icon: '🤐' },
];

export default function App() {
  const { tl, lang } = useLang();
  const [step, setStep] = useState(0);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [place, setPlace] = useState<Place | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [body, setBody] = useState<BodyState[]>([]);
  const [social, setSocial] = useState<SocialEnergy | null>(null);
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MatchResult | null>(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [eggMovie, setEggMovie] = useState<MatchResult | null>(null);
  const timeStr = useMemo(() => getTimeString(), []);

  const humanState = useMemo((): HumanState | null => {
    if (weather && place && mood && social) {
      return { weather, place, mood, body, social, time: timeStr };
    }
    return null;
  }, [weather, place, mood, body, social, timeStr]);

  useEffect(() => {
    if (humanState && step === 5) {
      const matched = matchMovies(humanState);
      setResults(matched);
      setSelectedMovie(matched[0]);
    }
  }, [humanState, step]);

  const toggleBody = (key: BodyState) => {
    setBody(prev => prev.includes(key) ? prev.filter(b => b !== key) : [...prev, key]);
  };

  const isStepComplete = (): boolean => {
    switch (step) {
      case 0: return weather !== null;
      case 1: return place !== null;
      case 2: return mood !== null;
      case 4: return social !== null;
      default: return true;
    }
  };

  const handleNext = () => { if (step < 5) setStep(step + 1); };
  const handleBack = () => { if (step > 0) setStep(step - 1); };

  const timeDisplayText = typeof tl.timeDisplay === 'function'
    ? (tl.timeDisplay as (t: string) => string)(timeStr)
    : timeStr;

  const isZh = lang === 'zh';

  return (
    <div className={`app ${isZh ? 'lang-zh' : ''}`}>
      <Background />

      <AnimatePresence mode="wait">
        {step < 5 && (
          <motion.div
            key="questionnaire"
            className="questionnaire"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="time-display">{timeDisplayText}</div>
            <StepIndicator current={step} total={5} labels={tl.stepLabels} />

            <motion.div
              key={step}
              className="step-content"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {step === 0 && (
                <>
                  <h2 className="step-question">{tl.stepQuestions[0]}</h2>
                  <p className="step-subtitle">{tl.stepSubtitles.weather}</p>
                  <div className="option-grid">
                    {weatherOptions.map(opt => (
                      <motion.button
                        key={opt.key}
                        className={`option-btn ${weather === opt.key ? 'selected' : ''}`}
                        onClick={() => setWeather(opt.key)}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <span className="option-icon">{opt.icon}</span>
                        <span className="option-label">{tl.weather[opt.key]}</span>
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className="step-question">{tl.stepQuestions[1]}</h2>
                  <div className="option-grid">
                    {placeOptions.map(opt => (
                      <motion.button
                        key={opt.key}
                        className={`option-btn ${place === opt.key ? 'selected' : ''}`}
                        onClick={() => setPlace(opt.key)}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <span className="option-icon">{opt.icon}</span>
                        <span className="option-label">{tl.place[opt.key]}</span>
                        {opt.literary && tl.placeLiterary[opt.key as 'hometown' | 'dont_belong'] && (
                          <span className="option-literary">{tl.placeLiterary[opt.key as 'hometown' | 'dont_belong']}</span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="step-question">{tl.stepQuestions[2]}</h2>
                  <div className="option-grid grid-3">
                    {moodOptions.map(opt => (
                      <motion.button
                        key={opt.key}
                        className={`option-btn mood-btn ${mood === opt.key ? 'selected' : ''}`}
                        onClick={() => setMood(opt.key)}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <span className="option-icon">{opt.icon}</span>
                        <span className="option-label">{tl.mood[opt.key]}</span>
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="step-question">{tl.stepQuestions[3]}</h2>
                  <p className="step-subtitle">{tl.stepSubtitles.body}</p>
                  <div className="option-grid grid-3">
                    {bodyOptions.map(opt => (
                      <motion.button
                        key={opt.key}
                        className={`option-btn body-btn ${body.includes(opt.key) ? 'selected' : ''}`}
                        onClick={() => toggleBody(opt.key)}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <span className="option-icon">{opt.icon}</span>
                        <span className="option-label">{tl.body[opt.key]}</span>
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h2 className="step-question">{tl.stepQuestions[4]}</h2>
                  <div className="option-grid">
                    {socialOptions.map(opt => (
                      <motion.button
                        key={opt.key}
                        className={`option-btn ${social === opt.key ? 'selected' : ''}`}
                        onClick={() => setSocial(opt.key)}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <span className="option-icon">{opt.icon}</span>
                        <span className="option-label">{tl.social[opt.key]}</span>
                      </motion.button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>

            <div className="nav-buttons">
              <button className="nav-btn back" onClick={handleBack} disabled={step === 0}>
                {tl.nav.back}
              </button>
              <button className="nav-btn next" onClick={handleNext} disabled={!isStepComplete()}>
                {step === 4 ? tl.nav.find : tl.nav.next}
              </button>
            </div>
          </motion.div>
        )}

        {step === 5 && results && selectedMovie && (
          <motion.div
            key="results"
            className="results-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {selectedMovie.movie.isEasterEgg && !showEasterEgg ? (
              <motion.div
                className="easter-egg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <pre className="easter-egg-text">
                  {tl.egg.line1}{'\n'}{tl.egg.line2}{'\n'}{tl.egg.line3}{'\n'}{tl.egg.line4}{'\n'}
                  {tl.egg.divider}{'\n'}{tl.egg.film}{'\n'}{selectedMovie.movie.title}{'\n\n'}
                  {tl.egg.disclaimer}
                </pre>
                <motion.button
                  className="continue-btn"
                  onClick={() => {
                    setShowEasterEgg(true);
                    setEggMovie(selectedMovie);
                    setSelectedMovie(results.find(r => r.movie.id !== 'swiss-army-man') || results[0]);
                  }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  {tl.result.seeAnother}
                </motion.button>
              </motion.div>
            ) : (
              <div className="result-main">
                <div className="result-header">
                  <h2 className="result-title">{tl.result.title}</h2>
                  <p className="result-subtitle">{tl.result.subtitle}</p>
                </div>

                <motion.div
                  className="movie-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="movie-poster-container">
                    <img
                      src={selectedMovie.movie.poster}
                      alt={selectedMovie.movie.title}
                      className="movie-poster"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="match-score">
                      <span className="score-number">{selectedMovie.score}</span>
                      <span className="score-percent">{tl.result.match}</span>
                    </div>
                  </div>

                  <div className="movie-info">
                    <h1 className="movie-title">{selectedMovie.movie.title}</h1>
                    <p className="movie-meta">
                      {selectedMovie.movie.year} · {selectedMovie.movie.director}
                    </p>
                    <p className="movie-description">{selectedMovie.movie.description}</p>

                    <div className="movie-reason">
                      <span className="reason-icon">💭</span>
                      <p>{selectedMovie.movie.reason}</p>
                    </div>

                    <div className="match-breakdown">
                      <h3>{tl.result.why}</h3>
                      <div className="match-tags">
                        {selectedMovie.matchBreakdown.map((item, i) => (
                          <span key={i} className="match-tag">{item.tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {results.length > 1 && (
                  <div className="alternatives">
                    <h3>{tl.result.others}</h3>
                    <div className="alt-grid">
                      {results.filter(r => r.movie.id !== selectedMovie.movie.id).map((r, i) => (
                        <motion.button
                          key={r.movie.id}
                          className="alt-card"
                          onClick={() => setSelectedMovie(r)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <img
                            src={r.movie.poster}
                            alt={r.movie.title}
                            className="alt-poster"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                          <div className="alt-info">
                            <span className="alt-title">{r.movie.title}</span>
                            <span className="alt-score">{r.score}{tl.result.match}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="anti-genre-notice">
                  <p className="notice-title">{tl.result.noticeTitle}</p>
                  <div className="notice-never">
                    {tl.result.never.map((item, i) => (
                      <span key={i}>✕ {item}</span>
                    ))}
                  </div>
                  <p className="notice-instead">{tl.result.instead}</p>
                  <p className="notice-footer" style={{ whiteSpace: 'pre-line' }}>{tl.result.footer}</p>
                </div>

                <motion.button
                  className="restart-btn"
                  onClick={() => {
                    setStep(0); setWeather(null); setPlace(null); setMood(null);
                    setBody([]); setSocial(null); setResults(null);
                    setSelectedMovie(null); setShowEasterEgg(false); setEggMovie(null);
                  }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                >
                  {tl.result.restart}
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
