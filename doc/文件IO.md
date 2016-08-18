# 文件IO

### 文件系统常量

#### 本地文件系统常量（Number类型）
- **plus.io.PRIVATE_WWW**: 应用运行资源目录常量
固定值1，应用运行资源目录，仅本应用可访问。 为了确保应用资源的安全性，此目录只可读。
- **plus.io.PRIVATE_DOC**: 应用私有文档目录常量
固定值2，应用私有文档目录，仅本应用可读写。
- **plus.io.PUBLIC_DOCUMENTS**: 程序公用文档目录常量
固定值3，程序公用文档目录，所有应用可读写。
- **PUBLIC_DOWNLOADS**: 程序公用下载目录常量
固定值4，程序公用下载目录，所有应用可读写。

### 文件路径

#### RelativeURL（相对路径URL）
- **"_www"**: (DOMString 类型 )应用资源目录
保存应用的所有html、css、js等资源文件，与文件系统中根目录PRIVATE_WWW一致，后面加相对路径如“_www/res/icon.png”。 注意：应用资源目录是只读目录，只能读取次目录下的文件，不能修改或新建。
- **"_doc"**: (DOMString 类型 )应用私有文档目录
用于保存应用运行期业务逻辑数据，与文件系统中根目录PRIVATE_DOCUMENTS，如“_doc/userdata.xml”。
- **"_documents"**: (DOMString 类型 )程序公用文档目录
用于保存程序中各应用间可共享文件的目录，与文件系统中根目录PUBLIC_DOCUMENTS，如“_document/share.doc”。
- **"_downloads"**: (DOMString 类型 )程序公用下载目录 
用于保存程序下载文件的目录，与文件系统中根目录PUBLIC_DOWNLOADS，如“_download/mydoc.doc”。

#### LocalURL（本地路径URL）
可在html页面中直接访问本地资源，以“file:///”开头，后面跟随系统的绝对路径。 如示例：“file:///D:/res/hello.html”。

#### RemoteURL（网络路径URL）
可在html页面中以网络资源模式访问本地资源，以“http://”开头，后面跟随相对路径。 如示例：“http://localhost:13131/_www/res/icon.png”，其中“_www”字段可支持类型与相对路径URL一致。

#### 平台绝对路径
绝对路径符合各平台文件路径格式，通常用于Native.JS调用系统原生文件操作API，也可以在前面添加“file://”后在html页面中直接使用。

### 文件路径转换
> **convertLocalFileSystemURL**： 将本地URL路径转换成平台绝对路径
```
String plus.io.convertLocalFileSystemURL(url);
```
**参数**：url: ( String ) 必选 要转换的文件或目录URL地址
URL地址必须是合法的路径，如果地址不合法则返回null。
**返回值**：String : 转换后在平台路径，在不同平台或者不同设备返回的值可能存在差异，如输入url为“_doc/a.png”： 
- Android平台转换后的路径为“/storage/sdcard0/Android/data/io.dcloud.HBuilder/.HBuilder/apps/HBuilder/doc/ａ.png”； 
- 在iOS平台转换后的路径为“/var/mobile/Containers/Data/Application/757966CF-345C-4348-B07F-EEF83CF9A369/Library/Pandora/apps/HBuilder/doc/a.png”。

> **convertAbsoluteFileSystem**：将平台绝对路径转换成本地相对路径URL
```
String plus.io.convertAbsoluteFileSystem(path);
```
**参数**：path: ( String ) 必选 要转换的平台绝对路径，绝对路径必须是合法的路径，如果绝对路径不合法则返回null。
**返回值**：DOMString : 转换后本地相对路径URL

> **toURL**： 获取目录路径转换为URL地址
```
DOMString entry.toURL();
```
**返回值**：DOMString : 格式为相对路径URL

> **toLocalURL**： 获取目录路径转换为本地路径URL地址
```
DOMString entry.toLocalURL();
```
**返回值**：DOMString : 格式为本地路径URL

> **toRemoteURL**： 获取目录路径转换为网络路径URL地址
```
DOMString entry.toRemoteURL();
```
**返回值**：URL地址格式为以“http://localhost:13131/”开头的网络路径。

