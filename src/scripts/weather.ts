import type {Location} from "@/scripts/location";

/**
 * Array containing all weekdays.
 * Starts with Sunday because Date.getDay() returns from 0 - 6, where
 * 0 represents Sunday.
 */
export const WEEK_DAYS: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export interface WeatherData {
    city: {
        coord: {
            lat: number;
            lon: number;
        };
        population: string
    };
    list: [{
        dt_txt: string;
        main: {
            feels_like: number;
            humidity: number;
            sea_level: number;
            temp: number;
            temp_max: number;
            temp_min: number;
        };
        wind: {
            speed: number;
        }
    }];
}

export async function fetchData(location: Location) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location.name},${location.countryCode}&appid=d134cb284ef6ebbab66ea57a6b83f4f8`)
        .then((response: Response) => response.json())
        .then(data => {
            for (let i: number = 0; i < data.list.length; i++) {
                const weather: WeatherData = data;

                const date: string = weather.list[i].dt_txt;
                const weekDayNumber: number = new Date(date).getDay();
                const weekDay: string = WEEK_DAYS[weekDayNumber];
                console.log(weekDay);
                if (date.includes("12:00")) {
                    console.log(weather.list[i].main.temp);
                }
            }
        }).catch(error => {
        console.error(error);
    });
}

export function getTime(): string {
    const tempTime: string = new Date().toTimeString();
    return tempTime.substring(0, tempTime.indexOf(" "));
}

export function getDay(): string {
    return new Date().toDateString();
}


