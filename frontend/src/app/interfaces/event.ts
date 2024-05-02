import { User } from "./user";

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
    creator: User;
    meetingUrl: string,
    type: string,
    price: number,
}

// enum Category {
//     Define your category options here
// }

interface Tag {
    id?: number;
    name: string;
}