我们可以通过**系统平台绝对路径**和**系统（目录/文件）对象**实现路径之间的转换，由此可以分别得到**RelativeURL**、**LocalURL**、**RemoteURL**，同时这里需要指出的是我们经常需要对路径进行拼接，我们必须转换成**系统平台绝对路径**进行拼接后才能转换。

### 系统对象

#### 获取（目录/文件）对象的方法
> **requestFileSystem**：请求本地文件系统对象
```
void plus.io.requestFileSystem(type, succesCB, errorCB);
```
获取指定的文件系统，可通过type指定获取文件系统的类型。 获取指定的文件系统对象成功通过succesCB回调返回，失败则通过errorCB返回。

**参数**：
- type: ( Number ) 必选 本地文件系统常量，可取plus.io下的常量，如plus.io.PRIVATE_DOC、plus.io.PUBLIC_DOCUMENTS等。
- succesCB: ( FileSystemSuccessCallback ) 必选 请求文件系统成功的回调
- errorCB: ( FileErrorCallback ) 可选 请求文件系统失败的回调

> **resolveLocalFileSystemURL**：通过URL参数获取目录对象或文件对象
```
void plus.io.resolveLocalFileSystemURL(url, succesCB, errorCB);
```
快速获取指定的目录或文件操作对象，如通过URL值“_www/test.html”可直接获取文件操作对象。 url值可支持相对路径URL、本地路径URL、网络路径URL(http://localhost:13131/开头)。 获取指定的文件或目录操作对象成功通过succesCB回调返回，如果指定URL路径或文件不存在则失败通过errorCB回调返回。

**参数***：
- url : ( DOMString ) 必选 要操作文件或目录的URL地址
- succesCB: ( FileResolveSuccessCallback ) 必选 获取操作文件或目录对象成功的回调函数
- errorCB: ( FileErrorCallback ) 可选 获取操作文件或目录对象失败的回调函数

#### （目录/文件）对象的属性和方法
> [DirectoryEntry](http://www.html5plus.org/doc/zh_cn/io.html#plus.io.DirectoryEntry)： 文件系统中的目录对象，用于管理特定的本地目录

**属性**：
- isFile: 操作对象的是否为文件，DirectoryEntry对象固定其值为false
- isDirectory: 操作对象是否为目录，DirectoryEntry对象固定其值为true
- name: 目录操作对象的名称，不包括路径
- fullPath: 目录操作对象的完整路径，文件系统的绝对路径
- fileSystem: 文件操作对象所属的文件系统对象，参考FileSystem

**方法**：
- getMetadata: 获取目录的属性
- moveTo: 移动目录
- copyTo: 拷贝目录
- toURL: 获取目录路径转换为URL地址
- toLocalURL: 获取目录路径转换为本地路径URL地址
- toRemoteURL: 获取目录路径转换为网络路径URL地址
- remove: 删除目录
- getParent: 获取目录所属的父目录
- createReader: 创建目录读取对象
- getDirectory: 创建或打开子目录
- getFile: 创建或打开文件
- removeRecursively: 递归删除目录

> [FileEntry](http://www.html5plus.org/doc/zh_cn/io.html#plus.io.FileEntry)：文件系统中的文件对象，用于管理特定的本地文件

**属性**：
- isFile: 文件操作对象的是否为文件，FileEntry对象固定其值为true
- isDirectory: 文件操作对象是否为目录，FileEntry对象固定其值为false
- name: 文件操作对象的名称，不包括路径
- fullPath: 文件操作对象的完整路径，文件系统的绝对路径
- fileSystem: 文件操作对象所属的文件系统对象，参考FileSystem

**方法**：
- getMetadata: 获取文件的属性信息
- moveTo: 移动文件
- copyTo: 拷贝文件
- toURL: 获取文件路径转换为URL地址
- toLocalURL: 获取文件路径转换为本地路径URL地址
- toRemoteURL: 获取文件路径转换为网络路径URL地址
- remove: 删除文件
- getParent: 获取文件所属的父目录
- createWriter: 获取文件关联的写文件操作对象FileWriter
- file: 获取文件数据对象


