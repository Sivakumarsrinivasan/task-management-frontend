
export function useUserCustomHooks(){

    const errorValidator = (arr:any[]) =>{
      let error = [];
      let errorDetail = {title:'', columnName:''}
      for(let i = 0; i<arr.length;i++){
         let check = Object.entries(arr[i]).filter((val)=>val[1]=='');
         if(check.length>0){
            console.log(check);
            errorDetail = {...errorDetail,title:arr[i].title,columnName:check[0][0]}
            error.push(errorDetail)
         }
      }
      return error;
    }
    return {errorValidator}

}