import axios from "axios";

export const getDefinition = async (word) => {
    let result = null;
    let issue = { "title": "No Definitions Found", "message": "Sorry pal, we couldn't find definitions for the word you were looking for.", "resolution": "You can try the search again at later time or head to the web instead." }
    console.log("get definition method call", word)
    try {
        let temp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        console.log("Check result--->1", temp.data)
        result = temp.data
    } catch (error) {
        console.log('dictionary api issue' + error.message);
        result = issue;
    }
    return result;
};