/**
 * GitHub document {@link https://github.com/bbinmkt/loader-plugin}
 */

type TStatus = 'load'|'error'|'fail'|'success';
type TPath = null|string;
type TCurrentFile = null|string;
type TImageExtension = 'gif'|'png'|'bmp'|'jpg'|'jpeg'|'tif'|'tiff'|'webp'|'tga'|'svg'|'svg+xml'

interface IFile {
    status: boolean,
    filename: string,
    url: string,
    filetype: string
}

interface IData {
    [key: string]: IFile
}

interface IReport {
    status: boolean, // 載入狀態
    total: number, // 檔案數量 (成功 + 失敗)
    success: number, // 檔案數量 (成功)
    fail: number, // 檔案數量 (失敗)
    failData: IData, // 檔案資料 (失敗)
    progress: number, // 進度百分比
    duration: number // 耗時
}

class Loader {
    data: IData;
    path: TPath;
    currentFile: TCurrentFile;
    report: IReport;

    constructor() {
        this.data = {}; // 檔案資料 (成功 + 失敗)
        this.path = null; // store.js 產生的 path
        this.currentFile = null; // 當前正在載入檔案

        // 載入報告
        this.report = {
            status: false, // 載入狀態
            total: 2, // 檔案數量 (成功 + 失敗)
            success: 0, // 檔案數量 (成功)
            fail: 0, // 檔案數量 (失敗)
            failData: {}, // 檔案資料 (失敗)
            progress: 1, // 進度百分比
            duration: 0 // 耗時
        };
    }

    /**
     * @description 更新載入報告控制器
     * @param { string } fileKeyName 檔案名稱
     * @param { number } startTime 載入開始時間
     * @param { string } status 載入狀態 - 成功 (load) / 失敗 (error) - 預設為 (error)
     */
    updateReportHandler(fileKeyName: string, startTime: number, status:TStatus = 'error') {
        const { data } = this;

        // 更新載入狀態 > 更新數量 > 更新載入進度 > 儲存失敗檔案
        data[fileKeyName].status = status !== 'error';
        this.report[status === 'error' ? 'fail' : 'success'] += 1;
        this.report.progress = ((this.report.success + this.report.fail) / this.report.total) * 100;
        if (status === 'error') this.report.failData[fileKeyName] = data[fileKeyName];

        // 獲取當前時間 > 更新時間
        const endTime = new Date().getTime();
        this.report.duration = (endTime - startTime) / 1000;
    }

    /**
     * @description Promise 回傳控制器 + 將載入狀態改變為完成
     * @return 載入作業完成 > 回傳物件
     */
    promiseHandler() {
        this.report.status = true;

        return {
            status: true,
            duration: this.report.duration,
            progress: this.report.progress,
            total: this.report.total,
            success: this.report.success,
            fail: this.report.fail,
            failData: this.report.failData
        };
    }

    /**
     * @description 檔案載入 - 失敗 > 執行
     * @param { string } fileKeyName 檔案名稱
     * @param { number } startTime 開始時間
     */
    onErrorHandler(fileKeyName: string, startTime: number) {
        this.currentFile = fileKeyName;
        // 更新 report
        this.updateReportHandler(fileKeyName, startTime);
    }

    /**
     * @description 檔案載入 - 成功 > 執行
     * @param { string } fileKeyName 檔案名稱
     * @param { number } startTime 開始時間
     */
    onLoadHandler(fileKeyName: string, startTime: number) {
        this.currentFile = fileKeyName;
        // 更新 report
        this.updateReportHandler(fileKeyName, startTime, 'load');
    }

    /**
     * @description 檔案檔案產生器
     * @param { string } path 從 store 內獲取
     * @param { string } ImgVer 從 store 內獲取
     * @param { array } files 包含副檔名的圖檔陣列
     * @return 圖檔物件
     */
    generator(files: string[], path: TPath = null) {
        const filesArr = files;
        const fileObj: IData = {};

        this.path = path;

        for (let i = 0; i < filesArr.length; i += 1) {
            const filename = filesArr[i];

            fileObj[filename] = {
                status: false,
                filename,
                filetype: filename.split('.').pop() || '',
                url: path ? `${path}/${filename}` : filename
            };
        }

        this.assemble(fileObj);

        return fileObj;
    }

