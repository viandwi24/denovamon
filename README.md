# Denovamon
a Watcher for all changes that occur in your deno project. 
A Module for detech any change file and automatically restart your server. Inspirated by Nodemon.
Denovamon will automatically reload every time an access event occurs such as modification, delete, and a new file or folder.

| inpirate by https://deno.land/x/rhinoder and https://nodemon.io/

## How to use
```
import { Denovamon, IOptions } from "https://deno.land/x/denovamon/mod.ts";

let options: IOptions = {
    path: Deno.cwd(),
    command: "deno run -A app.ts",
    clearOnRestart: true,
    os: 'linux',
    ignore: ['tes.ts']
};

let wathcer = new Denovamon(options);

await wathcer.run();
```
and then run denovamon with :
```
deno run --allow-read --allow-run denovamon.ts
```
### Options
The option must implement IOptions from :
```
import { IOptions } from "https://deno.land/x/denovamon/mod.ts";
```
* path `string` : Path denovamon watching.
* command `string` : command to be run.
* throttle `number` : the waiting time before detecting the modification and restarting the command.
* clearOnRestart `boolean` : clear terminal on restarting command.
* os `string` : your current os, this is required for `clearOnRestart`.`win|linux|mac`
* ignore `Array<string>` : ignoring wathcing with regex pattern.
* stdout `string` : subprocess, [see Deno.run() Docs](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#Deno.run)
* stderr `string` : subprocess, [see Deno.run() Docs](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#Deno.run)

### Thanks To
Thank you for [rhinoder](https://deno.land/x/rhinoder) for his inspiration.