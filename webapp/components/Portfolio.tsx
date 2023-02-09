"use client";
import ReactNodeProps from "@/interfaces/ReactNodeProps";
import { classNames } from "@/utils/utils";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

interface PortfolioItemProps {
  data: {
    stockID: string,
    currentPrice: number,
    changes: number
  }
}

const SimpleChart = () => {
  const chartDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('ccc');
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
    <div ref={chartDiv} style={{ width: "160px", height: "120px" }} className="chart"></div>
  );

}

const Item = (props: PortfolioItemProps & ReactNodeProps) => {
  return <div className={classNames("stat p-0 whitespace-nowrap border-0", props.className!)}>
    <div className="stat-figure text-primary">
      <SimpleChart />
    </div>
    <div className="p-4 min-w-[12rem]">
      <div className="text-md font-semibold mb-4">{props.data.stockID}</div>
      <div className="grid grid-cols-2 gap-1">
        <div className="text-sm font-normal text-gray-500">Total shares</div>
        <div className={classNames("text-md font-somibold", props.data.changes < 0 ? "text-rose-700" : "text-green-700")}>{props.data.currentPrice}</div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div className="text-sm font-normal text-gray-500">Total returns</div>
        <div className={classNames("flex items-center text-md font-somibold", props.data.changes < 0 ? "text-rose-700" : "text-green-700")}>
          {props.data.changes}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
          </svg>
        </div>
      </div>
    </div>
  </div>
}

const Portfolio = () => {
  const [slideIndex, setSlideIndex] = React.useState(0);

  return <div className="w-full">
    <h2 className="text-2xl font-semibold mb-4">
      My Portfolio
    </h2>

    <div className="w-full relative">

      <div className="carousel rounded-box w-full shadow bg-white">
        <div id="slide0" className="carousel-item w-full">
          <div className="w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              <Item className="" data={{ stockID: "AAPL", currentPrice: 14.23, changes: 2.3 }} />
              <Item className="" data={{ stockID: "META", currentPrice: 14.23, changes: 2.3 }} />
              <Item className="hidden lg:inline-grid" data={{ stockID: "GGLE", currentPrice: 14.23, changes: 2.3 }} />
              <Item className="hidden lg:inline-grid" data={{ stockID: "MSNS", currentPrice: 14.23, changes: 2.3 }} />
            </div>
            {slideIndex === 0 && <div className="absolute flex justify-between transform -translate-y-1/2 -left-3 -right-3 top-1/2">
              <a href="#slide1" className="btn btn-circle btn-xs bg-white shadow border-0 text-gray-500 hover:bg-gray-200" onClick={() => setSlideIndex(1)}>❮</a>
              <a href="#slide1" className="btn btn-circle btn-xs bg-white shadow border-0 text-gray-500 hover:bg-gray-200" onClick={() => setSlideIndex(1)}>❯</a>
            </div>}
          </div>
        </div>
        <div id="slide1" className="carousel-item w-full">
          <div className="w-full">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              <Item className="" data={{ stockID: "ACB", currentPrice: 14.23, changes: 2.3 }} />
              <Item className="" data={{ stockID: "VNM", currentPrice: 14.23, changes: 2.3 }} />
              <Item className="hidden lg:inline-grid" data={{ stockID: "SSI", currentPrice: 14.23, changes: 2.3 }} />
              <Item className="hidden lg:inline-grid" data={{ stockID: "HPG", currentPrice: 14.23, changes: 2.3 }} />
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