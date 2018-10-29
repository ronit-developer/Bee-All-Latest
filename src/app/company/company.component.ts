import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import {Observable} from "rxjs/Observable";
import {select} from "@angular-redux/store";
import {companyInit} from "./redux/company.reducer";
import {CompanyActions} from "./redux/company.actions";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {ICompany} from "./company.interface";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {
  @select(['company', 'data']) readonly company$: Observable<ICompany>;
  @select(['company', 'pending']) readonly pending$: Observable<boolean>;
  @select(['company', 'error']) readonly error$: Observable<string>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public company: ICompany = companyInit;
  private companyId: number;

  constructor(private route: ActivatedRoute,
              private companyActions: CompanyActions) {
  }

  ngOnInit() {
    // pull data from url
    this.route.params.takeUntil(this.ngUnsubscribe).subscribe((params: any) => {
      // Init globals
      this.company = companyInit;
      this.companyId = parseInt(params.id);

      // Get company info from server
      this.companyActions.getCompany(params.id);
    });

    // Register to company store
    this.company$.takeUntil(this.ngUnsubscribe).subscribe((company: ICompany) => {
      // Check that the company id is the same as id received from url params.
      // when paging between companies we might get a different company, so this check is required.
      if (company.id && company.id === this.companyId) {
        this.company = Object.assign({}, company);
      }
    });
  }

  ngOnDestroy() {
    // Complete subscriptions
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
