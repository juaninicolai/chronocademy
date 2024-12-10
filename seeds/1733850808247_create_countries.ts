import type { Kysely } from "kysely";
import { DB } from "@/app/database";

export async function seed(db: Kysely<DB>): Promise<void> {
  const mapCountriesToValues = (countries: string[]) => {
    return countries.map((country) => ({ country }));
  };

  await db.deleteFrom("countries").execute();

  await db
    .insertInto("countries")
    .values(
      mapCountriesToValues([
        "American Samoa",
        "Antigua & Barbuda",
        "Bosnia & Herzegovina",
        "Bouvet Island",
        "British Indian Ocean Territory",
        "British Virgin Islands",
        "Burkina Faso",
        "Cape Verde",
        "Caribbean Netherlands",
        "Cayman Islands",
        "Central African Republic",
        "Christmas Island",
        "Cocos (Keeling) Islands",
        "Congo - Brazzaville",
        "Congo - Kinshasa",
        "Cook Islands",
        "Costa Rica",
        "Côte d’Ivoire",
        "Dominican Republic",
        "El Salvador",
        "Equatorial Guinea",
        "Falkland Islands",
        "Faroe Islands",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories",
        "Heard & McDonald Islands",
        "Hong Kong SAR China",
        "Isle of Man",
        "Macao SAR China",
        "Marshall Islands",
        "Myanmar (Burma)",
        "New Caledonia",
        "New Zealand",
        "Norfolk Island",
        "North Korea",
        "North Macedonia",
        "Northern Mariana Islands",
        "Palestinian Territories",
        "Papua New Guinea",
        "Pitcairn Islands",
        "Puerto Rico",
        "San Marino",
        "Saudi Arabia",
        "Sierra Leone",
        "Sint Maarten",
        "Solomon Islands",
        "South Africa",
        "South Georgia & South Sandwich Islands",
        "South Korea",
        "South Sudan",
        "Sri Lanka",
        "St. Barthélemy",
        "St. Helena",
        "St. Kitts & Nevis",
        "St. Lucia",
        "St. Martin",
        "St. Pierre & Miquelon",
        "St. Vincent & Grenadines",
        "Svalbard & Jan Mayen",
        "São Tomé & Príncipe",
        "Trinidad & Tobago",
        "Turks & Caicos Islands",
        "U.S. Outlying Islands",
        "U.S. Virgin Islands",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Vatican City",
        "Wallis & Futuna",
        "Western Sahara",
        "Åland Islands",
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Ecuador",
        "Egypt",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Niue",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Réunion",
        "Samoa",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Somalia",
        "Spain",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ]),
    )
    .execute();
}
