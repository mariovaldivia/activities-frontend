export function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const day = date.toLocaleString('default', { day: '2-digit' });
  
    return [year, month, day].join('-');
}

export function getDate(dateString){
    let parts = dateString.split('/')
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
}