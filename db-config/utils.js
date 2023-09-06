

export const bigIntToString = (data) => {
	const result = JSON.stringify(data, (key, value) => (typeof value === 'bigint' ? value.toString() : value));
	return JSON.parse(result);
};

export const smartTrim = (str, length, delim, appendix) => {
	if (str.length <= length) return str;

	var trimmedStr = str.substr(0, length + delim.length);

	var lastDelimIndex = trimmedStr.lastIndexOf(delim);
	if (lastDelimIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimIndex);

	if (trimmedStr) trimmedStr += appendix;
	return trimmedStr;
};

// export const encryptPassword = async (password) => {
// 	try {
// 		const hashedPassword = await bcrypt.hash(password, 10);

// 		return hashedPassword;
// 	} catch (errors) {}
// };