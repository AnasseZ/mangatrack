export const getTitle = (title) =>
    title.length > 30
        ? title.substring(0, 30) + "..."
        : title;