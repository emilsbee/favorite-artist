// Internal imports
import {Album} from "./albumSlice";

/**
 * Sorts albums by name.
 */
export const compareName = (a:Album, b:Album):number => {
    if ( a.name < b.name ){
        return -1;
    }
    if ( a.name > b.name ){
        return 1;
    }
    return 0;
}

/**
 * Sorts albums by popularity.
 */
export const comparePopularity = (a:Album, b:Album):number => {
    if (a.popularity < b.popularity) return -1;
    if (b.popularity < a.popularity) return 1;

    return 0;
}

/**
 * Sorts albums by year.
 */
export const compareYear= (a:Album, b:Album):number => {
    const aDate = parseInt(a.date)
    const bDate = parseInt(b.date)

    if (aDate && bDate) {
        if (aDate < bDate) return 1;
        if (bDate < aDate) return -1;
    }

    return 0;
}