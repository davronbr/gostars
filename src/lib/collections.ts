export interface NftCollectionItem {
  id: string;
  name: string;
  collection: string;
  imageUrl?: string;
  lottieUrl?: string;
  imageHint: string;
  price: string;
  date?: string;
  model: { value: string; rarity: string; };
  symbol: { value: string; rarity: string; };
  backdrop: { value: string; rarity: string; };
  floorPrice: string;
  offerPrice: string;
}

export const nftCollections: NftCollectionItem[] = [
  { 
    id: '#10311', 
    name: 'Spooky Ghost', 
    collection: 'Halloween Specials',
    imageUrl: 'https://picsum.photos/seed/ghost/400/400',
    price: '70 000 UZS',
    imageHint: 'spooky ghost',
    model: { value: 'Ethereal', rarity: '2%' },
    symbol: { value: 'Moon', rarity: '1.8%' },
    backdrop: { value: 'Haunted Forest', rarity: '2.5%' },
    floorPrice: '65 000 UZS',
    offerPrice: '68 000 UZS'
  },
];
