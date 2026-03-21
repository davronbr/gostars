export interface NftCollectionItem {
  id: string;
  name: string;
  imageUrl?: string;
  lottieUrl?: string;
  imageHint: string;
  price: string;
  date?: string;
}

export const nftCollections: NftCollectionItem[] = [
  { 
    id: '#54522', 
    name: 'Santa hat', 
    lottieUrl: 'https://nft.fragment.com/gift/SantaHat-54522.lottie.json',
    price: '65 000 UZS',
    imageHint: 'santa hat' 
  },
];
