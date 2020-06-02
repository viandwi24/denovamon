import { Denovamon, IOptions } from "../mod.ts";

let options: IOptions = {
    path: Deno.cwd(),
    command: "deno run -A app.ts",
    clearOnRestart: true,
    os: 'linux',
    ignore: ['tes.ts']
};

let wathcer = new Denovamon(options);

await wathcer.run();