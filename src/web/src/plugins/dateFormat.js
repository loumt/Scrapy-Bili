
function dateFormat(row, column, cellValue, index){

  const daterc = column ? row[column.property] : row

  function formatFunc(str) {    //格式化显示
    return str > 9 ? str : '0' + str
  }
  var date2 = new Date(daterc);     //这步是关键
  var year = date2.getFullYear();
  var mon = formatFunc(date2.getMonth() + 1);
  var day = formatFunc(date2.getDate());
  var hour = date2.getHours();
  var seconds = formatFunc(date2.getSeconds());
  hour = formatFunc(hour);
  var min = formatFunc(date2.getMinutes());
  var dateStr = year+'-'+mon+'-'+day +' '+hour+':'+min + ':' + seconds;

  return dateStr;
}

export default dateFormat;
