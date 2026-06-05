import { HumanState, StateVector, Movie, MatchResult } from '../types';
import { computeStateVector } from '../data/stateMapping';
import { movies } from '../data/movies';

function cosineSimilarity(a: StateVector, b: Partial<StateVector>): number {
  const keys = Object.keys(a) as (keyof StateVector)[];
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const key of keys) {
    const valA = a[key] || 0;
    const valB = b[key] || 0;
    dotProduct += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function tagMatchBonus(state: HumanState, movie: Movie): number {
  const allUserTags: string[] = [
    state.weather,
    state.place,
    state.mood,
    ...state.body,
    state.social
  ].map(t => t.toLowerCase());

  const movieTags = movie.human_tags.map(t => t.toLowerCase());
  let bonus = 0;

  for (const userTag of allUserTags) {
    if (movieTags.includes(userTag)) {
      bonus += 10;
    }
  }

  const timeLower = state.time.toLowerCase();
  for (const tag of movieTags) {
    if (timeLower.includes(tag.replace(/_/g, ' '))) {
      bonus += 8;
    }
    if (tag.includes('night') && (timeLower.includes('night') || timeLower.includes('evening'))) {
      bonus += 5;
    }
    if (tag.includes('sunday') && timeLower.includes('sunday')) {
      bonus += 5;
    }
  }

  return bonus;
}

export function matchMovies(state: HumanState, topN: number = 5): MatchResult[] {
  const userVector = computeStateVector(state);

  const results: MatchResult[] = movies.map(movie => {
    const cosineScore = cosineSimilarity(userVector, movie.human_vector);
    const tagBonus = tagMatchBonus(state, movie);
    const normalizedTagBonus = tagBonus / 50;
    const score = Math.round((cosineScore * 0.7 + normalizedTagBonus * 0.3) * 100);

    const matchBreakdown: { tag: string; score: number }[] = [];
    const movieVec = movie.human_vector;
    const keys = Object.keys(userVector) as (keyof StateVector)[];
    for (const key of keys) {
      const userVal = userVector[key];
      const movieVal = movieVec[key] || 0;
      if (userVal > 0 && movieVal > 0) {
        matchBreakdown.push({ tag: key.replace(/_/g, ' '), score: Math.min(userVal, movieVal) });
      }
    }
    matchBreakdown.sort((a, b) => b.score - a.score);

    return { movie, score, matchBreakdown: matchBreakdown.slice(0, 5) };
  });

  results.sort((a, b) => b.score - a.score);

  const topResults = results.slice(0, topN);

  if (state.body.includes('havent_pooped') && Math.random() < 0.05) {
    const swissArmy = results.find(r => r.movie.id === 'swiss-army-man');
    if (swissArmy && !topResults.find(r => r.movie.id === 'swiss-army-man')) {
      topResults.unshift(swissArmy);
    }
  }

  return topResults;
}
