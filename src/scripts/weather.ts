import type {Location} from "@/scripts/location";

const API_KEY_PART_1: string = "https://api.openweathermap.org/data/2.5/forecast?q=";
const API_KEY_PART_2: string = "&appid=d134cb284ef6ebbab66ea57a6b83f4f8";

export async function fetchData(location: Location) {
    const finalAPIkey = API_KEY_PART_1 + location.name + "," + location.countryCode + API_KEY_PART_2;
    fetch(finalAPIkey).then(data => data.json()).then(data => {
        console.log(data);
    });
}

export function getTime(): string {
    const tempDate: string = new Date().toTimeString();
    return tempDate.substring(0, tempDate.indexOf("("));
}
