import './App.css';
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const Topbar = () => {
  return (
    <div className="bg-primary text-light">
      <div className="display-6 p-2">
        Incidents dans le métro de Mourial
      </div>
    </div>
  );
}

function App() {

  return (
    <div className="container-fluid">
      <div className="row">
        <Topbar />
      </div>
      <div className="row m-2">
        <div className="col-6 d-flex">
          <Top5Stations />
        </div>
        <div className="col-6 d-flex">
          <PieCauses />
        </div>
      </div>
      <div className="row m-2">
        <div className="col-12">
          <HistIncidentParHeure />
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



const Top5Stations = () =>  {
  const [listeTopStations,setTopStations] = useState([]);

  useEffect(() => {
    async function fetchTopStations() {
        const reponse = await fetch("http://192.168.8.141:2999/top5stations");
        const l = await reponse.json();
        setTopStations(l);
    }
    fetchTopStations();
  }, []);

  return (
    <div class="card flex-fill">
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
            {listeTopStations.map((e) => (
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


const PieCauses = () => {

  const [lJson,setLJson] = useState([]);
  const [listeTopCauses,setTopCauses] = useState([]);

  // Lancé au 1er render
  useEffect(() => {
    async function fetchTopCauses() {
        const reponse = await fetch("http://192.168.8.141:2999/piecauses");
        const jsonlist = await reponse.json();
        setLJson(jsonlist);
    }
    fetchTopCauses();
  }, []); 

  // Lancé chaque fois que lJson change
  useEffect(() => {
    // Transformer les données de json au format de google charts
    // [{cause,nb},...] -> [[cause,nb]]
    // Et pour PieChart le premier élément doit être les noms des
    // colonnes
    let l = lJson.map(e => [e.type, e.nb]);
    l = [["Cause","Nombre d'incidents total"],...l];
    setTopCauses(l);
  }, [lJson]);

  return (
    <div class="card flex-fill">
      <div class="card-body">
        <h3 class="card-title">Causes</h3>
        <Chart
          chartType="PieChart"
          data={listeTopCauses}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  );
}

const HistIncidentParHeure = () => {
  const p = {}
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


export default App;
