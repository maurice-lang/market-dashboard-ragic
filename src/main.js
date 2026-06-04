const { useEffect, useMemo, useRef, useState } = React;
const Z = decodeURIComponent;

const txt = {
  vegIcon: Z("%E8%94%AC"),
  fruitIcon: Z("%E6%9E%9C"),
  poultryIcon: Z("%E7%A6%BD"),
  fishIcon: Z("%E9%AD%9A"),
  vegetablesLabel: Z("%E8%94%AC%E8%8F%9C%E6%9C%80%E6%96%B0%E5%8B%95%E6%85%8B"),
  vegetables: Z("%E8%94%AC%E8%8F%9C"),
  farmSource: Z("%E8%87%BA%E5%8C%97%E8%BE%B2%E7%94%A2%E9%81%8B%E9%8A%B7%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8"),
  fruitsLabel: Z("%E6%B0%B4%E6%9E%9C%E6%9C%80%E6%96%B0%E5%8B%95%E6%85%8B"),
  fruits: Z("%E6%B0%B4%E6%9E%9C"),
  livestockLabel: Z("%E5%AE%B6%E7%A6%BD%E6%9C%80%E6%96%B0%E5%8B%95%E6%85%8B%E5%8F%8A%E8%B6%A8%E5%8B%A2"),
  livestock: Z("%E5%AE%B6%E7%A6%BD"),
  livestockSource: Z("%E8%87%BA%E5%8C%97%E7%95%9C%E7%94%A2%E9%81%8B%E9%8A%B7%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8"),
  seafoodLabel: Z("%E6%BC%81%E7%94%A2%E6%9C%80%E6%96%B0%E5%8B%95%E6%85%8B%E5%8F%8A%E8%B6%A8%E5%8B%A2"),
  seafood: Z("%E6%BC%81%E7%94%A2"),
  seafoodAlt: Z("%E9%AD%9A%E7%94%A2"),
  seafoodSource: Z("%E6%BC%81%E7%94%A2%E5%93%81%E5%85%A8%E7%90%83%E8%B3%87%E8%A8%8A%E7%B6%B2"),
  title: Z("%E8%87%BA%E5%8C%97%E5%B8%82%E8%BE%B2%E7%94%A2%E5%93%81%E6%89%B9%E7%99%BC%E5%B8%82%E5%A0%B4%E4%BA%A4%E6%98%93%E8%B3%87%E8%A8%8A"),
  date: Z("%E6%97%A5%E6%9C%9F"),
  trendTitle: Z("%E9%80%B2%E8%B2%A8%E9%87%8F%E8%B6%A8%E5%8B%A2%E5%9C%96"),
  note: Z("%E5%82%99%E8%A8%BB%EF%BC%9A%E5%A6%82%E8%A9%B2%E6%97%A5%E7%82%BA%E4%BC%91%E5%B8%82%E6%97%A5%E8%B3%87%E6%96%99%E5%91%88%E7%8F%BE%E7%82%BA%200"),
  arrivalChange: Z("%E5%88%B0%E8%B2%A8%E9%87%8F%E8%BC%83%E5%89%8D%E6%97%A5%E6%BC%B2%E5%B9%85"),
  priceChange: Z("%E5%B9%B3%E5%9D%87%E5%83%B9%E6%A0%BC%E8%BC%83%E5%89%8D%E6%97%A5%E6%BC%B2%E5%B9%85"),
  csvTooShort: Z("CSV%20%E8%87%B3%E5%B0%91%E9%9C%80%E8%A6%81%E6%A8%99%E9%A1%8C%E5%88%97%E5%92%8C%E4%B8%80%E7%AD%86%E8%B3%87%E6%96%99%E3%80%82"),
  csvMissing: Z("CSV%20%E7%BC%BA%E5%B0%91%E6%AC%84%E4%BD%8D%EF%BC%9A"),
  csvVersion: Z("CSV%20%E5%8C%AF%E5%85%A5%E7%89%88"),
  mockStatus: Z("%E7%9B%AE%E5%89%8D%E4%BD%BF%E7%94%A8%20mock%20JSON%20%E8%B3%87%E6%96%99"),
  imported: Z("%E5%B7%B2%E5%8C%AF%E5%85%A5%20"),
  total: Z("%EF%BC%8C%E5%85%B1%20"),
  rows: Z("%20%E7%AD%86%E8%B3%87%E6%96%99"),
  navLabel: Z("%E5%B8%82%E5%A0%B4%E5%88%86%E9%A1%9E"),
  csvImport: Z("Ragic%20%E8%B3%87%E6%96%99%E6%9F%A5%E8%A9%A2"),
  loadSample: Z("%E8%BC%89%E5%85%A5%E7%AF%84%E4%BE%8B"),
  queryRagic: Z("%E6%9F%A5%E8%A9%A2%20Ragic"),
  startDate: Z("%E8%B5%B7%E6%97%A5"),
  endDate: Z("%E8%BF%84%E6%97%A5"),
  ragicVersion: Z("Ragic%20JSON%20%E6%B8%AC%E8%A9%A6%E7%89%88"),
  ragicSource: Z("Ragic%20%E7%99%BC%E4%BD%88%E5%88%B0%E7%B6%B2%E8%B7%AF"),
  missingPrefix: Z("%E7%BC%BA%E4%B9%8F%E8%B3%87%E6%96%99%EF%BC%9A"),
  missingRange: Z("%E7%BC%BA%E4%B9%8F%E8%A9%B2%E5%8D%80%E9%96%93%E8%B3%87%E6%96%99"),
  invalidDateRange: Z("%E8%AB%8B%E7%A2%BA%E8%AA%8D%E8%B5%B7%E6%97%A5%E4%B8%8D%E6%99%9A%E6%96%BC%E8%BF%84%E6%97%A5"),
  emptyDateRange: Z("%E8%AB%8B%E9%81%B8%E6%93%87%E8%B5%B7%E6%97%A5%E8%88%87%E8%BF%84%E6%97%A5"),
  kpiRegion: Z("%E9%87%8D%E9%BB%9E%E6%8C%87%E6%A8%99"),
  source: Z("%E8%B3%87%E6%96%99%E4%BE%86%E6%BA%90%EF%BC%9A"),
  version: Z("%E7%89%88%E6%9C%AC%E8%B3%87%E8%A8%8A%EF%BC%9A"),
  daily: Z("%E9%A0%BB%E7%8E%87%EF%BC%9A%E6%AF%8F%E6%97%A5"),
  updated: Z("%E6%9C%80%E5%BE%8C%E6%9B%B4%E6%96%B0%E6%99%82%E9%96%93%EF%BC%9A")
};

