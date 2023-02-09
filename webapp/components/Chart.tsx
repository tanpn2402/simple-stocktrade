"use client";
import ReactNodeProps from "@/interfaces/ReactNodeProps";
import { classNames } from "@/utils/utils";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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

const Chart = (props : ReactNodeProps) => {
  const chartDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let root = am5.Root.new(chartDiv.current!) as am5.Root;
    let theme = am5themes_Animated.new(root);
    theme.rule("Grid").setAll({
      strokeWidth: 1
    });
    root.setThemes([
      theme
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true
    }));


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    // cursor.lineX.set("forceHidden", true);
    // cursor.lineY.set("forceHidden", true);

    // Generate random data
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


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {})
    }));

    // xAxis.get("renderer").grid.template.setAll({
    //   // strokeWidth: 1,
    //   visible: true,
    //   stroke: am5.color("rgb(226, 232, 240)")
    // })

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    // yAxis.get("renderer").grid.template.setAll({
    //   stroke: am5.color("rgb(226, 232, 240)")
    // })


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

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
    let data = generateDatas(300);
    series.data.setAll(data);


    // add series range
    let seriesRangeDataItem: am5.DataItem<am5xy.IValueAxisDataItem> = yAxis.makeDataItem({ value: 40, endValue: 0 });
    let seriesRange: am5xy.ILineSeriesAxisRange = series.createAxisRange(seriesRangeDataItem);
    seriesRange.fills?.template.setAll({
      visible: true,
      opacity: 0.3
    });

    seriesRange.fills?.template.set("fill", am5.color(0x000000));
    seriesRange.strokes?.template.set("stroke", am5.color(0x000000));

    seriesRangeDataItem.get("grid")?.setAll({
      strokeOpacity: 1,
      visible: true,
      stroke: am5.color(0x000000),
      strokeDasharray: [2, 2]
    })

    seriesRangeDataItem.get("label")?.setAll({
      location: 0,
      visible: true,
      text: "Target",
      inside: true,
      centerX: 0,
      centerY: am5.p100,
      fontWeight: "bold"
    })

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartDiv]);

  return (
    <div className={classNames("rounded-box w-full shadow bg-white", props.className!)}>
      {/*  border-b-2 border-gray-300 */}
      <div className="mx-8 pt-8 pb-4 flex">
        <div className="grow">
          <h2 className="text-2xl font-bold mb-2">Apple Inc.</h2>
          <div className="text-md font-normal text-gray-500">AAPL</div>
        </div>
        <div className="text-right">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="badge badge-md pl-2 bg-rose-700 border-rose-700">
              <span>-1,34%</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">$150,74</h2>
          </div>
          <div className="text-md font-normal text-gray-500">Last update at 14:20</div>
        </div>
      </div>
      <div ref={chartDiv} style={{ width: "100%", height: "500px" }}></div>
    </div>
  );

}

export default Chart;