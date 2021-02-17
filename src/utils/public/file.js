/*
 * @Author: daiwei
 * @since: 2020-06-05 18:24:38
 * @lastTime: 2020-06-05 18:24:39
 * @LastAuthor: Do not edit
 * @FilePath: /ifiregas_web/src/utils/public/file.ts
 * @message:
 */
//下载 兼容
/**
 * 导出 excel 文件
 * @param {File || Blob} file 文件
 * @param {String} fname 下载的文件名
 */
export function exportExcel(file, fname) {
    if (!fname) {
        fname = '导出列表';
    }
    let fileName = fname + "-" + new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + ".xlsx";
    let blobObject = new File([file], fileName, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //是IE浏览器
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        window.navigator.msSaveOrOpenBlob(blobObject, fileName);
    }
    else { //火狐谷歌都兼容
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = URL.createObjectURL(blobObject);
        a.download = fileName;
        window.parent.document.body.appendChild(a);
        a.click();
        window.parent.document.body.removeChild(a);
    }
}