const icons = {
  vegetables: txt.vegIcon,
  fruits: txt.fruitIcon,
  livestock: txt.poultryIcon,
  seafood: txt.fishIcon
};

const categoryInfo = {
  vegetables: { label: txt.vegetablesLabel, title: txt.vegetables, source: txt.farmSource },
  fruits: { label: txt.fruitsLabel, title: txt.fruits, source: txt.farmSource },
  livestock: { label: txt.livestockLabel, title: txt.livestock, source: txt.livestockSource },
  seafood: { label: txt.seafoodLabel, title: txt.seafood, source: txt.seafoodSource }
};

const categoryAliases = {
  vegetables: "vegetables",
  vegetable: "vegetables",
  veg: "vegetables",
  [txt.vegetables]: "vegetables",
  fruits: "fruits",
  fruit: "fruits",
  [txt.fruits]: "fruits",
  livestock: "livestock",
  poultry: "livestock",
  chicken: "livestock",
  [txt.livestock]: "livestock",
  seafood: "seafood",
  fish: "seafood",
  [txt.seafood]: "seafood",
  [txt.seafoodAlt]: "seafood"
};

function arrivalLabel(title) {
  return `${title}${Z("%E5%88%B0%E8%B2%A8%E9%87%8F(%E5%85%AC%E5%99%B8)")}`;
}

function priceLabel(title) {
  return `${title}${Z("%E5%B9%B3%E5%9D%87%E5%83%B9%20(%E5%85%83%2F%E5%85%AC%E6%96%A4)")}`;
}

