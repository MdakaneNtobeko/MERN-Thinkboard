export function formatDate(date){
    return date.toLocaleDateString('en-UK', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}