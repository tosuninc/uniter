import { UniterOptions } from "./types/uniter";

const DEFAULT_UNITS = ['T', 'B', 'M', 'K', ''];
const DEFAULT_SEPERATOR = '.';
const DEFAULT_UNIT_SEPERATOR = '';


export default class Uniter {
    static unite(number: number, options: UniterOptions = { units: ['T', 'B', 'M', 'K', ''], unitSeparator: '', separator: '.' }): string {
        if(!Number.isInteger(number)) throw new Error('Given number is not a number');

        const units = options.units ?? DEFAULT_UNITS;
        const seperator = options.separator ?? DEFAULT_SEPERATOR;
        const unitSeparator = options.unitSeparator ?? DEFAULT_UNIT_SEPERATOR ;
        let numberSign = '';

        
        if(number < 0) {
            numberSign = '-';
            number = number * -1;
        }

        const n = Uniter.splitNumber(number);
        const d = Uniter.mergeSignificantDigits(n, seperator);
        const unitName = units[units.length - n.length] ?? '';
        return numberSign + d + unitSeparator + unitName;
    }

    static splitNumber(number: number): string[] {
        if(!Number.isInteger(number)) throw new Error('Given number is not a number at split stage.');

        let numberGroups: string[] = [];
        let length = (number).toString().length;
        
        if(number.toString().slice(0, length%3) != ''){
            numberGroups.push(number.toString().slice(0, length%3));
        }

        const addition = length % 3;
        length -= addition;
        for(let i = addition; i < length; i+=3){
            numberGroups.push(number.toString().slice(i, i+3));
        }

        return numberGroups;
    }

    static mergeSignificantDigits(number: string[], separator: string = '.'): string {
        if(!number.every((value) => Number.isInteger(parseInt(value)))) throw new Error('Given number is not a number at merge stage.');

        let s = '';
        for(const group of number){
            if(s.length === 0) s += group;
            else if(s.length <= 3) s += separator + group.slice(0, (3-s.length > 0 ? 3-s.length : 1));
            else if(s.length >= 4) break;
        }
        return s;
    }
}