const marketData = {
  vegetables: {
    ...categoryInfo.vegetables,
    version: "v20260602" + Z("%E7%89%88"),
    updatedAt: "2026/06/02",
    kpis: [
      { label: arrivalLabel(txt.vegetables), value: "1,482.40" },
      { label: txt.arrivalChange, value: "4.18%" },
      { label: priceLabel(txt.vegetables), value: "36.80" },
      { label: txt.priceChange, value: "-2.15%" }
    ],
    dates: ["2026/05/24", "2026/05/25", "2026/05/26", "2026/05/27", "2026/05/28", "2026/05/29", "2026/05/30", "2026/05/31", "2026/06/01", "2026/06/02"],
    arrivals: [1242, 1368, 1290, 1412, 1336, 1514, 1438, 1396, 1423, 1482],
    prices: [39, 38, 37, 38, 36, 35, 37, 38, 37, 36.8]
  },
  fruits: {
    ...categoryInfo.fruits,
    version: "v20260602" + Z("%E7%89%88"),
    updatedAt: "2026/06/02",
    kpis: [
      { label: arrivalLabel(txt.fruits), value: "842.10" },
      { label: txt.arrivalChange, value: "-1.74%" },
      { label: priceLabel(txt.fruits), value: "58.20" },
      { label: txt.priceChange, value: "3.42%" }
    ],
    dates: ["2026/05/24", "2026/05/25", "2026/05/26", "2026/05/27", "2026/05/28", "2026/05/29", "2026/05/30", "2026/05/31", "2026/06/01", "2026/06/02"],
    arrivals: [790, 816, 833, 865, 812, 852, 871, 836, 857, 842],
    prices: [52, 55, 57, 56, 58, 57, 59, 60, 56, 58.2]
  },
  livestock: {
    ...categoryInfo.livestock,
    version: "v20260602" + Z("%E7%89%88"),
    updatedAt: "2026/06/02",
    kpis: [
      { label: arrivalLabel(txt.livestock), value: "118.60" },
      { label: txt.arrivalChange, value: "2.39%" },
      { label: priceLabel(txt.livestock), value: "91.40" },
      { label: txt.priceChange, value: "-0.86%" }
    ],
    dates: ["2026/05/24", "2026/05/25", "2026/05/26", "2026/05/27", "2026/05/28", "2026/05/29", "2026/05/30", "2026/05/31", "2026/06/01", "2026/06/02"],
    arrivals: [101, 108, 112, 106, 115, 109, 121, 117, 116, 119],
    prices: [93, 92, 94, 91, 90, 92, 91, 89, 92, 91.4]
  },
  seafood: {
    ...categoryInfo.seafood,
    version: "v20210718" + Z("%E7%89%88"),
    updatedAt: "2022/11/10",
    kpis: [
      { label: arrivalLabel(txt.seafood), value: "63.70" },
      { label: txt.arrivalChange, value: "-6.32%" },
      { label: priceLabel(txt.seafood), value: "112.60" },
      { label: txt.priceChange, value: "-1.23%" }
    ],
    dates: ["2022/10/30", "2022/11/1", "2022/11/2", "2022/11/3", "2022/11/4", "2022/11/5", "2022/11/6", "2022/11/8", "2022/11/9", "2022/11/10"],
    arrivals: [70, 63, 63, 54, 68, 66, 56, 77, 68, 64],
    prices: [116, 114, 112, 115, 114, 117, 114, 108, 114, 113]
  }
};

const sampleCsvText = [
  "date,arrival,price,source,version,updatedAt",
  "115.5.24,61000,111,CSV Demo,CSV Import,115.6.2",
  "115.5.25,66000,113,CSV Demo,CSV Import,115.6.2",
  "115.5.26,59000,112,CSV Demo,CSV Import,115.6.2",
  "115.5.27,73000,116,CSV Demo,CSV Import,115.6.2",
  "115.5.28,70000,115,CSV Demo,CSV Import,115.6.2",
  "115.5.29,64000,114,CSV Demo,CSV Import,115.6.2",
  "115.5.30,68000,117,CSV Demo,CSV Import,115.6.2",
  "115.5.31,75000,119,CSV Demo,CSV Import,115.6.2",
  "115.6.1,72000,118,CSV Demo,CSV Import,115.6.2",
  "115.6.2,80000,120,CSV Demo,CSV Import,115.6.2"
].join("\n");

const ragicUrl = "https://ap9.ragic.com/mauricetest2023/test4/11?api&listing";
const ragicFields = {
  date: Z("%E6%97%A5%E6%9C%9F"),
  arrival: Z("%E4%BA%A4%E6%98%93%E9%87%8F%EF%BC%88%E5%85%AC%E6%96%A4%EF%BC%89"),
  price: Z("%E5%B9%B3%E5%9D%87%E5%83%B9(%E5%85%83%2F%E5%85%AC%E6%96%A4)")
};


