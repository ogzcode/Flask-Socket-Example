export const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    };

    // Eğer iletişim bugün yapıldıysa sadece saat bilgisini döndür
    if (date.toDateString() === now.toDateString()) {
        return new Intl.DateTimeFormat("en-US", options).format(date);
    } else {
        // Eğer iletişim bugün değilse tarih ve saat bilgisini döndür
        options.year = "numeric";
        options.month = "2-digit";
        options.day = "2-digit";
        return new Intl.DateTimeFormat("en-US", options).format(date);
    }
}