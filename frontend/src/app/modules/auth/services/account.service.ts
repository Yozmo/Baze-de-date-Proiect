import { Injectable } from '@angular/core';
import {AccountControllerService} from "../../../api/services";
import {Observable} from "rxjs";
import {Account} from "../../../api/models";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private accountService: AccountControllerService
  ) { }

  createAccount(account: Account): Observable<Account> {
    return this.accountService.createAccountUsingPOST(account);
  }

  updateAccount(account: Account): Observable<null> {
    return this.accountService.updateAccountUsingPUT(account);
  }

  isEmailUnique(email: string): Observable<boolean> {
    return this.accountService.isUniqueUsingGET(email);
  }
}
