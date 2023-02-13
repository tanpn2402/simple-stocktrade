"use client";
import ReactNodeProps from "@/interfaces/ReactNodeProps";
import { classNames } from "@/utils/utils";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";


const SimpleChart = () => {
  const chartDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let root: am5.Root = am5.Root.new(chartDiv.current!);
    let theme = am5themes_Animated.new(root);
    // theme.rule("Grid").setAll({
    //   visible: false
    // });

    root.setThemes([
      theme
    ]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        pinchZoomX: false,
        marginLeft: -10
      })
    );

    let date = new Date();
    date.setHours(0, 0, 0, 0);

    let value = 20;

    let isUp = am5.math.round(Math.random() * 10 - 4.8 + value, 1) > value;

    function generateData() {
      value = am5.math.round(Math.random() * 10 - 4.8 + value, 1);
      if (value < 0) {
        value = Math.random() * 10;
      }

      if (value > 100) {
        value = 100 - Math.random() * 10;
      }
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value,
        strokeSettings: {
          stroke: isUp ? am5.color("rgb(34,197,94)") : am5.color("rgb(190, 18, 60)")
        },
        fillSettings: {
          fill: isUp ? am5.color("rgb(34,197,94)") : am5.color("rgb(190, 18, 60)")
        }
      };
    }

    function generateDatas(count: number) {
      let data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: {
          timeUnit: "day",
          count: 1
        },
        visible: false,

        renderer: am5xy.AxisRendererX.new(root, {
        }),
        // tooltip: am5.Tooltip.new(root, {}) // tooltip on Date axis
      })
    );

    xAxis.get("renderer").grid.template.setAll({
      strokeWidth: 0,
      visible: false
    })

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        visible: false,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    yAxis.get("renderer").grid.template.setAll({
      strokeWidth: 0,
      visible: false
    })

    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        minBulletDistance: 10,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}"
        })
      })
    );

    series.strokes.template.setAll({
      templateField: "strokeSettings",
      strokeWidth: 1
    });

    series.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true,
      templateField: "fillSettings"
    });

    // Set data
    series.data.setAll(generateDatas(160));


    // let rangeDate = new Date();
    // am5.time.add(rangeDate, "day", Math.round(series.dataItems.length / 2));
    // let rangeTime = rangeDate.getTime();

    // add series range
    let seriesRangeDataItem: am5.DataItem<am5xy.IValueAxisDataItem> = yAxis.makeDataItem({ value: 40, endValue: 0 });
    // let seriesRange: am5xy.ILineSeriesAxisRange = series.createAxisRange(seriesRangeDataItem);
    // seriesRange.fills?.template.setAll({
    //   visible: false,
    //   opacity: 0.3
    // });

    // seriesRange.fills?.template.set("fill", );
    // seriesRange.strokes?.template.set("stroke", am5.color("rgb(34,197,94)"));

    seriesRangeDataItem.get("grid")?.setAll({
      strokeOpacity: 1,
      visible: true,
      stroke: am5.color(0x000000),
      strokeDasharray: [2, 2]
    })

    seriesRangeDataItem.get("label")?.setAll({
      location: 0,
      visible: true,
      text: "Current",
      inside: true,
      centerX: 0,
      centerY: am5.p100,
      fontWeight: "normal"
    })


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    // cursor.lineX.set("forceHidden", true);
    cursor.lineY.set("forceHidden", true);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(100);
    chart.appear(100, 100);

    return () => {
      root.dispose();
    };
  }, [chartDiv]);

  return (
    <div ref={chartDiv} style={{ width: "100%", height: "100px" }} className="chart"></div>
  );
}

const Item = (props: PortfolioItemProps & ReactNodeProps) => {
  const changes = parseFloat((props.data.currentPrice - (props.data.ceilPrice + props.data.floorPrice) / 2).toFixed(2));
  return <div className={classNames("stat p-0 whitespace-nowrap border-0", props.className!)}>
    <div className="p-4 pb-0 w-full flex">
      <div className="grow text-lg font-bold">
        <span className="block max-w-[80%] truncate">{props.data.symbol}</span>
      </div>
      <div className={classNames("text-lg font-bold rounded w-min", changes < 0 ? "text-rose-700" : "text-green-700")}>{props.data.currentPrice}</div>
    </div>
    <div className="p-4 py-0 w-full flex">
      <div className="grow text-md font-normal text-gray-500">
        <span className="block max-w-[80%] truncate">{props.data.company}</span>
      </div>
      <div className={classNames("flex items-center text-sm font-semibold rounded w-min px-2", changes < 0 ? "text-rose-700" : "text-green-700", changes > 0 ? "bg-primary/[.1]" : "bg-rose-700/[.1]")}>
        {changes > 0 && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>}
        {changes < 0 && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
        </svg>}
        {changes}
      </div>
    </div>
    <div className="-mt-4">
      <SimpleChart />
    </div>
  </div>
}

