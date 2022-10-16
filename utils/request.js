import config from '../utils/config'


export default (url,data={},method='GET')=> {
    // 返回promise实例
    return new Promise((resolve, reject) => {
        wx.request({
            url:config.host+url,
            data,
            header:{
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method,
            success:(res)=>{
            //   console.log('成功:',res);
              resolve(res.data)
            },
            fail:(err)=>{
            //   console.log('失败:',err);
              reject(err)
            }
        })
    })
    
}
