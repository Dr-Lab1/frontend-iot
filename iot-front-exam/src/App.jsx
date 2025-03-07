import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TrafficChart from './components/TrafficChart'
import BudgetRadarChart from './components/BudgetRadarChart'
import ReportsChart from './components/ReportsChart'
import PieChart from './components/PieChart'
import axios from "axios";
import LineChart from './components/LineChart'
import dayjs from "dayjs";


function App() {

  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://backend-iot.cafe-numerique.org/api/get-data")
      .then((response) => {
        console.log(response.data.array);

        setData(response.data.array);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const timestamp = dateString;

    return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss")
  }

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <header id="header" className="header fixed-top d-flex align-items-center">

        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">Groupe-8-IoT</span>
          </a>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">

            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>


          </ul>
        </nav>

      </header>

      <main id="main" className="main ms-0">

        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">

            <div className="col-12">
              <div className="row">

                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">

                    <div className="card-body">
                      <h5 className="card-title">Humidité</h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          {/* <i className="bi bi-cart"></i> */}
                          <i class="bi bi-moisture"></i>
                        </div>
                        <div className="ps-3">
                          <h6>
                            {datas.avgHumidite.toPrecision(3)}
                          </h6>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card revenue-card">

                    <div className="card-body">
                      <h5 className="card-title">Lumière</h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          {/* <i className="bi bi-currency-dollar"></i> */}
                          <i class="bi bi-lightbulb-fill"></i>
                        </div>
                        <div className="ps-3">
                          <h6>
                            {datas.avgLumiere.toPrecision(4)}
                          </h6>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="col-xxl-4 col-xl-12">

                  <div className="card info-card customers-card">

                    <div className="card-body">
                      <h5 className="card-title">Pollution</h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="bi bi-fire"></i>
                        </div>
                        <div className="ps-3">
                          <h6>
                            {datas.avgPollution.toPrecision(3)}
                          </h6>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">

                    <div className="card-body">
                      <h5 className="card-title">Temperature</h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="bi bi-thermometer-sun"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{datas.avgTemperature.toPrecision(3)}</h6>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="col-xxl-8 col-md-12">
                  <div className="card info-card revenue-card">

                    <div className="card-body">
                      <h5 className="card-title">Total champs</h5>

                      <div className="d-flex align-items-center justify-content-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="bi bi-list-ol"></i>
                        </div>
                        <div className="ps-3">
                          <h6>
                            {datas.dataLength}
                          </h6>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="col-12">
                  <div className="card">

                    <div className="card-body">
                      <h5 className="card-title">Reports</h5>

                      <PieChart datas={datas} />

                    </div>

                  </div>
                </div>

                <div className="col-12">
                  <div className="card">

                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li><a className="dropdown-item" href="#">Today</a></li>
                        <li><a className="dropdown-item" href="#">This Month</a></li>
                        <li><a className="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">Variations température</h5>

                      <LineChart datas={datas} />

                    </div>

                  </div>
                </div>

                <div className="col-12">
                  <div className="card recent-sales overflow-auto">

                    <div className="card-body">
                      <h5 className="card-title">Les plus récents</h5>

                      <table className="table table-borderless datatable">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Humidité (%)</th>
                            <th scope="col">Temperature (°C)</th>
                            <th scope="col">Pollution (ug/m3)</th>
                            <th scope="col">Lumière (lm/m2)</th>
                            <th scope="col">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            datas?.last5Lines.length > 0 ? (
                              datas?.last5Lines?.map((line) => (
                                <tr>
                                  <th scope="row">#{line.ID}</th>
                                  <td>{line.humidite}</td>
                                  <td>{line.temperature}</td>
                                  <td>{line.pollution}</td>
                                  <td>{line.lumiere}</td>
                                  <td>{formatDate(line.timestamp)}</td>
                                </tr>
                              ))

                            ) : ('Aucune donnée disponible')
                          }
                        </tbody>
                      </table>

                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

      </main>

      <footer id="footer" className="footer">
        <div className="copyright">
          &copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="">Groupe 8</a>
        </div>
      </footer>

      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </div>
  )
}

export default App
