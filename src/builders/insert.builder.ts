import { Builder, Driver} from "./builder";

class InsertBuilder extends Builder {

    private table: string;
    private columns: any[];
    private values: any;

    constructor(driver: Driver, table: any, columns: any, values: any) {
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
