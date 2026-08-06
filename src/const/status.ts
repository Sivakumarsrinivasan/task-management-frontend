
export const Status = (value: any) => {
    for (let i = 0; i < value.length; i++) {
        if (value[i].status.toLowerCase().includes('progress')) {
            value[i].status = 'in_progress'
        } else if (value[i].status.toLowerCase().includes('pending')) {
            value[i].status = 'pending'
        } else if (value[i].status.toLowerCase().includes('completed')) {
            value[i].status = 'completed'
        } else {
            value[i].status = 'pending'
        }
        const start_date = new Date(value[i].start_date);
        value[i].start_date = format(start_date);
        const due_date = new Date(value[i].due_date);

        value[i].due_date = format(due_date);

    }
    return value
}

const format = (date: any) => {

    let date1 = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:00`;
    return date1;
}

export const displayData = (data:any) =>{
    for(let i =0; i<data.length;i++){
        data[i].start_date = reverseFormat(data[i].start_date);
        data[i].due_date = reverseFormat(data[i].due_date);
    }
    return data;
}
const reverseFormat = (a:any) =>{
   return a.split('T')[0] + ' ' + a.split('T')[1].split('.')[0]

}