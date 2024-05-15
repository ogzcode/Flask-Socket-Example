export const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    };

    if (date.toLocaleDateString() === now.toLocaleDateString()) {
        return new Intl.DateTimeFormat("en-US", options).format(date);
    } else {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year} ${new Intl.DateTimeFormat("en-US", options).format(date)}`;
    }
}