# PostgreSQL driver for FLUENT-ORM
This package contains the postgresql driver to be used on fluent-orm package.

## Usage
on the root project
```
npm install fluent-pg --save
```
on the fluent configuration file
```JavaScript
const { configurator }  = require("fluent-orm");
const pg_driver = require("fluent-pg");
// Register Driver
configurator.use(pg_driver.configure);
// Configure driver connection
configurator.configure({
    'default': 'pgsql',
    'connections': {
        'pgsql': {
            'driver': 'pgsql',
            'host': '127.0.0.1',
            'port': '5432',
            'database': 'postgres',
            'user': 'postgres',
            'password': '1234'
        }
    }
});
```
