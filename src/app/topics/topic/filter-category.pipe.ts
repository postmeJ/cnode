import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    switch (value) {
      case 'ask':
        return '问答'
      case 'share':
        return '分享'
      case 'job':
        return '工作'
      case 'good':
        return '精华'
      default:
        return ''
    }
  }

}
