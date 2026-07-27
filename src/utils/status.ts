export const getStatusColor = (status: 'pending' | 'in_progress' | 'completed') =>{
switch(status){
    case 'pending':
        return "bg-yellow-100 text-yellow-700";
    case 'in_progress':
        return "bg-blue-100 text-blue-700"
    case "completed":
        return "bg-green-100 text-green-700"
    default:
        return "bg-gray-100 text-gray-700";
}
}