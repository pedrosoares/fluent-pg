import { PostgresDriver } from "./postgres_driver";

export const configure = (fluent_configurator) => {
    fluent_configurator.register_driver("pgsql", new PostgresDriver(fluent_configurator));
};

export default configure;
