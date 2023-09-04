import { Action } from "./actions";

export const WAIT_ACTION: Action = {
    label: 'Wait',
    img: '/waiting.png',
    perform: () => {},
    precondition: () => true
}