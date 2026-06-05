#!/usr/bin/env python3
import json, hashlib, random, os, sys

OUTPUT_DIR = "/Users/daizy/Documents/Codex/2026-06-05/gpt-a-cinematic-companion-for-your/moodscape/src/data"
MOVIES_TS = os.path.join(OUTPUT_DIR, "movies.ts")
JSON_FILES = ["/tmp/movies_small.json", "/tmp/movies_2010s.json"]
MAX_MOVIES = 3000

random.seed(42)

GENRE_TAGS = {
    "Drama": ["acceptance", "broken_life", "healing", "need_comfort", "quiet"],
    "Comedy": ["funny", "small_happiness", "humor_needed", "hope", "energy"],
    "Romance": ["romance", "missing_someone", "night", "hope", "lonely"],
    "Action": ["energy", "adventure"],
    "Thriller": ["anxious", "night", "cant_sleep", "chaos", "broken_life"],
    "Horror": ["cant_sleep", "night", "anxious", "body_discomfort", "chaos"],
    "Science Fiction": ["adventure", "temporary_life", "dont_belong", "hope", "quiet"],
    "Fantasy": ["adventure", "hope", "dont_belong", "healing", "small_happiness"],
    "Animation": ["small_happiness", "hope", "family", "healing", "funny"],
    "Adventure": ["adventure", "energy", "hope", "temporary_life"],
    "Crime": ["night", "broken_life", "anxious", "chaos", "lonely"],
    "Mystery": ["quiet", "night", "cant_sleep", "lonely"],
    "Documentary": ["acceptance", "quiet", "healing", "routine"],
    "War": ["broken_life", "catharsis", "need_comfort", "nostalgia", "lonely"],
    "Musical": ["small_happiness", "energy", "hope", "romance"],
    "History": ["nostalgia", "acceptance", "routine", "quiet"],
    "Family": ["family", "healing", "hope", "small_happiness"],
    "Music": ["energy", "small_happiness", "nostalgia", "healing"],
    "Western": ["alone", "adventure", "acceptance", "quiet"],
    "Biography": ["nostalgia", "acceptance", "healing", "need_comfort"],
    "Supernatural": ["cant_sleep", "night", "broken_life", "chaos"],
    "Sport": ["hope", "energy", "healing"],
    "Film-Noir": ["night", "lonely", "broken_life", "quiet"],
    "Short": ["small_happiness", "quiet"],
    "Romantic Comedy": ["romance", "funny", "small_happiness", "hope"],
    "Romantic drama": ["romance", "broken_life", "need_comfort", "hope"],
    "Coming-of-age": ["hope", "nostalgia", "dont_belong", "small_happiness"],
    "Psychological thriller": ["anxious", "night", "cant_sleep", "lonely"],
    "Dark comedy": ["funny", "broken_life", "humor_needed"],
    "Disaster": ["broken_life", "hope", "chaos"],
    "Epic": ["adventure", "energy", "nostalgia"],
    "Teen": ["hope", "excited", "dont_belong"],
    "Gangster": ["night", "broken_life", "lonely"],
    "Martial arts": ["energy", "adventure"],
    "Melodrama": ["romance", "broken_life", "need_comfort"],
    "Period drama": ["nostalgia", "acceptance", "quiet"],
    "Political drama": ["broken_life", "catharsis"],
    "Road movie": ["road_trip", "adventure", "temporary_life"],
    "Silent film": ["quiet", "alone", "nostalgia"],
    "Slapstick": ["funny", "small_happiness", "humor_needed"],
    "Surreal": ["cant_sleep", "night", "chaos", "dont_belong"],
    "Tragicomedy": ["funny", "broken_life", "catharsis"],
    "Indie": ["quiet", "alone", "small_happiness"],
    "Experimental": ["dont_belong", "quiet", "cant_sleep"],
    "Satire": ["funny", "broken_life", "humor_needed"],
    "Black comedy": ["funny", "broken_life", "humor_needed"],
    "Adventure comedy": ["funny", "adventure", "energy"],
    "Action comedy": ["funny", "energy"],
    "Crime comedy": ["funny", "night", "broken_life"],
    "Drama comedy": ["funny", "broken_life", "healing"],
    "Horror comedy": ["funny", "night", "chaos"],
    "Science fiction comedy": ["funny", "adventure", "dont_belong"],
    "Comedy drama": ["funny", "healing", "hope"],
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
    "serial killer": ["broken_life", "chaos", "night", "anxious", "cant_sleep"],
    "escape": ["adventure", "want_to_disappear", "temporary_life"],
    "journey": ["adventure", "temporary_life", "road_trip", "hope"],
    "road trip": ["road_trip", "adventure", "temporary_life"],
    "adventure": ["adventure", "energy", "temporary_life"],
    "friend": ["healing", "small_happiness", "one_close_friend"],
    "friendship": ["healing", "small_happiness"],
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
    "dream": ["hope", "adventure", "night"],
    "dance": ["energy", "small_happiness"],
    "music": ["energy", "healing", "nostalgia"],
    "musician": ["energy", "healing", "nostalgia", "small_happiness"],
    "hospital": ["hospital", "healing", "need_comfort", "sick"],
    "breakup": ["going_through_breakup", "heartbroken", "catharsis", "lonely"],
    "drunk": ["a_little_drunk", "night"],
    "alcohol": ["a_little_drunk", "night", "broken_life"],
    "train": ["train", "temporary_life", "quiet"],
    "hotel": ["hotel", "temporary_life", "lonely"],
    "airport": ["airport", "temporary_life"],
    "plane": ["airport", "temporary_life", "adventure"],
    "island": ["temporary_life", "alone", "quiet", "healing"],
    "ghost": ["night", "cant_sleep", "broken_life", "lonely"],
    "zombie": ["body_discomfort", "chaos", "night"],
    "vampire": ["night", "cant_sleep", "romance"],
    "alien": ["dont_belong", "temporary_life", "adventure"],
    "prison": ["broken_life", "alone", "hope", "temporary_life"],
    "police": ["night", "broken_life", "anxious"],
    "detective": ["night", "quiet", "lonely"],
    "crime": ["night", "broken_life", "anxious"],
    "heist": ["night", "energy", "adventure"],
    "teenage": ["hope", "excited", "dont_belong", "lonely"],
    "high school": ["hope", "excited", "dont_belong", "lonely", "nostalgia"],
    "college": ["hope", "excited", "dont_belong", "energy"],
    "wedding": ["family", "romance", "hope", "small_happiness"],
    "funeral": ["catharsis", "acceptance", "broken_life", "lonely"],
    "pregnant": ["hope", "family", "healing", "small_happiness"],
    "alone": ["alone", "lonely", "quiet"],
    "lonely": ["lonely", "need_comfort", "quiet"],
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
    "truth": ["acceptance", "catharsis"],
    "survive": ["adventure", "hope", "need_comfort"],
    "apocalypse": ["broken_life", "temporary_life", "hope"],
    "robot": ["dont_belong", "temporary_life", "lonely"],
    "writer": ["quiet", "alone", "lonely", "routine"],
    "artist": ["quiet", "alone", "small_happiness", "healing"],
    "actor": ["temporary_life", "energy", "lonely"],
    "teacher": ["hope", "healing", "routine"],
    "soldier": ["broken_life", "catharsis", "lonely", "need_comfort"],
    "superhero": ["hope", "energy", "adventure"],
    "dog": ["healing", "small_happiness", "family"],
    "cat": ["quiet", "alone", "small_happiness"],
    "school": ["hope", "nostalgia", "dont_belong"],
}

