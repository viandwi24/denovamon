import { Denovamon, IOptions } from "./mod.ts";
import { StdFlags } from "./deps.ts";

const parsedArgs = StdFlags.parse(Deno.args);
const root = Deno.cwd();

if (parsedArgs._[0] == "start") {
    await start();
}

async function start() {
    let options: IOptions = {
        path: Deno.cwd(),
        command:  getValue("command", "deno run -A app.ts"),
        clearOnRestart: getValue("clear-on-restart", false),
        stderr: getValue("stderr", "inherit"),
        stdout: getValue("stdout", "inherit"),
        os: getValue("os", "linux"),
        throttle: getValue("throttle", 500),
        ignore: parseArray( getValue("ignore", null) ),
    };
    let wathcer = new Denovamon(options);
    await wathcer.run();
}

function getValue(key: string, ifnull: any) {
    return (typeof parsedArgs[key] != 'undefined') ? parsedArgs[key] : (ifnull ?? null);
}

function parseArray(str: string|null) {
    return (str == null) ? [] : str.split(",");
}