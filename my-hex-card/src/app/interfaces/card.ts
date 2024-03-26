import { Email } from "./email";
import { Link } from "./link";
import { PhoneNumber } from "./phone-number";

export interface Card {
    id: number,
    img: string,
    title: string,
    subtitle: string,
    instagram: string,
    facebook: string,
    linkedin: string,
    whatsapp: string,
    youtube: string,

    fk_id_user: number,
    email: Email[],
    phone_number: PhoneNumber[],
    link: Link[]
}