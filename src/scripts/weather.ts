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

export interface WeatherForecast {
    name: string;
    windSpeed: number;
    averageTemperature: number;
    maximumTemperature: number;
    minimumTemperature: number;
    temperateFeelsLike: number;
}

export interface WeatherData {
    city: {
        coord: {
            lat: number;
            lon: number;
        }
        population: string;
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
        }
        wind: {
            speed: number;
        }
    }];
}

export async function fetchData(location: Location): Promise<WeatherForecast[]> {
    return new Promise((resolve, reject): void => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location.name},${location.countryCode}&appid=d134cb284ef6ebbab66ea57a6b83f4f8`)
            .then((response: Response) => response.json())
            .then(data => {
                resolve(processJSONdata(data));
            }).catch(error => {
            reject(error);
        });
    });
}

function processJSONdata(weather: WeatherData): WeatherForecast[] {
    const weatherForecastArray: WeatherForecast[] = [];
    for (let i: number = 0; i < weather.list.length; i++) {

        const date: string = weather.list[i].dt_txt;
        const weekDayNumber: number = new Date(date).getDay();
        const weekDay: string = WEEK_DAYS[weekDayNumber];

        if (date.includes("12:00")) {
            const day: WeatherForecast = {
                name: weekDay,
                windSpeed: weather.list[i].wind.speed,
                averageTemperature: weather.list[i].main.temp,
                maximumTemperature: weather.list[i].main.temp_max,
                minimumTemperature: weather.list[i].main.temp_min,
                temperateFeelsLike: weather.list[i].main.feels_like
            };
            weatherForecastArray.push(day);
        }
    }
    return weatherForecastArray;
}

export function getTime(): string {
    const tempTime: string = new Date().toTimeString();
    return tempTime.substring(0, tempTime.indexOf(" "));
}

export function getDay(): string {
    return new Date().toDateString();
}
