import { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faSpinner,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  state = {
    dataCar: [],
    clickCar: {
      id: null,
      tipe: "",
    },
    dataPlat: [],
    clickPlat: {
      plat: {
        id: null,
        plat_name: "",
      },
    },
    dataDriver: [],
    clickDriver: {
      id: null,
      name: "",
    },
    chevronCar: false,
    chevronDriver: false,
    chevronPlat: false,
    buttonStop: {
      status: false,
      id_data: null,
    },
  };

  componentDidMount() {
    this.getDataCar();
    this.getDataDriver();
  }

  selectCar = (val) => {
    this.getDataPlat(val);
    this.setState({
      clickCar: val,
      chevronCar: false,
      clickPlat: {
        plat: {
          id: null,
          plat_name: "",
        },
      },
    });
    console.log("val", val);
  };

  startTracking = () => {
    const { clickCar, clickDriver, clickPlat } = this.state;

    if (
      clickCar.id != null &&
      clickDriver.id != null &&
      clickPlat.plat.id != null
    ) {
      console.log("CLICK");

      const payload = {
        armada_id: clickPlat.armada.id,
        driver_id: clickDriver.id,
        plat_id: clickPlat.plat.id,
        kendaraan_id: clickCar.id,
      };
      console.log("PAYLOAD", payload);

      axios
        .post("http://localhost:5000/tracking", payload)
        .then((response) => {
          this.setState({
            buttonStop: {
              status: true,
              id_data: response.data.data.id,
            },
          });
          console.log("RESPONSE", response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  stopTracking = () => {
    const { buttonStop } = this.state;
    console.log("id", buttonStop.id_data);
    axios
      .patch(`http://localhost:5000/tracking/${buttonStop.id_data}`, {})
      .then((response) => {
        console.log(response);
        this.setState({
          clickCar: {
            id: null,
            tipe: "",
          },
          dataPlat: [],
          clickPlat: {
            plat: {
              id: null,
              plat_name: "",
            },
          },
          clickDriver: {
            id: null,
            name: "",
          },
          chevronCar: false,
          chevronDriver: false,
          chevronPlat: false,
          buttonStop: {
            status: false,
            id_data: null,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getDataCar = () => {
    axios
      .get(`http://localhost:5000/car`)
      .then((res) => {
        // console.log("data", res.data);
        this.setState({ dataCar: res.data.data });
      })
      .catch((error) => {
        alert(error);
      });
  };

  getDataPlat = (val) => {
    axios
      .get(`http://localhost:5000/pivot?car=${val.id}`)
      .then((res) => {
        // console.log("data", res.data);
        this.setState({ dataPlat: res.data.data });
      })
      .catch((error) => {
        alert(error);
      });
  };

  getDataDriver = () => {
    axios
      .get(`http://localhost:5000/driver`)
      .then((res) => {
        // console.log("data", res.data);
        this.setState({ dataDriver: res.data.data });
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    const {
      dataCar,
      dataDriver,
      dataPivot,
      dataPlat,
      clickCar,
      clickDriver,
      clickPlat,
      chevronCar,
      chevronDriver,
      chevronPlat,
      buttonStop,
    } = this.state;

    console.log("buttonStop", buttonStop);
    return (
      <div className="container mx-auto mt-20 py-4 md:py-8 text-center bg-gradient-to-br from-red-300 via-red-300 to-red-400">
        {dataCar.length > 0 && dataDriver.length > 0 ? (
          <>
            <div className="text-2xl font-bold mb-8 text-white">TES KOSME</div>
            <div className="relative">
              <div className="text-sm font-bold mb-1 mr-28 ml-4 text-white">
                Kendaraan
              </div>
              <div
                className="rounded-lg cursor-pointer border w-44 justify-between text-white bg-gradient-to-r from-red-300 via-red-300 to-red-400 hover:bg-red-100 hover:border-red-200 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
                onClick={() => {
                  if (dataCar.length > 0) {
                    this.setState({
                      chevronCar: !chevronCar,
                      chevronDriver: false,
                      chevronPlat: false,
                    });
                  }
                }}
              >
                <div className="w-11/12 text-left">{clickCar.tipe}</div>
                <div className="w-1/12">
                  <FontAwesomeIcon
                    icon={chevronCar ? faChevronUp : faChevronDown}
                  />
                </div>
              </div>
              {chevronCar && (
                <div
                  className=" cursor-pointer z-10 w-44  divide-y divide-gray-100 shadow absolute top-full bottom-0 left-1/2"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <ul className="py-1 text-sm text-white bg-gradient-to-r from-red-300 via-red-300 to-red-400 border rounded-b-lg">
                    {dataCar.map((val, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          this.selectCar(val);
                        }}
                      >
                        <div className="block py-2 px-4 hover:bg-gray-100">
                          {val.tipe}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative my-4">
              <div className="text-sm font-bold mb-1 mr-28 ml-4 text-white">
                Plat Nomor
              </div>
              <div
                className="rounded-lg cursor-pointer border w-44 justify-between text-white bg-gradient-to-r from-red-300 via-red-300 to-red-400 hover:bg-red-100 hover:border-red-200 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
                onClick={() => {
                  if (dataPlat.length > 0) {
                    this.setState({
                      chevronPlat: !chevronPlat,
                      chevronCar: false,
                      chevronDriver: false,
                    });
                  }
                }}
              >
                <div className="w-11/12 text-left">
                  {clickPlat.plat.plat_name}
                </div>
                <div className="w-1/12">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>
              {chevronPlat && (
                <div
                  className=" cursor-pointer z-10 w-44  divide-y divide-gray-100 shadow absolute top-full bottom-0 left-1/2"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <ul className="py-1 text-sm text-white bg-gradient-to-r from-red-300 via-red-300 to-red-400 border rounded-b-lg">
                    {dataPlat.map((val, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          this.setState({ clickPlat: val, chevronPlat: false });
                        }}
                      >
                        <div className="block py-2 px-4 hover:bg-gray-100">
                          {val.plat.plat_name}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative">
              <div className="text-sm font-bold mb-1 mr-28 text-white">
                Driver
              </div>
              <div
                className="rounded-lg cursor-pointer border w-44 justify-between text-white bg-gradient-to-r from-red-300 via-red-300 to-red-400 hover:bg-red-100 hover:border-red-200 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
                onClick={() => {
                  if (dataDriver.length > 0) {
                    this.setState({
                      chevronDriver: !chevronDriver,
                      chevronCar: false,
                      chevronPlat: false,
                    });
                  }
                }}
              >
                <div className="w-11/12 text-left">{clickDriver.name}</div>
                <div className="w-1/12">
                  <FontAwesomeIcon
                    icon={chevronDriver ? faChevronUp : faChevronDown}
                  />
                </div>
              </div>
              {chevronDriver && (
                <div
                  className=" cursor-pointer z-10 w-44 divide-y divide-gray-100 shadow absolute  top-full bottom-0 left-1/2"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <ul className="py-1 text-sm text-white bg-gradient-to-r from-red-300 via-red-300 to-red-400 border rounded-b-lg">
                    {dataDriver.map((val, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          this.setState({
                            clickDriver: val,
                            chevronDriver: false,
                          });
                        }}
                      >
                        <div className="block py-2 px-4 hover:bg-gray-100">
                          {val.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-8 w-full text-center">
              {buttonStop.status ? (
                <div
                  className={`border-red-500 bg-red-500 cursor-pointer  mt-8 border-2 text-white rounded-full w-16 h-16 mx-auto py-auto`}
                  onClick={() => {
                    this.stopTracking();
                  }}
                >
                  <div className="mt-5 font-bold text-sm">FINISH</div>
                </div>
              ) : (
                <div
                  className={`${
                    clickCar.id != null &&
                    clickDriver.id != null &&
                    clickPlat.plat.id != null
                      ? "border-red-500 bg-red-500"
                      : "border-red-500 bg-red-500"
                  } cursor-pointer  mt-8 border-2 text-white rounded-full w-16 h-16 mx-auto py-auto`}
                  onClick={() => {
                    this.startTracking();
                  }}
                >
                  <div className="mt-5 font-bold text-sm">START</div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="animate-spin">
            <FontAwesomeIcon icon={faCircleNotch} />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
