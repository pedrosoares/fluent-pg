import { Builder } from "./builder";
import { FilterBuilder } from "./filter.builder";

class DeleteBuilder extends Builder {

    constructor(table, filters) {
        super();
        this.table = table;
        this.filters = filters;
    }

    parse() {
        const whereBuilder = new FilterBuilder(this.filters);

        const whereBuilt = whereBuilder.parse();

        return {
            sql: `DELETE FROM ${this.tablerize(this.table)} ${whereBuilt.sql}`.trim(),
            data: whereBuilt.data
        }
    }

}

export { DeleteBuilder };