def extract_tags(text):
    if not text: return []
    tags = set()
    tl = text.lower()
    for kw, ktags in EXTRACT_TAGS.items():
        if kw in tl:
            tags.update(ktags)
    return list(tags)

def gen_vector(tags):
    vec = {}
    w = {"lonely":20,"need_comfort":20,"temporary_life":20,"body_discomfort":15,"humor_needed":20,
         "healing":20,"small_happiness":15,"alone":15,"quiet":20,"night":15,"routine":15,"hope":15,
         "family":20,"funny":20,"broken_life":15,"energy":15,"nostalgia":20,"romance":20,
         "adventure":15,"acceptance":15,"catharsis":20}
    for t in tags:
        if t in w: vec[t] = vec.get(t, 0) + w[t]
    return {k: min(v, 50) for k, v in vec.items()}

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

seen = set()
movies_out = []
total_loaded = 0

for fpath in JSON_FILES:
    if not os.path.exists(fpath):
        continue
    with open(fpath) as f:
        raw = json.load(f)
    print(f"Loaded {len(raw)} from {os.path.basename(fpath)}")
    total_loaded += len(raw)

    for m in raw:
        if len(movies_out) >= MAX_MOVIES:
            break

        title = m.get("title", "")
        if not title or title in seen:
            continue
        if len(title) > 80:
            continue
        seen.add(title)

        year = m.get("year", 0)
        genres = m.get("genres", [])
        extract = m.get("extract", "")
        cast = m.get("cast", [])
        thumbnail = m.get("thumbnail", "")

        tags = set()
        for g in genres:
            tags.update(GENRE_TAGS.get(g, []))

        text_tags = extract_tags(extract)
        tags.update(text_tags)
        tags = sorted(tags)

        # Director
        director = "Various"
        if "by " in extract.lower() and "." in extract:
            idx = extract.lower().find("by ")
            end = extract.find(".", idx)
            part = extract[idx + 3:end].strip()
            if part and len(part) < 50:
                director = part
        elif cast:
            director = cast[0].replace("'", "\\'")

        if not director or director == title:
            director = "Various"

        vector = gen_vector(tags)

        desc = extract[:250].replace("\'", "'").replace("'", "\\'")
        desc = desc.replace('"', '\\"').replace('\n', ' ').strip()
        if not desc and genres:
            desc = f"A {'/'.join(genres[:2])} film."
        if not desc:
            desc = f"A film from {year}."

        mid = hashlib.md5(title.encode()).hexdigest()[:8]

        movies_out.append({
            "id": mid, "title": title, "year": year, "director": director,
            "poster": thumbnail, "description": desc,
            "reason": random.choice(REASONS),
            "human_tags": tags, "human_vector": vector,
        })

    if len(movies_out) >= MAX_MOVIES:
        break