function formatNumber(value) {
  return Number(value || 0).toLocaleString("zh-TW", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatRate(current, previous) {
  if (!Number.isFinite(previous) || previous === 0) return "0.00%";
  return `${(((current - previous) / previous) * 100).toFixed(2)}%`;
}

function normalizeDate(value) {
  const raw = String(value || "").trim();
  const parts = raw.split(/[./-]/).map((part) => part.trim()).filter(Boolean);

  if (parts.length >= 3 && /^\d+$/.test(parts[0])) {
    const year = Number(parts[0]);
    const westernYear = year < 1911 ? year + 1911 : year;
    return `${westernYear}/${Number(parts[1])}/${Number(parts[2])}`;
  }

  return raw.replaceAll("-", "/").replaceAll(".", "/");
}

function dateSortValue(value) {
  const parts = normalizeDate(value).split("/").map(Number);
  if (parts.length >= 3 && parts.every(Number.isFinite)) {
    return new Date(parts[0], parts[1] - 1, parts[2]).getTime();
  }

  return 0;
}

function toDateInputValue(value) {
  const parts = normalizeDate(value).split("/").map(Number);
  if (parts.length >= 3 && parts.every(Number.isFinite)) {
    return `${parts[0]}-${String(parts[1]).padStart(2, "0")}-${String(parts[2]).padStart(2, "0")}`;
  }

  return "";
}

function fromDateInputValue(value) {
  const parts = String(value || "").split("-").map(Number);
  if (parts.length >= 3 && parts.every(Number.isFinite)) {
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
  }

  return "";
}

function eachDateInRange(startInput, endInput) {
  const startParts = String(startInput || "").split("-").map(Number);
  const endParts = String(endInput || "").split("-").map(Number);
  if (startParts.length < 3 || endParts.length < 3) return [];

  const cursor = new Date(startParts[0], startParts[1] - 1, startParts[2]);
  const end = new Date(endParts[0], endParts[1] - 1, endParts[2]);
  const dates = [];

  while (cursor <= end) {
    dates.push(`${cursor.getFullYear()}/${cursor.getMonth() + 1}/${cursor.getDate()}`);
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

function filterRowsByDateRange(rows, startInput, endInput) {
  if (!startInput || !endInput) {
    return { rows: [], missingDates: [], rangeMissing: false, invalidRange: false, emptyRange: true };
  }

  const start = dateSortValue(fromDateInputValue(startInput));
  const end = dateSortValue(fromDateInputValue(endInput));

  if (start > end) {
    return { rows: [], missingDates: [], rangeMissing: false, invalidRange: true, emptyRange: false };
  }

  const filteredRows = rows.filter((row) => {
    const value = dateSortValue(row.date);
    return value >= start && value <= end;
  });
  const availableDates = new Set(filteredRows.map((row) => normalizeDate(row.date)));
  const missingDates = eachDateInRange(startInput, endInput).filter((date) => !availableDates.has(date));

  return {
    rows: filteredRows,
    missingDates,
    rangeMissing: filteredRows.length === 0,
    invalidRange: false,
    emptyRange: false
  };
}

function normalizeCategory(value) {
  const clean = String(value || "").trim();
  return categoryAliases[clean.toLowerCase()] || categoryAliases[clean];
}

function parseCsvLine(line) {
  const cells = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === "\"" && inQuotes && next === "\"") {
      cell += "\"";
      i += 1;
    } else if (char === "\"") {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += char;
    }
  }

  cells.push(cell.trim());
  return cells;
}

function parseCsv(text) {
  const lines = text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) throw new Error(txt.csvTooShort);

  const headers = parseCsvLine(lines[0]).map((header) => header.trim());
  const rows = lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce((row, header, index) => {
      row[header] = values[index] || "";
      return row;
    }, {});
  });

  const required = ["date", "arrival", "price"];
  const missing = required.filter((field) => !headers.includes(field));
  if (missing.length > 0) throw new Error(`${txt.csvMissing}${missing.join(", ")}`);

  return rows;
}

