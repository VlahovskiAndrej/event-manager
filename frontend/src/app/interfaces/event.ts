export interface EventInterface {
    id: number;
    name: string;
    description: string;
    availableTickets: number;
    longitude: string;
    latitude: string;
    category: string; // moze da e problem deka e ENUM
    tags: Tag[];
    dateStart: Date;
    dateFinish: Date;
}

// enum Category {
//     Define your category options here
// }

interface Tag {
    id?: number;
    name: string;
}
