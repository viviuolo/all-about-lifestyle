微信小程序名称: All About Lifestyle

运用技术：云函数和数据库功能，对于添加和删除数据库数据建议使用云函数功能。
因为微信小程序数据库会自动添加openid作为用户唯一标识，奉行用户只能更新和删除自己上传的数据，可以使用云函数绕过这个坑。


为生活小白们提供的微信小程序，小白们每次去菜场、水果店都很发愁，想做一个大家共同维护的平台，来给生活小白们一些建议，比如怎么挑水果？什么样的橙子最好吃？

![预览](https://github.com/viviuolo/all-about-lifestyle/tree/master/miniprogram/image/preview/preview1.PNG)

# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

