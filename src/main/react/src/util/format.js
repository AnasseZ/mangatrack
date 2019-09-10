export const getTitle = title => getReducedText(title, 30);

export const getDescription = description => getReducedText(description, 250);

const getReducedText = (text, length) => text.length > length
    ? text.substring(0, length) + "..."
    : text;