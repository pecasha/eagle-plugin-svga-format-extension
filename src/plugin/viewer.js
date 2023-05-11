const {
    Core,
    THEME_COLOR
} = require("../core/index.ts");

const urlParams = new URLSearchParams(window.location.search);
const filePath = urlParams.get("path");
const theme = urlParams.get("theme");

(async function() {
    const $durationTotal = document.querySelector(".duration-total");
    const $durationCurrent = document.querySelector(".duration-current");
    const $cursor = document.querySelector(".cursor");
    const $btn = document.querySelector(".progress > i");

    document.documentElement.style.setProperty("--theme-bg-color", THEME_COLOR[theme][0]);
    document.documentElement.style.setProperty("--theme-bd-color", THEME_COLOR[theme][1]);
    document.documentElement.style.setProperty("--theme-ct-color", THEME_COLOR[theme][2]);
    document.documentElement.style.setProperty("--theme-ft-color", THEME_COLOR[theme][3]);

    const svga = new Core({
        element: "#player"
    });

    try {
        await svga.loadFile(filePath);
        const frames = svga.svgaFile.frames;
        $durationTotal.innerHTML = frames.toString();
        let current = 0;
        svga.svgaPlayer.onFrame(frame => {
            current = Math.ceil(frame);
            $cursor.style.left = `${current / frames * 100}%`;
            $durationCurrent.innerHTML = current.toString();
        });
        $btn.addEventListener("click", () => {
            if($btn.classList.contains("icon-pause")) {
                svga.svgaPlayer.pauseAnimation();
                $btn.classList.remove("icon-pause");
                $btn.classList.add("icon-play");
            } else {
                svga.svgaPlayer.stepToFrame(current, true);
                $btn.classList.remove("icon-play");
                $btn.classList.add("icon-pause");
            }
        });
    } catch (err) {
        console.error(err);
        const message = err.message || err || "未知错误";
        alert(`SVGA格式扩展插件错误: ${message}`);
        /*eagle.log.error(`SVGA格式扩展插件错误: ${message}`);
        eagle.notification.show({
            title: "错误",
            description: message,
        });*/
    }
})();
