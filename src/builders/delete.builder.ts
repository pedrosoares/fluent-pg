import { Builder, Driver } from "./builder";
import { FilterBuilder } from "./filter.builder";

// @ts-ignore
class DeleteBuilder extends Builder {

    private driver: any;
    private table: string;
    private filters: any[];

    constructor(driver: Driver, table: string, filters: any[]) {
        super(driver);
        this.driver = driver;
        this.table = table;
        this.filters = filters;
    }

    parse() {
        const whereBuilder = new FilterBuilder(this.driver, this.filters);

        const whereBuilt = whereBuilder.parse();

        return {
            sql: `DELETE FROM ${this.tablerize(this.table)} ${whereBuilt.sql}`.trim(),
            data: whereBuilt.data
        }
    }

}

export { DeleteBuilder };
