#!/usr/bin/env python3
"""Convert Wikipedia movie JSON to Moodscape human-tag TS format."""
import json, hashlib, random, re, os

OUTPUT_DIR = "/Users/daizy/Documents/Codex/2026-06-05/gpt-a-cinematic-companion-for-your/moodscape/src/data"
MOVIES_TS = os.path.join(OUTPUT_DIR, "movies.ts")
GENRES_JSON = "/tmp/movies_small.json"

random.seed(42)
used_ids = set()

GENRE_TAGS = {
    "Drama": ["acceptance", "broken_life", "healing", "need_comfort", "quiet"],
    "Comedy": ["funny", "small_happiness", "humor_needed", "hope", "energy"],
    "Romance": ["romance", "missing_someone", "night", "hope", "lonely"],
    "Action": ["energy", "adventure", "excited"],
    "Thriller": ["anxious", "night", "cant_sleep", "chaos", "broken_life"],
    "Horror": ["cant_sleep", "night", "anxious", "body_discomfort", "chaos"],
    "Science Fiction": ["adventure", "temporary_life", "dont_belong", "hope", "quiet"],
    "Fantasy": ["adventure", "hope", "dont_belong", "healing", "small_happiness"],
    "Animation": ["small_happiness", "hope", "family", "healing", "funny"],
    "Adventure": ["adventure", "energy", "hope", "temporary_life", "excited"],
    "Crime": ["night", "broken_life", "anxious", "chaos", "lonely"],
    "Mystery": ["quiet", "night", "cant_sleep", "lonely"],
    "Documentary": ["acceptance", "quiet", "healing", "routine"],
    "War": ["broken_life", "catharsis", "need_comfort", "nostalgia", "lonely"],
    "Musical": ["small_happiness", "energy", "excited", "hope", "romance"],
    "History": ["nostalgia", "acceptance", "routine", "quiet"],
    "Family": ["family", "healing", "hope", "small_happiness"],
    "Music": ["energy", "small_happiness", "nostalgia", "healing", "romance"],
    "Western": ["alone", "adventure", "acceptance", "quiet"],
    "Biography": ["nostalgia", "acceptance", "healing", "need_comfort"],
    "Supernatural": ["cant_sleep", "night", "broken_life", "chaos"],
    "Sport": ["hope", "energy", "need_motivation", "healing"],
    "Film-Noir": ["night", "lonely", "broken_life", "quiet"],
    "Short": ["small_happiness", "quiet"],
}

