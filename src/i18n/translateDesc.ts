// Keyword-based Chinese description translator for 3000 movies
// Maps common English film description patterns to Chinese

const PHRASE_MAP: [RegExp, string][] = [
  // Genres
  [/is a \d{4} American (.*?) film/i, '是一部$1电影'],
  [/is a \d{4} (.*?) film/i, '是一部$1电影'],
  [/is an? (.*?) film/i, '是一部$1电影'],
  [/is a film about/i, '是一部关于'],
  [/directed by/i, '导演'],

  // Common plot patterns
  [/follows? (a|the) story of/i, '讲述了'],
  [/tells the story of/i, '讲述了'],
  [/based on the (.*?) by/i, '改编自'],
  [/based on a true story/i, '根据真实故事改编'],
  [/set in (.*?), the film/i, '故事发生在$1，影片'],
  [/takes place in/i, '故事发生在'],

  // Characters
  [/a young woman/i, '一位年轻女性'],
  [/a young man/i, '一位年轻男子'],
  [/a group of friends/i, '一群朋友'],
  [/a group of (.*?) who/i, '一群$1，他们'],
  [/a teenage/i, '一位青少年'],
  [/a retired/i, '一位退休的'],
  [/a former/i, '一名前'],
  [/an FBI agent/i, '一名FBI探员'],
  [/a detective/i, '一名侦探'],
  [/a police officer/i, '一名警察'],
  [/a journalist/i, '一名记者'],
  [/a writer/i, '一位作家'],
  [/a musician/i, '一位音乐人'],
  [/a soldier/i, '一名士兵'],
  [/a family/i, '一个家庭'],
  [/a couple/i, '一对情侣'],
  [/a single mother/i, '一位单身母亲'],
  [/a single father/i, '一位单身父亲'],
  [/a widow/i, '一位寡妇'],
  [/an orphan/i, '一名孤儿'],

  // Actions
  [/must (.*?) to save/i, '必须$1来拯救'],
  [/must (.*?) to survive/i, '必须$1才能生存'],
  [/must (.*?) to find/i, '必须$1才能找到'],
  [/must (.*?) to protect/i, '必须$1来保护'],
  [/tries to (.*?) but/i, '试图$1，但'],
  [/struggles to/i, '艰难地'],
  [/attempts to/i, '试图'],
  [/decides to/i, '决定'],
  [/embarks on a journey/i, '踏上了一段旅程'],
  [/goes on a/i, '开始了一段'],
  [/sets out to/i, '出发去寻找'],
  [/returns? home/i, '回到家乡'],
  [/falls in love/i, '坠入爱河'],
  [/begins to/i, '开始'],
  [/discovers that/i, '发现'],
  [/discovers the truth/i, '发现了真相'],
  [/finds himself/i, '发现自己'],
  [/finds herself/i, '发现自己'],
  [/finds themselves/i, '发现他们自己'],

  // Themes
  [/relationship between/i, '之间的关系'],
  [/friendship between/i, '之间的友谊'],
  [/battle against/i, '对抗'],
  [/fight for survival/i, '为生存而战'],
  [/fight for (.*?) against/i, '为$1而战，对抗'],
  [/fight against/i, '对抗'],
  [/war between/i, '之间的战争'],
  [/secret (.*?) that could/i, '的秘密可能会'],
  [/mysterious (.*?) that/i, '神秘的$1'],
  [/dark secret/i, '黑暗的秘密'],

  // Outcomes
  [/in order to survive/i, '为了生存'],
  [/to save the world/i, '为了拯救世界'],
  [/to save his/i, '为了拯救他'],
  [/to save her/i, '为了拯救她'],
  [/to find out what happened/i, '为了一探究竟'],
  [/to find the truth/i, '为了寻找真相'],
  [/to escape from/i, '从…逃脱'],
  [/while dealing with/i, '同时还要应对'],
  [/while trying to/i, '同时在努力'],
  [/while navigating/i, '同时在经历'],
  [/with the help of/i, '在…的帮助下'],
  [/along the way,? (they|he|she)/i, '一路走来，他们'],

  // Horror/Thriller specific
  [/haunted by/i, '被…所困扰'],
  [/supernatural (.*?) terror/i, '超自然的恐怖'],
  [/serial killer/i, '连环杀手'],
  [/possessed by/i, '被附身'],
  [/cursed (.*?) that/i, '被诅咒的$1'],
  [/vengeful spirit/i, '复仇之魂'],
];

