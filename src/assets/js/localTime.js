const localTime = function(time){
    var stillUtc = this.moment.utc(time).toDate();
    var local = this.moment(stillUtc).local().format("YYYY-MM-DD HH:mm:ss");
    return local
}
    
export default localTime