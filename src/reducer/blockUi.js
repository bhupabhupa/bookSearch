import { START_PROCESS, END_PROCESS } from "../action/books";

export default function blockUi(state = false, action) {
    switch (action.type) {
        case START_PROCESS:
            return action.flag
        case END_PROCESS:
            return action.flag    
        default:
            return state
    }
}