EXTRACT_TAGS = {
    "love": ["romance", "hope", "missing_someone"],
    "death": ["catharsis", "acceptance", "need_comfort", "broken_life"],
    "family": ["family", "healing", "nostalgia"],
    "marriage": ["family", "routine", "hope"],
    "divorce": ["broken_life", "going_through_breakup", "catharsis", "lonely"],
    "war": ["broken_life", "catharsis", "need_comfort", "lonely"],
    "kill": ["broken_life", "chaos", "night"],
    "murder": ["broken_life", "chaos", "night", "anxious"],
    "murderer": ["broken_life", "chaos", "night", "anxious"],
    "serial killer": ["broken_life", "chaos", "night", "anxious", "cant_sleep"],
    "escape": ["adventure", "want_to_disappear", "temporary_life"],
    "journey": ["adventure", "temporary_life", "road_trip", "hope"],
    "road trip": ["road_trip", "adventure", "temporary_life"],
    "adventure": ["adventure", "energy", "temporary_life"],
    "friend": ["healing", "small_happiness", "one_close_friend"],
    "friendship": ["healing", "small_happiness", "one_close_friend"],
    "mother": ["family", "healing", "nostalgia"],
    "father": ["family", "nostalgia", "healing"],
    "daughter": ["family", "healing", "hope"],
    "son": ["family", "hope", "healing"],
    "brother": ["family", "broken_life", "healing"],
    "sister": ["family", "healing"],
    "child": ["family", "hope", "small_happiness"],
    "children": ["family", "hope", "small_happiness"],
    "rain": ["rain", "quiet", "need_comfort"],
    "snow": ["snow", "quiet", "nostalgia"],
    "winter": ["snow", "quiet", "nostalgia"],
    "summer": ["summer", "hope", "energy"],
    "city": ["city_lights", "city_walking"],
    "ocean": ["quiet", "acceptance", "healing"],
    "sea": ["quiet", "acceptance", "healing"],
    "memory": ["nostalgia", "healing"],
    "memories": ["nostalgia", "healing"],
    "dream": ["hope", "adventure", "night"],
    "dreams": ["hope", "adventure", "night"],
    "dance": ["energy", "small_happiness", "excited"],
    "music": ["energy", "healing", "nostalgia"],
    "musician": ["energy", "healing", "nostalgia", "small_happiness"],
    "hospital": ["hospital", "healing", "need_comfort", "sick"],
    "breakup": ["going_through_breakup", "heartbroken", "catharsis", "lonely"],
    "heartbreak": ["going_through_breakup", "heartbroken", "catharsis", "lonely"],
    "drunk": ["a_little_drunk", "night"],
    "alcohol": ["a_little_drunk", "night", "broken_life"],
    "train": ["train", "temporary_life", "quiet"],
    "hotel": ["hotel", "temporary_life", "lonely"],
    "airport": ["airport", "temporary_life"],
    "plane": ["airport", "temporary_life", "adventure"],
    "island": ["temporary_life", "alone", "quiet", "healing"],
    "ghost": ["night", "cant_sleep", "broken_life", "lonely"],
    "haunt": ["night", "cant_sleep", "broken_life", "lonely"],
    "zombie": ["body_discomfort", "chaos", "night"],
    "vampire": ["night", "cant_sleep", "romance"],
    "alien": ["dont_belong", "temporary_life", "adventure"],
    "prison": ["broken_life", "alone", "hope", "temporary_life"],
    "cop": ["night", "broken_life", "anxious"],
    "police": ["night", "broken_life", "anxious"],
    "detective": ["night", "quiet", "lonely"],
    "crime": ["night", "broken_life", "anxious"],
    "heist": ["night", "energy", "adventure"],
    "teenage": ["hope", "excited", "dont_belong", "lonely"],
    "teenager": ["hope", "excited", "dont_belong", "lonely"],
    "high school": ["hope", "excited", "dont_belong", "lonely", "nostalgia"],
    "college": ["hope", "excited", "dont_belong", "energy"],
    "wedding": ["family", "romance", "hope", "small_happiness"],
    "funeral": ["catharsis", "acceptance", "broken_life", "lonely"],
    "pregnant": ["hope", "family", "healing", "small_happiness"],
    "pregnancy": ["hope", "family", "healing"],
    "alone": ["alone", "lonely", "quiet"],
    "lonely": ["lonely", "need_comfort", "quiet"],
    "loneliness": ["lonely", "need_comfort", "quiet"],
    "depression": ["need_comfort", "lonely", "healing"],
    "suicide": ["catharsis", "broken_life", "need_comfort"],
    "cancer": ["sick", "healing", "catharsis", "need_comfort"],
    "disease": ["sick", "healing", "need_comfort"],
    "disappear": ["want_to_disappear", "lonely", "need_comfort"],
    "home": ["home", "family", "nostalgia"],
    "return": ["homesick", "nostalgia", "acceptance"],
    "revenge": ["catharsis", "broken_life", "night"],
    "betrayal": ["broken_life", "catharsis", "lonely"],
    "secret": ["quiet", "anxious", "lonely"],
    "lie": ["broken_life", "anxious"],
    "truth": ["acceptance", "catharsis"],
    "survive": ["adventure", "hope", "need_comfort"],
    "survival": ["adventure", "hope", "need_comfort"],
    "apocalypse": ["broken_life", "temporary_life", "hope"],
    "post-apocalyptic": ["broken_life", "temporary_life", "hope"],
    "robot": ["dont_belong", "temporary_life", "lonely"],
    "artificial intelligence": ["dont_belong", "temporary_life", "lonely"],
    "writer": ["quiet", "alone", "lonely", "routine"],
    "artist": ["quiet", "alone", "small_happiness", "healing"],
    "actor": ["temporary_life", "energy", "lonely"],
    "teacher": ["hope", "healing", "routine"],
    "soldier": ["broken_life", "catharsis", "lonely", "need_comfort"],
    "spy": ["adventure", "night", "energy"],
    "superhero": ["hope", "energy", "adventure"],
    "king": ["nostalgia", "routine"],
    "queen": ["nostalgia", "routine"],
    "dog": ["healing", "small_happiness", "family"],
    "cat": ["quiet", "alone", "small_happiness"],
}

REASONS = [
    "Some stories don't explain. They just sit beside you.",
    "Tonight doesn't need a lesson. Just a place to be.",
    "Not every movie is an escape. Some are a homecoming.",
    "When words fail, there's always a frame that understands.",
    "The right film doesn't answer your questions. It sits in them with you.",
    "Sometimes you need a story that moves at the speed of your breathing.",
    "What we watch alone says more about us than what we watch together.",
    "A film for the hour when the world has finally gone quiet.",
    "Not for entertainment. For recognition.",
    "Some feelings don't have names. But they have movies.",
    "When your body is tired and your mind won't stop.",
    "For the version of you that exists only tonight.",
    "Tomorrow will be different. Tonight, let it be this.",
    "The kind of film that feels like it was waiting for you.",
    "Not a recommendation. A mirror.",
    "A story that doesn't try to fix you. Just sits with you.",
    "The night is long. This film knows it.",
    "Because sometimes you need to see yourself in someone else's life.",
    "A quiet room. A dark screen. Then this.",
    "When nothing makes sense, let this make a little sense.",
]

