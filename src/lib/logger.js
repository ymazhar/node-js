import { transports, format, createLogger } from 'winston';
const { combine, printf, colorize, timestamp, splat } = format;

const customLevels = {
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0
    },
    colors: {
        trace: 'white',
        debug: 'green',
        info: 'green',
        warn: 'yellow',
        error: 'red',
        fatal: 'red'
    }
};

const formatter = combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    splat(),
    printf((info) => {
        const { timestamp: time, level, message, ...meta } = info;

        return `${time} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
    }),
);

class Logger {
    constructor() {
        const transport = new transports.Console({
            format: formatter
        });

        this.logger = createLogger({
            level: 'trace',
            levels: customLevels.levels,
            transports: transport
        });
    }

    trace(msg, meta) {
        this.logger.log('trace', msg, meta);
    }

    debug(msg, meta) {
        this.logger.debug(msg, meta);
    }

    info(msg, meta) {
        this.logger.info(msg, meta);
    }

    error(msg, meta) {
        this.logger.error(msg, meta);
    }

    fatal(msg, meta) {
        this.logger.log('fatal', msg, meta);
    }
}

export const logger = new Logger();
