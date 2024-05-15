import { SafeUrl } from "@angular/platform-browser";
import { Address } from "./address";
import { Email } from "./email";
import { Link } from "./link";
import { PhoneNumber } from "./phone-number";

export interface Card {
    id: number,
    
    img: string,

    name: string,
    surname: string,
    company: string,
    function: string,

    instagram: string,
    facebook: string,
    linkedin: string,
    whatsapp: string,
    youtube: string,
    token: string,

    active: boolean,

    fk_id_user: number,
    fk_id_contact: number,

    email: Email[],
    phone_number: PhoneNumber[],
    link: Link[],
    address: Address[],

    background_color: string,
    text_color: string,
    button_color: string,

    qrCode?: SafeUrl
}