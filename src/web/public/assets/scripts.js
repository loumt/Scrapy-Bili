$(function() {
    // Side Bar Toggle
    $('.hide-sidebar').click(function() {
	  $('#sidebar').hide('fast', function() {
	  	$('#content').removeClass('span9');
	  	$('#content').addClass('span12');
	  	$('.hide-sidebar').hide();
	  	$('.show-sidebar').show();
	  });
	});

	$('.show-sidebar').click(function() {
		$('#content').removeClass('span12');
	   	$('#content').addClass('span9');
	   	$('.show-sidebar').hide();
	   	$('.hide-sidebar').show();
	  	$('#sidebar').show('fast');
	});

  initNavigation();
});


function initNavigation(){
  $.ajax({
    type : "get",
    contentType: "application/json;charset=UTF-8",
    url : "/navigation",
    success : function(result) {
      $(".up-nav").text(result.upCount)
      $(".up-attention-nav").text(result.upAttentionCount)
      $(".cartoon-attention-nav").text(result.cartoonAttentionCount)
    },
    //请求失败，包含具体的错误信息
    error : function(e){
      console.log(e.status);
    }
  });
}

function convertUTCTimeToLocalTime(UTCDateString) {
  if(!UTCDateString){
    return '-';
  }
  function formatFunc(str) {    //格式化显示
    return str > 9 ? str : '0' + str
  }
  var date2 = new Date(UTCDateString);     //这步是关键
  var year = date2.getFullYear();
  var mon = formatFunc(date2.getMonth() + 1);
  var day = formatFunc(date2.getDate());
  var hour = date2.getHours();
  var noon = hour >= 12 ? 'PM' : 'AM';
  hour = hour>=12?hour-12:hour;
  hour = formatFunc(hour);
  var min = formatFunc(date2.getMinutes());
  var dateStr = year+'-'+mon+'-'+day+' '+noon +' '+hour+':'+min;
  return dateStr;
}


function utc2beijing(utc_datetime) {
  // 转为正常的时间格式 年-月-日 时:分:秒
  var T_pos = utc_datetime.indexOf('T');
  var Z_pos = utc_datetime.indexOf('Z');
  var year_month_day = utc_datetime.substr(0,T_pos);
  var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
  var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

  // 处理成为时间戳
  timestamp = new Date(Date.parse(new_datetime));
  timestamp = timestamp.getTime();
  timestamp = timestamp/1000;

  // 增加8个小时，北京时间比utc时间多八个时区
  var timestamp = timestamp+8*60*60;

  // 时间戳转为时间
  var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  return beijing_datetime; // 2017-03-31 16:02:06
}
