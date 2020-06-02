// Copyright 2020 the Denovamon authors. All rights reserved. MIT license.
import { Iro } from "./deps.ts";

export enum EStd {
    "inherit",
    "piped",
    "null"
}

export enum EOs {
    "win",
    "linux",
    "mac"
}

export interface IOptions {
    path: string;
    command: string;
    throttle?: number;
    stdout?: string|EStd;
    stderr?: string|EStd;
    clearOnRestart?: boolean;
    os?: string|EOs;
    ignore?: Array<string>;
}

export class Denovamon {
    private process: Deno.Process|null = null;
    private path: string|null = null;
    private command: string|null = null;
    private timeout: number|null = null;
    private throttle: number = 500;
    private stdout: string|EStd = "inherit";
    private stderr: string|EStd = "inherit";
    private clearOnRestart: boolean = false;
    private os: string|EOs = "linux";
    private ignore: Array<string> = [];

    /**
     * Create denovamon
     * 
     * @param options 
     */
    constructor(options?: IOptions) {
        this.path = options?.path ?? Deno.cwd();
        this.command = options?.command ?? "deno run app.ts";
        this.stderr = options?.stderr ?? "inherit";
        this.stdout = options?.stdout ?? "inherit";
        this.throttle = options?.throttle ?? 500;
        this.clearOnRestart = options?.clearOnRestart ?? false;
        this.os = options?.os ?? "linux";
        this.ignore = options?.ignore ?? [];
    }

    /**
     * Run denovamon for watching
     */
    public async run() {
        this.log("A Module for watcher Every File Changes.");
        this.log(`Watching start in : ${this.path}`);
        if (this.ignore.length > 0) this.log(`Ignored for : ${this.ignore.join(" | ")}`);
        await this.startProcess();
        await this.watching();
    }

    /**
     * watch every file change
     */
    private async watching() {
        for await (const event of Deno.watchFs(this.path ?? '.')) {
            if (event.kind !== "access") {
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(() => this.restartProcess(event), this.throttle);
            }
        }
    }

    /**
     * start proccess - run a command
     */
    private startProcess() {
        this.log(`Run command "${this.command}"`);
        const removeTrailingLineBreak = (str: string) => {
            return str.replace(/\n$/, '')
        }
        
        let cmd = this.command ?? '';
        let opts: Deno.RunOptions = {
            cmd: cmd.split(' ')
        };
        opts.stdout = 'inherit';
        opts.stderr = 'inherit';
        return Deno.run(opts);
    }

    /**
     * start proccess - run a command
     */
    private async restartProcess(event: Deno.FsEvent) {
        // ignoring
        // check ignored
        for(let index in this.ignore) {
            let ign = this.ignore[index];
            let changes = event.paths;
            let detectIgnored = changes.filter((e:any) => {
                let reg = new RegExp(`/${ign}`);
                return (reg.test(e));
            });

            // ignoring
            if (detectIgnored.length > 0) return
        }

        // restart
        if (this.clearOnRestart) {
            let proc: Deno.Process|null = null;
            if (this.os == 'win') {
                proc = await Deno.run({cmd: ["cls"]});
            } else {
                proc = await Deno.run({cmd: ["clear"]});
            }
            await proc;
        }
        await setTimeout(async () => {
            this.log(`File change detected, restarting...`);
            this.process && await this.process.close();
            this.process = this.startProcess();
        }, this.throttle);
    }


    /**
     * logging
     */
    private log(text: string) {
        console.log(
            Iro.default(`[Denovamon] ${Iro.default(text, Iro.yellow)}`, Iro.bold, Iro.green)
        );
    }
}