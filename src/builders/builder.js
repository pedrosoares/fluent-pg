class Builder {
    tablerize(column) {
        return column
            // Split Schema from Table
            .split(".")
            // Remove Empty
            .filter(f => !!f)
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
