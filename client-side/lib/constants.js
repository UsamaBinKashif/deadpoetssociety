import Cookies from "js-cookie";

export const SITE_TITLE = "Dead Poets Society";
// export const API_BASE = "http://localhost:8080";
export const API_BASE = "https://dpsapi.vercel.app";

const token = Cookies.get("jwt");
export const DEFAULT_HEADERS = {
    Authorization: `Bearer ${token}`
}