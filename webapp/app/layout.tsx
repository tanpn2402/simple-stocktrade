import './globals.css'

const SideMenu = [
  {}
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <head />
      <body>
        <div className='flex w-full'>
          <div className='w-[16rem] min-w-[16rem] min-h-screen border-r-2 border-gray-100 flex flex-col'>
            <div className='min-w-full my-4 flex justify-center my-8'>
              <h2 className='font-bold text-lg'>@StockTrade</h2>
            </div>
            <div className='min-w-full mb-4 flex justify-center'>
              <div className="w-11/12 h-24 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-105">
                <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png" />
                <div className="w-full px-4 absolute top-6">
                  <div className="flex justify-between items-center">
                    <div className="">
                      <p className="font-light">
                        Total assets
                      </p>
                      <p className="font-medium tracking-widest">
                        $5,499.581
                      </p>
                    </div>
                    <div className="">
                      <p className="font-semibold text-sm text-green-500">
                        + 20,40%
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <ul className="grow menu bg-base-100 w-full p-2 rounded-box">
              <li className='font-semibold text-md'>
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  Trade
                </a>
              </li>
              <li>
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Portfolio
                </a>
              </li>
              <li>
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  Market
                </a>
              </li>
              <li>
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  News
                </a>
              </li>
            </ul>
            <div className='w-full flex justify-center'>
              <div className="h-[2px] w-5/6 bg-gray-100"></div>
            </div>
            <ul className="menu bg-base-100 w-full p-2 rounded-box">
              <li className='font-semibold text-md'>
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  Settings
                </a>
              </li>
              <li>
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className='grow flex flex-col'>
            <div className="navbar bg-base-100">
              <div className="flex-1"></div>
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <div className="indicator">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      <span className="badge badge-sm indicator-item">8</span>
                    </div>
                  </label>
                  <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                    <div className="card-body">
                      <span className="font-bold text-lg">8 Items</span>
                      <span className="text-info">Subtotal: $999</span>
                      <div className="card-actions">
                        <button className="btn btn-primary btn-block">View cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </label>
                  <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='grow bg-gray-100 flex flex-column'>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
