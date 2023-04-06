import {Location} from "@/scripts/location";

export function run(): void {
    const testLocation = new Location("London", "uk");
    console.log(testLocation.name);
    console.log(testLocation.countryCode);

}