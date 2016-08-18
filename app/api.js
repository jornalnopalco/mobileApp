import http from "http";
import config from "./config";

export function get(url) {
	console.log("Fetching "+config.baseUrl + url);
	return http.getJSON(config.baseUrl + url);
}
