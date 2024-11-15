import { TranslateService } from '@aasinet/ngx-controls/translate';
import { StaticInjector } from '@aasinet/ngx-controls/utils/app';


export class EnumsParser {
 
  private readonly baseEnum: any;
  private readonly type: string;

  constructor(base: any, name: string) {
    
    this.type = name;
    this.baseEnum = base;
  }

  getList(): Array<GenericEnumGetAndSet> {
    const result: Array<GenericEnumGetAndSet> = [];
    for (const item in this.baseEnum) {
      if (isNaN(item as any)) {
        result.push(new GenericEnumGetAndSet({ type: this.type, key: item, value: this.baseEnum[item] }));
      }
    }

    return result;
  }

  getItem(itemToSearch: number): GenericEnumGetAndSet {
    if (typeof this.baseEnum[itemToSearch] === 'string') {
      return new GenericEnumGetAndSet({ type: this.type, key: this.baseEnum[itemToSearch], value: itemToSearch });
    } else if (typeof this.baseEnum[itemToSearch] === 'number') {
      return new GenericEnumGetAndSet({ type: this.type, key: itemToSearch, value: this.baseEnum[itemToSearch] });
    }
  }
}

export class GenericEnumGetAndSet {
  get type(): any {
    return this._type;
  }

  set type(value: any) {
    this._type = value;
  }

  get key(): any {
    const translator = StaticInjector.instance.get(TranslateService);
    // TODO: special cases (Enums with uppercase, remove double underscore) if is necesary.
    let resourceName = this._key.replace(/([A-Z])/g, '_$1').replace(/__/g, '_');
    if (resourceName[0] === '_') {
      resourceName = resourceName.substr(1);
    }
    let groupName = this.type.replace(/([A-Z])/g, '_$1');
    if (groupName[0] === '_') {
      groupName = groupName.substr(1);
    }
    const translateKey = ('ENUMS_' + groupName + '.' + resourceName).toUpperCase();
    // TODO: remove underscore and camelize all, if is necesary.
    const resourceValue = this._key.replace(/([A-Z])/g, ' $1').trim();

    return translator.getDirectTranslation(translateKey, resourceValue);
  }

  set key(value: any) {
    this._key = value;
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
  }

  private _value: any;
  private _key: any;
  private _type: any;

  constructor(obj: any) {
    this._type = obj.type;
    this._key = obj.key;
    this._value = obj.value;
  }
}
