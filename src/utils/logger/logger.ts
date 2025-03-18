export const logInfo = (message: string) => console.info(`[INFO]: ${message}`);
export const logDebug = (message: string) => console.info(`[DEBUG]: ${message}`);
export const logdWarning = (message: string) => console.info(`[WARNING]: ${message}`);
export const logError = (message: string, error?: any) => logError(`[ERROR]: ${message}, ${error}`);
