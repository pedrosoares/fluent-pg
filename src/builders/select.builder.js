import { Builder } from "./builder";
import { FilterBuilder } from "./filter.builder";

class SelectBuilder extends Builder {

    constructor(driver, table, columns, filters, limit, order, groups){
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

        const whereBuilded = whereBuilder.parse();

        const groups = `${
            this.groups.length > 0 ? ' GROUP BY ' : ''
        }${
            this.groups.map(a => this.tablerize(a)).join(',')
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
        if(!!this.order.column && !!this.order.direction) {
            return `ORDER BY ${this.tablerize(this.order.column)} ${this.order.direction}`;
        }
        return "";
    }

}

export { SelectBuilder };
