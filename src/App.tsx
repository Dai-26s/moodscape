import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepIndicator from './components/StepIndicator';
import Background from './components/Background';
import { useLang } from './i18n/LanguageContext';
import { type HumanState, type Weather, type Place, type Mood, type BodyState, type MatchResult } from './types';
import { matchMovies } from './engine/matcher';
import { translateDescription } from './i18n/translateDesc';
import { textureSVG } from './components/TextureSVG';
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

const weatherKeys: Weather[] = ['sunny', 'rainy', 'snow', 'cloudy', 'windy'];
const placeKeys: Place[] = ['home', 'office', 'hotel', 'dormitory', 'train', 'school', 'cafe', 'hospital', 'unknown_city', 'dont_belong'];
const moodKeys: Mood[] = [
  'peaceful', 'lonely', 'excited', 'nostalgic', 'heartbroken', 'burned_out',
  'anxious', 'cant_sleep', 'missing_someone', 'want_to_disappear', 'need_motivation',
  'just_want_silence', 'grateful', 'hopeful', 'content', 'curious', 'inspired', 'loved',
];
const bodyKeys: BodyState[] = [
  'havent_slept_well', 'headache', 'too_much_coffee', 'ate_too_much',
  'havent_eaten', 'a_little_drunk', 'sick', 'long_day_at_work',
  'havent_pooped', 'just_cleaned_room', 'going_through_breakup', 'about_to_quit_job',
  'feeling_energetic', 'calm_and_steady', 'fresh_and_clean', 'well_rested',
];