// Specific movie title translations for the most iconic films
const TITLE_DESCRIPTIONS: Record<string, string> = {
  "The Godfather": "一部关于黑手党家族的史诗，讲述了权力的传承与人性的挣扎。",
  "The Shawshank Redemption": "在肖申克监狱的高墙之内，一个银行家以希望为舟，穿越漫长的绝望。",
  "The Dark Knight": "当哥谭陷入混沌，蝙蝠侠必须在混乱与秩序之间做出选择。",
  "Pulp Fiction": "洛杉矶的暗夜中，几条看似无关的故事线交织成一幅暴力与救赎的马赛克。",
  "Forrest Gump": "一个简单的人，跑过了整个美国历史，用最纯粹的心见证了时代变迁。",
  "Inception": "在层层嵌套的梦境中，一个盗梦者必须完成不可能的任务——植入一个想法。",
  "Fight Club": "当一个失眠的白领在拳击俱乐部中找到了另一种存在方式，一切开始失控。",
  "The Matrix": "在这个看似正常的世界表面之下，隐藏着一个关于真实与虚幻的惊人真相。",
  "Interstellar": "当地球濒临灭亡，一组宇航员穿越虫洞，在星际彼岸为人类寻找新家园。",
  "Parasite": "一个贫穷的家庭潜入富裕家庭的生活，两个世界之间的鸿沟逐渐显露。",
  "Joker": "一个被社会遗忘的喜剧演员，在哥谭的黑暗街头一步步走向疯狂。",
  "Whiplash": "一个年轻的鼓手与一位残酷导师之间的激烈较量，关于天才、执着与代价。",
  "The Grand Budapest Hotel": "在战前的欧洲，一位传奇酒店管家和他忠诚的门徒经历了一段奇妙的冒险。",
  "La La Land": "在洛杉矶的星光下，一个爵士钢琴家和一个怀揣演员梦的女孩相爱又错过。",
  "Get Out": "一个黑人青年在拜访白人女友家族时，发现了隐藏在温情之下的恐怖真相。",
  "Mad Max: Fury Road": "在末日的荒漠中，一场疯狂的追逐之旅，关于自由、生存与救赎。",
  "The Social Network": "一个深夜的编程，一个改变世界的想法，和随之而来的一切代价。",
  "Django Unchained": "一个被解放的奴隶踏上复仇之路，在暴烈的美国南方寻找失散的爱人。",
  "No Country for Old Men": "在得克萨斯的荒漠中，一袋钱引发了一场无情追猎，没有英雄，只有因果。",
  "There Will Be Blood": "一个石油勘探者的崛起与堕落，一部关于贪婪、信仰与孤独的美国史诗。",
  "Moonlight": "一个黑人男孩在迈阿密的贫民区成长，在沉默中寻找自己的身份与爱。",
  "Arrival": "当外星飞船降临地球，一个语言学家试图通过沟通解开时间与记忆的秘密。",
  "Blade Runner 2049": "在赛博朋克的未来，一个复制人猎手在追寻真相时发现了关于存在的终极问题。",
  "The Revenant": "在荒野中被熊袭击后遭同伴抛弃，一个男人凭借顽强的意志爬回人间复仇。",
  "Gravity": "在寂静的太空中，独自漂浮的宇航员必须在绝望中找到回家的路。",
  "Dunkirk": "在敦刻尔克海滩上，四十万士兵的绝望等待与无数普通人的英勇救援。",
  "The Irishman": "一个货车司机成为黑帮杀手，穿越了美国半个世纪的黑暗历史。",
  "1917": "在第一次世界大战的战壕中，两个年轻的传令兵穿越地狱般的战场送去一条救命信息。",
  "Once Upon a Time in Hollywood": "1969年的洛杉矶，一个过气的电视明星和他的替身演员在嬉皮士时代的尾巴上徘徊。",
  "Spider-Man: Into the Spider-Verse": "当多个维度的蜘蛛侠相遇，一个布鲁克林的少年学会戴上英雄的面具。",
};

