import { Denovamon, IOptions, version } from "./mod.ts";
import { StdFlags, Iro } from "./deps.ts";

interface ICommandAvailable {
    command: string;
    description: string;
}

const parsedArgs: StdFlags.Args = StdFlags.parse(Deno.args);
const root = Deno.cwd();

if (parsedArgs._[0] == "start") {
    await start();
} else if (parsedArgs._[0] == "help") {
    let commandAvailable: Array<ICommandAvailable> = [
        { command: "start", description: "start denovamon." },
        { command: "version", description: "check denovamon version." },
        { command: "help", description: "show availabe command." },
    ];
    console.log(Iro.default(`[Denovamon]`, Iro.bold, Iro.green));
    console.log(Iro.default(`===================================`, Iro.bold, Iro.green))
    for(let index in commandAvailable) {
        console.log(
            Iro.default(`${commandAvailable[index].command}`, Iro.green) +
            "           " +
            Iro.default(`${commandAvailable[index].description}`, Iro.yellow)
        );
    }
} else if (parsedArgs._[0] == "version" || typeof parsedArgs.v != 'undefined') {
    console.log(Iro.default(`Denovamon V${version}`, Iro.bold, Iro.green));
} else {
    console.log(Iro.default(`[Denovamon]`, Iro.bold, Iro.green) + " a command not found. try with 'denovamon help'");
}
Deno.exit();

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
    
