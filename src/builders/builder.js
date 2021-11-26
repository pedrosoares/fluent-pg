class Builder {

    constructor(driver) {
        this.driver = driver || { configurator: {} };
    }

    tablerize(column) {
        const DEFAULT_SCHEMA = this.driver.configurator.default_schema || process.env.DEFAULT_SCHEMA;
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

    columnrize(column){
        return `"${column}"`;
    }

    comparize(compare){
        //TODO validate all comparation types
        return compare;
    }
}

export { Builder };
