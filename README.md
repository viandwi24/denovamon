# Denovamon
a Watcher for all changes that occur in your deno project. 
a Module to detect any change files and automatically restart your server. Inspired by Nodemon.
Denovamon will automatically reload every time an access event occurs such as modification, delete, and a new file or folder.

| inpirate by https://nodemon.io/


## Simple Use
for fast run, you can use this command
```
deno run -A https://deno.land/x/denovamon/run.ts start --command="deno run --allow-net app.ts"
```
Ignore with regex patern  (multiple separate by coma):
```
deno run -A https://deno.land/x/denovamon/run.ts start --command="deno run -A app.ts" --ignore="tes.ts,app.ts"
```
Clear Terminal On Restart Command :
```
deno run -A https://deno.land/x/denovamon/run.ts start --command="deno run -A app.ts" --clear-on-restart
```
if you using windows, you must add option "--os=win"
```
deno run -A https://deno.land/x/denovamon/run.ts start --command="deno run -A app.ts" --clear-on-restart --os=win
```
## Programming Use
```
import { Denovamon, IOptions } from "https://deno.land/x/denovamon/mod.ts";

let options: IOptions = {
    path: Deno.cwd(),
    command: "deno run -A app.ts",
    clearOnRestart: true,
    os: 'linux',
    ignore: ['tes.ts']
};

let watcher = new Denovamon(options);

await watcher.run();
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