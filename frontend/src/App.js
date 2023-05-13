import './App.css';
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
          <RechercheParDate />
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
    <div className="card flex-fill">
      <div className="card-body">
        <h3 className="card-title">Top 5 Stations</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Nombre d'incidents</th>
            </tr>
          </thead>
          <tbody>
            {listeTopStations.map((e) => (
              <tr key={e.nom}>
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
    <div className="card flex-fill">
      <div className="card-body">
        <h3 className="card-title">Causes</h3>
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
  const [lJson,setLJson] = useState([]);
  const [listeIncParHeure,setIncParHeure] = useState([]);

  // Lancé au 1er render
  useEffect(() => {
    async function fetchIncParHeure() {
        const reponse = await fetch("http://192.168.8.141:2999/incidentparheure");
        const jsonlist = await reponse.json();
        setLJson(jsonlist);
    }
    fetchIncParHeure();
  }, []); 

  // Lancé chaque fois que lJson change
  useEffect(() => {
    // Transformer les données de json au format de google charts
    // [{heure,nb},...] -> [[heure,nb]]
    // Le premier élément doit être les noms des
    // colonnes
    let l = lJson.map(e => [e.heure+'h', e.nb]);
    l = [["Heure","Nombre d'incidents"],...l];
    // TODO *****************************
    // heure '25' est 1h00 donc on la replace au début
    /* let h25 = l.pop();
    l = [["Heure","Nombre d'incidents"],['1h',h25.nb],...l]; */
    setIncParHeure(l);
  }, [lJson]);

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Total par heure</h3>
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={listeIncParHeure}
        />
      </div>
    </div>
  );
  };


const RechercheParDate = () => {

  const [selectedDate, setSelectedDate] = useState(new Date('2019-01-01'));
  const [lJson, setLJson] = useState([]);

  useEffect(() => {
    async function fetchNbIncParDate() {
      const sDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate() }`;
      const reponse = await fetch("http://192.168.8.141:2999/incidentpardate/" + sDate);
      const jsonlist = await reponse.json();
      setLJson(jsonlist);
    }
    fetchNbIncParDate();
  }, [selectedDate]); 

  return (
    <>
      <div className='row'>
        <h2>Recherche par date</h2>
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
      </div>
      <div className='row'>
        <div className='col-3 mt-2'>
          <NbIncJourTotal d={lJson} />
        </div>
        <div className='col-6'>
          <NbIncJourParHeure d={selectedDate} />
        </div>
        <div className='col-3'>
          <NbIncJourCauses d={selectedDate} />
        </div>
      </div>
    </>
  );
};

const NbIncJourTotal = ({d}) => {

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Incidents</h3>
        <h1>{d.length}</h1>
      </div>
    </div>
  );
}

const NbIncJourParHeure = ({d}) => {
  
}

const NbIncJourCauses = ({d}) => {
  
}

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
