import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Chart.css'
function Chart() {

    const [chartData, setChartData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [chartInput, setChartInput] = useState([]);
    const [bool, setBool] = useState(false);

    useEffect(() => {
        fetch('/chartshow', {
            method: "get",
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(result => {
                setChartData(result.data)
                setBool(true)
                chartShow("A")
                setFilterData([...new Set(chartData.map(element =>
                    element.Type))])

            })

    }, [bool == true])

    const chartShow = (type) => {
        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        var newArray = [];
        for (var i = 0; i < 12; i++) {
            var obj = new Object();
            obj.month = months[i]
            obj.Number = 0
            chartData.map(element => {
                const field = element.Date.split("/")
                if (element.Type === type && i + 1 === parseInt(field[1], 10)) {
                    obj.Number += parseInt(element.Number)
                }
            })
            if (obj.Number !== 0)
                newArray.push(obj)

        }
        setChartInput(newArray)
    }

    const chooseOption = (e) => {
        chartShow(e.target.value)
    }

    return (
        <div >
            <h1 style={{margin:"80px 50px 50px",  color:"greenyellow" , textDecorationLine:"underline"}} >Bar Chart Presentation</h1>

            <label style={{ color: "red", margin: "30px" }} htmlFor="select">Select Type:
                <select onChange={(e) => chooseOption(e)} className="custom-select custom-select-sm mt-3 select" name="types" id="types"  >

                    {
                        filterData.map((typeData, index) => {
                            return (
                                <option key={index} value={typeData}>{typeData}</option>
                            )
                        })
                    }
                </select>
            </label>

            <BarChart className="chartBox" width={1300} height={400} data={chartInput}
                margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="Number" barSize={30} fill="#800000" />
            </BarChart>
            <h2 style={{ marginLeft: "130px", color: "red" }}>Developed By Praveen Pandey</h2>
        </div>
    )
}

export default Chart;
