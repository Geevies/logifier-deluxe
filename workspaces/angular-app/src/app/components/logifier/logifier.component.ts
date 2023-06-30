import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { WindowApiConst } from 'shared-lib';
import { ElectronIpcService } from '../../services/electron-ipc.service';

@Component({
	selector: 'app-logifier',
	templateUrl: './logifier.component.html',
	styleUrls: ['./logifier.component.scss'],
})
export class LogifierComponent implements OnInit {

	constructor() {}

	data:string = "";
	logLines:any = [];

	searchText:string = "";
	searchLines:any = [];

	logId:string = "";

	logTypes:any = {
		'DEBUG': 'grey',
		'ACCESS': 'grey',
		'SS': 'grey',
		'TESTING': 'grey',
		'GAME': 'grey',
		'SAY': 'white',
		'EMOTE': 'white',
		'ERROR': 'orchid',
		'ADMIN': 'orchid',
		'MASTER': 'orchid',
		'VOTE': 'orchid'
	}

	ngOnInit(): void {
		this.setupIntro();
	}

	setupIntro() {
		this.logLines = [];
		this.logId = "";
		let introMessages = [
			`Copy paste the entire log file into the input area called 'Paste Logs Here'.`,
			`Then search for any words you want by adding them into the 'Searching For' area, seperated by commas. Example: 'bridge,kitchen,bwoink'.`,
			'This is still a work in progress.'
		]
		let index = 0;
		for(let message of introMessages) {
			this.logLines.push({
				index: index,
				timestamp: '+',
				type: 'INTRO',
				color: 'white',
				text: message
			});
			index++;
		}
	}

	processLogLines(event: any) {
		if(!event) {
			this.setupIntro();
			return;
		}

		this.logLines = [];
		let textLines = event.split('\n');
		if(textLines.length > 2) {
			let logIdText = textLines[2];
			let matches = logIdText.match(/ - Starting up\. \(ID: (.*?)\)/);
			if(matches?.length) this.logId = matches[1];
		}
		textLines = textLines.slice(4);
		let index = 0;
		for(let textLine of textLines) {
			if(this.searchLines.length && !this.searchLines.some((x: string) => textLine.toLowerCase().includes(x.toLowerCase()))) {
				continue;
			}

			let logObject:any = {
				index: index
			};
			textLine = textLine.replace(this.logId, '');

			let matches = textLine.match(/(\[(.*?)\])/);
			if(matches?.length) {
				textLine = textLine.replace(matches[1], '');
				let splitStamp = matches[2].split(" ");
				logObject.timestamp = splitStamp[1];
			}

			for(let logType in this.logTypes) {
				if(textLine.includes(logType + ': ')) {
					textLine = textLine.replace(logType + ': ', '');
					logObject.type = logType;
					logObject.color = this.logTypes[logType];
					break;
				}
			}

			logObject.text = textLine;

			this.logLines.push(logObject);
			index++;
		}
	}

	processSearchLines(event: any) {
		if(!event) {
			this.searchLines = [];
			this.processLogLines(this.data);
			return;
		}
		this.searchLines = event.split(',');
		this.processLogLines(this.data);
	}

}
