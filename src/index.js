import "core-js/stable";
import "regenerator-runtime/runtime";
import { PostgresDriver } from "./postgres_driver";

export const configure = (fluent_configurator) => {
    fluent_configurator.register_driver("pgsql", (connection_name) => new PostgresDriver(connection_name, fluent_configurator));
};

export default configure;
