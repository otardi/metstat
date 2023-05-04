import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { lTop5,lCauses,lParH } from "./metrodata.js"

const Topbar = () => {
  return (
    <div className="bg-primary text-light">
      <div className="display-6 p-2">
        Incidents dans le métro de Mourial
      </div>
    </div>
  );
}

const Top5Stations = (p) =>  {
  return (
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Top 5 Stations</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Nombre d'incidents</th>
            </tr>
          </thead>
          <tbody>
            {p.l.map((e) => (
              <tr>
                <td>{e.nom}</td>
                <td>{e.nb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const PieCauses = (p) => {
  return (
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Causes</h3>
        <Chart
          chartType="PieChart"
          data={p.l}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  );
}

const HistIncidentParHeure = (p) => {
  return (
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Total par heure</h3>
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={p.l}
        />
      </div>
    </div>
  );
  };

const Top10StationParMois = () => (
  <div>Top10StationParMois</div>
);

const IncidentsParMois = () => (
  <div>IncidentsParMois</div>
);
const TopCauses = () => (
  <div>TopCauses</div>
);
const HistHeuresHot = () => (
  <div>HistHeuresHot</div>
);
const HistJoursHot = () => (
  <div>HistJoursHot</div>
);

const DetailStation = () => {
  return (
    <>
        <div className="row">
          <div className="col-4">Infos station + dropDown</div>
          <div className="col-4">
            <IncidentsParMois />
          </div>
          <div className="col-4">
            <TopCauses />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <HistHeuresHot />
          </div>
          <div className="col-6">
            <HistJoursHot />
          </div>
        </div>
    </>
  );
}
  


const StationsParCauseEtMois = () => (
  <div>StationsParCauseEtMois</div>
);

const App = () => {

  return (
    <div className="container-fluid">
      <div className="row">
        <Topbar />
      </div>
      <div className="row m-2">
        <div className="col-6">
          <Top5Stations l={lTop5}/>
        </div>
        <div className="col-6">
          <PieCauses l={lCauses}/>
        </div>
      </div>
      <div className="row m-2">
        <div className="col-12">
          <HistIncidentParHeure l={lParH}/>
        </div>
      </div>
      <div className="row m-2">
        <div className="col-12">
          <Top10StationParMois />
        </div>
      </div>
      <div className="row m-2">
        <div className="col-12">
          <DetailStation />
        </div>
      </div>
      <div className="row m-2">
        <div className="col-12">
          <StationsParCauseEtMois />
        </div>
      </div>
    </div>
  );
};


export default App;
