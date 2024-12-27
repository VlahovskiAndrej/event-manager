import { EventInterface } from "./event";
import { User } from "./user";

export interface Ticket {
    id: number,
    price: number,
    event: EventInterface,
    buyer: User
}