print(f"\nTotal loaded: {total_loaded}")
print(f"Output: {len(movies_out)} movies")

# Write
ts_lines = ["import { Movie } from '../types';", "", "export const movies: Movie[] = ["]
for m in movies_out:
    tags_j = json.dumps(m["human_tags"])
    vec_j = json.dumps(m["human_vector"])
    ts_lines.append("  {")
    ts_lines.append(f"    id: '{m['id']}',")
    ts_lines.append(f"    title: '{m['title'].replace(chr(39), chr(92)+chr(39))}',")
    ts_lines.append(f"    year: {m['year']},")
    ts_lines.append(f"    director: '{m['director'].replace(chr(39), chr(92)+chr(39))}',")
    ts_lines.append(f"    poster: '{m['poster']}',")
    ts_lines.append(f"    description: '{m['description']}',")
    ts_lines.append(f"    reason: '{m['reason'].replace(chr(39), chr(92)+chr(39))}',")
    ts_lines.append(f"    human_tags: {tags_j},")
    ts_lines.append(f"    human_vector: {vec_j},")
    ts_lines.append("  },")
ts_lines.append("];")
ts_lines.append("")

with open(MOVIES_TS, 'w') as f:
    f.write("\n".join(ts_lines))

size = os.path.getsize(MOVIES_TS) / 1024
print(f"Written: {MOVIES_TS} ({size:.0f} KB)")
