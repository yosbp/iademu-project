import { getChartColorsArray } from "@/app/utils.ts";

//  Total Employee
export const totalEmployeeChart = {
  series: [10],
  chartOptions: {
    chart: {
      height: 110,
      type: "radialBar",
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "50%"
        },
        track: {
          margin: 2
        },
        dataLabels: {
          show: false
        }
      }
    },
    grid: {
      padding: {
        top: -15,
        bottom: -15
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Total Employee"],
    colors: getChartColorsArray('["bg-custom-500"]')
  }
};

//  Total Application
export const totalApplicationChart = {
  series: [60],
  chartOptions: {
    chart: {
      height: 110,
      type: "radialBar",
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "50%"
        },
        track: {
          margin: 2
        },
        dataLabels: {
          show: false
        }
      }
    },
    grid: {
      padding: {
        top: -15,
        bottom: -15
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Total Employee"],
    colors: getChartColorsArray('["bg-purple-500"]')
  }
};

//  Hired Candidates
export const hiredCandidatesChart = {
  series: [25],
  chartOptions: {
    chart: {
      height: 110,
      type: "radialBar",
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "50%"
        },
        track: {
          margin: 2
        },
        dataLabels: {
          show: false
        }
      }
    },
    grid: {
      padding: {
        top: -15,
        bottom: -15
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Total Employee"],
    colors: getChartColorsArray('["bg-green-500"]')
  }
};

//  Rejected Candidates
export const rejectedCandidatesChart = {
  series: [75],
  chartOptions: {
    chart: {
      height: 110,
      type: "radialBar",
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "50%"
        },
        track: {
          margin: 2
        },
        dataLabels: {
          show: false
        }
      }
    },
    grid: {
      padding: {
        top: -15,
        bottom: -15
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Total Employee"],
    colors: getChartColorsArray('["bg-red-500"]')
  }
};

//Application Received
export const applicationReceivedChart = {
  series: [
    {
      name: "Total Application",
      type: "area",
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    },
    {
      name: "Hired Candidates",
      type: "line",
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }
  ],
  chartOptions: {
    chart: {
      height: 260,
      type: "line",
      stacked: false,
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      toolbar: {
        show: false
      }
    },
    stroke: {
      width: [2, 2],
      curve: "smooth"
    },
    plotOptions: {
      bar: {
        columnWidth: "50%"
      }
    },

    fill: {
      opacity: [0.03, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    colors: getChartColorsArray('["bg-custom-500", "bg-green-500"]'),
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: -15,
        right: 0
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y: any) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        }
      }
    }
  }
};