# Moodscape

> Every state of mind deserves a story.

**Moodscape** is not a movie recommendation engine. It's a cinematic companion for the person you are *right now*.

## What makes it different

- ❌ We never ask: *Action? Romance? Thriller? Comedy?*
- ✅ We only ask: *How's the weather? Where are you? How are you feeling? Is your body okay?*

Because people don't really want "a comedy". They want something that understands what today feels like.

## How it works

1. You answer 5 simple questions about your current **human state**
2. The engine maps your answers to an emotional state vector
3. Movies are matched by their **human tags** (not genres)
4. You get a film that feels right for tonight

```
Weather (rainy) + Place (hotel) + Mood (homesick)
    + Body (haven't pooped) + Social (alone)
    = Lost in Translation (93% match)
```

## Tech stack

- React 19 + TypeScript
- Vite
- Framer Motion (animations)
- Pure client-side — no backend needed

## Getting started

```bash
npm install --cache /tmp/npm-cache --registry=https://registry.npmmirror.com
npm run dev
```

Then open http://localhost:5173

## Philosophy

> A person is not an abstract soul. A person is alive in a specific place, under specific weather, in a specific body state.

Movies don't accompany "your taste". They accompany **you, right now**.
