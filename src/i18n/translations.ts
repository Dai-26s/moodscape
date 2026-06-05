export type Lang = 'en' | 'zh';

export const translations = {
  en: {
    siteTitle: 'Moodscape',
    siteSubtitle: 'Every state of mind deserves a story.',
    timeDisplay: (time: string) => time,
    stepLabels: ['Weather', 'Place', 'Mood', 'Body', 'Social'],
    stepQuestions: [
      "How's the weather?",
      'Where are you?',
      'How are you feeling?',
      "How's your body?",
      'Today I want...',
    ],
    stepSubtitles: {
      weather: 'Auto-detected, but you can change it',
      body: 'Pick all that apply — no judgment',
    },
    weather: {
      sunny: 'Sunny', rainy: 'Rainy', snow: 'Snow', cloudy: 'Cloudy', windy: 'Windy',
    },
    place: {
      home: 'Home', office: 'Office', hotel: 'Hotel', airport: 'Airport',
      train: 'Train', cafe: 'Cafe', hospital: 'Hospital', unknown_city: 'Unknown City',
      hometown: 'My hometown', dont_belong: "Somewhere I don't belong",
    },
    placeLiterary: {
      hometown: 'Where I grew up', dont_belong: 'Out of place',
    },
    mood: {
      peaceful: 'Peaceful', lonely: 'Lonely', excited: 'Excited',
      nostalgic: 'Nostalgic', heartbroken: 'Heartbroken', burned_out: 'Burned out',
      anxious: 'Anxious', cant_sleep: "Can't sleep", missing_someone: 'Missing someone',
      want_to_disappear: 'Want to disappear', need_motivation: 'Need motivation',
      just_want_silence: 'Just want silence',
    },
    body: {
      havent_slept_well: "Haven't slept well", headache: 'Headache',
      too_much_coffee: 'Too much coffee', ate_too_much: 'Ate too much',
      havent_eaten: "Haven't eaten", a_little_drunk: 'A little drunk',
      sick: 'Sick', long_day_at_work: 'Long day at work',
      havent_pooped: "Haven't pooped for days", just_cleaned_room: 'Just cleaned my room',
      going_through_breakup: 'Going through a breakup', about_to_quit_job: 'About to quit my job',
    },
    social: {
      alone: 'To be alone', one_close_friend: 'One close friend',
      family: 'Family', crowded_city: 'A crowded city', nobody_talks: 'Nobody talks',
    },
    nav: { back: '← Back', next: 'Next →', find: 'Find my film →' },
    result: {
      title: "Tonight's Film",
      subtitle: 'Matched for your current state',
      match: '% match',
      why: 'Why this film?',
      others: 'Other films for tonight',
      noticeTitle: 'We never ask',
      never: ['Action', 'Romance', 'Thriller', 'Comedy'],
      instead: 'We only ask how you are.',
      footer: 'Because people don\'t really want "a comedy".\nThey want something that understands what today feels like.',
      restart: 'Start over',
      seeAnother: 'See another recommendation →',
    },
    egg: {
      line1: "You haven't pooped for 3 days.",
      line2: 'Maybe your body',
      line3: 'is just trying',
      line4: 'to hold on to something.',
      divider: '━━━━━━━━━━',
      film: "Today's Film",
      disclaimer: '(No medical advice included.)',
    },
    langSwitch: '中文',
    langLabel: 'EN',
  },

  zh: {
    siteTitle: '心象',
    siteSubtitle: '每一种心境，都值得一个故事。',
    timeDisplay: (time: string) => {
      const map: Record<string, string> = {
        'Monday': '周一', 'Tuesday': '周二', 'Wednesday': '周三',
        'Thursday': '周四', 'Friday': '周五', 'Saturday': '周六', 'Sunday': '周日',
        'Morning': '早晨', 'Afternoon': '午后', 'Evening': '傍晚', 'Night': '深夜',
      };
      return time.split(' ').map(w => map[w] || w).join('');
    },
    stepLabels: ['天气', '地点', '情绪', '身体', '社交'],
    stepQuestions: [
      '今天天气如何？',
      '你在什么地方？',
      '你此刻的心情？',
      '身体感觉怎么样？',
      '今晚我想……',
    ],
    stepSubtitles: {
      weather: '自动获取，可手动修改',
      body: '可多选，这里没有评判',
    },
    weather: {
      sunny: '晴天', rainy: '雨天', snow: '下雪', cloudy: '多云', windy: '刮风',
    },
    place: {
      home: '家里', office: '办公室', hotel: '酒店', airport: '机场',
      train: '火车上', cafe: '咖啡馆', hospital: '医院', unknown_city: '陌生城市',
      hometown: '我的故乡', dont_belong: '不属于这里',
    },
    placeLiterary: {
      hometown: '长大的地方', dont_belong: '格格不入',
    },
    mood: {
      peaceful: '平静', lonely: '孤独', excited: '兴奋',
      nostalgic: '怀旧', heartbroken: '心碎', burned_out: '燃尽了',
      anxious: '焦虑', cant_sleep: '失眠', missing_someone: '想念某人',
      want_to_disappear: '想消失', need_motivation: '需要动力',
      just_want_silence: '只想安静',
    },
    body: {
      havent_slept_well: '没睡好', headache: '头疼',
      too_much_coffee: '咖啡喝多了', ate_too_much: '吃太撑',
      havent_eaten: '还没吃饭', a_little_drunk: '微醺',
      sick: '生病了', long_day_at_work: '加班好累',
      havent_pooped: '几天没拉了', just_cleaned_room: '刚打扫完房间',
      going_through_breakup: '正在经历分手', about_to_quit_job: '准备辞职',
    },
    social: {
      alone: '独自一人', one_close_friend: '一个密友',
      family: '家人相伴', crowded_city: '人潮涌动', nobody_talks: '谁都别说话',
    },
    nav: { back: '← 返回', next: '下一步 →', find: '为我找一部电影 →' },
    result: {
      title: '今晚的电影',
      subtitle: '为你此刻的状态匹配',
      match: '% 匹配',
      why: '为什么是这部电影？',
      others: '今晚的其他选择',
      noticeTitle: '我们从不问',
      never: ['动作片', '爱情片', '惊悚片', '喜剧片'],
      instead: '我们只问，你还好吗。',
      footer: '因为人们想要的，从来不是一部「喜剧」。\n而是某种，能理解今天的感受的东西。',
      restart: '重新开始',
      seeAnother: '看看其他推荐 →',
    },
    egg: {
      line1: '你已经三天没拉了。',
      line2: '也许你的身体',
      line3: '只是在试图',
      line4: '留住一些什么。',
      divider: '━━━━━━━━━━',
      film: '今日电影',
      disclaimer: '（不含医学建议）',
    },
    langSwitch: 'English',
    langLabel: '中',
  },
};

export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  let result: unknown = translations[lang];
  for (const k of keys) {
    result = (result as Record<string, unknown>)?.[k];
  }
  return typeof result === 'string' ? result : key;
}
