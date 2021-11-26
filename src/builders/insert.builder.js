import { Builder } from "./builder";

class InsertBuilder extends Builder {

    constructor(driver, table, columns, values) {
        super(driver);
        this.table = table;
        this.columns = columns;
        this.values = values;
    }

    parse() {
        let index = 0;
        const fields = this.columns.map(c => this.columnrize(c)).join(',');
        const values = this.values.map(() => `(${
            this.columns.map(() => `$${++index}`).join(", ")
        })`).join(', ');
        return `INSERT INTO ${this.tablerize(this.table)} (${fields}) VALUES ${values} RETURNING *;`;
    }

}

export { InsertBuilder };
