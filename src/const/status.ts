import { convertDateTime, convertUsFormat } from "./dateFormat"

//  Here change the status in correct formt like pending, completed, in_progress
export const Status = (value: any) => {
    for (let i = 0; i < value.length; i++) {
        if (value[i]?.status?.toLowerCase()?.includes('progress')) {
            value[i].status = 'in_progress'
        } else if (value[i]?.status?.toLowerCase()?.includes('pending')) {
            value[i].status = 'pending'
        } else if (value[i]?.status?.toLowerCase()?.includes('completed')) {
            value[i].status = 'completed'
        } else {
            value[i].status = 'pending'
        }
        const start_date = value[i].start_date;
        value[i].start_date = convertUsFormat(start_date);
        const due_date = value[i].due_date;

        value[i].due_date = convertUsFormat(due_date);

    }
    return value
}

// Once we export that time we need to convert the UST in to normal format

export const displayData = (data:any) =>{
    for(let i =0; i<data.length;i++){
        data[i].start_date = reverseFormat(data[i].start_date);
        data[i].due_date = reverseFormat(data[i].due_date);
    }
    return data;
}
const reverseFormat = (a:any) =>{
   return convertDateTime(a)

}