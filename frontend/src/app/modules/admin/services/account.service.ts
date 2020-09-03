import {Injectable} from "@angular/core";
import {AccountControllerService} from "../../../api/services";
import {Observable} from "rxjs";
import {Account} from "../../../api/models/account";

@Injectable()
export class AccountService {
  constructor(
    private accountService: AccountControllerService
  ) { }

  getAllAccounts(): Observable<Array<Account>> {
    return this.accountService.getAllAccountsUsingGET();
  }

  createAccount(account: Account): Observable<Account> {
    return this.accountService.createAccountUsingPOST(account);
  }

  updateAccount(account: Account): Observable<Account> {
    return this.accountService.updateAccountUsingPUT(account);
  }

  isEmailUnique(email: string): Observable<boolean> {
    return this.accountService.isUniqueUsingGET(email);
  }
}
