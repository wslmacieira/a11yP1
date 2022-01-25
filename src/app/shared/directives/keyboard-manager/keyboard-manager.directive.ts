import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ContentChildren, Directive, HostListener, QueryList } from '@angular/core';
import { KeyBoardManagedItemDirective } from './keyboard-managed-item.directive';

@Directive({ selector: '[appKm]' })
export class KeyBoardManagerDirective {

  @ContentChildren(KeyBoardManagedItemDirective) public items: QueryList<KeyBoardManagedItemDirective>;

  @HostListener('keyup', ['$event'])
  public manageKeys(event: KeyboardEvent): void {

    /**
     *  Object Literals
     */
    const arrowKeys = {
      'ArrowUp': "UP",
      'ArrowDown': "DOWN",
      'ArrowLeft': "LEFT",
      'ArrowRight': "RIGHT",
    };
    // console.log(this.items.toArray())
    const key = arrowKeys[event.key];
    if (key === 'UP' || key === 'RIGHT' ) {
      this.moveFocus(ArrowDirection.RIGHT).focus()
    } else if (key === 'DOWN' || key === 'LEFT' ){
      this.moveFocus(ArrowDirection.LEFT).focus()
    }

    /**
     *  Switch Case
     */
    // switch (event.key) {
    //   case 'ArrowUp':
    //     console.log('up');
    //     break;
    //   case 'ArrowDown':
    //     console.log('Down');
    //     break;
    //   case 'ArrowLeft':
    //     console.log('left');
    //     break;
    //   case 'ArrowRight':
    //     console.log('right');
    //     break;
    // }
  }

  public moveFocus(direction: ArrowDirection): KeyBoardManagedItemDirective {
    const items = this.items.toArray();
    const currentSelectedIndex = items.findIndex(item => item.isFocused());
    const targetElementFocus = items[currentSelectedIndex + direction];
    if (targetElementFocus) {
      return targetElementFocus;
    }

    return direction === ArrowDirection.LEFT
      ? items[items.length - 1]
      : items[0]
  }
}

enum ArrowDirection {
  LEFT = -1,
  RIGHT = 1
}
