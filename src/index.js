import "core-js/stable";
import "regenerator-runtime/runtime";
import { PostgresDriver } from "./postgres_driver";

export const configure = (fluent_configurator) => {
    fluent_configurator.register_driver("pgsql", new PostgresDriver(fluent_configurator));
};

export default configure;
