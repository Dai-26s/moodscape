import { Movie } from '../types';

export const movies: Movie[] = [
  {
    id: 'perfect-days',
    title: 'Perfect Days',
    year: 2023,
    director: 'Wim Wenders',
    poster: 'https://image.tmdb.org/t/p/w500/5t0q0NqNHVrP7HjVPMfSBb5Lq7P.jpg',
    description: 'A janitor in Tokyo drives between jobs listening to rock music, finding beauty in the everyday rhythm of life.',
    reason: 'Some things don\'t need to be fixed right away. Your body, too.',
    human_tags: [
      'rain', 'quiet_night', 'small_happiness', 'alone_but_not_lonely',
      'routine', 'healing', 'slow_life', 'city_walking',
      'tired_after_work', 'body_relaxation', 'homesick', 'acceptance',
      'sunday_afternoon', 'peaceful', 'nostalgic', 'need_silence'
    ],
    human_vector: {
      healing: 35, small_happiness: 30, alone: 20, routine: 25,
      quiet: 25, acceptance: 30, nostalgia: 15
    }
  },
  {
    id: 'lost-in-translation',
    title: 'Lost in Translation',
    year: 2003,
    director: 'Sofia Coppola',
    poster: 'https://image.tmdb.org/t/p/w500/wkSzJs7oMf8MIr9CQVICsvRfwA7.jpg',
    description: 'A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo.',
    reason: 'Some connections don\'t need a name. Just someone who understands the silence.',
    human_tags: [
      'hotel', 'lonely', 'quiet_night', 'homesick', 'temporary_life',
      'cant_sleep', 'missing_someone', 'city_lights', 'dont_belong',
      'acceptance', 'rain', 'night', 'japan'
    ],
    human_vector: {
      temporary_life: 40, lonely: 35, quiet: 25, night: 20,
      nostalgia: 30, romance: 20, acceptance: 25, need_comfort: 30
    }
  },
  {
    id: 'little-miss-sunshine',
    title: 'Little Miss Sunshine',
    year: 2006,
    director: 'Jonathan Dayton, Valerie Faris',
    poster: 'https://image.tmdb.org/t/p/w500/wKn7AJwDgB3DfLzP2yM3p3mGlBz.jpg',
    description: 'A family determined to get their young daughter into the finals of a beauty pageant take a cross-country trip in their VW bus.',
    reason: 'Every broken family is a kind of love story.',
    human_tags: [
      'family', 'road_trip', 'funny', 'hope', 'broken_life',
      'healing', 'need_motivation', 'burned_out', 'sunday_afternoon',
      'going_through_breakup', 'about_to_quit_job', 'acceptance'
    ],
    human_vector: {
      family: 25, funny: 30, broken_life: 20, hope: 35,
      healing: 20, energy: 25, acceptance: 25
    }
  },
  {
    id: 'the-big-lebowski',
    title: 'The Big Lebowski',
    year: 1998,
    director: 'Joel Coen, Ethan Coen',
    poster: 'https://image.tmdb.org/t/p/w500/qiE3QzA2EeGR7xjHgWX2wZPA0TJ.jpg',
    description: 'Jeff "The Dude" Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and gets drawn into a convoluted LA mystery.',
    reason: 'The world is already complicated. Tonight, just hang out with a guy who has no idea what he\'s doing either.',
    human_tags: [
      'funny', 'night', 'alone', 'chaos', 'burned_out',
      'a_little_drunk', 'need_comfort', 'havent_pooped', 'too_much_coffee',
      'about_to_quit_job', 'acceptance', 'city_lights'
    ],
    human_vector: {
      funny: 40, alone: 15, broken_life: 25, humor_needed: 35,
      night: 20, acceptance: 30, small_happiness: 25
    }
  },
  {
    id: 'swiss-army-man',
    title: 'Swiss Army Man',
    year: 2016,
    director: 'Daniel Scheinert, Daniel Kwan',
    poster: 'https://image.tmdb.org/t/p/w500/pj1A2L8TkGjQfN7JrYjZqTHdXpZ.jpg',
    description: 'A hopeless man stranded on a deserted island befriends a dead body and together they go on a surreal journey to get home.',
    reason: 'Maybe your body is just trying to hold on to something.',
    human_tags: [
      'havent_pooped', 'lonely', 'funny', 'healing', 'body_discomfort',
      'need_comfort', 'acceptance', 'dont_belong', 'chaos'
    ],
    human_vector: {
      humor_needed: 40, body_discomfort: 35, lonely: 25, healing: 20,
      funny: 35, acceptance: 30, catharsis: 30
    },
    isEasterEgg: true,
    easterEggMessage: 'You haven\'t pooped for 3 days.\nMaybe your body\nis just trying\nto hold on to something.\n━━━━━━━━━━\nToday\'s Film\nSwiss Army Man\n\n(No medical advice included.)'
  },
  {
    id: 'her',
    title: 'Her',
    year: 2013,
    director: 'Spike Jonze',
    poster: 'https://image.tmdb.org/t/p/w500/yk4J4aewWYNiBhD49WD7UaBBn37.jpg',
    description: 'In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.',
    reason: 'Loneliness in a connected world is a particular kind of quiet.',
    human_tags: [
      'lonely', 'quiet', 'night', 'cant_sleep', 'missing_someone',
      'heartbroken', 'city_lights', 'rain', 'need_comfort',
      'homesick', 'alone', 'acceptance'
    ],
    human_vector: {
      lonely: 40, quiet: 25, night: 20, need_comfort: 30,
      romance: 25, nostalgia: 20, acceptance: 20, healing: 15
    }
  },
  {
    id: 'amelie',
    title: 'Amélie',
    year: 2001,
    director: 'Jean-Pierre Jeunet',
    poster: 'https://image.tmdb.org/t/p/w500/nSvhz7xXf2gUQq1TtPQYP1EbgcS.jpg',
    description: 'Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and discovers love along the way.',
    reason: 'The world is full of small, secret joys waiting to be found.',
    human_tags: [
      'small_happiness', 'peaceful', 'hope', 'sunny', 'city_walking',
      'alone_but_not_lonely', 'healing', 'sunday_afternoon', 'nostalgic'
    ],
    human_vector: {
      small_happiness: 40, healing: 25, hope: 20, energy: 20,
      romance: 20, nostalgia: 25, alone: 10
    }
  },
  {
    id: 'drive-my-car',
    title: 'Drive My Car',
    year: 2021,
    director: 'Ryusuke Hamaguchi',
    poster: 'https://image.tmdb.org/t/p/w500/4p1PMjKjhwjXHFMCwJBPJ3ZC1yH.jpg',
    description: 'A renowned stage actor and director learns to deal with a big loss when he receives an offer to direct a play at a Hiroshima theater festival.',
    reason: 'Grief doesn\'t ask permission. But it does pass through you, like a long car ride.',
    human_tags: [
      'heartbroken', 'healing', 'quiet', 'long_day_at_work',
      'missing_someone', 'acceptance', 'rain', 'road_trip', 'need_comfort',
      'going_through_breakup', 'nostalgic'
    ],
    human_vector: {
      healing: 30, lonely: 25, quiet: 25, acceptance: 35,
      catharsis: 30, nostalgia: 20, broken_life: 25
    }
  },
  {
    id: 'spirited-away',
    title: 'Spirited Away',
    year: 2001,
    director: 'Hayao Miyazaki',
    poster: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.',
    reason: 'Being lost is sometimes the only way to find where you belong.',
    human_tags: [
      'dont_belong', 'hope', 'healing', 'night', 'temporary_life',
      'homesick', 'unknown_city', 'need_motivation', 'family',
      'rain', 'acceptance', 'quiet_night'
    ],
    human_vector: {
      temporary_life: 30, healing: 25, hope: 30, adventure: 25,
      small_happiness: 20, family: 20, nostalgia: 25
    }
  },
  {
    id: 'paterson',
    title: 'Paterson',
    year: 2016,
    director: 'Jim Jarmusch',
    poster: 'https://image.tmdb.org/t/p/w500/1C8YGyKfB8nFSvjSdHZnN7QC8Ar.jpg',
    description: 'A week in the life of Paterson, a bus driver and poet, who observes the world around him with quiet wonder.',
    reason: 'There is poetry in the ordinary. You just have to notice it.',
    human_tags: [
      'routine', 'small_happiness', 'peaceful', 'quiet',
      'alone_but_not_lonely', 'slow_life', 'sunday_afternoon',
      'tired_after_work', 'healing'
    ],
    human_vector: {
      routine: 35, small_happiness: 30, alone: 15, quiet: 30,
      healing: 20, acceptance: 25
    }
  },
  {
    id: 'before-sunrise',
    title: 'Before Sunrise',
    year: 1995,
    director: 'Richard Linklater',
    poster: 'https://image.tmdb.org/t/p/w500/gyO1K6G9XTnPg1EjKrS2HV0v5nZ.jpg',
    description: 'A young man and woman meet on a train in Europe, and wind up spending one evening together in Vienna.',
    reason: 'Some nights are just for walking and talking until the sun comes up.',
    human_tags: [
      'train', 'night', 'romance', 'temporary_life',
      'city_walking', 'unknown_city', 'excited', 'hope',
      'dont_belong', 'small_happiness'
    ],
    human_vector: {
      romance: 35, temporary_life: 30, night: 25, hope: 20,
      energy: 25, small_happiness: 20, adventure: 25
    }
  },
  {
    id: 'lost-highway',
    title: 'Lost Highway',
    year: 1997,
    director: 'David Lynch',
    poster: 'https://image.tmdb.org/t/p/w500/p3bS6MnMUEw8JwQCCsOXCMZP3oD.jpg',
    description: 'After a bizarre encounter at a party, a jazz saxophonist is framed for the murder of his wife and sent to prison.',
    reason: 'When nothing makes sense, maybe the answer is to stop trying to understand.',
    human_tags: [
      'night', 'cant_sleep', 'anxious', 'heartbroken', 'chaos',
      'lonely', 'need_comfort', 'rain'
    ],
    human_vector: {
      night: 30, lonely: 25, broken_life: 30, catharsis: 25,
      temporary_life: 20, quiet: 20
    }
  },
  {
    id: 'chungking-express',
    title: 'Chungking Express',
    year: 1994,
    director: 'Wong Kar-wai',
    poster: 'https://image.tmdb.org/t/p/w500/nPwPfh41JH4FkgVNcOFRZZxFA76.jpg',
    description: 'Two melancholy Hong Kong policemen fall in love: one with a mysterious female underworld figure, the other with a beautiful waitress.',
    reason: 'The city never stops, but your heart can pause for a moment.',
    human_tags: [
      'night', 'lonely', 'missing_someone', 'city_lights',
      'heartbroken', 'cant_sleep', 'rain', 'hope', 'temporary_life',
      'a_little_drunk', 'acceptance'
    ],
    human_vector: {
      lonely: 35, night: 25, romance: 25, nostalgia: 30,
      temporary_life: 25, hope: 15, catharsis: 20
    }
  },
  {
    id: 'the-secret-life-of-walter-mitty',
    title: 'The Secret Life of Walter Mitty',
    year: 2013,
    director: 'Ben Stiller',
    poster: 'https://image.tmdb.org/t/p/w500/tY6ypjK6TRGPYqFgUjANVzBjVqO.jpg',
    description: 'When his job along with that of his co-worker are threatened, Walter takes action by embarking on an adventure more extraordinary than anything he ever imagined.',
    reason: 'Your life is not as small as it feels today.',
    human_tags: [
      'need_motivation', 'adventure', 'office', 'hope',
      'about_to_quit_job', 'burned_out', 'healing', 'dont_belong',
      'acceptance'
    ],
    human_vector: {
      hope: 35, adventure: 30, energy: 30, healing: 20,
      small_happiness: 20, acceptance: 20
    }
  },
  {
    id: 'groundhog-day',
    title: 'Groundhog Day',
    year: 1993,
    director: 'Harold Ramis',
    poster: 'https://image.tmdb.org/t/p/w500/gCgt1WARPZaXnq523ySQZ6AJltM.jpg',
    description: 'A narcissistic TV weatherman finds himself inexplicably living the same day over and over again.',
    reason: 'Every day is the same until you decide it isn\'t.',
    human_tags: [
      'burned_out', 'routine', 'funny', 'need_motivation',
      'hope', 'healing', 'office', 'snow', 'acceptance'
    ],
    human_vector: {
      routine: 30, humor_needed: 30, hope: 25, funny: 25,
      healing: 20, acceptance: 25, energy: 15
    }
  },
  {
    id: 'parasite',
    title: 'Parasite',
    year: 2019,
    director: 'Bong Joon-ho',
    poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    reason: 'Rain falls on everyone, but not equally.',
    human_tags: [
      'rain', 'family', 'broken_life', 'night', 'anxious',
      'chaos', 'hope', 'office', 'body_discomfort'
    ],
    human_vector: {
      broken_life: 35, family: 20, night: 20, humor_needed: 20,
      catharsis: 30, energy: 25, temporary_life: 20
    }
  },
  {
    id: 'in-the-mood-for-love',
    title: 'In the Mood for Love',
    year: 2000,
    director: 'Wong Kar-wai',
    poster: 'https://image.tmdb.org/t/p/w500/i4Q5MZfgA2gY4IUShTZO2Mk4LbN.jpg',
    description: 'Two neighbors form a strong bond after both suspect extramarital activities of their spouses.',
    reason: 'Some feelings are too heavy to speak out loud.',
    human_tags: [
      'missing_someone', 'lonely', 'rain', 'night', 'heartbroken',
      'quiet', 'nostalgic', 'acceptance', 'going_through_breakup'
    ],
    human_vector: {
      lonely: 35, nostalgia: 35, romance: 30, quiet: 25,
      acceptance: 20, night: 20, catharsis: 25
    }
  },
  {
    id: 'moonlight',
    title: 'Moonlight',
    year: 2016,
    director: 'Barry Jenkins',
    poster: 'https://image.tmdb.org/t/p/w500/qKvus7RHLB1v3V4UEo63Vuw17nZ.jpg',
    description: 'A chronicle of the childhood, adolescence and burgeoning adulthood of a young, African-American, gay man growing up in a rough neighborhood of Miami.',
    reason: 'Finding yourself means facing every version of who you\'ve been.',
    human_tags: [
      'lonely', 'dont_belong', 'healing', 'night', 'need_comfort',
      'hope', 'acceptance', 'heartbroken', 'quiet'
    ],
    human_vector: {
      lonely: 30, healing: 30, acceptance: 35, broken_life: 25,
      hope: 20, quiet: 20, catharsis: 25
    }
  },
  {
    id: 'the-graduate',
    title: 'The Graduate',
    year: 1967,
    director: 'Mike Nichols',
    poster: 'https://image.tmdb.org/t/p/w500/Au7o6MsSqSXKjQZB7NTaPqPl2B2.jpg',
    description: 'A disillusioned college graduate finds himself torn between his older lover and her daughter.',
    reason: 'Not knowing what you want is its own kind of restlessness.',
    human_tags: [
      'anxious', 'dont_belong', 'about_to_quit_job', 'burned_out',
      'summer', 'hope', 'lonely', 'acceptance'
    ],
    human_vector: {
      temporary_life: 30, lonely: 20, hope: 15, broken_life: 20,
      catharsis: 20, nostalgia: 25
    }
  },
  {
    id: 'into-the-wild',
    title: 'Into the Wild',
    year: 2007,
    director: 'Sean Penn',
    poster: 'https://image.tmdb.org/t/p/w500/2MSGZEE6X9e1BbRyTm06QkSx4Az.jpg',
    description: 'After graduating from Emory University, top student Christopher McCandless abandons his possessions and gives his savings to charity to hitchhike to Alaska.',
    reason: 'Sometimes you have to lose everything to find out what matters.',
    human_tags: [
      'want_to_disappear', 'adventure', 'dont_belong', 'hope',
      'about_to_quit_job', 'healing', 'acceptance', 'alone'
    ],
    human_vector: {
      adventure: 35, temporary_life: 30, alone: 25, hope: 20,
      healing: 25, acceptance: 30, catharsis: 25
    }
  },
  {
    id: 'everything-everywhere-all-at-once',
    title: 'Everything Everywhere All at Once',
    year: 2022,
    director: 'Daniel Scheinert, Daniel Kwan',
    poster: 'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
    description: 'A middle-aged Chinese immigrant is swept up into an insane adventure, where she alone can save the world by exploring other universes.',
    reason: 'In every version of your life, someone loves you.',
    human_tags: [
      'chaos', 'family', 'funny', 'hope', 'burned_out',
      'need_motivation', 'healing', 'excited', 'anxious',
      'acceptance', 'broken_life'
    ],
    human_vector: {
      family: 30, funny: 35, hope: 30, healing: 25,
      broken_life: 20, energy: 35, acceptance: 30, catharsis: 25
    }
  },
  {
    id: 'eternal-sunshine',
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
    director: 'Michel Gondry',
    poster: 'https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg',
    description: 'When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.',
    reason: 'Even if you could forget, would you really want to?',
    human_tags: [
      'heartbroken', 'missing_someone', 'going_through_breakup',
      'night', 'winter', 'lonely', 'nostalgic', 'acceptance',
      'need_comfort', 'cant_sleep'
    ],
    human_vector: {
      lonely: 30, romance: 30, nostalgia: 35, broken_life: 25,
      catharsis: 30, acceptance: 25, need_comfort: 30
    }
  },
  {
    id: 'tampopo',
    title: 'Tampopo',
    year: 1985,
    director: 'Juzo Itami',
    poster: 'https://image.tmdb.org/t/p/w500/qCXdKQNCJHEkQ6dHbuXjAPGN4Ja.jpg',
    description: 'A truck driver stops at a small family-run noodle shop and decides to help its fledgling business.',
    reason: 'Food is love. And ramen is serious business.',
    human_tags: [
      'ate_too_much', 'funny', 'small_happiness', 'hope',
      'healing', 'family', 'city_walking', 'sunday_afternoon'
    ],
    human_vector: {
      small_happiness: 35, funny: 25, healing: 20, family: 15,
      hope: 20, routine: 20
    }
  },
  {
    id: 'lars-and-the-real-girl',
    title: 'Lars and the Real Girl',
    year: 2007,
    director: 'Craig Gillespie',
    poster: 'https://image.tmdb.org/t/p/w500/9h0bqL7S7wMPf6VYYR3PE04w4BO.jpg',
    description: 'A delusional young man strikes up an unconventional relationship with a doll he finds on the internet.',
    reason: 'Even the strangest love deserves to be taken seriously.',
    human_tags: [
      'lonely', 'healing', 'snow', 'small_happiness', 'hope',
      'alone', 'acceptance', 'need_comfort', 'family'
    ],
    human_vector: {
      lonely: 30, healing: 35, small_happiness: 25, hope: 20,
      acceptance: 30, family: 20, catharsis: 20
    }
  },
  {
    id: 'uncle-boonmee',
    title: 'Uncle Boonmee Who Can Recall His Past Lives',
    year: 2010,
    director: 'Apichatpong Weerasethakul',
    poster: 'https://image.tmdb.org/t/p/w500/eYD0RjF2D0Ke7DpFJGEpXdHGHHq.jpg',
    description: 'Dying of kidney disease, a man spends his last, somber days with his family, including the ghost of his wife and a forest spirit.',
    reason: 'Death is not the end. It\'s just another form.',
    human_tags: [
      'acceptance', 'quiet', 'night', 'dont_belong', 'healing',
      'family', 'rain', 'nostalgic', 'peaceful'
    ],
    human_vector: {
      acceptance: 40, quiet: 35, healing: 25, nostalgia: 20,
      family: 20, temporary_life: 25
    }
  },
  {
    id: 'the-fall',
    title: 'The Fall',
    year: 2006,
    director: 'Tarsem Singh',
    poster: 'https://image.tmdb.org/t/p/w500/xH1QByeNEsW9e3knPo3LQ0qZfER.jpg',
    description: 'In a hospital, a bedridden stuntman tells a fantastical story to a young girl to manipulate her into helping him commit suicide.',
    reason: 'Sometimes we tell stories not to escape, but to survive.',
    human_tags: [
      'hospital', 'hope', 'healing', 'adventure', 'need_motivation',
      'small_happiness', 'acceptance', 'broken_life'
    ],
    human_vector: {
      healing: 30, hope: 30, adventure: 25, broken_life: 20,
      small_happiness: 25, catharsis: 20
    }
  },
  {
    id: 'juno',
    title: 'Juno',
    year: 2007,
    director: 'Jason Reitman',
    poster: 'https://image.tmdb.org/t/p/w500/sF9HmxVWgYOwH3E0ILGrf4EG1Oo.jpg',
    description: 'Faced with an unplanned pregnancy, an offbeat young woman makes an unusual decision.',
    reason: 'When life gets weird, get weirder.',
    human_tags: [
      'funny', 'hope', 'family', 'small_happiness', 'excited',
      'acceptance', 'need_comfort', 'sunny'
    ],
    human_vector: {
      funny: 30, hope: 25, family: 20, small_happiness: 25,
      healing: 20, acceptance: 25
    }
  },
  {
    id: 'wings-of-desire',
    title: 'Wings of Desire',
    year: 1987,
    director: 'Wim Wenders',
    poster: 'https://image.tmdb.org/t/p/w500/iKpGZEh8CISbI2MvKThXQh9W6AW.jpg',
    description: 'An angel tires of overseeing human activity and wishes to become human when he falls in love with a mortal.',
    reason: 'To be human is to feel everything. Even the cold. Even the coffee.',
    human_tags: [
      'lonely', 'city_walking', 'quiet', 'peaceful', 'nostalgic',
      'acceptance', 'cant_sleep', 'need_comfort', 'rain'
    ],
    human_vector: {
      lonely: 25, quiet: 30, nostalgia: 30, acceptance: 30,
      healing: 25, romance: 20
    }
  },
  {
    id: 'boyhood',
    title: 'Boyhood',
    year: 2014,
    director: 'Richard Linklater',
    poster: 'https://image.tmdb.org/t/p/w500/vGIGFqR0aA2UkLNyFMq5KzO3BoR.jpg',
    description: 'The life of Mason, from early childhood to his arrival at college, filmed over 12 years.',
    reason: 'Growing up doesn\'t happen in scenes. It happens in between them.',
    human_tags: [
      'family', 'nostalgic', 'hope', 'healing', 'routine',
      'acceptance', 'sunday_afternoon', 'long_day_at_work'
    ],
    human_vector: {
      nostalgia: 35, family: 25, healing: 20, acceptance: 25,
      routine: 20, hope: 15
    }
  },
  {
    id: 'the-grand-budapest-hotel',
    title: 'The Grand Budapest Hotel',
    year: 2014,
    director: 'Wes Anderson',
    poster: 'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
    description: 'The adventures of Gustave H, a legendary concierge at a famous European hotel, and Zero Moustafa, the lobby boy.',
    reason: 'A world of perfect order, for when yours feels like chaos.',
    human_tags: [
      'small_happiness', 'funny', 'hotel', 'nostalgic', 'need_comfort',
      'healing', 'hope', 'excited'
    ],
    human_vector: {
      small_happiness: 30, funny: 30, nostalgia: 25, hope: 20,
      healing: 15, energy: 25
    }
  },
  {
    id: 'taxi-driver',
    title: 'Taxi Driver',
    year: 1976,
    director: 'Martin Scorsese',
    poster: 'https://image.tmdb.org/t/p/w500/ekstpH614fwBV8I5xkXvkQY1U0c.jpg',
    description: 'A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action.',
    reason: 'Some nights, the city looks back at you.',
    human_tags: [
      'cant_sleep', 'night', 'lonely', 'anxious', 'dont_belong',
      'burned_out', 'city_lights', 'rain'
    ],
    human_vector: {
      lonely: 35, night: 40, broken_life: 25, catharsis: 25,
      temporary_life: 20, quiet: 20
    }
  },
  {
    id: 'ponyo',
    title: 'Ponyo',
    year: 2008,
    director: 'Hayao Miyazaki',
    poster: 'https://image.tmdb.org/t/p/w500/mikKSEdk5kLhH1h3UyKr2RA40Z3.jpg',
    description: 'A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human.',
    reason: 'Sometimes you just need a story as pure as the sea.',
    human_tags: [
      'small_happiness', 'hope', 'rain', 'sunny', 'need_comfort',
      'peaceful', 'family', 'healing'
    ],
    human_vector: {
      small_happiness: 35, hope: 30, healing: 25, family: 20,
      energy: 25, acceptance: 20
    }
  },
  {
    id: 'nomadland',
    title: 'Nomadland',
    year: 2020,
    director: 'Chloé Zhao',
    poster: 'https://image.tmdb.org/t/p/w500/qbL0b44cTR2myVc0h3aVUJCEKlE.jpg',
    description: 'After losing everything in the Great Recession, a woman embarks on a journey through the American West, living as a van-dwelling modern-day nomad.',
    reason: 'Home is not where you stay. Home is how you carry it.',
    human_tags: [
      'temporary_life', 'healing', 'acceptance', 'road_trip',
      'hope', 'alone', 'small_happiness', 'want_to_disappear',
      'dont_belong'
    ],
    human_vector: {
      temporary_life: 35, healing: 30, acceptance: 35, alone: 20,
      hope: 20, small_happiness: 25
    }
  },
  {
    id: 'inside-llewyn-davis',
    title: 'Inside Llewyn Davis',
    year: 2013,
    director: 'Joel Coen, Ethan Coen',
    poster: 'https://image.tmdb.org/t/p/w500/mS4CqaVS6UN6uL6H4FvzU2BYnP7.jpg',
    description: 'A week in the life of a young singer as he navigates the Greenwich Village folk scene of 1961.',
    reason: 'Some days, nothing goes right. And somehow the music is better for it.',
    human_tags: [
      'winter', 'lonely', 'burned_out', 'about_to_quit_job',
      'acceptance', 'quiet', 'dont_belong', 'a_little_drunk'
    ],
    human_vector: {
      lonely: 25, broken_life: 30, acceptance: 25, catharsis: 20,
      quiet: 25, routine: 20
    }
  }
];
