class Uniter {
    options = {units: Array<string>()};
    constructor(options = { units: ['T', 'B', 'M', 'K', ''] }){
        this.options = options;
    }

    unite(number: number, options = this.options) : string{
        const units = options.units;
        const n = this.splitNumber(number);
        const d = this.mergeSignificantDigits(n);
        return d + units[units.length - n.length];
    }

    splitNumber(number: number) : Array<string> {
        let numberGroups: Array<string> = [];
        let length = (number).toString().length;
        number.toString().slice(0, length%3) != '' ? numberGroups.push(number.toString().slice(0, length%3)) : undefined;
        const addition = length % 3;
        length -= addition;
        for(let i = addition; i < length; i+=3){
            numberGroups.push(number.toString().slice(i, i+3));
        }

        return numberGroups;
    }

    mergeSignificantDigits(number: string[]) : string{
        console.log(number);
        let s = '';
        for(const group of number){
            if(s.length === 0) s += group;
            else if(s.length <= 3) s += '.' + group.slice(0, (3-s.length > 0 ? 3-s.length : 1));
            else if(s.length >= 4) break;
        }
        return s;
    }
}
export default Uniter;