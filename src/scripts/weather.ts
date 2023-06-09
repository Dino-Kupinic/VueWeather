import type {Location} from "@/scripts/location";

export const FIVE_MINUTES_IN_MS: number = 300_000;
export const ONE_SECOND_IN_MS: number = 1_000;
export const KELVIN_TO_CELSIUS: number = 273.15;

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

/**
 * Type which contains the weather information that will be returned
 */
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

/**
 * Type to represent the json structure of the OpenWeatherAPI response
 */
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


/**
 * Fetches a json containing weather data
 * @param location Location containing name and country code
 */
export async function fetchData(location: Location): Promise<WeatherForecast[]> {
    return new Promise(async (resolve, reject): Promise<void> => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location.name},${location.countryCode}&appid=d134cb284ef6ebbab66ea57a6b83f4f8`)
            resolve(processJsonData(await response.json()));
            localStorage.setItem("city", location.name);
            localStorage.setItem("code", location.countryCode);
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Processes the data and returns an array containing the data
 * @param weather
 */
function processJsonData(weather: WeatherData): WeatherForecast[] {
    const weatherForecastArray: WeatherForecast[] = [];

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

/**
 * Gets the weather image to be used for each day
 * @param icon icon string, "10d" for example
 */
export async function fetchWeatherImage(icon: string): Promise<string> {
    return new Promise(async (resolve, reject): Promise<void> => {
        try {
            const response = await fetch(`https://openweathermap.org/img/wn/${icon}@2x.png`);
            const blob = await response.blob();
            resolve(URL.createObjectURL(blob));
        } catch (error) {
            console.error(error);
            reject(undefined);
        }
    });
}

export function getTime(): string {
    const tempTime: string = new Date().toTimeString();
    return tempTime.substring(0, tempTime.indexOf(" "));
}

export function getDay(): string {
    return new Date().toDateString();
}
