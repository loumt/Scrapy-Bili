# jGrowl 
jGrowl is a jQuery plugin that raises unobtrusive messages within the browser, similar to the way that OS X's Growl Framework works. The idea is simple, deliver notifications to the end user in a noticeable way that doesn't obstruct the work flow and yet keeps the user informed.

## Example usages
	// Sample 1 提示后自动消息
	$.jGrowl("Hello world!");
	// Sample 2 需要用户手动关闭
	$.jGrowl("Stick this!", { sticky: true });
	// Sample 3 增加标题
	$.jGrowl("A message with a header", { header: 'Important' });
	// Sample 4 指定在10秒后自动消失
	$.jGrowl("A message that will live a little longer.", { life: 10000 });
	// Sample 5 消失后有回调事件
	$.jGrowl("A message with a beforeOpen callback and a different opening animation.", {
		beforeClose: function(e,m) {
			alert('About to close this notification!');
		},
		animateOpen: {
			height: 'show'
		}
	});

