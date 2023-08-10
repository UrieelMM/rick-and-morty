export interface Character {
    id: number;
    name: string;
    species: string;
    image: string;
    gender: string;
    status: string;
    origin: { name: string, url: string };
}