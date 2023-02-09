import ReactNodeProps from "@/interfaces/ReactNodeProps";
import { classNames } from "@/utils/utils";


const MyWatchList = [
  {
    stockID: "SPOT",
    name: "Spotify",
    current: 311.40,
    change: -1.10
  },
  {
    stockID: "ABNB",
    name: "Airbnb",
    current: 124.40,
    change: -3.10
  },
  {
    stockID: "SHOP",
    name: "Shopify",
    current: 28.40,
    change: -5.30
  },
  {
    stockID: "SONY",
    name: "Playstation",
    current: 71.20,
    change: 0.97
  },
  {
    stockID: "DBX",
    name: "Dropbox Inc",
    current: 41.40,
    change: -11.60
  },
  {
    stockID: "PYPL",
    name: "Paypal",
    current: 92.40,
    change: 3.28
  }
]

const WatchList = (props: ReactNodeProps) => {


  return <div className={classNames("rounded-box w-full shadow bg-white", props.className!)}>
    <div className="mx-8 pt-8 pb-4 flex">
      <div className="grow">
        <h2 className="text-2xl font-bold mb-2">My watchlist</h2>
      </div>
      <div className="">
        <button className="btn btn-circle btn-outline bg-white hover:shadow border-0 text-gray-500 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>

    <div>
      {MyWatchList.map(e => <div key={e.stockID} className="mx-8 py-4 flex border-b-2 border-gray-100">
        <div className="grow grid grid-cols-2">
          <div>
            <h2 className="font-bold text-xl">{e.stockID}</h2>
            <div className="text-gray-700 text-md font-normal">{e.name}</div>
          </div>
          <div className="text-right">
            <h2 className="font-bold text-xl">${e.current}</h2>
            <div className={classNames("text-md font-normal", e.change > 0 ? "text-green-600" : "text-rose-700")}>
              {e.change > 0 ? "+" : ""}
              {e.change}
              <span>&nbsp;%</span>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  </div>
}

export default WatchList;