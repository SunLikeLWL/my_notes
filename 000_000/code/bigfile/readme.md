### 大文件分片上传核心方法


1、在Javascript中，文件file对象是Blob对象的子类，
   Blob对象包含一个重要的方法slice通过这个方法，
   我们就可以对二进制文件进行拆分

2、使用FormData格式进行上传

3、服务端接口接收到数据，通过multiparty库对数据进行处理

4、区分files和fileds，通过fse.move讲上传的文件移动到目标路径下

5、客户端使用Promise.all方法，当监听到所有切片已上传完，
   调用merge接口，通过服务端进行切片合并

6、使用stream对切片边读边写，设置可写的start

7、Promise.all判断所有切片是否写入完毕

### 进度条


使用浏览器XMLHttpRequest的onprogress的方法对进度进行监听

```js

const xhr = new XMLHttpRequest()
xhr.upload.onprogress = onProgress

onProgress =  this.createProgressHandler(this.data[index])

createProgressHandler(item){
    return (e)=>{
        item.percentage = parseInt(String((e.loaded/e.total)*100))
    }
}



```


### 断点续传核心方法


1、通过xhr的 abort 方法，主动放弃当前请
```js
this.requestList.forEach((xhr) => xhr?.abort());
 ```
2、番外篇：断点续传服务端做法


当用户在听一首歌的时候，如果听到一半（网络下载了一半），网络断掉了，用户需要继续听的时候，文件服务器不支持断点的话，则用户需要重新下载这个文件。而Range支持的话，客户端应该记录了之前已经读取的文件范围，网络恢复之后，则向服务器发送读取剩余Range的请求，服务端只需要发送客户端请求的那部分内容，而不用整个文件发送回客户端，以此节省网络带宽。


如果Server支持Range，首先就要告诉客户端，咱支持Range，之后客户端才可能发起带Range的请求。这里套用唐僧的一句话，你不说我怎么知道呢。response.setHeader('Accept-Ranges', 'bytes');


Server通过请求头中的Range: bytes=0-xxx来判断是否是做Range请求，如果这个值存在而且有效，则只发回请求的那部分文件内容，响应的状态码变成206，表示Partial Content，并设置Content-Range。如果无效，则返回416状态码，表明Request Range Not Satisfiable（www.w3.org/Protocols/r… ）。如果不包含Range的请求头，则继续通过常规的方式响应。

```js
getStream(req, res, filepath, fileStat) {
    res.setHeader('Accept-Range', 'bytes'); //告诉客户端服务器支持Range
    let range = req.headers['range'];
    let start = 0;
    let end = fileStat.size;
    if (range) {
        let reg = /bytes=(\d*)-(\d*)/;
        let result = range.match(reg);
        if (result) {
            start = isNaN(result[1]) ? 0 : parseInt(result[1]);
            end = isNaN(result[2]) ? 0 : parseInt(result[2]);
        }
    };
    debug(`start=${start},end=${end}`);
    return fs.createReadStream(filepath, {
        start,
        end
    });
}
```


### 提高

时间切片计算文件hash：计算hash耗时的问题，不仅可以通过web-workder，还可以参考React的Fiber架构，通过requestIdleCallback来利用浏览器的空闲时间计算，也不会卡死主线程

抽样hash：文件hash的计算，是为了判断文件是否存在，进而实现秒传的功能，所以我们可以参考布隆过滤器的理念, 牺牲一点点的识别率来换取时间，比如我们可以抽样算hash

根据文件名 + 文件修改时间 + size 生成hash

网络请求并发控制：大文件由于切片过多，过多的HTTP链接过去，也会把浏览器打挂， 我们可以通过控制异步请求的并发数来解决，这也是头条的一个面试题

慢启动策略：由于文件大小不一，我们每个切片的大小设置成固定的也有点略显笨拙，我们可以参考TCP协议的慢启动策略， 设置一个初始大小，根据上传任务完成的时候，来动态调整下一个切片的大小， 确保文件切片的大小和当前网速匹配

并发重试+报错：并发上传中，报错如何重试，比如每个切片我们允许重试两次，三次再终止

文件碎片清理
 



 ### 网络请求并发控制

 ```js
async sendRequest(forms, max=4) {
  return new Promise(resolve => {
    const len = forms.length;
    let idx = 0;
    let counter = 0;
    const start = async ()=> {
      // 有请求，有通道
      while (idx < len && max > 0) {
        max--; // 占用通道
        console.log(idx, "start");
        const form = forms[idx].form;
        const index = forms[idx].index;
        idx++
        request({
          url: '/upload',
          data: form,
          onProgress: this.createProgresshandler(this.chunks[index]),
          requestList: this.requestList
        }).then(() => {
          max++; // 释放通道
          counter++;
          if (counter === len) {
            resolve();
          } else {
            start();
          }
        });
      }
    }
    start();
  });
}


 ```