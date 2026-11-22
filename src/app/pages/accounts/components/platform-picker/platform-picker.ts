import { Component , EventEmitter, Input,Output } from '@angular/core';
import { PlatformIcon } from '../platform-icon/platform-icon';
import { PLATFORMS } from '../../../../assets/assets';
@Component({
  imports: [ PlatformIcon],
  selector: 'app-platform-picker',
  styleUrl: './platform-picker.css',
  templateUrl: './platform-picker.html',
})
export class PlatformPicker {

  @Input() connectedIds:string[]=[];
  @Input() connecting :string|null=null

  @Output() close=new EventEmitter<void>()
  @Output() connect=new EventEmitter<string>()

  platforms=PLATFORMS

  closeModal():void{
    this.close.emit()

  }

  connectPlatform(platformId:string):void{
    if(this.connectedIds.includes(platformId) || this.connecting===platformId){
      return
    }
    this.connect.emit(platformId)
  }

  isConnected(platformId:string):boolean{
    return this.connectedIds.includes(platformId)
  }
  isConnecting(platformId:string):boolean{
    return this.connecting===platformId
  }

}
