import pino, { type Logger } from "pino";

export abstract class LoggerService {
    private static instance: Logger;

    static new() {
        if (!LoggerService.instance) {
            LoggerService.instance = pino({
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: true
                    }
                }
            });
        }

        return LoggerService.instance;
    }
}
