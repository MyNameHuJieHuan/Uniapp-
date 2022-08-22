// uniapp在打包5+app时可以使用native.js进行文件的读写以及删除
// 下面以txt文件为例
let dir = '/static/bookTxt';
// #ifdef APP-PLUS
let environment = plus.android.importClass("android.os.Environment");
var sdRoot = environment.getExternalStorageDirectory(); //文件夹根目录
var File = plus.android.importClass("java.io.File");
var BufferedReader = plus.android.importClass("java.io.BufferedReader");
var FileReader = plus.android.importClass("java.io.FileReader");
var FileWriter = plus.android.importClass("java.io.FileWriter");
// #endif
// export const writeFile = function(res) {
//     // #ifdef APP-PLUS
//     // 一行一条文本
//     res = res + '\r\n';
//     console.log(res)
//     try {
//         //不加根目录创建文件(即用相对地址)的话directory.exists()这个判断一值都是false
//         console.log(sdRoot + dir)
//         let directory = new File(sdRoot + dir);
//         if (!directory.exists()) {
//             console.log('创建目录')
//             directory.mkdirs(); //创建目录
//         }
//         let file = new File(sdRoot + pathUrl);
//         console.log(file.exists())
//         if (!file.exists()) {
//             file.createNewFile(); //创建文件
//         }
//         let fos = new FileWriter(sdRoot + pathUrl, true);
//         fos.write(res);
//         fos.close();
//         return true;
//     } catch (e) {
//         console.log(e);
//         return false;
//     }
//     return false;
//     //#endif
// }

export const readFile = function(call,pathUrl) {
    //#ifdef APP-PLUS
    let readFr = new File(sdRoot + pathUrl);
    let txt = '';
    try {
        var reader = new BufferedReader(new FileReader(readFr))
        // 我的需求是读取多行,所以把每行都读出来存在数组里
        let arr = [];
        let txt;
        while ((txt = reader.readLine()) != null) {
            arr.push(txt)
        }
        // 传入回调处理你的业务
        call(arr)
    } catch (e) {
        console.log(e)
        return '';
    }
    //#endif
}

export const deleteFile = function() {
    //#ifdef APP-PLUS
    let file = new File(sdRoot + pathUrl);
    console.log(file.exists())
    console.log(file.isFile())
    if (file.exists() && file.isFile()) {
        return file.delete();
    } else {
        return false;
    }
    //#endif
}