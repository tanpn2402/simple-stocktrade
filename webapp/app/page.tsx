import Chart from "@/components/Chart";
import Portfolio from "@/components/Portfolio";
import WatchList from "@/components/WatchList";



export default function Home() {
  return (
    <main className='p-8 flex flex-col'>
      <Portfolio />

      <div className="mt-4 grid grid-cols-3 gap-2 grow">
        <Chart className="col-span-2" />
        <WatchList />
      </div>
    </main>
  )
}
