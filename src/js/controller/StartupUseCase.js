import {getConnection, save, saveDepartment} from "../model/data/userData.js";

export class StartupUseCase {

    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    execute() {
        (async () => {
            const database = await getConnection();

            const departments = [
                {id: 1, name: "Accounting"}, {id: 2, name: "Sales"},
                {id: 3, name: "Plant"}, {id: 4, name: "Shipping"},
                {id: 5, name: "Quality Control"}
            ]
            await Promise.all(departments.map(department => this.dispatch(saveDepartment({database, department}))));

            const users = [
                {id: 1, username: "lstooge", first: "Larry", last: "Stooge", email: "larry@stooges.com", password: "ijk456", department: {id: 1, name: "Accounting"}},
                {id: 2, username: "cstooge", first: "Curly", last: "Stooge", email: "curly@stooges.com", password: "xyz987", department: {id: 2, name: "Sales"}},
                {id: 3, username: "mstooge", first: "Moe", last: "Stooge", email: "moe@stooges.com", password: "abc123", department: {id: 3, name: "Plant"}}
            ];
            await Promise.all(users.map(user => this.dispatch(save({database, user}))));

        })();
    }

}
