import SVGA from 'svgaplayerweb';

export interface Options {
    element: string;
}

export const THEME_COLOR = {
    light: ["#f8f8f9", "#dfdfe0", "#888a95", "#2c2f32"],
    lightgray: ["#dddee1", "#c7c7ca", "#6e8086", "#2c2f32"],
    gray: ["#3b3c40", "#515255", "#94969c", "#f8f9fb"],
    dark: ["#1f2023", "#363739", "#767b8a", "#f8f9fb"],
    blue: ["#151d36", "#2c344b", "#40475d", "#f8f9fb"],
    purple: ["#231b2b", "#393240", "#7a748e", "#f8f9fb"]
}

export class Core {
    #options = {} as Options;

    #loaded = false;

    #player = {} as SVGA.Player;

    #parse = {} as SVGA.Parser;
    #file = {} as SVGA.VideoEntity;

    public get loaded() {
        return this.#loaded;
    }

    public get svgaPlayer() {
        return this.#player;
    }
    public get svgaParse() {
        return this.#parse;
    }
    public get svgaFile() {
        return this.#file;
    }

    constructor(options: Options) {
        this.#options = options;
    }

    public async loadFile(fileUrl: string) {
        this.#player = new SVGA.Player(this.#options.element);
        this.#parse = new SVGA.Parser();
        this.#file = await new Promise<SVGA.VideoEntity>((resolve, reject) => {
            this.#parse.load(fileUrl, resolve, reject);
        });
        this.#player.setVideoItem(this.#file);
        this.#player.startAnimation();
        this.#loaded = true;
    }

    public getSize() {
        return this.#file.videoSize;
    }
}