interface PortfolioItemProps {
  data: {
    symbol: string,
    company: string,
    currentPrice: number,
    floorPrice: number,
    ceilPrice: number,
    changes?: number
  }
}

const MyPortfolio = [
  {
    "company": "Disney",
    "floorPrice": 40.68,
    "currentPrice": 15.24,
    "ceilPrice": 35.47,
    "symbol": "DIS"
  },
  {
    "company": "Dow Chemical",
    "floorPrice": 38.83,
    "currentPrice": 27.65,
    "ceilPrice": 44.67,
    "symbol": "DOW"
  },
  {
    "company": "Exxon Mobil",
    "floorPrice": 39.0,
    "currentPrice": 32.82,
    "ceilPrice": 91.36,
    "symbol": "XOM"
  },
  {
    "company": "Ford",
    "floorPrice": 27.34,
    "currentPrice": 18.63,
    "ceilPrice": 8.37,
    "symbol": "FRD"
  },
  {
    "company": "The Gap",
    "floorPrice": 46.0,
    "currentPrice": 11.56,
    "ceilPrice": 18.9,
    "symbol": "GPS"
  },
  {
    "company": "General Mills",
    "floorPrice": 15.59,
    "currentPrice": 22.1,
    "ceilPrice": 28.76,
    "symbol": "GIS"
  },
  {
    "company": "IBM",
    "floorPrice": 118.37,
    "currentPrice": 60.36,
    "ceilPrice": 116.3,
    "symbol": "IBM"
  },
  {
    "company": "PepsiCo",
    "floorPrice": 34.13,
    "currentPrice": 46.69,
    "ceilPrice": 73.74,
    "symbol": "PEP"
  }
]

const Portfolio = () => {
  const [slideIndex, setSlideIndex] = React.useState(0);

  return <div className="w-full">
    <div className="w-full relative">
      <div className="carousel rounded-box w-full shadow bg-white">
        <div id="slide0" className="carousel-item w-full">
          <div className="w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
              <Item className="" data={MyPortfolio[0]} />
              <Item className="" data={MyPortfolio[1]} />
              <Item className="hidden lg:inline-grid" data={MyPortfolio[2]} />
              <Item className="hidden lg:inline-grid" data={MyPortfolio[3]} />
              <Item className="hidden xl:inline-grid" data={MyPortfolio[4]} />
              <Item className="hidden xl:inline-grid" data={MyPortfolio[5]} />
              <Item className="hidden 2xl:inline-grid" data={MyPortfolio[6]} />
              <Item className="hidden 2xl:inline-grid" data={MyPortfolio[7]} />
            </div>
            {slideIndex === 0 && <div className="absolute flex justify-between transform -translate-y-1/2 -left-3 -right-3 top-1/2">
              <a href="#slide1" className="btn btn-circle btn-xs bg-white shadow border-0 text-gray-500 hover:bg-gray-200" onClick={() => setSlideIndex(1)}>❮</a>
              <a href="#slide1" className="btn btn-circle btn-xs bg-white shadow border-0 text-gray-500 hover:bg-gray-200" onClick={() => setSlideIndex(1)}>❯</a>
            </div>}
          </div>
        </div>
        <div id="slide1" className="carousel-item w-full">
          <div className="w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
              <Item className="" data={MyPortfolio[4]} />
              <Item className="" data={MyPortfolio[5]} />
              <Item className="hidden lg:inline-grid" data={MyPortfolio[6]} />
              <Item className="hidden lg:inline-grid" data={MyPortfolio[7]} />
              <Item className="hidden xl:inline-grid" data={MyPortfolio[0]} />
              <Item className="hidden xl:inline-grid" data={MyPortfolio[1]} />
              <Item className="hidden 2xl:inline-grid" data={MyPortfolio[2]} />
              <Item className="hidden 2xl:inline-grid" data={MyPortfolio[3]} />
            </div>
            {slideIndex === 1 && <div className="absolute flex justify-between transform -translate-y-1/2 -left-3 -right-3 top-1/2">
              <a href="#slide0" className="btn btn-circle btn-xs bg-white shadow border-0 text-gray-500 hover:bg-gray-200" onClick={() => setSlideIndex(0)}>❮</a>
              <a href="#slide0" className="btn btn-circle btn-xs bg-white shadow border-0 text-gray-500 hover:bg-gray-200" onClick={() => setSlideIndex(0)}>❯</a>
            </div>}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Portfolio;