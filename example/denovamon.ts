import { Denovamon, IOptions } from "../mod.ts";

let options: IOptions = {
    path: Deno.cwd(),
    command: "deno run -A app.ts",
    clearOnRestart: true, // if you use window, you must add option 'os: "win"'
    ignore: ['test.ts']
};

let watcher = new Denovamon(options);

await watcher.run();