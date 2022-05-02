export interface Driver { configurator: any };

class Builder {
    private driver: { configurator: any, connection_name?: string };

    constructor(driver: Driver) {
        this.driver = driver || { configurator: {} };
    }

    tablerize(column: string) {
        const options_ = {
            ...this.driver.configurator.get_connection_configuration(
                this.driver.connection_name || this.driver.configurator.default_connection
            )
        };
        const DEFAULT_SCHEMA = options_.default_schema || process.env.DEFAULT_SCHEMA;
        const clm = column
            // Split Schema from Table
            .split(".")
            // Remove Empty
            .filter(f => !!f);

        if (clm.length === 1 && DEFAULT_SCHEMA) {
            return `"${DEFAULT_SCHEMA}"."${clm.pop()}"`;
        }

        return clm
            // Add quotes from database
            .map(f => `"${f}"`)
            // Re-Join Schema/Table
            .join(".");
    }

    columnrize(column: string){
        return `"${column}"`;
    }

    comparize(compare: any){
        //TODO validate all comparation types
        return compare;
    }
}

export { Builder };
