import { PostgresDriver } from "./postgres_driver";

export const configure = (
    fluent_configurator: { register_driver: (pgsql: string, p: (connection_name: string) => PostgresDriver) => () => any }
) => {
    fluent_configurator.register_driver("pgsql", (connection_name) => new PostgresDriver(connection_name, fluent_configurator));
};

export default configure;
