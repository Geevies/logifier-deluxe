import { WindowApiConst } from 'shared-lib';
import { AbstractService } from './abstract-service';

export class LogifierService extends AbstractService<number, number[]> {
	receptionChannel(): string {
		return WindowApiConst.LOGIFIER_INPUT;
	}

	sendingChannel(): string {
		return WindowApiConst.LOGIFIER_OUTPUT;
	}

	process(input: number): number[] {
		// From 1 to 10, return input logifier
		const logifier = [];
		for (let n = 1; n <= 10; n++) {
			logifier.push(n * input);
		}
		return logifier;
	}
}