    /**
     * @description 圖檔物件組裝器
     * @param { object } loadingFile 圖檔物件
     */
    assemble(loadingFiles: IData) {
        this.data = {
            ...this.data,
            ...loadingFiles
        };
        return this.data;
    }

    /**
     * @description 檔案載入器
     * @param { object } loadingFile 圖檔物件
     * @return Promise
     */
    load(loadingFile: IData) {
        const { Date, Object, Promise, Image } = window;
        const startTime = new Date().getTime();
        const ObjectKeysArr = Object.keys(loadingFile);

        // 圖片格式接受列表
        const imageFileMap: TImageExtension[] = ['gif', 'png', 'bmp', 'jpg', 'jpeg', 'tif', 'tiff', 'webp', 'tga', 'svg', 'svg+xml'];

        this.report.total = ObjectKeysArr.length;

        return new Promise((resolve, reject) => {
            // 載入完成後要執行的下一步
            const returnPromise = () => {
                const result = this.promiseHandler();

                if (this.report.success === this.report.total) resolve(result);
                else if (this.report.success !== this.report.total) reject(result);
            };

            for (let i = 0; i < ObjectKeysArr.length; i += 1) {
                const { filetype, url } = loadingFile[ObjectKeysArr[i]];

                if (imageFileMap.indexOf(filetype as TImageExtension) !== -1) {
                    const image = new Image();
                    image.src = url;

                    image.onerror = () => {
                        this.onErrorHandler(ObjectKeysArr[i], startTime);
                        if ((this.report.success + this.report.fail) === this.report.total) {
                            setTimeout(() => { returnPromise(); }, 0);
                        }
                    };
                    image.onload = () => {
                        this.onLoadHandler(ObjectKeysArr[i], startTime);
                        if ((this.report.success + this.report.fail) === this.report.total) {
                            setTimeout(() => { returnPromise(); }, 0);
                        }
                    };
                } else {
                    const request = new XMLHttpRequest();
                    request.open('GET', url, true);
                    request.responseType = 'arraybuffer';

                    request.onerror = () => {
                        this.onErrorHandler(ObjectKeysArr[i], startTime);
                        if ((this.report.success + this.report.fail) === this.report.total) {
                            setTimeout(() => { returnPromise(); }, 0);
                        }
                    };
                    request.onload = () => {
                        this.onLoadHandler(ObjectKeysArr[i], startTime);
                        if ((this.report.success + this.report.fail) === this.report.total) {
                            setTimeout(() => { returnPromise(); }, 0);
                        }
                    };

                    request.send();
                }
            }
        });
    }

    /**
     * @description 檔案二次載入器
     * @return Promise
     */
    reload() {
        const failDataCopied = this.report.failData;
        const { Date, Object, Promise, Image } = window;
        const startTime = new Date().getTime();
        const ObjectKeysArr = Object.keys(failDataCopied);

        // 重置失敗檔案
        this.report.fail = 0;
        this.report.failData = {};

        return new Promise((resolve, reject) => {
            // 載入完成後要執行的下一步
            const returnPromise = () => {
                const result = this.promiseHandler();

                if (this.report.success === this.report.total) resolve(result);
                else if (this.report.success !== this.report.total) reject(result);
            };

            for (let i = 0; i < ObjectKeysArr.length; i += 1) {
                const image = new Image();

                image.src = failDataCopied[ObjectKeysArr[i]].url;
                image.onerror = () => {
                    this.onErrorHandler(ObjectKeysArr[i], startTime);
                    if ((this.report.success + this.report.fail) === this.report.total) {
                        setTimeout(() => { returnPromise(); }, 0);
                    }
                };
                image.onload = () => {
                    this.onLoadHandler(ObjectKeysArr[i], startTime);
                    if ((this.report.success + this.report.fail) === this.report.total) {
                        setTimeout(() => { returnPromise(); }, 0);
                    }
                };
            }
        });
    }
}

export { Loader as default };
export { Loader };
