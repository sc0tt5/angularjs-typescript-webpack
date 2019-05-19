import { NgModule } from 'angular-ts-decorators';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from '../message.service';

@NgModule({
    id: 'CoreModule',
    imports: [],
    declarations: [MessagesComponent],
    providers: [MessageService]
})
export class CoreModule {}
