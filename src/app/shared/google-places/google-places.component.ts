/// <reference types="@types/googlemaps" />

import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { ILocation } from "src/app/interfaces";
import * as fromUser from "../../user/user.reducers";
import * as UserLocationAction from "../store/user-location/user-location.action";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-google-places",
  templateUrl: "./google-places.component.html",
  styleUrls: ["./google-places.component.css"],
})
export class GooglePlacesComponent implements OnInit, AfterViewInit {
  @Input() addressType: string;
  @ViewChild("addresstext") addresstext: any;
  autocompleteInput: string;

  constructor(private userStore: Store<fromUser.UserState>) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        componentRestrictions: { country: ["NG", "UK"] },
        types: [this.addressType], // 'establishment' / 'address' / 'geocode'
      }
    );
    google.maps.event.addListener(autocomplete, "place_changed", () => {
      const place = autocomplete.getPlace();
      const address: ILocation = {
        location: `${
          place.address_components[place.address_components.length - 2]
            .long_name
        }, ${
          place.address_components[place.address_components.length - 1]
            .long_name
        }`,
        formattedAddres: place.formatted_address,
      };
      console.log(address);
      this.setSelectedUserAddress(address);
    });
  }

  setSelectedUserAddress(address: ILocation) {
    this.userStore.dispatch(
      new UserLocationAction.SetSelectedAddress({ address })
    );
  }
}
