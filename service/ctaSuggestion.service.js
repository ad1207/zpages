import prisma from "../db-config/prisma";
import { bigIntToString } from "../db-config/utils";

export const createCtaSuggestion = async (data) => {
    let result = null;
    try {
        const { key, label } = data;
        result = await prisma.cta_suggestion.create({
            data: {
                cta_key: key,
                cta_label: label
            },
        });
    } catch (error) {
        console.log('createCtaSuggestion error::' + error.message);
    }
    return bigIntToString(result);
};

export const getSuggestionByKey = async (key) => {
    let result = null;
    try {
        result = await prisma.cta_suggestion.findMany({
            where: {
                cta_key: key,
            }
        });
    } catch (error) {
        console.log('getSuggestionByKey error::' + error.message);
    }
    return bigIntToString(result);
};