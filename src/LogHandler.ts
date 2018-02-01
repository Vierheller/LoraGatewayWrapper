export class LogHandler {

    public static getInstance() {
        return new LogHandler();
    }

    public error(message?: any, ...optionalParams: any[]) {
        console.error(message, optionalParams);
    }

    public log(message?: any, ...optionalParams: any[]) {
        if (optionalParams) {
            console.log(message, optionalParams);
        } else {
            console.log(message);
        }
    }

    private LogHandler() {
        // Only to be singleton
    }
}
