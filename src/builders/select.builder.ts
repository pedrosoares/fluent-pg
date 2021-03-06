import { Builder } from "./builder";
import { FilterBuilder } from "./filter.builder";

// @ts-ignore
class SelectBuilder extends Builder {
    private driver: any;
    private table: string;
    private columns: any[];
    private filters: any[];
    private groups: any;
    private limit: any;
    private order: any;

    constructor(driver: any, table: string, columns: any[], filters: any[], limit: any, order: any, groups: any) {
        super(driver);
        this.driver = driver;
        this.table = table;
        this.columns = columns;

        this.filters = filters;
        this.groups = groups;

        this.limit = limit || {};
        this.order = order || {};
    }

    parse(){
        const whereBuilder = new FilterBuilder(this.driver, this.filters);

        const data = this.columns.map((col, index) =>
            `${col}${index >= (this.columns.length-1) ? '' : ', '}`
        ).join('');

        const whereBuilded: any = whereBuilder.parse();

        const groups = `${
            this.groups.length > 0 ? ' GROUP BY ' : ''
        }${
            this.groups.map((a: any) => this.tablerize(a)).join(',')
        }`;

        return {
            sql: `SELECT ${data} FROM ${this.tablerize(this.table)} ${whereBuilded ? whereBuilded.sql : ""} ${groups} ${this.parseOrder()} ${this.parseLimit()}`.trim(),
            data: whereBuilded.data
        }
    }

    parseLimit(){
        let skip = "";
        let take = "";
        if(!!this.limit.skip){
            skip = `OFFSET ${this.limit.skip}`;
        }
        if(!!this.limit.take){
            take = `LIMIT ${this.limit.take}`;
        }
        return `${take} ${skip}`.trim();
    }

    parseOrder(){
        if (Array.isArray(this.order)) {
            const result = this.order
                .map(order => {
                    if(!!order.column && !!order.direction) {
                        const column = typeof order.column === "number" ? order.column : this.columnrize(order.column);
                        return `${column} ${order.direction}`;
                    }
                    if (!!order.raw) {
                        return `${order.raw}`;
                    }
                    return null;
                })
                .filter(val => !!val);
            if (result.length > 0) {
                return "ORDER BY " + result.join(", ");
            }
            return "";
        }
        if(!!this.order.column && !!this.order.direction) {
            const column = typeof this.order.column === "number" ? this.order.column : this.columnrize(this.order.column);
            return `ORDER BY ${column} ${this.order.direction}`;
        }
        if (!!this.order.raw) {
            return `ORDER BY ${this.order.raw}`;
        }
        return "";
    }

}

export { SelectBuilder };
