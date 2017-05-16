
const formatDate = (date) => {
    var mm =date.getMonth() + 1;
    var dd =  date.getDate();
    mm = mm<10 ? '0'+mm:mm;
    dd = dd<10 ? '0'+dd:dd;
    return ""+date.getFullYear() +""+ mm+"" + dd;
};
export default  formatDate;
