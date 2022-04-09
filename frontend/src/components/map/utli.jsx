import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import { numeral } from 'numeral';
//numeral  {numeral(country.cases).format("0,0")}

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204,16,52)",
        half_op: "rgba(204,166,52,0.5)",
        multiplier: 80,
    },
    cases: {
        hex: "#7dd71d",
        rgb: "rgb(125,215,29)",
        half_op: "rgba(125,215,29,0.5)",
        multiplier: 120,
    },
    cases: {
        hex: "#fb4443",
        rgb: "rgb(251,68,67)",
        half_op: "rgba(251,68,67,0.5)",
        multiplier: 200,
    }
}
export const printStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") => (
    data.map(country => (
        <Circle center={
            [country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            fillOpacity={0.4}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }>
            <Popup>
                <div className='info'>
                    <div className='info-flag' style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                    <div className='info-name'>{country.country}</div>
                    <div className='info-confirmed'>Cases: {country.cases}</div>
                    <div className='info-recovered'>Recovered: {country.recovered}</div>
                    <div className='info-deaths'>Deaths: {country.deaths}</div>
                </div>
            </Popup>
        </Circle>

    ))
)