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
    currentWeather: string;
    description: string;
    icon: string;
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
        weather: [{
            description: string;
            icon: string;
            main: string;
        }]
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
    const KELVIN_TO_CELSIUS: number = 273.15;

    for (let i: number = 0; i < weather.list.length; i++) {

        const date: string = weather.list[i].dt_txt;
        const weekDayNumber: number = new Date(date).getDay();
        const weekDay: string = WEEK_DAYS[weekDayNumber];

        if (date.includes("12:00")) {
            const day: WeatherForecast = {
                name: weekDay,
                windSpeed: weather.list[i].wind.speed,
                averageTemperature: Math.round(weather.list[i].main.temp - KELVIN_TO_CELSIUS),
                maximumTemperature: Math.round(weather.list[i].main.temp_max - KELVIN_TO_CELSIUS),
                minimumTemperature: Math.round(weather.list[i].main.temp_min - KELVIN_TO_CELSIUS),
                temperateFeelsLike: Math.round(weather.list[i].main.feels_like - KELVIN_TO_CELSIUS),
                description: weather.list[i].weather[0].description,
                icon: weather.list[i].weather[0].icon,
                currentWeather: weather.list[i].weather[0].main
            };
            weatherForecastArray.push(day);
        }
    }
    return weatherForecastArray;
}

export function fetchWeatherImage(icon: string): string | undefined {
    fetch(`https://openweathermap.org/img/wn/${icon}.png`)
        .then((response: Response) => response.blob())
        .then((blob: Blob) => {
            return URL.createObjectURL(blob);
        }).catch(error => console.error(error));
    return undefined;
}

export function getTime(): string {
    const tempTime: string = new Date().toTimeString();
    return tempTime.substring(0, tempTime.indexOf(" "));
}

export function getDay(): string {
    return new Date().toDateString();
}
