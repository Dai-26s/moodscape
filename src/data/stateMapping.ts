import { HumanState, StateVector, Weather, Place, Mood, BodyState, SocialEnergy } from '../types';

function zeroVector(): StateVector {
  return {
    lonely: 0, need_comfort: 0, temporary_life: 0, body_discomfort: 0,
    humor_needed: 0, healing: 0, small_happiness: 0, alone: 0,
    quiet: 0, night: 0, routine: 0, hope: 0, family: 0,
    funny: 0, broken_life: 0, energy: 0, nostalgia: 0,
    romance: 0, adventure: 0, acceptance: 0, catharsis: 0
  };
}

const weatherMap: Record<Weather, Partial<StateVector>> = {
  sunny: { energy: 15, hope: 10, small_happiness: 10 },
  rainy: { lonely: 20, quiet: 20, need_comfort: 20, nostalgia: 15, healing: 15 },
  snow: { quiet: 25, lonely: 15, healing: 10, nostalgia: 15 },
  cloudy: { quiet: 10, lonely: 10, routine: 10 },
  windy: { energy: 10, adventure: 10, temporary_life: 10 }
};

const placeMap: Record<Place, Partial<StateVector>> = {
  home: { routine: 15, healing: 10, family: 10, small_happiness: 5 },
  office: { routine: 25, need_comfort: 10, small_happiness: -5 },
  hotel: { temporary_life: 25, lonely: 20, need_comfort: 15, quiet: 10 },
  airport: { temporary_life: 25, adventure: 15, hope: 10, lonely: 10 },
  train: { temporary_life: 20, quiet: 15, nostalgia: 10, adventure: 10 },
  cafe: { small_happiness: 10, routine: 5, energy: 5, quiet: 10 },
  hospital: { need_comfort: 30, healing: 25, quiet: 20, lonely: 15, hope: 10 },
  unknown_city: { temporary_life: 25, lonely: 20, adventure: 15 },
  hometown: { nostalgia: 30, healing: 15, family: 15, acceptance: 10 },
  dont_belong: { lonely: 25, temporary_life: 20, need_comfort: 20, nostalgia: 10 }
};

const moodMap: Record<Mood, Partial<StateVector>> = {
  peaceful: { quiet: 20, healing: 15, acceptance: 15, small_happiness: 10 },
  lonely: { lonely: 35, need_comfort: 25, quiet: 10, nostalgia: 10 },
  excited: { energy: 30, adventure: 20, hope: 15, small_happiness: 10 },
  nostalgic: { nostalgia: 35, lonely: 15, quiet: 15, healing: 10 },
  heartbroken: { lonely: 25, need_comfort: 30, catharsis: 25, nostalgia: 15, broken_life: 20 },
  burned_out: { routine: 15, need_comfort: 25, healing: 20, humor_needed: 15 },
  anxious: { lonely: 10, need_comfort: 20, catharsis: 10 },
  cant_sleep: { night: 25, lonely: 20, quiet: 20, need_comfort: 15 },
  missing_someone: { lonely: 30, nostalgia: 25, romance: 15, need_comfort: 20 },
  want_to_disappear: { alone: 30, quiet: 25, temporary_life: 20, healing: 15, acceptance: 15 },
  need_motivation: { hope: 25, energy: 20, adventure: 15, need_comfort: 10 },
  just_want_silence: { quiet: 35, alone: 20, healing: 15, acceptance: 10 },
  grateful: { small_happiness: 25, hope: 20, acceptance: 20, healing: 10, family: 10 },
  hopeful: { hope: 35, energy: 20, adventure: 15, small_happiness: 10 },
  content: { acceptance: 25, small_happiness: 20, quiet: 15, healing: 10 },
  curious: { adventure: 25, energy: 20, hope: 15, temporary_life: 10 },
  inspired: { energy: 30, hope: 25, adventure: 20, small_happiness: 10 },
  loved: { romance: 20, family: 20, healing: 20, hope: 15, small_happiness: 25 },
};

const bodyMap: Record<BodyState, Partial<StateVector>> = {
  havent_slept_well: { body_discomfort: 15, need_comfort: 15, quiet: 10, routine: 5 },
  headache: { body_discomfort: 20, need_comfort: 20, quiet: 20, healing: 10 },
  too_much_coffee: { energy: 10, body_discomfort: 10, humor_needed: 10 },
  ate_too_much: { body_discomfort: 15, routine: 10, humor_needed: 10, healing: 5 },
  havent_eaten: { body_discomfort: 15, need_comfort: 15 },
  a_little_drunk: { energy: 10, humor_needed: 15, lonely: 10, romance: 10 },
  sick: { body_discomfort: 25, need_comfort: 25, healing: 20, quiet: 15, hope: 10 },
  long_day_at_work: { routine: 10, need_comfort: 20, healing: 15, body_discomfort: 15, quiet: 10 },
  havent_pooped: { body_discomfort: 15, humor_needed: 15, need_comfort: 10, quiet: 10 },
  just_cleaned_room: { small_happiness: 20, routine: 10, healing: 10, hope: 10 },
  going_through_breakup: { lonely: 20, catharsis: 25, need_comfort: 30, broken_life: 20, nostalgia: 15, healing: 10 },
  about_to_quit_job: { hope: 20, adventure: 20, lonely: 10, catharsis: 15, broken_life: 15, temporary_life: 15 }
};

const socialMap: Record<SocialEnergy, Partial<StateVector>> = {
  alone: { alone: 30, quiet: 20, healing: 10, lonely: 10 },
  one_close_friend: { small_happiness: 20, hope: 10, healing: 10 },
  family: { family: 30, healing: 15, hope: 10 },
  crowded_city: { energy: 20, adventure: 10 },
  nobody_talks: { alone: 25, quiet: 30, lonely: 15, acceptance: 10 }
};

function timeVector(time: string): Partial<StateVector> {
  const lower = time.toLowerCase();
  const result: Partial<StateVector> = {};

  if (lower.includes('night') || lower.includes('evening')) {
    Object.assign(result, { night: 25, quiet: 20, lonely: 10 });
  }
  if (lower.includes('afternoon')) {
    Object.assign(result, { routine: 10, energy: 10, small_happiness: 10 });
  }
  if (lower.includes('morning')) {
    Object.assign(result, { energy: 15, hope: 10 });
  }
  if (lower.includes('friday') || lower.includes('saturday')) {
    Object.assign(result, { energy: 15, adventure: 10, night: 10, hope: 10 });
  }
  if (lower.includes('sunday')) {
    Object.assign(result, { nostalgia: 15, healing: 15, routine: 10, family: 10 });
  }
  if (lower.includes('monday')) {
    Object.assign(result, { routine: 15, need_comfort: 10 });
  }

  return result;
}

export function computeStateVector(state: HumanState): StateVector {
  const vec = zeroVector();

  const contributions: Partial<StateVector>[] = [
    weatherMap[state.weather] || {},
    placeMap[state.place] || {},
    moodMap[state.mood] || {},
    ...state.body.map(b => bodyMap[b] || {}),
    socialMap[state.social] || {},
    timeVector(state.time)
  ];

  for (const contrib of contributions) {
    for (const key of Object.keys(contrib) as (keyof StateVector)[]) {
      vec[key] += contrib[key] || 0;
    }
  }

  for (const key of Object.keys(vec) as (keyof StateVector)[]) {
    vec[key] = Math.max(0, vec[key]);
  }

  return vec;
}
