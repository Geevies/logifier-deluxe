export class WindowApiConst {
	/** Channel used by the renderer process to send data to the main process */
	public static readonly LOGIFIER_INPUT = 'getLogifierInput';

	/** Channel used by the renderer process to receive data from the main process */
	public static readonly LOGIFIER_OUTPUT = 'getLogifierOutput';

	/** Whitelist of the safe channels to use when sending data to the main process */
	public static readonly SENDING_SAFE_CHANNELS = [
		WindowApiConst.LOGIFIER_INPUT,
	];

	/** Whitelist of the safe channels to use when receiving data from the main process */
	public static readonly RECEIVING_SAFE_CHANNELS = [
		WindowApiConst.LOGIFIER_OUTPUT,
	];
}
