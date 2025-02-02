import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventFormComponent } from './event-form.component';
import { appConfig } from '../../app.config';

describe('EventFormComponent', () => {
    let component: EventFormComponent;
    let fixture: ComponentFixture<EventFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [...appConfig.providers],
            imports: [EventFormComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should compile', () => {
        expect(component).toBeTruthy();
    });
});