export default function App() {
  const { tl, lang } = useLang();
  const [step, setStep] = useState(0);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [place, setPlace] = useState<Place | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [body, setBody] = useState<BodyState[]>([]);
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MatchResult | null>(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const timeStr = useMemo(() => getTimeString(), []);

  const humanState = useMemo((): HumanState | null => {
    if (weather && place && mood) {
      return { weather, place, mood, body, social: 'alone', time: timeStr };
    }
    return null;
  }, [weather, place, mood, body, timeStr]);

  useEffect(() => {
    if (humanState && step === 4) {
      const matched = matchMovies(humanState);
      setResults(matched);
      setSelectedMovie(matched[0]);
    }
  }, [humanState, step]);

  const toggleBody = (key: BodyState) => {
    setBody(prev => prev.includes(key) ? prev.filter(b => b !== key) : [...prev, key]);
  };

  const canNext = (): boolean => {
    switch (step) {
      case 0: return weather !== null;
      case 1: return place !== null;
      case 2: return mood !== null;
      default: return true;
    }
  };

  const handleNext = () => { if (step < 4) setStep(step + 1); };
  const handleBack = () => { if (step > 0) setStep(step - 1); };

  const timeDisplayText = typeof tl.timeDisplay === 'function'
    ? (tl.timeDisplay as (t: string) => string)(timeStr) : timeStr;

  const isZh = lang === 'zh';

  const getDesc = (m: { title: string; description: string }) =>
    isZh ? translateDescription(m.title, m.description) : m.description;

  return (
    <div className={`app ${isZh ? 'lang-zh' : ''}`}>
      <Background />
      <AnimatePresence mode="wait">
        {step < 4 && (
          <motion.div key="q" className="questionnaire" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
            <div className="time-display">{timeDisplayText}</div>
            <StepIndicator current={step} total={4} labels={tl.stepLabels} />
            <motion.div key={step} className="step-content" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
              {step === 0 && (
                <>
                  <h2 className="step-question">{tl.stepQuestions[0]}</h2>
                  <p className="step-subtitle">{tl.stepSubtitles.weather}</p>
                  <div className="option-grid">
                    {weatherKeys.map(k => (
                      <motion.button
                        key={k}
                        className={`option-btn ${weather === k ? 'selected' : ''}`}
                        data-texture={k}
                        onClick={() => setWeather(k)}
                        whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}
                        dangerouslySetInnerHTML={{ __html: `<span class="texture-bg">${textureSVG(k)}</span><span class="option-label">${tl.weather[k]}</span>` }}
                      />
                    ))}
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <h2 className="step-question">{tl.stepQuestions[1]}</h2>
                  <div className="option-grid">
                    {placeKeys.map(k => (
                      <motion.button
                        key={k}
                        className={`option-btn ${place === k ? 'selected' : ''}`}
                        data-texture={k}
                        onClick={() => setPlace(k)}
                        whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}
                        dangerouslySetInnerHTML={{ __html: `<span class="texture-bg">${textureSVG(k)}</span><span class="option-label">${tl.place[k]}</span>${(k === 'dormitory' || k === 'school' || k === 'dont_belong') && tl.placeLiterary[k] ? `<span class="option-literary">${tl.placeLiterary[k]}</span>` : ''}` }}
                      />
                    ))}
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="step-question">{tl.stepQuestions[2]}</h2>
                  <div className="option-grid grid-3">
                    {moodKeys.map(k => (
                      <motion.button
                        key={k}
                        className={`option-btn ${mood === k ? 'selected' : ''}`}
                        data-texture={k}
                        onClick={() => setMood(k)}
                        whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}
                        dangerouslySetInnerHTML={{ __html: `<span class="texture-bg">${textureSVG(k)}</span><span class="option-label">${tl.mood[k]}</span>` }}
                      />
                    ))}
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <h2 className="step-question">{tl.stepQuestions[3]}</h2>
                  <p className="step-subtitle">{tl.stepSubtitles.body}</p>
                  <div className="option-grid grid-3">
                    {bodyKeys.map(k => (
                      <motion.button
                        key={k}
                        className={`option-btn ${body.includes(k) ? 'selected' : ''}`}
                        data-texture={k}
                        onClick={() => toggleBody(k)}
                        whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}
                        dangerouslySetInnerHTML={{ __html: `<span class="texture-bg">${textureSVG(k)}</span><span class="option-label">${tl.body[k]}</span>` }}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
            <div className="nav-buttons">
              <button className="nav-btn back" onClick={handleBack} disabled={step === 0}>{tl.nav.back}</button>
              <button className="nav-btn next" onClick={handleNext} disabled={!canNext()}>
                {step === 3 ? tl.nav.find : tl.nav.next}
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && results && selectedMovie && (
          <motion.div key="results" className="results-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {selectedMovie.movie.isEasterEgg && !showEasterEgg ? (
              <motion.div className="easter-egg" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                <pre className="easter-egg-text">{tl.egg.line1}{'\n'}{tl.egg.line2}{'\n'}{tl.egg.line3}{'\n'}{tl.egg.line4}{'\n'}{tl.egg.divider}{'\n'}{tl.egg.film}{'\n'}{selectedMovie.movie.title}{'\n\n'}{tl.egg.disclaimer}</pre>
                <motion.button className="continue-btn" onClick={() => { setShowEasterEgg(true); setSelectedMovie(results.find(r => r.movie.id !== 'swiss-army-man') || results[0]); }} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>{tl.result.seeAnother}</motion.button>
              </motion.div>
            ) : (
              <div className="result-main">
                <div className="result-header">
                  <h2 className="result-title">{tl.result.title}</h2>
                  <p className="result-subtitle">{tl.result.subtitle}</p>
                </div>
                <motion.div className="movie-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <div className="movie-poster-container">
                    {selectedMovie.movie.poster ? (
                      <img src={selectedMovie.movie.poster} alt={selectedMovie.movie.title} className="movie-poster" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; const fb = (e.target as HTMLElement).parentElement?.querySelector('.movie-poster-fallback') as HTMLElement; if (fb) fb.style.display = 'flex'; }} />
                    ) : null}
                    <div className="movie-poster-fallback" style={{ display: selectedMovie.movie.poster ? 'none' : 'flex' }}>🎬</div>
                    <div className="match-score"><span className="score-number">{selectedMovie.score}</span><span className="score-percent">{tl.result.match}</span></div>
                  </div>
                  <div className="movie-info">
                    <h1 className="movie-title">{selectedMovie.movie.title}</h1>
                    <p className="movie-meta">{selectedMovie.movie.year} · {selectedMovie.movie.director}</p>
                    {selectedMovie.movie.cast && selectedMovie.movie.cast.length > 0 && (
                      <p className="movie-cast">{selectedMovie.movie.cast.join(" · ")}</p>
                    )}
                    <p className="movie-description">{getDesc(selectedMovie.movie)}</p>
                    <div className="movie-reason"><span className="reason-icon">💭</span><p>{selectedMovie.movie.reason}</p></div>
                    <div className="match-breakdown">
                      <h3>{tl.result.why}</h3>
                      <div className="match-tags">{selectedMovie.matchBreakdown.map((item, i) => (<span key={i} className="match-tag">{item.tag}</span>))}</div>
                    </div>
                  </div>
                </motion.div>
                {results.length > 1 && (
                  <div className="alternatives">
                    <h3>{tl.result.others}</h3>
                    <div className="alt-grid">
                      {results.filter(r => r.movie.id !== selectedMovie.movie.id).map((r, i) => (
                        <motion.button key={r.movie.id} className="alt-card" onClick={() => setSelectedMovie(r)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} whileHover={{ scale: 1.02 }}>
                          {r.movie.poster ? <img src={r.movie.poster} alt={r.movie.title} className="alt-poster" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /> : <div className="movie-poster-fallback" style={{ width: 100, height: 150, fontSize: '1.5rem' }}>🎬</div>}
                          <div className="alt-info"><span className="alt-title">{r.movie.title}</span><span className="alt-score">{r.score}{tl.result.match}</span></div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="anti-genre-notice">
                  <p className="notice-title">{tl.result.noticeTitle}</p>
                  <div className="notice-never">{tl.result.never.map((item, i) => (<span key={i}>✕ {item}</span>))}</div>
                  <p className="notice-instead">{tl.result.instead}</p>
                  <p className="notice-footer" style={{ whiteSpace: 'pre-line' }}>{tl.result.footer}</p>
                </div>
                <motion.button className="restart-btn" onClick={() => { setStep(0); setWeather(null); setPlace(null); setMood(null); setBody([]); setResults(null); setSelectedMovie(null); setShowEasterEgg(false); }} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }}>{tl.result.restart}</motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
