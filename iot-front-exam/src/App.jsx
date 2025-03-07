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

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <header id="header" className="header fixed-top d-flex align-items-center">

        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">Groupe-IoT</span>
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

            <div className="col-lg-8">
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
                      <h5 className="card-title">Reports <span>/Today</span></h5>

                      {/* <ReportsChart /> */}
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
                            <th scope="col">Humidité</th>
                            <th scope="col">Temperature</th>
                            <th scope="col">pollution</th>
                            <th scope="col">Lumière</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            datas?.last5Lines.length > 0 ? (
                              datas?.last5Lines?.map((line) => (
                                <tr>
                                  <th scope="row">#{line.ID}</th>
                                  <td>{line.humidute}</td>
                                  <td>{line.temperature}</td>
                                  <td>{line.pollution}</td>
                                  <td>{line.lumiere}</td>
                                </tr>
                              ))

                            ) : ('Aucune donnée disponible')
                          }
                        </tbody>
                      </table>

                    </div>

                  </div>
                </div>

                <div className="col-12">
                  <div className="card top-selling overflow-auto">

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

                    <div className="card-body pb-0">
                      <h5 className="card-title">Top Selling <span>| Today</span></h5>

                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col">Preview</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row"><a href="#"><img src="assets/img/product-1.jpg" alt="" /></a></th>
                            <td><a href="#" className="text-primary fw-bold">Ut inventore ipsa voluptas nulla</a></td>
                            <td>$64</td>
                            <td className="fw-bold">124</td>
                            <td>$5,828</td>
                          </tr>
                          <tr>
                            <th scope="row"><a href="#"><img src="assets/img/product-2.jpg" alt="" /></a></th>
                            <td><a href="#" className="text-primary fw-bold">Exercitationem similique doloremque</a></td>
                            <td>$46</td>
                            <td className="fw-bold">98</td>
                            <td>$4,508</td>
                          </tr>
                          <tr>
                            <th scope="row"><a href="#"><img src="assets/img/product-3.jpg" alt="" /></a></th>
                            <td><a href="#" className="text-primary fw-bold">Doloribus nisi exercitationem</a></td>
                            <td>$59</td>
                            <td className="fw-bold">74</td>
                            <td>$4,366</td>
                          </tr>
                          <tr>
                            <th scope="row"><a href="#"><img src="assets/img/product-4.jpg" alt="" /></a></th>
                            <td><a href="#" className="text-primary fw-bold">Officiis quaerat sint rerum error</a></td>
                            <td>$32</td>
                            <td className="fw-bold">63</td>
                            <td>$2,016</td>
                          </tr>
                          <tr>
                            <th scope="row"><a href="#"><img src="assets/img/product-5.jpg" alt="" /></a></th>
                            <td><a href="#" className="text-primary fw-bold">Sit unde debitis delectus repellendus</a></td>
                            <td>$79</td>
                            <td className="fw-bold">41</td>
                            <td>$3,239</td>
                          </tr>
                        </tbody>
                      </table>

                    </div>

                  </div>
                </div>

              </div>
            </div>

            <div className="col-lg-4">

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
                  <h5 className="card-title">Recent Activity <span>| Today</span></h5>

                  <div className="activity">

                    <div className="activity-item d-flex">
                      <div className="activite-label">32 min</div>
                      <i className='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                      <div className="activity-content">
                        Quia quae rerum <a href="#" className="fw-bold text-dark">explicabo officiis</a> beatae
                      </div>
                    </div>{/* End activity item*/}

                    <div className="activity-item d-flex">
                      <div className="activite-label">56 min</div>
                      <i className='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
                      <div className="activity-content">
                        Voluptatem blanditiis blanditiis eveniet
                      </div>
                    </div>{/* End activity item*/}

                    <div className="activity-item d-flex">
                      <div className="activite-label">2 hrs</div>
                      <i className='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
                      <div className="activity-content">
                        Voluptates corrupti molestias voluptatem
                      </div>
                    </div>{/* End activity item*/}

                    <div className="activity-item d-flex">
                      <div className="activite-label">1 day</div>
                      <i className='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                      <div className="activity-content">
                        Tempore autem saepe <a href="#" className="fw-bold text-dark">occaecati voluptatem</a> tempore
                      </div>
                    </div>{/* End activity item*/}

                    <div className="activity-item d-flex">
                      <div className="activite-label">2 days</div>
                      <i className='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                      <div className="activity-content">
                        Est sit eum reiciendis exercitationem
                      </div>
                    </div>{/* End activity item*/}

                    <div className="activity-item d-flex">
                      <div className="activite-label">4 weeks</div>
                      <i className='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                      <div className="activity-content">
                        Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
                      </div>
                    </div>{/* End activity item*/}

                  </div>

                </div>
              </div>{/* End Recent Activity */}

              {/* Budget Report */}
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

                <div className="card-body pb-0">
                  <h5 className="card-title">Budget Report <span>| This Month</span></h5>

                  <div id="budgetChart" className="echart"></div>

                  <BudgetRadarChart />

                </div>
              </div>{/* End Budget Report */}

              {/* Website Traffic */}
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

                <div className="card-body pb-0">
                  <h5 className="card-title">Website Traffic <span>| Today</span></h5>

                  <div id="trafficChart" className="echart"></div>

                  <TrafficChart />

                </div>
              </div>{/* End Website Traffic */}

              {/* News & Updates Traffic */}
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

                <div className="card-body pb-0">
                  <h5 className="card-title">News &amp; Updates <span>| Today</span></h5>

                  <div className="news">
                    <div className="post-item clearfix">
                      <img src="assets/img/news-1.jpg" alt="" />
                      <h4><a href="#">Nihil blanditiis at in nihil autem</a></h4>
                      <p>Sit recusandae non aspernatur laboriosam. Quia enim eligendi sed ut harum...</p>
                    </div>

                    <div className="post-item clearfix">
                      <img src="assets/img/news-2.jpg" alt="" />
                      <h4><a href="#">Quidem autem et impedit</a></h4>
                      <p>Illo nemo neque maiores vitae officiis cum eum turos elan dries werona nande...</p>
                    </div>

                    <div className="post-item clearfix">
                      <img src="assets/img/news-3.jpg" alt="" />
                      <h4><a href="#">Id quia et et ut maxime similique occaecati ut</a></h4>
                      <p>Fugiat voluptas vero eaque accusantium eos. Consequuntur sed ipsam et totam...</p>
                    </div>

                    <div className="post-item clearfix">
                      <img src="assets/img/news-4.jpg" alt="" />
                      <h4><a href="#">Laborum corporis quo dara net para</a></h4>
                      <p>Qui enim quia optio. Eligendi aut asperiores enim repellendusvel rerum cuder...</p>
                    </div>

                    <div className="post-item clearfix">
                      <img src="assets/img/news-5.jpg" alt="" />
                      <h4><a href="#">Et dolores corrupti quae illo quod dolor</a></h4>
                      <p>Odit ut eveniet modi reiciendis. Atque cupiditate libero beatae dignissimos eius...</p>
                    </div>

                  </div>{/* End sidebar recent posts*/}

                </div>
              </div>{/* End News & Updates */}

            </div>{/* End Right side columns */}

          </div>
        </section>

      </main>

      <footer id="footer" className="footer">
        <div className="copyright">
          &copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>
      </footer>

      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </div>
  )
}

export default App
