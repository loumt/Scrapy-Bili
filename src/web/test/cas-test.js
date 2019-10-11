const axios = require('axios')

let instance = axios.create();


axios({
  method: "POST",
  url: "http://192.168.12.21:9090/file-mgr/file/search",
  header: {
    "Cookie": "CASTGT=TGT-45-VvBgDD3cXqWB7GoFbBSOCurwu0PNGZRO9zKNjXnmoNhd6tZmVb-cas.sanlogic.com"
  },
  Accept: "application/json",
  data: {
    workspaceId: "1",
    asFile: false,
    discard: false,
    page: 1,
    rows: 999
  }
}).then(function(res){
  console.log(res.data)
}).catch(function(err){
  console.log(err)
})