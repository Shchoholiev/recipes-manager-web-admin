import { LogLevels } from "./enums/log-levels";

export class Log {
    text: string = '';
    level: LogLevels = LogLevels.None;
}