function buildDashboardData(rows, activeCategory) {
  const grouped = {};

  rows.forEach((row) => {
    const key = normalizeCategory(row.category) || activeCategory;
    const arrival = Number(row.arrival) / 1000;
    const price = Number(row.price);

    if (!key || !Number.isFinite(arrival) || !Number.isFinite(price)) return;

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push({
      date: normalizeDate(row.date),
      arrival,
      price,
      source: row.source,
      version: row.version,
      updatedAt: normalizeDate(row.updatedAt || row.date)
    });
  });

  const nextData = { ...marketData };

  Object.entries(grouped).forEach(([key, items]) => {
    const sorted = items.sort((a, b) => dateSortValue(a.date) - dateSortValue(b.date));
    const latest = sorted[sorted.length - 1];
    const previous = sorted[sorted.length - 2] || latest;
    const info = categoryInfo[key];

    nextData[key] = {
      ...info,
      source: latest.source || info.source,
      version: latest.version || txt.csvVersion,
      updatedAt: latest.updatedAt || latest.date,
      dates: sorted.map((item) => item.date),
      arrivals: sorted.map((item) => item.arrival),
      prices: sorted.map((item) => item.price),
      kpis: [
        { label: arrivalLabel(info.title), value: formatNumber(latest.arrival) },
        { label: txt.arrivalChange, value: formatRate(latest.arrival, previous.arrival) },
        { label: priceLabel(info.title), value: formatNumber(latest.price) },
        { label: txt.priceChange, value: formatRate(latest.price, previous.price) }
      ]
    };
  });

  return nextData;
}

function parseRagicListing(payload) {
  return Object.values(payload || {})
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      date: item[ragicFields.date],
      arrival: item[ragicFields.arrival],
      price: item[ragicFields.price],
      source: txt.ragicSource,
      version: txt.ragicVersion,
      updatedAt: item[ragicFields.date]
    }))
    .filter((row) => row.date && row.arrival && row.price);
}

window.dashboardCsvTools = { parseCsv, buildDashboardData, parseRagicListing, filterRowsByDateRange };

function ChartPanel({ current }) {
  const chartRef = useRef(null);

  const option = useMemo(() => ({
    color: ["#1394f6", "#142a9d"],
    tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
    legend: { top: 38, left: "center", itemWidth: 14, itemHeight: 14, textStyle: { fontSize: 21, color: "#111" } },
    grid: { top: 116, right: 74, bottom: 108, left: 70 },
    xAxis: {
      type: "category",
      data: current.dates,
      axisTick: { show: false },
      axisLabel: { rotate: 38, color: "#222", fontSize: 14 },
      name: txt.date,
      nameLocation: "middle",
      nameGap: 64,
      nameTextStyle: { fontSize: 18, color: "#222" }
    },
    yAxis: [
      {
        type: "value",
        name: arrivalLabel(current.title),
        nameLocation: "middle",
        nameGap: 48,
        min: 0,
        splitLine: { lineStyle: { color: "#eeeeee", width: 4 } },
        axisLabel: { color: "#222", fontSize: 14 }
      },
      {
        type: "value",
        name: priceLabel(current.title),
        nameLocation: "middle",
        nameGap: 50,
        min: 0,
        splitLine: { show: false },
        axisLabel: { color: "#555", fontSize: 12 }
      }
    ],
    series: [
      { name: arrivalLabel(current.title), type: "bar", barWidth: 44, data: current.arrivals, label: { show: true, position: "inside", color: "#fff", fontSize: 14, formatter: ({ value }) => Math.round(value).toLocaleString("zh-TW") } },
      { name: priceLabel(current.title), type: "line", yAxisIndex: 1, data: current.prices, symbol: "circle", symbolSize: 4, lineStyle: { width: 4, color: "#142a9d" }, itemStyle: { color: "#142a9d" }, label: { show: true, position: "bottom", color: "#222", fontSize: 13 } }
    ]
  }), [current]);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    chart.setOption(option);
    const resize = () => chart.resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  }, [option]);

  return React.createElement(
    "section",
    { className: "chart-area", "aria-label": `${current.title}${txt.trendTitle}` },
    React.createElement("h2", null, txt.trendTitle),
    React.createElement("div", { ref: chartRef, className: "chart" }),
    React.createElement("p", { className: "note" }, txt.note)
  );
}

