import React, { useState, useEffect } from 'react';
import UniDashboardContent from '../../components/dashboardcon/dashboardcontent.component';
import './udashboard.component.css';
import { FormControl, MenuItem, Select } from '@mui/material';
import InfoBox from '../../components/Infobox/infobox.component';
import Map from '../../components/map/map.component';
import "leaflet/dist/leaflet.css";
import { showDataOnMap } from '../../components/map/utli';


export default function UserDashboard() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('WorldWide');
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.1796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));
          setCountries(countries);
          setMapCountries(data);
          showDataOnMap(data);
        })
    };
    getCountriesData();
  }, [])
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url = countryCode === 'worldwide'
      ? '"https://disease.sh/v3/covid-19/all"'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      })
  };

  return (
    <UniDashboardContent className='ga'>
      <marquee>
        {countries.map((country) => (
          country.name === 'Nepal' ?
            <h6>Today's Cases{countryInfo.todayCases}</h6>
            : ''
        ))}
      </marquee>
      <div className="ga__header">
        <h3>Worldwide Condition Covid</h3>
        <FormControl className='ga__dropdown'>
          <Select
            onChange={onCountryChange}
            variant='outlined'
            value={country}
          >
            <MenuItem value="worldwide">WorldWide</MenuItem>
            {/* all country looop */}
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="ga__stats">
        <InfoBox
          onClick={(e) => setCasesType('cases')}
          title="Coronavirus Cases"
          cases={countryInfo.todayCases}
          total={countryInfo.cases}
        />
        <InfoBox
          onClick={(e) => setCasesType('recovered')}
          title="Recovered"
          cases={countryInfo.todayRecovered}
          total={countryInfo.recovered}
        />
        <InfoBox
          onClick={(e) => setCasesType('deaths')}
          title="Deaths"
          cases={countryInfo.todayDeaths}
          total={countryInfo.deaths}

        />
      </div>

      <Map
        casesType={casesType}
        center={mapCenter}
        zoom={mapZoom}
        countries={mapCountries}
      />

    </UniDashboardContent >
  );
}