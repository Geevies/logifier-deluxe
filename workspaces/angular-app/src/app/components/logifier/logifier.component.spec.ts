import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogifierComponent } from './logifier.component';
import { ElectronIpcService } from 'src/app/services/electron-ipc.service';
import {
	TranslateFakeLoader,
	TranslateLoader,
	TranslateModule,
	TranslateService,
} from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('LogifierComponent', () => {
	const mockElectronIpcService = jasmine.createSpyObj(['receive', 'send']);
	let fixture: ComponentFixture<LogifierComponent>;
	let component: LogifierComponent;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [LogifierComponent],
			imports: [
				ReactiveFormsModule,
				TranslateModule,
				TranslateModule.forRoot({
					loader: {
						provide: TranslateLoader,
						useClass: TranslateFakeLoader,
					},
				}),
			],
			providers: [
				TranslateService,
				{
					provide: ElectronIpcService,
					useValue: mockElectronIpcService,
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LogifierComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