function translateSentence(text: string): string {
  let result = text;

  for (const [pattern, replacement] of PHRASE_MAP) {
    result = result.replace(pattern, replacement);
  }

  // Clean up remaining English artifacts
  result = result.replace(/starring [A-Z][a-z]+ [A-Z][a-z]+/g, '主演阵容强大');
  result = result.replace(/starring (.*?), .*?, and .*?\./g, '明星云集。');
  result = result.replace(/\. The film stars .*?\.$/, '。');
  result = result.replace(/[A-Z][a-z]+ [A-Z][a-z]+ (plays|portrays|stars as)/g, '饰演了');

  // Capitalize first letter of Chinese sentence
  if (result.length > 0 && !result.startsWith('在') && !result.startsWith('当') && !result.startsWith('一')) {
    // Already starts Chinese, good
  }

  return result;
}

export function translateDescription(title: string, english: string): string {
  // Check if we have a specific translation
  if (TITLE_DESCRIPTIONS[title]) {
    return TITLE_DESCRIPTIONS[title];
  }

  // Try to translate
  const translated = translateSentence(english);

  // If translation looks mostly still English, just return original
  const chineseCharCount = (translated.match(/[\u4e00-\u9fff]/g) || []).length;
  const totalChars = translated.replace(/\s/g, '').length;
  if (totalChars === 0 || chineseCharCount / totalChars < 0.15) {
    // Fallback: generate a generic Chinese description based on keywords
    return generateFallbackDesc(english);
  }

  return translated;
}

function generateFallbackDesc(english: string): string {
  const desc = english.toLowerCase();
  const parts: string[] = [];

  if (desc.includes('love') || desc.includes('romance') || desc.includes('relationship')) {
    parts.push('一段关于爱与连接的旅程');
  }
  if (desc.includes('family') || desc.includes('father') || desc.includes('mother') || desc.includes('daughter') || desc.includes('son')) {
    parts.push('关于家庭与羁绊的故事');
  }
  if (desc.includes('war') || desc.includes('battle') || desc.includes('soldier')) {
    parts.push('在战争的硝烟中展开');
  }
  if (desc.includes('murder') || desc.includes('killer') || desc.includes('crime') || desc.includes('detective')) {
    parts.push('黑暗中的犯罪与追索');
  }
  if (desc.includes('ghost') || desc.includes('haunt') || desc.includes('supernatural') || desc.includes('horror')) {
    parts.push('在恐惧与未知的边缘徘徊');
  }
  if (desc.includes('journey') || desc.includes('adventure') || desc.includes('travel') || desc.includes('road')) {
    parts.push('一段改变命运的旅程');
  }
  if (desc.includes('survive') || desc.includes('survival') || desc.includes('escape')) {
    parts.push('关于生存与希望的故事');
  }
  if (desc.includes('friend') || desc.includes('friendship')) {
    parts.push('关于友谊中最珍贵的时刻');
  }
  if (desc.includes('music') || desc.includes('musician') || desc.includes('singer') || desc.includes('band')) {
    parts.push('在音乐中寻找生命的答案');
  }
  if (desc.includes('dream') || desc.includes('dreams')) {
    parts.push('在梦想与现实之间穿行');
  }
  if (desc.includes('comedy') || desc.includes('funny') || desc.includes('humor')) {
    parts.push('在笑声中触动人心');
  }
  if (desc.includes('true story') || desc.includes('based on')) {
    parts.push('改编自真实事件');
  }

  if (parts.length === 0) {
    parts.push('一部值得在今晚静静观看的电影');
  }

  return parts.slice(0, 3).join('，') + '。';
}
