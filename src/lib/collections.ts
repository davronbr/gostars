export interface NftCollectionItem {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string;
  date?: string;
}

export const nftCollections: NftCollectionItem[] = [
  { id: 'astral-shard', name: 'Astral Shard', imageUrl: 'https://picsum.photos/seed/astral/64/64', imageHint: 'glowing crystal' },
  { id: 'b-day-candle', name: 'B-Day Candle', imageUrl: 'https://picsum.photos/seed/bday/64/64', imageHint: 'birthday candle' },
  { id: 'berry-box', name: 'Berry Box', imageUrl: 'https://picsum.photos/seed/berry/64/64', imageHint: 'box berries' },
  { id: 'big-year', name: 'Big Year', imageUrl: 'https://picsum.photos/seed/bigyear/64/64', imageHint: 'year celebration' },
  { id: 'bonded-ring', name: 'Bonded Ring', imageUrl: 'https://picsum.photos/seed/bondedring/64/64', imageHint: 'gold ring' },
  { id: 'bow-tie', name: 'Bow Tie', imageUrl: 'https://picsum.photos/seed/bowtie/64/64', imageHint: 'green bowtie' },
  { id: 'bunny-muffin', name: 'Bunny Muffin', imageUrl: 'https://picsum.photos/seed/bunnymuffin/64/64', imageHint: 'bunny muffin' },
  { id: 'candy-cane', name: 'Candy Cane', imageUrl: 'https://picsum.photos/seed/candycane/64/64', imageHint: 'candy cane' },
  { id: 'cookie-heart', name: 'Cookie Heart', imageUrl: 'https://picsum.photos/seed/cookieheart/64/64', imageHint: 'heart cookie' },
  { id: 'crystal-ball', name: 'Crystal Ball', imageUrl: 'https://picsum.photos/seed/crystalball/64/64', imageHint: 'crystal ball' },
  { id: 'desk-calendar', name: 'Desk Calendar', imageUrl: 'https://picsum.photos/seed/deskcalendar/64/64', imageHint: 'desk calendar' },
  { id: 'diamond-ring', name: 'Diamond Ring', imageUrl: 'https://picsum.photos/seed/diamondring/64/64', imageHint: 'diamond ring' },
  { id: 'durovs-cap', name: "Durov's Cap", imageUrl: 'https://picsum.photos/seed/durovscap/64/64', imageHint: 'baseball cap' },
  { id: 'easter-egg', name: 'Easter Egg', imageUrl: 'https://picsum.photos/seed/easteregg/64/64', imageHint: 'easter egg' },
  { id: 'electric-skull', name: 'Electric Skull', imageUrl: 'https://picsum.photos/seed/electricskull/64/64', imageHint: 'electric skull' },
  { id: 'eternal-candle', name: 'Eternal Candle', imageUrl: 'https://picsum.photos/seed/eternalcandle/64/64', imageHint: 'lit candle' },
  { id: 'eternal-rose', name: 'Eternal Rose', imageUrl: 'https://picsum.photos/seed/eternalrose/64/64', imageHint: 'rose glass' },
  { id: 'mood-pack', name: 'Mood Pack', imageUrl: 'https://picsum.photos/seed/moodpack/64/64', imageHint: 'flower pack', date: '18 Mar' },
  { id: 'pool-float', name: 'Pool Float', imageUrl: 'https://picsum.photos/seed/poolfloat/64/64', imageHint: 'pool float', date: '19 Mar' },
].sort((a, b) => a.name.localeCompare(b.name));