def extract_tags_from_text(text: str) -> list[str]:
    tags = set()
    text_lower = text.lower()
    for keyword, ktags in EXTRACT_TAGS.items():
        if keyword in text_lower:
            tags.update(ktags)
    return list(tags)

def gen_vector(tags: list[str]) -> dict:
    vec = {}
    weights = {
        "lonely": 20, "need_comfort": 20, "temporary_life": 20, "body_discomfort": 15,
        "humor_needed": 20, "healing": 20, "small_happiness": 15, "alone": 15,
        "quiet": 20, "night": 15, "routine": 15, "hope": 15, "family": 20,
        "funny": 20, "broken_life": 15, "energy": 15, "nostalgia": 20,
        "romance": 20, "adventure": 15, "acceptance": 15, "catharsis": 20,
    }
    for tag in tags:
        if tag in weights:
            vec[tag] = vec.get(tag, 0) + weights[tag]
    # Cap
    return {k: min(v, 45) for k, v in vec.items()}

def get_director(cast: list, extract: str, href: str) -> str:
    # Try to extract director from href (last name before _film)
    name = (href or "").replace("_(film)", "").replace("_", " ").strip()
    if "by " in extract.lower():
        idx = extract.lower().find("by ")
        end = extract.find(".", idx)
        part = extract[idx+3:end]
        return part.strip()
    # Fallback: use first actor
    if cast:
        return cast[0]
    return ""

with open(GENRES_JSON) as f:
    raw_movies = json.load(f)

print(f"Loaded {len(raw_movies)} movies from Wikipedia")

movies_out = []
seen_titles = set()

for m in raw_movies:
    title = m["title"]
    if title in seen_titles:
        continue
    seen_titles.add(title)

    year = m["year"]
    genres = m["genres"]
    extract = m.get("extract", "")
    cast = m.get("cast", [])
    href = m.get("href", "")
    thumbnail = m.get("thumbnail", "")

    # Generate human tags from genres + text
    tags = set()
    for genre in genres:
        tags.update(GENRE_TAGS.get(genre, []))

    text_tags = extract_tags_from_text(extract)
    tags.update(text_tags)

    tags = sorted(tags)

    director = get_director(cast, extract, href)

    # If director is just the title or empty, use "Various Directors"
    if not director or director.lower() == title.lower():
        director = "Various"

    # Generate vector
    vector = gen_vector(tags)

    # If movie title is >60 chars, truncate
    if len(title) > 60:
        continue

    # Description
    desc = extract[:200] + "..." if len(extract) > 200 else extract
    desc = desc.replace('"', '\\"').replace('\n', ' ').strip()
    if not desc:
        desc = f"A {', '.join(genres[:2])} film."

    # ID
    mid = hashlib.md5(title.encode()).hexdigest()[:8]

    movies_out.append({
        "id": mid,
        "title": title,
        "year": year,
        "director": director,
        "poster": thumbnail,
        "description": desc,
        "reason": random.choice(REASONS),
        "human_tags": tags,
        "human_vector": vector,
    })

print(f"Generated {len(movies_out)} movies")

# Write TS file
ts_lines = [
    'import { Movie } from \'../types\';',
    '',
    f'export const movies: Movie[] = [',
]

for m in movies_out:
    tags_json = json.dumps(m["human_tags"])
    vec_json = json.dumps(m["human_vector"])
    desc = m["description"]
    title = m["title"].replace("'", "\\'")
    director = m["director"].replace("'", "\\'")
    reason = m["reason"].replace("'", "\\'")
    poster = m["poster"].replace("https://upload.wikimedia.org", "https://image.tmdb.org/t/p/w500")

    ts_lines.append('  {')
    ts_lines.append(f'    id: \'{m["id"]}\',')
    ts_lines.append(f'    title: \'{title}\',')
    ts_lines.append(f'    year: {m["year"]},')
    ts_lines.append(f'    director: \'{director}\',')
    ts_lines.append(f'    poster: \'{poster}\',')
    ts_lines.append(f'    description: \'{desc}\',')
    ts_lines.append(f'    reason: \'{reason}\',')
    ts_lines.append(f'    human_tags: {tags_json},')
    ts_lines.append(f'    human_vector: {vec_json},')
    ts_lines.append('  },')

ts_lines.append('];')
ts_lines.append('')

with open(MOVIES_TS, 'w') as f:
    f.write('\n'.join(ts_lines))

file_size = os.path.getsize(MOVIES_TS) / 1024
print(f"Written to {MOVIES_TS} ({file_size:.0f} KB)")
print(f"Total: {len(movies_out)} movies")
