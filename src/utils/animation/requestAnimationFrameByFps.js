/**
 * @description
 * 使用 requestAnimationFrame 進行巡訪請求
 * 可以避免使用 setInterval 時，使用者跳離該分頁時會停止尋訪的問題
 *
 * @param {Function} callback 要執行的方法
 * @param {number} freq 執行週期
 */
const requestAnimationFrameByFps = (callback = () => {}, freq) => {
    const stop = false;
    let now;
    let then;
    let elapsed;

    function animate() {
        if (stop) return;

        // request another frame
        requestAnimationFrame(animate);

        // calc elapsed time since last loop
        now = Date.now();
        elapsed = now - then;

        // if enough time has elapsed, draw the next frame
        if (elapsed > freq) {
            // Get ready for next frame by setting then=now, but...
            // Also, adjust for fpsInterval not being multiple of 16.67
            then = now - (elapsed % freq);
            callback();
        }
    }

    then = Date.now();
    animate();
};

export { requestAnimationFrameByFps };
export { requestAnimationFrameByFps as default };
