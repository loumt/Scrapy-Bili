/**
 * 1.页面中加入 <div class="pagination" style="text-align: right;"></div>
 * 2.js域中加入pageJson对象,定义page属性，为当前页数,定义limit,为每页数据大小
 * 2.js域中定义initTable函数,为初始表格的函数
 * 3.initTable 获取数据后初始化后调用buildPagination(pageJson.page, pageJson.limit, result.count);  page属性，为当前页数,limit,为每页数据大小，count为总量
 * @param page
 * @param limit
 * @param total
 * @return {*}
 */


function buildPagination(page, limit, total) {
  let totalPage = Math.ceil(total / limit);
  let pagination = $('.pagination').empty();

  if (page === 1 && totalPage === 1) {
    return pagination.append('<ul><li class="active"><a href="javascript:toPage(' + page + ');">' + page + '</a></li></ul>')
  }
  if (page === 1 && totalPage === 2) {
    return pagination.append('<ul><li class="active"><a href="javascript:toPage(' + page + ');">' + page + '</a></li><li><a href="javascript:toPage(2);">2</a></li><li><a href="javascript:toAddPage()">下一页</a></li></ul>')
  }
  if (page === 1 && totalPage === 3) {
    return pagination.append('<ul><li class="active"><a href="javascript:toPage(' + page + ');">' + page + '</a></li><li><a href="javascript:toPage(2);">2</a></li></li><li><a href="javascript:toPage(3);">3</a></li><li><a href="javascript:toAddPage()">下一页</a></li></ul>')
  }
  if (page === 2 && totalPage === 2) {
    return pagination.append('<ul><li><a href="javascript:toReducePage()">上一页</a></li><li><a href="javascript:toPage(1);">1</a></li><li class="active"><a href="javascript:toPage(' + page + ');">' + page + '</a></li></ul>')
  }
  if (page === 2 && totalPage === 3) {
    return pagination.append('<ul><li><a href="javascript:toReducePage()">上一页</a></li><li><a href="javascript:toPage(1);">1</a></li><li class="active"><a href="javascript:toPage(' + page + ');">' + page + '</a></li><li><a href="javascript:toAddPage()">下一页</a></li></ul>')
  }

  if (page === 1 && totalPage > 3) {
    return pagination.append('<ul><li class="active"><a href="javascript:toPage(1);">1</a></li><li><a href="javascript:toPage(2);">2</a></li><li><a href="javascript:toPage(3);">3</a></li><li><a href="javascript:toAddPage()">下一页</a></li></ul>')
  }
  if (page === 2 && totalPage > 3) {
    return pagination.append('<ul><li><a href="javascript:toReducePage()">上一页</a></li><li><a href="javascript:toPage(1);">1</a></li><li class="active"><a href="javascript:toPage(2);">2</a></li><li><a href="javascript:toPage(3);">3</a></li><li><a href="javascript:toAddPage()">下一页</a></li></ul>')
  }

  if (totalPage > 3 && (totalPage - page) > 0 ) {
    return pagination.append('<ul><li><a href="javascript:toReducePage()">上一页</a></li><li><a href="javascript:toPage(' + (page - 1) + ');">' + (page - 1) + '</a></li><li class="active"><a href="javascript:toPage(' + page + ');">' + page + '</a></li><li><a href="javascript:toPage(' + (page + 1) + ');">' + (page + 1) + '</a></li><li><a href="javascript:toAddPage()">下一页</a></li></ul>')
  }

  if (totalPage > 3 && totalPage === page) {
    return pagination.append('<ul><li><a href="javascript:toReducePage()">上一页</a></li><li><a href="javascript:toPage(' + (page - 2) + ');">' + (page - 2) + '</a></li><li><a href="javascript:toPage(' + (page - 1) + ');">' + (page - 1) + '</a></li><li class="active"><a href="javascript:toPage(' + page + ');">' + page + '</a></li></ul>')
  }

}


function toPage(page) {
  pageJson.page = page;
  initTable();
}

function toAddPage() {
  pageJson.page = pageJson.page +  1;
  initTable();
}

function toReducePage() {
  pageJson.page = pageJson.page - 1;
  initTable();
}