function Dashboard() {
  const [activeKey, setActiveKey] = useState("seafood");
  const [data, setData] = useState(marketData);
  const [importStatus, setImportStatus] = useState(txt.mockStatus);
  const [startDate, setStartDate] = useState("2026-05-24");
  const [endDate, setEndDate] = useState("2026-06-02");
  const [missingMessage, setMissingMessage] = useState("");
  const current = data[activeKey];

  function applyRows(name, rows) {
    setData(buildDashboardData(rows, activeKey));
    setImportStatus(`${txt.imported}${name}${txt.total}${rows.length}${txt.rows}`);
  }

  function importCsvText(name, text) {
    const rows = parseCsv(String(text || ""));
    applyRows(name, rows);
    setMissingMessage("");
  }

  async function loadSampleCsv() {
    try {
      if (window.location.protocol === "file:") {
        importCsvText("sample", sampleCsvText);
        return;
      }

      const response = await fetch("./sample-market-data.csv");
      const text = await response.text();
      importCsvText("sample", text);
    } catch (error) {
      try {
        importCsvText("sample", sampleCsvText);
      } catch (fallbackError) {
        setImportStatus(fallbackError.message || error.message);
      }
    }
  }

  function applyRagicRows(rows) {
    const result = filterRowsByDateRange(rows, startDate, endDate);

    if (result.invalidRange) {
      setMissingMessage(txt.invalidDateRange);
      return;
    }

    if (result.emptyRange) {
      setMissingMessage(txt.emptyDateRange);
      return;
    }

    if (result.rangeMissing) {
      setMissingMessage(txt.missingRange);
      return;
    }

    applyRows("Ragic JSON", result.rows);
    setMissingMessage(result.missingDates.length > 0 ? `${txt.missingPrefix}${result.missingDates.join(Z("%E3%80%81"))}` : "");
  }

  async function queryRagicJson() {
    try {
      const response = await fetch("/api/ragic-json");
      const payload = await response.json();
      const rows = parseRagicListing(payload);
      applyRagicRows(rows);
    } catch (error) {
      try {
        const response = await fetch(ragicUrl);
        const payload = await response.json();
        const rows = parseRagicListing(payload);
        applyRagicRows(rows);
      } catch (fallbackError) {
        setImportStatus(fallbackError.message || error.message);
      }
    }
  }

  return React.createElement(
    "main",
    { className: "dashboard" },
    React.createElement(
      "aside",
      { className: "sidebar" },
      React.createElement("div", { className: "sidebar-mark" }),
      React.createElement(
        "nav",
        { className: "nav-list", "aria-label": txt.navLabel },
        Object.entries(data).map(([key, item]) => React.createElement(
          "button",
          { key, className: `nav-button ${key === activeKey ? "active" : ""}`, onClick: () => setActiveKey(key), title: item.label },
          React.createElement("span", null, item.label)
        ))
      ),
      React.createElement("div", { className: "dot-pattern" })
    ),
    React.createElement(
      "section",
      { className: "content" },
      React.createElement(
        "header",
        { className: "header" },
        React.createElement("h1", null, txt.title)
      ),
      React.createElement(
        "section",
        { className: "import-panel", "aria-label": txt.csvImport },
        React.createElement(
          "div",
          { className: "query-row" },
          React.createElement(
            "label",
            { className: "date-control" },
            React.createElement("span", null, txt.startDate),
            React.createElement("input", { type: "date", value: startDate, onChange: (event) => setStartDate(event.target.value) })
          ),
          React.createElement(
            "label",
            { className: "date-control" },
            React.createElement("span", null, txt.endDate),
            React.createElement("input", { type: "date", value: endDate, onChange: (event) => setEndDate(event.target.value) })
          ),
          React.createElement("button", { className: "import-button", onClick: queryRagicJson }, txt.queryRagic),
          missingMessage ? React.createElement("p", { className: "warning-text" }, missingMessage) : null
        ),
        React.createElement(
          "div",
          { className: "sample-row" },
          React.createElement("button", { className: "import-button secondary", onClick: loadSampleCsv }, txt.loadSample),
          React.createElement("p", null, importStatus)
        )
      ),
      React.createElement(
        "div",
        { className: "main-panel" },
        React.createElement(
          "section",
          { className: "kpi-section", "aria-label": `${current.title}${txt.kpiRegion}` },
          React.createElement("div", { className: "kpi-date" }, `${txt.date} ${current.updatedAt}`),
          React.createElement(
            "div",
            { className: "kpi-grid" },
            current.kpis.map((kpi) => React.createElement(
              "article",
              { className: "kpi-card", key: kpi.label },
              React.createElement("div", { className: "kpi-title" }, kpi.label),
              React.createElement("strong", { className: String(kpi.value).length >= 9 ? "compact-value" : "" }, kpi.value)
            ))
          )
        ),
        React.createElement("div", { className: "divider" }),
        React.createElement(ChartPanel, { current })
      )
    ),
    React.createElement(
      "footer",
      { className: "footer" },
      React.createElement("span", null, `${txt.source}${txt.seafoodSource}`)
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(Dashboard));
