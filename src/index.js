import PostgresDriver from "./postgres_driver";

export const configure = (fluent_configurator) => {
    fluent_configurator.register_driver(new PostgresDriver(fluent_configurator.connections));
};
