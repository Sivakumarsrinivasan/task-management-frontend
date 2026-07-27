export const capitalize = (val:string) =>{
  return val[0].toUpperCase() + val.slice(1)
}

export const truncate = (str:string, length:number) =>{
if(str.length <= length) return str;
return str.substring(0,length) + '....'
}