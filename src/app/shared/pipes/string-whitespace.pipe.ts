import { Pipe, PipeTransform } from "@angular/core";
import { TranslationService } from "src/app/core/services/localization/translation.service";

@Pipe({
    name: 'splitwhitespaces'
  })
  export class SplitwhitespacesPipe implements PipeTransform {
  
    transform(value: string, args?: any): string {
      if(value.includes(' ')){
        return value.split(' ')[0].toString();
      }
      return value;
    }
  }

  @Pipe({
    name: 'removewhitespaces'
  })
  export class RemovewhitespacesPipe implements PipeTransform {
  
    transform(value: string, args?: any): string {
      return value.replace(/ /g, '');
    }
  }


  @Pipe({
    name: 'everyInList'
  })
  export class EveryInListPipe implements PipeTransform {
  
    transform(value: any[]): boolean {
        if(value == null || value == undefined || value.length == 0 || value.every(x => x == 0))
        {
            return false;
        } 
      return true;
    }
  }


  @Pipe({
    name: 'findNameInList'
  })
  export class FindNameInListPipe implements PipeTransform {
    constructor(private localize: TranslationService) {
    }
    transform(items: any[], itemId: any): string {
      if (!items || itemId == undefined || itemId == null || itemId == "") {
          return "";
      }
      let res = items.find(item => item.id == itemId);
      if (!res || res == undefined || res == null) {
        return "";
      }
      return this.localize.isEnglish() ?  res.nameFl : res.nameSl;
    }

  }