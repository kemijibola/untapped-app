import { Component, OnInit, AfterContentInit, Input } from '@angular/core';
import { Tab, AppTab } from 'src/app/models';
import * as TabsAction from '../../store/global/tabs/tabs.actions';
import { Store, select } from '@ngrx/store';
import * as fromTabs from '../../store/global/tabs/tabs.reducers';
import { Router, ActivatedRoute } from '@angular/router';
import { take, count, switchMap, withLatestFrom, tap, map, filter } from 'rxjs/operators';
import { selectTabList } from '../../store/global/tabs/tabs.selectors';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, AfterContentInit {
  talentTab: AppTab;
  activeTab: Tab;
  fragment: string;
  toFragment = 'profile';
  @Input() appTabName: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromTabs.FeatureState>) {}

  ngOnInit() {
    this.store
    .pipe(
        select('tabs')
      )
    .subscribe(val => {
      this.talentTab = val.tabs.filter(x => x.name === this.appTabName)[0];
    });
  }

  ngAfterContentInit() {
    this.fragment = this.route.snapshot.fragment ? this.route.snapshot.fragment.toLowerCase() : this.toFragment;
    // subscribing to fragment change
    this.route.fragment.subscribe((fragement: string) => {
      this.fragment = fragement ? fragement.toLowerCase() : this.toFragment;
      this.setActiveTabByFragment();
    });
  }

  private setActiveTabByFragment() {
    // This is to check if fragment matches any of defined tabs
    let matchedFragment = '';
    for (const item of this.talentTab.tabs) {
      const escapeTag = this.escapeRegExp(item.tag);
      const regex = new RegExp(escapeTag, 'i');
      const fragmentMatch = this.fragment.match(regex);
      if (fragmentMatch) {
        matchedFragment = fragmentMatch[0];
        // update toFragment with latest valid fragment
        this.toFragment = fragmentMatch[0];
      }
    }
    // if fragment does not exist
    // set to last known valid fragment
    this.fragment = matchedFragment !== '' ? matchedFragment : this.toFragment;
    const selectedTab = this.talentTab.tabs.filter(x => x.tag === this.fragment)[0];
    this.store.dispatch(new TabsAction.UpdateTab({ name: this.appTabName, tabIndex: selectedTab.index}));
    this.router.navigate(['./', this.route.snapshot.params['username']], { fragment: this.fragment });
    this.activeTab = selectedTab;
  }

  private escapeRegExp(routeFragment: string) {
    return routeFragment.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
}


