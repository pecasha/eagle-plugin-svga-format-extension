import SVGA from 'svgaplayerweb';

export interface Options {
    element: string;
}

export const THEME_COLOR = {
    light: ["#f8f9fb", "#e3e5e7", "#a0a1a4", "#323339"],
    lightgray: ["#e2e4e6", "#c6c8c9", "#8b8d8e", "#191d1e"],
    gray: ["#353639", "#2a2b2f", "#707173", "#d7d7d7"],
    dark: ["#242528", "#1d1e21", "#646567", "#d3d3d4"],
    "dark-blue": ["#343848", "#2a2d3b", "#70737e", "#d6d7da"],
    purple: ["#393547", "#2e2a3a", "#73707d", "#d7d7da"]
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
