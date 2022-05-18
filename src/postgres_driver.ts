import { Pool } from "pg";
import { uuidv4 } from "./helper";
import { Driver } from "./builders/builder";
import { SelectBuilder } from "./builders/select.builder";
import { InsertBuilder } from "./builders/insert.builder";
import { DeleteBuilder } from "./builders/delete.builder";
import { UpdateBuilder } from "./builders/update.builder";

const transactions: any = {};

class PostgresDriver implements Driver {
    public connection_name: string;
    public configurator: any;
    private pool: any;

    constructor(connection_name: string, configurator: any) {
        this.connection_name = connection_name;
        this.configurator = configurator;
        this.pool = null;
    }

    async query(options: any, sql: string, params = []) {
        const connection = await this.getConnection(options);
        const parseParam = (po: any) => {
            let r: any[] = [];
            po.forEach((e: any) => {
                if (Array.isArray(e)) e.forEach(a => r = r.concat(a))
                else r = r.concat(e);
            });
            return r;
        };
        const response = await connection.query(sql, parseParam(params));
        if (response.command === "SELECT") return response.rows;
        else if (response.command === "INSERT") return {
            affectedRows: response.rowCount,
            insertId: response.rows && response.rows.length > 0 ? response.rows[0].id || null : null
        };
        return { affectedRows: response.rowCount };
    }

    async getConnection(options: any = {}) {
        if(options.hasOwnProperty("transaction")) return transactions[options.transaction];
        if (!this.pool) {
            const options_ = {
                ...this.configurator.get_connection_configuration(
                    this.connection_name || this.configurator.default_connection
                )
            };
            if (options_.driver !== "pgsql") {
                throw new Error(`Invalid driver (${options_.driver}) used on postgres`);
            }
            delete options_.driver;
            this.pool = new Pool(options_);
        }
        return this.pool;
    }

    async commit(transaction: any) {
        // Validate if there is a transaction to handle
        if (!transactions.hasOwnProperty(transaction)) throw new Error("Transaction not found");
        // Get transaction connection
        const connection = transactions[transaction];
        try {
            // Commit all alteration to database
            await connection.query('COMMIT');
        } catch (err) {
            // Rollback any alteration to database
            await connection.query('ROLLBACK');
            // Pass the error forward
            throw err;
        } finally {
            // Delete connection from the cache
            delete transactions[transaction];
            // Release connection
            connection.release();
        }
    }

    async rollback(transaction: any) {
        // Validate if there is a transaction to handle
        if (!transactions.hasOwnProperty(transaction)) throw new Error("Transaction not found");
        // Get transaction connection
        const connection = transactions[transaction];
        try {
            // Rollback any alteration to database
            await connection.query('ROLLBACK');
        } catch (err) {
            // Pass the error forward
            throw err;
        } finally {
            // Delete connection from the cache
            delete transactions[transaction];
            // Release connection
            connection.release();
        }
    }

    async transaction() {
        // Generate a random UUID for this transaction
        const id = uuidv4();
        // Validate if the pool was initialized
        if (!this.pool) await this.getConnection();
        // Get a new connection on the POOL
        const client = await this.pool.connect();
        // Add Current connection tp transaction storage
        transactions[id] = client;
        try {
            // Begin transaction
            await client.query('BEGIN');
            // return transaction ID
            return id;
        } catch (err) {
            // Rollback anything on error
            await client.query('ROLLBACK');
            // Remove current connection from the transaction storage
            delete transactions[id];
            // Release current connection
            client.release();
            // Pass the error forward
            throw err;
        }
    }

    parseSelect(table: string, columns: any[], filters: any[], limit: any, order: any, groups: any){
        return (new SelectBuilder(this, table, columns, filters, limit, order, groups)).parse();
    }

    parseInsert(table: any, columns: any, values: any){
        return (new InsertBuilder(this, table, columns, values)).parse();
    }

    parseDelete(table: any, filters: any){
        return (new DeleteBuilder(this, table, filters)).parse();
    }

    parseUpdate(table: any, columns: any, filters: any, limit: any, order: any){
        return (new UpdateBuilder(this, table, columns, filters, limit, order)).parse();
    }

}

export { PostgresDriver };
