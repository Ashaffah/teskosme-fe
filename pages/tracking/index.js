import axios from "axios";
import { Component } from "react";

class Tracking extends Component {
  state = {
    dataTracking: [],
  };
  componentDidMount() {
    this.getDataTracking();
  }

  getDataTracking = () => {
    axios
      .get(`http://localhost:5000/tracking`)
      .then((res) => {
        // console.log("data", res.data);
        this.setState({ dataTracking: res.data.data });
      })
      .catch((error) => {
        alert(error);
      });
  };
  render() {
    const { dataTracking } = this.state;
    console.log("DATATRACKING", dataTracking);
    return (
      <>
        <div className="container mx-auto mt-40">
          <div className="text-2xl text-black font-semibold mb-4 ml-6">
            Tracking Page
          </div>
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead class="border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Armada
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Driver
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Kendaraan
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Plat
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Start Time
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Finish
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTracking.map((val, index) => (
                        <tr class="border-b">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {val.armada.nama_armada}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {val.driver.name}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {val.kendaraan.tipe}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {val.plat.plat_name}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {val.start_time}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {val.finish_time != null
                              ? val.finish_time
                              : "Dalam Perjalanan"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Tracking;
