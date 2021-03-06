import {Builder, Driver} from "./builder";

class FilterBuilder extends Builder {
    private filters: any;

    constructor(driver: Driver, filters: any){
        super(driver);
        this.filters = filters;
    }

    typerize(type: string){
        if(!type) return '';
        switch (type){
            case 'and':
                return ' AND';
            case 'or':
                return ' OR';
            default:
                throw new Error("Invalid filter type");
        }
    }

    parse(i = 0): any {
        if(this.filters.length === 0) return "";
        const values: any = [];
        const parseFunction = (filter: any) => {
            if(filter instanceof Object && !!filter.filter){
                const type = this.typerize(filter.type);
                return [ `${type} (`, ...filter.filter.map(parseFunction), ') ' ].join('');
            } else if(filter instanceof Object && !!filter.raw) {
                const type = this.typerize(filter.type);
                let raw = filter.raw;
                if (!!filter.args && filter.args.length > 0) {
                    filter.args.forEach((argument: any, index: any) => {
                        values.push(argument);
                        raw = raw.split(`$${index + 1}`).join(`$${++i}`);
                    });
                }
                return `${type} ${raw}`;
            } else if(filter instanceof Object && !filter.value) {
                const type = this.typerize(filter.type);
                const column = this.columnrize(filter.column);
                const compare = this.comparize(filter.compare);
                return `${type} ${column} ${compare}`;
            } else if(filter instanceof Object){
                const type = this.typerize(filter.type);
                const column = this.columnrize(filter.column);
                const compare = this.comparize(filter.compare);
                values.push(filter.value);
                return `${type} ${column} ${compare} $${++i}`;
            } else {
                throw new Error("Invalid filter object type");
            }
        };

        const result = this.filters.map(parseFunction).join('');
        return {
            sql: `WHERE${result}`,
            data: values
        };
    }

}

export { FilterBuilder };
